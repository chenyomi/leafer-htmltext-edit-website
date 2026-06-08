import { execSync } from 'child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEBSITE_ROOT = resolve(__dirname, '..');
const DOCS_PAGE = resolve(WEBSITE_ROOT, 'src/pages/DocsPage.vue');
const PACKAGE_NAME = '@chenyomi/leafer-htmltext-edit';
const DEFAULT_REPOS = ['chenyomi/leafer-htmltext-edit', 'chenyomi/npm-chenyomi-leafer-htmltext-edit'];

function getGitHubToken() {
  return process.env.HTMLTEXT_GITHUB_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';
}

function withGitHubToken(url) {
  const token = getGitHubToken();
  if (!token || !url.startsWith('https://github.com/')) return url;
  return url.replace('https://github.com/', `https://x-access-token:${encodeURIComponent(token)}@github.com/`);
}

function maskUrl(url) {
  return url.replace(/x-access-token:[^@]+@/, 'x-access-token:***@');
}

// ─── 查找或拉取源码仓库 ───────────────────────────────────────────────────────────
function getSourceRepo() {
  const disableLocal = process.env.HTMLTEXT_DISABLE_LOCAL === '1';

  if (!disableLocal) {
    const candidates = [
      process.env.HTMLTEXT_SRC,
      resolve(WEBSITE_ROOT, '../@chenyomi-leafer-htmltext-edit'),
      resolve(WEBSITE_ROOT, '../../@chenyomi-leafer-htmltext-edit'),
    ].filter(Boolean);

    for (const p of candidates) {
      if (existsSync(p + '/.git')) {
        return { path: p, cleanup: null, source: 'local' };
      }
    }
  }

  const repos = (process.env.HTMLTEXT_GITHUB_REPO || DEFAULT_REPOS.join(','))
    .split(',')
    .map(repo => repo.trim())
    .filter(Boolean);

  for (const repo of repos) {
    const dir = mkdtempSync(resolve(tmpdir(), 'htmltext-changelog-'));
    const url = repo.startsWith('http') ? repo : `https://github.com/${repo}.git`;
    const cloneUrl = withGitHubToken(url);

    try {
      console.log(`🌐 未找到本地源码仓库，尝试拉取远端: ${url}`);
      run(`git clone --filter=blob:none --no-checkout --quiet ${cloneUrl} .`, dir);
      return {
        path: dir,
        cleanup: () => rmSync(dir, { recursive: true, force: true }),
        source: url
      };
    } catch (error) {
      rmSync(dir, { recursive: true, force: true });
      console.warn(`⚠️  拉取失败: ${maskUrl(url)}`);
    }
  }

  console.warn('⚠️  找不到可用的源码仓库，将使用 npm latest 和当前页面 changelog 兜底。');
  return null;
}

// ─── git 工具函数 ────────────────────────────────────────────────────────────────
function run(cmd, cwd) {
  return execSync(cmd, {
    cwd,
    encoding: 'utf-8',
    maxBuffer: 20 * 1024 * 1024,
    env: {
      ...process.env,
      GIT_TERMINAL_PROMPT: '0'
    }
  }).trim();
}

function formatMonth(input) {
  const date = input ? new Date(input) : new Date();
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 7);
  }
  return date.toISOString().slice(0, 7);
}

