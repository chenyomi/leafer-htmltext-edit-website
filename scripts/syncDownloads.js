import { execFileSync } from 'child_process';
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEBSITE_ROOT = resolve(__dirname, '..');
const DOWNLOADS_DIR = resolve(WEBSITE_ROOT, 'public/downloads');
const PACKAGE_NAME = '@chenyomi/leafer-htmltext-edit';
const PACKAGE_BASE_NAME = 'chenyomi-leafer-htmltext-edit';
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(cmd, args, cwd, encoding) {
  return execFileSync(cmd, args, {
    cwd,
    stdio: encoding ? 'pipe' : 'inherit',
    encoding
  });
}

function getSourceRepo() {
  if (process.env.HTMLTEXT_DISABLE_LOCAL === '1') {
    return null;
  }

  const candidates = [
    process.env.HTMLTEXT_SRC,
    resolve(WEBSITE_ROOT, '../@chenyomi-leafer-htmltext-edit'),
    resolve(WEBSITE_ROOT, '../../@chenyomi-leafer-htmltext-edit')
  ].filter(Boolean);

  for (const path of candidates) {
    if (existsSync(resolve(path, 'package.json'))) {
      return path;
    }
  }

  return null;
}

function cleanupOldTgzFiles(keepVersion) {
  const keep = new Set([`${PACKAGE_BASE_NAME}-${keepVersion}.tgz`, `${PACKAGE_BASE_NAME}-latest.tgz`]);

  for (const file of readdirSync(DOWNLOADS_DIR)) {
    if (!file.endsWith('.tgz')) continue;
    if (keep.has(file)) continue;
    rmSync(resolve(DOWNLOADS_DIR, file));
    console.log(`🗑️  移除旧包: ${file}`);
  }
}

function writeManifest(version) {
  const versionFileName = `${PACKAGE_BASE_NAME}-${version}.tgz`;
  const latestFileName = `${PACKAGE_BASE_NAME}-latest.tgz`;
  const manifest = {
    name: PACKAGE_NAME,
    version,
    latest: `downloads/${latestFileName}`,
    file: `downloads/${versionFileName}`,
    files: {
      version: versionFileName,
      latest: latestFileName
    },
    updatedAt: new Date().toISOString()
  };

  writeFileSync(resolve(DOWNLOADS_DIR, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8');
  return manifest;
}

function syncFromSourceRepo(srcRepo) {
  console.log(`📁 插件源码: ${srcRepo}`);
  run(npmCommand, ['run', 'pack:tgz', '--', '--out-dir', DOWNLOADS_DIR], srcRepo);
  return JSON.parse(readFileSync(resolve(DOWNLOADS_DIR, 'manifest.json'), 'utf-8'));
}

function syncFromNpm() {
  console.log(`📦 从 npm 拉取最新包: ${PACKAGE_NAME}`);
  const version = run(npmCommand, ['view', PACKAGE_NAME, 'version', '--json'], WEBSITE_ROOT, 'utf-8')
    .trim()
    .replace(/^"|"$/g, '');

  if (!version) {
    throw new Error('无法读取 npm 最新版本');
  }

  const packedName = run(
    npmCommand,
    ['pack', `${PACKAGE_NAME}@${version}`, '--pack-destination', DOWNLOADS_DIR],
    WEBSITE_ROOT,
    'utf-8'
  )
    .trim()
    .split(/\r?\n/)
    .at(-1);

  const versionFileName = `${PACKAGE_BASE_NAME}-${version}.tgz`;
  const latestFileName = `${PACKAGE_BASE_NAME}-latest.tgz`;
  const packedPath = resolve(DOWNLOADS_DIR, packedName);
  const versionPath = resolve(DOWNLOADS_DIR, versionFileName);

  copyFileSync(packedPath, versionPath);
  copyFileSync(versionPath, resolve(DOWNLOADS_DIR, latestFileName));
  if (packedPath !== versionPath) {
    rmSync(packedPath);
  }

  return writeManifest(version);
}

function main() {
  console.log(`📦 目标目录: ${DOWNLOADS_DIR}`);

  const srcRepo = getSourceRepo();
  const manifest = srcRepo ? syncFromSourceRepo(srcRepo) : syncFromNpm();

  cleanupOldTgzFiles(manifest.version);
  console.log(`✅ 离线包已同步到 v${manifest.version} (${PACKAGE_NAME})`);
}

main();
