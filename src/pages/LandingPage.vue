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
    <section class="community-entry">
      <div>
        <span>Community</span>
        <h2>有问题或建议？来社区讨论</h2>
        <p>反馈 Bug、提交功能建议、分享案例，也可以查看最新讨论。</p>
      </div>
      <router-link class="community-entry-link" to="/community">进入社区</router-link>
    </section>
    <StartBuilding />
    <Footer />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Hero from '../components/landing/Hero/Hero.vue';
import FloatingLines from '@/components/landing/FloatingLines/FloatingLines.vue';
import Footer from '@/components/landing/Footer/Footer.vue';
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

<style scoped>
.community-entry {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: min(1180px, calc(100% - 32px));
  margin: -42px auto 80px;
  padding: 24px 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(18px);
}

.community-entry span {
  color: #8b9cff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.community-entry h2 {
  margin: 8px 0;
  font-size: clamp(24px, 3vw, 38px);
  letter-spacing: -0.04em;
}

.community-entry p {
  margin: 0;
  color: rgba(255, 255, 255, 0.62);
}

.community-entry-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  color: #050505;
  background: #ffffff;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
}

@media (max-width: 720px) {
  .community-entry {
    align-items: stretch;
    flex-direction: column;
    margin-top: -20px;
    padding: 20px;
  }
}
</style>
