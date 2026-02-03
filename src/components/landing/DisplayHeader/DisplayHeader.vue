<template>
  <header class="header">
    <div class="header-container">
      <router-link to="/" class="logo">
        <VueBitsLogo />
      </router-link>

      <div class="nav-cta-group">
        <nav class="landing-nav-items">
          <router-link class="nav-link" :class="{ 'active-link': activeItem === 'home' }" to="/">Home</router-link>

          <router-link class="nav-link" to="" custom>
            <a class="nav-link" href="https://www.npmjs.com/package/@chenyomi/leafer-htmltext-edit" target="_blank">
              Docs
            </a>
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { watch, useTemplateRef } from 'vue';
import { gsap } from 'gsap';
import VueBitsLogo from '@/components/common/Logo.vue';
import { useStars } from '@/composables/useStars';
import './DisplayHeader.css';

interface Props {
  activeItem?: string | null;
}

defineProps<Props>();

const starCountRef = useTemplateRef<HTMLElement>('starCountRef');
const stars = useStars();

watch(
  stars,
  newStars => {
    if (newStars && starCountRef.value) {
      gsap.fromTo(
        starCountRef.value,
        {
          scale: 0,
          width: 0,
          opacity: 0
        },
        {
          scale: 1,
          width: '100px',
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1)'
        }
      );
    }
  },
  { immediate: true }
);
</script>
