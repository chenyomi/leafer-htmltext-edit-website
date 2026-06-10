<template>
  <main class="download-page">
    <section class="download-card">
      <router-link class="back-link" to="/">Back to Home</router-link>

      <p class="eyebrow">Offline Package</p>
      <h1>Leafer HTMLText Edit 离线包下载</h1>
      <p class="description">
        下载最新的 npm tgz 离线安装包。插件包本身可以公开下载，实际使用权限仍由运行时 License 校验控制。
      </p>

      <div v-if="loading" class="status-box">正在读取最新版本信息...</div>
      <div v-else-if="error" class="status-box status-error">{{ error }}</div>
      <div v-else-if="manifest" class="download-panel">
        <div class="meta-grid">
          <div>
            <span>Package</span>
            <strong>{{ manifest.name }}</strong>
          </div>
          <div>
            <span>Version</span>
            <strong>{{ manifest.version }}</strong>
          </div>
          <div>
            <span>Updated</span>
            <strong>{{ formattedUpdatedAt }}</strong>
          </div>
        </div>

        <div class="actions">
          <a class="primary-button" :href="downloadUrl" :download="downloadFileName">Download Latest TGZ</a>
          <code>{{ installCommand }}</code>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

interface DownloadManifest {
  name: string;
  version: string;
  latest?: string;
  file: string;
  files?: {
    version?: string;
    latest?: string;
  };
  updatedAt: string;
}

const manifest = ref<DownloadManifest | null>(null);
const loading = ref(true);
const error = ref('');

const baseUrl = import.meta.env.BASE_URL;

function toAssetUrl(path: string) {
  return `${baseUrl}${path.replace(/^\/+/, '')}`;
}

const downloadUrl = computed(() => {
  if (!manifest.value) return '#';
  return toAssetUrl(manifest.value.latest || manifest.value.file);
});

const downloadFileName = computed(() => {
  if (!manifest.value) return undefined;
  return manifest.value.files?.latest || manifest.value.files?.version;
});

const installCommand = computed(() => {
  if (!manifest.value) return '';
  return `npm install ./${manifest.value.files?.version || `chenyomi-leafer-htmltext-edit-${manifest.value.version}.tgz`}`;
});

const formattedUpdatedAt = computed(() => {
  if (!manifest.value?.updatedAt) return '-';
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(manifest.value.updatedAt));
});

onMounted(async () => {
  try {
    const response = await fetch(toAssetUrl('downloads/manifest.json'), {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`读取下载信息失败：${response.status}`);
    }

    manifest.value = await response.json();
  } catch (err) {
    error.value = err instanceof Error ? err.message : '读取下载信息失败';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.download-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 96px 24px;
  color: #fff;
  background:
    radial-gradient(circle at top left, rgba(100, 108, 255, 0.3), transparent 34%),
    radial-gradient(circle at bottom right, rgba(0, 220, 130, 0.22), transparent 30%), #050505;
}

.download-card {
  width: min(920px, 100%);
  padding: 48px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  background: rgba(14, 14, 18, 0.78);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(18px);
}

.back-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}

.back-link:hover {
  color: #fff;
}

.eyebrow {
  margin: 40px 0 12px;
  color: #8b9cff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(36px, 6vw, 72px);
  line-height: 1.05;
  letter-spacing: -0.05em;
}

.description {
  max-width: 680px;
  margin: 24px 0 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 18px;
  line-height: 1.8;
}

.status-box,
.download-panel {
  margin-top: 36px;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.06);
}

.status-error {
  color: #ffb4b4;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.meta-grid div {
  padding: 18px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
}

.meta-grid span {
  display: block;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 13px;
}

.meta-grid strong {
  word-break: break-word;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-top: 28px;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 24px;
  border-radius: 999px;
  color: #050505;
  background: #fff;
  font-weight: 800;
  text-decoration: none;
}

code {
  padding: 14px 16px;
  border-radius: 14px;
  color: rgba(255, 255, 255, 0.86);
  background: rgba(0, 0, 0, 0.28);
}

@media (max-width: 720px) {
  .download-card {
    padding: 32px 22px;
  }

  .meta-grid {
    grid-template-columns: 1fr;
  }
}
</style>
