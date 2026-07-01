const exports = {};
const viteConfig = `// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    // 确保使用项目的依赖实例，避免多实例冲突
    dedupe: [
      '@leafer-ui/core',
      '@leafer-in/editor',
      '@leafer-in/html',
      'leafer-ui',
      'quill',
    ],
  },
  optimizeDeps: {
    // 排除插件的预构建
    exclude: ['@chenyomi/leafer-htmltext-edit'],
  },
})`;
exports.viteConfig = viteConfig;
import { writeFileSync } from 'fs'; writeFileSync('scripts/test-out.json', JSON.stringify(exports));