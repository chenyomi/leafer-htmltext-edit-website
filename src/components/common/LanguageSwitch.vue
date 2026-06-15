<template>
  <button class="language-switch" type="button" :aria-label="label" :title="label" @click="toggleLocale">
    {{ locale === 'zh-CN' ? 'EN' : '中文' }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '@/i18n';

const { locale, toggleLocale } = useI18n();

const label = computed(() => (locale.value === 'zh-CN' ? 'Switch to English' : '切换到中文'));
</script>

<style scoped>
.language-switch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 54px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  cursor: pointer;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
  font: inherit;
  font-size: 0.82rem;
  font-weight: 800;
  white-space: nowrap;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.language-switch:hover {
  border-color: rgba(125, 249, 255, 0.35);
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .language-switch {
    min-width: 48px;
    height: 38px;
    font-size: 0.74rem;
  }
}
</style>
