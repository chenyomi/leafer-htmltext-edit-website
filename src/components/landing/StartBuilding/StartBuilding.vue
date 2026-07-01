<template>
  <section class="start-building-section" id="case">
    <div class="start-building-container">
      <div class="start-building-card relative">
        <Squares
          v-if="show"
          class="w-full h-full"
          direction="diagonal"
          :speed="0.4"
          :squareSize="40"
          borderColor="#999"
          hoverFillColor="#222"
          style="position: absolute; left: 0; top: 0"
        />
        <h4 class="start-building-title">{{ pricing.caseTitle }}</h4>
        <p class="start-building-subtitle mt-4">{{ pricing.caseSubtitle }}</p>
        <video
          :poster="posterSrc"
          src="@/assets/video/video.mp4"
          controls
          class="w-200"
          style="border-radius: 20px"
        ></video>

        <div class="text-center">
          <div class="relative inline-block mx-4 my-6" style="background: #ffffff; border-radius: 20px; width: 400px">
            <img style="border-radius: 20px; width: 100%" src="@/assets/shu.png" alt="" />
            <p class="flex-1 w-full absolute">{{ pricing.demoLabels.verticalText }}</p>
          </div>
          <div class="relative inline-block mx-4 my-6" style="background: #ffffff; border-radius: 20px; width: 400px">
            <video
              controls
              src="@/assets/video/lunkuo.mov"
              :autoplay="true"
              :loop="true"
              style="border-radius: 20px; width: 100%"
            ></video>
            <p class="flex-1 w-full absolute">{{ pricing.demoLabels.outline }}</p>
          </div>
        </div>
        <p class="start-building-subtitle mt-10">{{ pricing.comingSoon }}</p>
        <div class="text-center">
          <div class="relative inline-block mx-4 my-6" style="background: #ffffff; border-radius: 20px; width: 400px">
            <video
              controls
              src="@/assets/video/br.mov"
              :autoplay="true"
              :loop="true"
              style="border-radius: 20px; width: 100%"
            ></video>
            <p class="flex-1 w-full absolute">{{ pricing.demoLabels.bracket }}</p>
          </div>
          <div class="relative inline-block mx-4 my-6" style="background: #ffffff; border-radius: 20px; width: 400px">
            <video
              controls
              src="@/assets/video/cir_.mp4"
              :autoplay="true"
              :loop="true"
              style="border-radius: 20px; width: 100%"
            ></video>
            <p class="flex-1 w-full absolute">{{ pricing.demoLabels.arcText }}</p>
          </div>
        </div>
        <div class="text-center">
          <div class="relative inline-block mx-4 my-6" style="background: #ffffff; border-radius: 20px; width: 400px">
            <video
              controls
              src="@/assets/video/cirshape.mov"
              :autoplay="true"
              :loop="true"
              style="border-radius: 20px; width: 100%"
            ></video>
            <p class="flex-1 w-full absolute">{{ pricing.demoLabels.circle }}</p>
          </div>
          <div class="relative inline-block mx-4 my-6" style="background: #ffffff; border-radius: 20px; width: 400px">
            <video
              controls
              src="@/assets/video/line.mov"
              :autoplay="true"
              :loop="true"
              style="border-radius: 20px; width: 100%"
            ></video>
            <p class="flex-1 w-full absolute">{{ pricing.demoLabels.linearCircle }}</p>
          </div>
        </div>
        <div class="text-center">
          <div class="relative inline-block mx-4 my-6" style="background: #ffffff; border-radius: 20px; width: 400px">
            <video
              controls
              src="@/assets/video/star.mov"
              :autoplay="true"
              :loop="true"
              style="border-radius: 20px; width: 100%"
            ></video>
            <p class="flex-1 w-full absolute">{{ pricing.demoLabels.star }}</p>
          </div>
          <div
            class="relative inline-block mx-4 my-6"
            style="background: #ffffff; border-radius: 20px; width: 400px"
          ></div>
        </div>
        <p class="start-building-subtitle mt-10">{{ pricing.playground }}</p>
        <p class="start-building-subtitle">{{ pricing.playgroundDesc }}</p>
        <router-link custom to="" class="start-building-button">
          <a href="https://stackblitz.com/~/github.com/chenyomi/leafer-htmltext-edit-view" target="_blank">
            {{ pricing.tryNow }}
          </a>
        </router-link>
      </div>
    </div>
  </section>
  <section class="start-building-section" id="price">
    <div class="start-building-container">
      <div class="pricing-cards">
        <ParticleCard
          v-for="plan in planCards"
          :key="plan.key"
          class="feature-card pricing-card"
          :class="{ 'pricing-card--featured': plan.featured }"
          :disable-animations="isMobile"
        >
          <h2>{{ plan.title }}</h2>
          <p class="pricing-label">{{ pricing.earlyBird }}</p>
          <GradientText
            :text="plan.price"
            :colors="['#ffaa40', '#9c40ff', '#ffaa40']"
            :animation-speed="8"
            :show-border="false"
            class="pricing-price"
          />
          <p class="pricing-label pricing-label-muted">{{ pricing.original }}</p>
          <GradientText
            :text="plan.originalPrice"
            :colors="['#ffaa40', '#9c40ff', '#ffaa40']"
            :animation-speed="8"
            :show-border="false"
            class="pricing-price pricing-original-price"
          />
          <p v-if="plan.badge" style="color: #3cff50; font-weight: 600">{{ plan.badge }}</p>
          <div class="pricing-features">
            <p v-for="feature in plan.features" :key="feature">{{ feature }}</p>
          </div>
          <ElectricBorder
            class="pricing-contact-border"
            :color="'#7df9ff'"
            :speed="1"
            :chaos="0.5"
            :thickness="2"
            :style="{ borderRadius: '16px', width: '150px', margin: '14px auto 0 auto' }"
          >
            <div class="py-3 contact-author-button" @click="showContactModal = true">
              <p :style="{ margin: '6px 0 0', color: '#b0f29e' }">{{ pricing.contactAuthor }}</p>
            </div>
          </ElectricBorder>
        </ParticleCard>
      </div>

      <div class="pricing-extras">
        <ParticleCard class="feature-card pricing-extra-card" :disable-animations="isMobile">
          <h2>{{ pricing.tipsTitle }}</h2>
          <div style="padding: 20px; border-radius: 20px">
            <p v-for="tip in pricing.tips" :key="tip" style="text-align: left">{{ tip }}</p>
          </div>
        </ParticleCard>
        <ParticleCard class="feature-card pricing-extra-card" :disable-animations="isMobile">
          <h2>{{ pricing.roiTitle }}</h2>

          <div style="padding: 20px; border-radius: 20px">
            <p class="mb-2" style="text-align: left; font-size: 20px">{{ pricing.roiSections.roi.title }}</p>
            <div class="pl-6">
              <p v-for="line in pricing.roiSections.roi.paragraphs" :key="line" style="text-align: left">{{ line }}</p>
            </div>

            <p class="mb-3 mt-4" style="text-align: left; font-size: 20px">{{ pricing.roiSections.cost.title }}</p>
            <div class="pl-6">
              <table style="border-collapse: collapse; border: 1px solid white; min-width: 100%">
                <thead>
                  <tr>
                    <th v-for="header in pricing.roiSections.cost.headers" :key="header">{{ header }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in pricing.roiSections.cost.rows" :key="index">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="roi-cell">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="mb-3 mt-4" style="text-align: left; font-size: 20px">{{ pricing.roiSections.value.title }}</p>
            <div class="pl-6">
              <p v-for="line in pricing.roiSections.value.paragraphs" :key="line" style="text-align: left">
                {{ line }}
              </p>
            </div>

            <p class="mb-3 mt-4" style="text-align: left; font-size: 20px">{{ pricing.roiSections.timeline.title }}</p>
            <div class="pl-6">
              <table style="border-collapse: collapse; border: 1px solid white; min-width: 100%">
                <thead>
                  <tr>
                    <th v-for="header in pricing.roiSections.timeline.headers" :key="header">{{ header }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in pricing.roiSections.timeline.rows" :key="index">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ParticleCard>
      </div>
    </div>

    <div v-if="showContactModal" class="contact-modal-overlay" @click.self="showContactModal = false">
      <div class="contact-modal">
        <button
          class="contact-modal-close"
          type="button"
          :aria-label="pricing.contactModalClose"
          @click="showContactModal = false"
        >
          ×
        </button>
        <h3>{{ pricing.contactModalTitle }}</h3>
        <p>{{ pricing.contactModalDesc }}</p>
        <img src="@/assets/qrcode.jpg" alt="WeChat QR code" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Squares from '@/content/Backgrounds/Squares/Squares.vue';
import '../FeatureCards/FeatureCards.css';
import './StartBuilding.css';
import GradientText from '@/content/TextAnimations/GradientText/GradientText.vue';
import ElectricBorder from '@/content/Animations/ElectricBorder/ElectricBorder.vue';
import posterSrc from '@/assets/video/video.png';
import { usePricing } from '@/i18n/pricing';

const pricing = usePricing();
const isMobile = ref(false);
const show = ref(false);
const showContactModal = ref(false);

const planCards = computed(() => [
  {
    key: 'personal',
    title: pricing.value.plans.personal.title,
    price: '¥99',
    originalPrice: '¥199',
    featured: false,
    badge: '',
    features: pricing.value.plans.personal.features
  },
  {
    key: 'pro',
    title: pricing.value.plans.pro.title,
    price: '¥399',
    originalPrice: '¥599',
    featured: true,
    badge: pricing.value.plans.pro.badge,
    features: pricing.value.plans.pro.features
  },
  {
    key: 'enterprise',
    title: pricing.value.plans.enterprise.title,
    price: '¥999',
    originalPrice: '¥1999',
    featured: false,
    badge: '',
    features: pricing.value.plans.enterprise.features
  }
]);

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkIsMobile();
  setTimeout(() => {
    show.value = true;
  }, 100);
  window.addEventListener('resize', checkIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile);
});
</script>
<style>
table {
  border-collapse: collapse;
  text-align: left;
}
th,
td {
  border: 1px solid white;
  padding: 5px;
  text-align: left;
}
td p {
  text-align: left !important;
}
.roi-cell {
  white-space: pre-line;
}
</style>
