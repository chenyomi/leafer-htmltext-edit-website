<template>
  <div>
    <DisplayHeader v-if="!isSidebarPage" :activeItem="activeItem" />

    <router-view />
  </div>
</template>

<script setup lang="ts">
import DisplayHeader from '@/components/landing/DisplayHeader/DisplayHeader.vue';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const route = useRoute();
const { ensureLoaded } = useAuth();

const sidebarPages = ['/favorites'];
const isSidebarPage = computed(() => {
  const path = route.path;
  return sidebarPages.some(sidebarPath => path.includes(sidebarPath)) || /^\/[^/]+\/[^/]+$/.test(path);
});

const activeItem = computed(() => {
  if (route.path === '/') return 'home';
  if (route.path.startsWith('/docs')) return 'docs';
  if (route.path.startsWith('/community')) return 'community';
  return null;
});

onMounted(() => {
  ensureLoaded();
});
</script>
