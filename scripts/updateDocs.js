import { execSync } from 'child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'fs';
import https from 'https';
import { tmpdir } from 'os';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEBSITE_ROOT = resolve(__dirname, '..');
const DOCS_DIR = resolve(WEBSITE_ROOT, 'src/content/docs');
const PLUGIN_REPO = process.env.HTMLTEXT_GITHUB_REPO || 'chenyomi/npm-chenyomi-leafer-htmltext-edit';
const DEMO_README_URL =
  'https://raw.githubusercontent.com/chenyomi/leafer-htmltext-edit-view/master/README.md';

function getGitHubToken() {
  return process.env.HTMLTEXT_GITHUB_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';
}

function withGitHubToken(url) {
  const token = getGitHubToken();
  if (!token || !url.startsWith('https://github.com/')) return url;
  return url.replace('https://github.com/', `https://x-access-token:${encodeURIComponent(token)}@github.com/`);
}

function run(cmd, cwd) {
  return execSync(cmd, {
    cwd,
    encoding: 'utf-8',
    stdio: 'pipe',
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }
  }).trim();
}

function getLocalPluginRepo() {
  if (process.env.HTMLTEXT_DISABLE_LOCAL === '1') return null;

  const candidates = [
    process.env.HTMLTEXT_SRC,
    resolve(WEBSITE_ROOT, '../@chenyomi-leafer-htmltext-edit'),
    resolve(WEBSITE_ROOT, '../../@chenyomi-leafer-htmltext-edit')
  ].filter(Boolean);

  for (const path of candidates) {
    if (existsSync(resolve(path, 'README.md'))) {
      return { path, cleanup: null };
    }
  }

  return null;
}

function clonePluginRepo() {
  const dir = mkdtempSync(resolve(tmpdir(), 'htmltext-readme-'));
  const url = `https://github.com/${PLUGIN_REPO}.git`;
  const cloneUrl = withGitHubToken(url);

  try {
    console.log(`🌐 拉取插件 README: ${url}`);
    run(`git clone --depth 1 --quiet ${cloneUrl} .`, dir);
    return {
      path: dir,
      cleanup: () => rmSync(dir, { recursive: true, force: true })
    };
  } catch (error) {
    rmSync(dir, { recursive: true, force: true });
    throw error;
  }
}

function readPluginReadme(repoPath) {
  const readmePath = resolve(repoPath, 'README.md');
  if (!existsSync(readmePath)) {
    throw new Error(`未找到 README.md: ${readmePath}`);
  }
  return readFileSync(readmePath, 'utf-8');
}

function fetchRaw(url) {
  return new Promise((resolvePromise, reject) => {
    const req = https.get(
      url,
      {
        timeout: 20000,
        headers: { 'User-Agent': 'leafer-htmltext-edit-website-docs-sync' }
      },
      res => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          fetchRaw(res.headers.location).then(resolvePromise).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`status ${res.statusCode}`));
          return;
        }
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('end', () => resolvePromise(data));
      }
    );
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

async function syncPluginReadme() {
  const local = getLocalPluginRepo();
  const repo = local || clonePluginRepo();

  try {
    const content = readPluginReadme(repo.path);
    const savePath = resolve(DOCS_DIR, 'leafer-htmltext-edit.md');
    writeFileSync(savePath, content, 'utf-8');
    console.log('✅ 已同步插件 README → src/content/docs/leafer-htmltext-edit.md');
  } finally {
    repo.cleanup?.();
  }
}

async function syncDemoReadme() {
  const savePath = resolve(DOCS_DIR, 'leafer-htmltext-edit-view.md');
  const urls = [
    DEMO_README_URL,
    DEMO_README_URL.replace('/master/', '/main/')
  ];

  for (const url of urls) {
    try {
      const content = await fetchRaw(url);
      writeFileSync(savePath, content, 'utf-8');
      console.log('✅ 已同步演示 README → src/content/docs/leafer-htmltext-edit-view.md');
      return;
    } catch {
      // try next branch
    }
  }

  console.warn('⚠️  演示仓库 README 拉取失败，保留现有文件');
}

async function main() {
  if (!existsSync(DOCS_DIR)) mkdirSync(DOCS_DIR, { recursive: true });

  try {
    await syncPluginReadme();
  } catch (error) {
    console.error(`❌ 插件 README 同步失败: ${error.message}`);
    const fallback = resolve(DOCS_DIR, 'leafer-htmltext-edit.md');
    if (!existsSync(fallback)) {
      writeFileSync(
        fallback,
        '# leafer-htmltext-edit\n\n文档获取失败，请检查 HTMLTEXT_GITHUB_TOKEN 或仓库权限。\n',
        'utf-8'
      );
    }
  }

  await syncDemoReadme();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