async function getNpmLatest() {
  const url = `https://registry.npmjs.org/${encodeURIComponent(PACKAGE_NAME)}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'leafer-htmltext-edit-website-docs-sync'
      }
    });

    if (!res.ok) throw new Error(`npm registry status ${res.status}`);

    const data = await res.json();
    const version = data?.['dist-tags']?.latest;
    if (!version) return null;

    return {
      version,
      date: formatMonth(data?.time?.[version])
    };
  } catch (error) {
    console.warn(`⚠️  无法读取 npm 最新版本: ${error.message}`);
    return null;
  }
}

// ─── 获取版本历史：读取每个修改 package.json 的提交，提取版本号 ─────────────────
function getVersionHistory(srcRepo) {
  const shas = run('git log --format="%H|%ad" --date=format:"%Y-%m" -- package.json', srcRepo)
    .split('\n')
    .filter(Boolean)
    .map(l => {
      const [sha, date] = l.split('|');
      return { sha, date };
    });

  const versions = [];
  let lastVer = null;

  for (const { sha, date } of shas) {
    let pkg;
    try {
      pkg = JSON.parse(run(`git show ${sha}:package.json`, srcRepo));
    } catch {
      continue;
    }
    if (pkg.version && pkg.version !== lastVer) {
      versions.push({ version: pkg.version, sha, date });
      lastVer = pkg.version;
    }
  }

  // versions 当前是 newest-first（git log 默认），保持不变
  return versions;
}

// ─── 提取某个版本区间内的 feat/fix 提交 ──────────────────────────────────────────
function getItemsInRange(srcRepo, fromSha, toSha) {
  // fromSha..toSha = 比 fromSha 新、不超过 toSha 的提交（不含 fromSha）
  const range = fromSha ? `${fromSha}..${toSha}` : toSha;
  let log = '';

  try {
    log = run(`git log ${range} --format="%s|%b---END---"`, srcRepo);
  } catch {
    return [];
  }

  const items = [];
  for (const block of log.split('---END---')) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const [subject, ...bodyLines] = trimmed.split('\n');
    const subj = (subject || '').split('|')[0].trim();
    if (!/^(feat|fix|refactor|perf)/i.test(subj)) continue;

    const body = bodyLines.join('\n');

    // 优先用 commit body 中的 bullet points（- 开头，去掉版本号行）
    const bullets = body
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.startsWith('-'))
      .map(l => l.replace(/^-\s*/, '').trim())
      .filter(l => l && !/^更新版本号/i.test(l));

    if (bullets.length > 0) {
      items.push(...bullets);
    } else {
      // 无 body 则用 subject（去掉 feat:/fix: 前缀）
      const clean = subj.replace(/^(feat|fix|refactor|perf):\s*/i, '').trim();
      if (clean) items.push(clean);
    }
  }

  // 去重
  return [...new Set(items)];
}

// ─── 确定版本 tag ─────────────────────────────────────────────────────────────
function getTag(version, newerVersion) {
  if (!newerVersion) return 'latest';
  const [M, m] = version.split('.').map(Number);
  const [nM, nm] = newerVersion.split('.').map(Number);
  if (M < nM) return 'major';
  if (m < nm) return 'minor';
  return 'patch';
}

// ─── 构建 changelog ───────────────────────────────────────────────────────────
function buildChangelog(srcRepo, versions, maxEntries = 10) {
  // versions 是 newest-first
  const result = [];
  const limited = versions.slice(0, maxEntries);

  for (let i = 0; i < limited.length; i++) {
    const { version, sha, date } = limited[i];
    const olderSha = limited[i + 1]?.sha ?? null;
    const newerVersion = i === 0 ? null : limited[i - 1].version;

    const items = getItemsInRange(srcRepo, olderSha, sha);
    const tag = getTag(version, newerVersion);

    // items 为空时用一个默认描述
    const finalItems = items.length > 0 ? items : [`发布 v${version}`];

    result.push({ version, date, tag, items: finalItems });
  }

  return result;
}

function ensureNpmLatest(srcRepo, releases, versions, npmLatest, maxEntries = 10) {
  if (!npmLatest?.version || releases[0]?.version === npmLatest.version) {
    return releases;
  }

  const currentVersion = releases[0]?.version;
  const headItems = versions[0]?.sha ? getItemsInRange(srcRepo, versions[0].sha, 'HEAD') : [];
  const latestItems = headItems.length > 0 ? headItems : [`发布 v${npmLatest.version}`];

  console.log(`📦 npm 最新版本为 v${npmLatest.version}，源码版本历史最新为 ${currentVersion ? `v${currentVersion}` : '空'}`);

  const withLatest = [
    {
      version: npmLatest.version,
      date: npmLatest.date,
      tag: 'latest',
      items: latestItems
    },
    ...releases.map((release, index) => ({
      ...release,
      tag: getTag(release.version, index === 0 ? npmLatest.version : releases[index - 1].version)
    }))
  ];

  return withLatest.slice(0, maxEntries);
}

function compareVersions(a, b) {
  const left = String(a || '').split('.').map(Number);
  const right = String(b || '').split('.').map(Number);
  const len = Math.max(left.length, right.length);

  for (let i = 0; i < len; i++) {
    const diff = (left[i] || 0) - (right[i] || 0);
    if (diff !== 0) return diff;
  }

  return 0;
}

// ─── 序列化为 JS 代码 ─────────────────────────────────────────────────────────
function serialize(releases) {
  const entries = releases.map(r => {
    const escaped = r.items.map(s => `      '${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`);
    return (
      `  {\n` +
      `    version: '${r.version}',\n` +
      `    date: '${r.date}',\n` +
      `    tag: '${r.tag}',\n` +
      `    items: [\n${escaped.join(',\n')}\n    ]\n` +
      `  }`
    );
  });

  return `const changelog = [\n${entries.join(',\n')}\n];`;
}

