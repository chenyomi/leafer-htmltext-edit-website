import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tailwindcss from '@tailwindcss/vite';

import path from 'path';

// 从 .dev.vars 读取 GITHUB_TOKEN（本地开发用，不提交到 git）
function loadDevVars(): Record<string, string> {
  const devVarsPath = path.resolve(__dirname, '.dev.vars');
  if (!fs.existsSync(devVarsPath)) return {};
  return Object.fromEntries(
    fs
      .readFileSync(devVarsPath, 'utf-8')
      .split('\n')
      .filter(l => l.includes('='))
      .map(l => l.split('=').map(s => s.trim()) as [string, string])
  );
}

export default defineConfig({
  base: '/leafer-htmltext-edit-website/',
  plugins: [
    vue(),
    vueJsx(),
    tailwindcss(),
    {
      name: 'changelog-api',
      configureServer(server) {
        const vars = loadDevVars();
        const token = vars['GITHUB_TOKEN'] || process.env.GITHUB_TOKEN || '';

        server.middlewares.use('/api/changelog', async (_req, res) => {
          try {
            const headers: Record<string, string> = {
              Accept: 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28',
              'User-Agent': 'leafer-htmltext-edit-website'
            };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const r = await fetch(
              'https://api.github.com/repos/chenyomi/npm-chenyomi-leafer-htmltext-edit/commits?per_page=30',
              { headers }
            );
            if (!r.ok) throw new Error(`GitHub API ${r.status}`);

            const commits: Array<{
              sha: string;
              commit: { message: string; author: { date: string } };
            }> = await r.json();

            const changelog = commits
              .map(c => ({
                sha: c.sha.slice(0, 7),
                date: c.commit.author.date.slice(0, 10),
                message: c.commit.message.split('\n')[0],
                detail: c.commit.message
                  .split('\n')
                  .slice(1)
                  .map(l => l.trim())
                  .filter(l => l.startsWith('-'))
              }))
              .filter(c => /^(feat|fix|refactor|perf)/i.test(c.message));

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(changelog));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(e) }));
          }
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@content': path.resolve(__dirname, 'src/content'),
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
});
