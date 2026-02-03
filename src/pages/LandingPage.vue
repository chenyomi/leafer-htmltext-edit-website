<template>
  <section class="landing-wrapper">
    <div v-if="isMobile" class="mobile-hero-background-container" style="z-index: 0">
      <img
        :src="heroImage"
        alt="Hero background"
        class="mobile-hero-background-image"
        style="transform: translateY(-200px)"
      />
    </div>

    <div class="fixed h-full w-full z-0">
      <FloatingLines
        :enabled-waves="['top', 'middle', 'bottom']"
        :line-count="[10, 15, 20]"
        :line-distance="[8, 6, 4]"
        :bend-radius="5.0"
        :bend-strength="-0.5"
        :interactive="true"
        :parallax="true"
      />
    </div>
    <Hero />
    <FeatureCards />
    <StartBuilding />
    <Footer />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Hero from '../components/landing/Hero/Hero.vue';
import FloatingLines from '@/components/landing/FloatingLines/FloatingLines.vue';
import Footer from '@/components/landing/Footer/Footer.vue';
import FeatureCards from '@/components/landing/FeatureCards/FeatureCards.vue';
import StartBuilding from '@/components/landing/StartBuilding/StartBuilding.vue';
import heroImage from '@/assets/common/hero.webp';
const isMobile = ref(false);

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.scrollTo(0, 0);
  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile);
});
</script>