// ─── 更新 DocsPage.vue ────────────────────────────────────────────────────────
const CHANGELOG_HEADER = '// ─── Changelog ────────────────────────────────────────────────────────────────';

function getChangelogArrayRange(content) {
  const start = content.indexOf(CHANGELOG_HEADER);
  if (start === -1) {
    throw new Error('在 DocsPage.vue 中找不到 changelog 区块，请确认文件格式正确');
  }

  const arrStart = content.indexOf('const changelog = [', start);
  if (arrStart === -1) {
    throw new Error('找不到 const changelog = [');
  }

  const bracketStart = content.indexOf('[', arrStart);
  let depth = 0;
  let bracketEnd = bracketStart;

  for (let i = bracketStart; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        bracketEnd = i;
        break;
      }
    }
  }

  const statementEnd = content[bracketEnd + 1] === ';' ? bracketEnd + 2 : bracketEnd + 1;

  return { start, arrStart, bracketStart, bracketEnd, statementEnd };
}

function readCurrentChangelog() {
  const content = readFileSync(DOCS_PAGE, 'utf-8');
  const range = getChangelogArrayRange(content);
  const arraySource = content.slice(range.bracketStart, range.bracketEnd + 1);

  try {
    return Function(`"use strict"; return (${arraySource});`)();
  } catch (error) {
    console.warn(`⚠️  当前 changelog 解析失败: ${error.message}`);
    return [];
  }
}

function buildFallbackChangelog(npmLatest, maxEntries = 10) {
  const existing = readCurrentChangelog();

  if (!npmLatest?.version) {
    console.warn('⚠️  npm latest 不可用，保持当前 changelog 不变。');
    return existing.slice(0, maxEntries);
  }

  const currentVersion = existing[0]?.version;
  if (currentVersion && compareVersions(currentVersion, npmLatest.version) >= 0) {
    return existing.slice(0, maxEntries);
  }

  console.log(`📦 使用 npm latest 兜底补充 v${npmLatest.version}`);

  return [
    {
      version: npmLatest.version,
      date: npmLatest.date,
      tag: 'latest',
      items: [`发布 v${npmLatest.version}`]
    },
    ...existing.map((entry, index) => ({
      ...entry,
      tag: getTag(entry.version, index === 0 ? npmLatest.version : existing[index - 1].version)
    }))
  ].slice(0, maxEntries);
}

function updateDocsPage(code) {
  let content = readFileSync(DOCS_PAGE, 'utf-8');

  // 匹配 changelog 声明块（从注释到末尾的 ];）
  let range;
  try {
    range = getChangelogArrayRange(content);
  } catch (error) {
    console.error('❌ 在 DocsPage.vue 中找不到 changelog 区块，请确认文件格式正确');
    process.exit(1);
  }

  content = content.slice(0, range.start) + CHANGELOG_HEADER + '\n' + code + content.slice(range.statementEnd);
  writeFileSync(DOCS_PAGE, content, 'utf-8');
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const repo = getSourceRepo();
  const npmLatest = await getNpmLatest();

  if (!repo) {
    const releases = buildFallbackChangelog(npmLatest, 10);
    if (releases.length === 0) {
      console.error('❌ 无法生成 changelog：源码仓库、npm latest 和当前 changelog 均不可用。');
      process.exit(1);
    }

    const code = serialize(releases);
    updateDocsPage(code);
    console.log(`\n✅ DocsPage.vue changelog 已用兜底数据更新（共 ${releases.length} 个版本）`);
    return;
  }

  try {
    console.log('📁 源码路径:', repo.path);
    console.log('🔗 数据来源:', repo.source);

    console.log('📊 读取 git 版本历史...');
    const versions = getVersionHistory(repo.path);

    if (versions.length === 0) {
      console.error('❌ 未找到任何版本提交，请检查源码仓库');
      process.exit(1);
    }

    console.log(`🔖 发现 ${versions.length} 个源码版本:`, versions.map(v => v.version).join(', '));

    console.log('📝 生成 changelog 条目...');
    const gitReleases = buildChangelog(repo.path, versions, 10);
    const releases = ensureNpmLatest(repo.path, gitReleases, versions, npmLatest, 10);

    for (const r of releases) {
      console.log(`  v${r.version} [${r.tag}] - ${r.items.length} 条`);
    }

    const code = serialize(releases);
    updateDocsPage(code);

    console.log(`\n✅ DocsPage.vue changelog 已更新（共 ${releases.length} 个版本）`);
  } finally {
    repo.cleanup?.();
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
