<template>
  <button class="language-switch" type="button" :aria-label="label" :title="label" @click="toggleLocale">
    <span class="language-switch__option" :class="{ active: locale === 'zh-CN' }">中</span>
    <span class="language-switch__divider"></span>
    <span class="language-switch__option" :class="{ active: locale === 'en-US' }">EN</span>
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
  gap: 0.25rem;
  min-width: 76px;
  height: 44px;
  padding: 3px;
  border: 1px solid rgba(125, 249, 255, 0.18);
  border-radius: 999px;
  cursor: pointer;
  color: #ffffff;
  background: linear-gradient(135deg, rgba(125, 249, 255, 0.08), rgba(255, 255, 255, 0.03)), rgba(255, 255, 255, 0.04);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 800;
  white-space: nowrap;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.025);
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.language-switch:hover {
  border-color: rgba(125, 249, 255, 0.42);
  background: linear-gradient(135deg, rgba(125, 249, 255, 0.12), rgba(255, 255, 255, 0.05)), rgba(255, 255, 255, 0.06);
  transform: translateY(-1px);
}

.language-switch__option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.56);
  transition:
    color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.language-switch__option.active {
  color: #050505;
  background: #ffffff;
  box-shadow: 0 6px 18px rgba(255, 255, 255, 0.16);
}

.language-switch__divider {
  width: 1px;
  height: 14px;
  background: rgba(255, 255, 255, 0.12);
}

@media (max-width: 640px) {
  .language-switch {
    min-width: 70px;
    height: 38px;
    font-size: 0.7rem;
  }

  .language-switch__option {
    min-width: 27px;
    height: 27px;
  }
}
</style>
