<template>
  <header class="header">
    <div class="header-container">
      <router-link to="/" class="logo">
        <VueBitsLogo />
      </router-link>

      <div class="nav-cta-group">
        <nav class="landing-nav-items">
          <router-link class="nav-link" :class="{ 'active-link': activeItem === 'home' }" to="" @click="goHome">
            Home
          </router-link>
          <router-link class="nav-link" to="" @click="goCase">Case</router-link>
          <router-link class="nav-link" to="" @click="goPrice">Price</router-link>
          <router-link class="nav-link" to="" custom>
            <a class="nav-link" href="https://www.npmjs.com/package/@chenyomi/leafer-htmltext-edit" target="_blank">
              Docs
            </a>
          </router-link>
        </nav>
        <button class="cta-button" @click="openGitHub">
          Star On GitHub
          <span ref="starCountRef">
            <img :src="starIcon" alt="Star Icon" />
            {{ stars || 0 }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { watch, useTemplateRef } from 'vue';
import { gsap } from 'gsap';
import VueBitsLogo from '@/components/common/Logo.vue';
import { useStars } from '@/composables/useStars';
import starIcon from '@/assets/common/star.svg';
import './DisplayHeader.css';

interface Props {
  activeItem?: string | null;
}

defineProps<Props>();

const starCountRef = useTemplateRef<HTMLElement>('starCountRef');
const stars = useStars();

const openGitHub = () => {
  window.open('https://github.com/chenyomi/leafer-htmltext-edit-view', '_blank');
};
const goCase = () => {
  document.getElementById('case')?.scrollIntoView({
    behavior: 'smooth'
  });
};
const goPrice = () => {
  document.getElementById('price')?.scrollIntoView({
    behavior: 'smooth'
  });
};
const goHome = () => {
  document.getElementById('home')?.scrollIntoView({
    behavior: 'smooth'
  });
};
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
