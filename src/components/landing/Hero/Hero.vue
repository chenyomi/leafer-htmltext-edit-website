<template>
  <div class="landing-content" id="home">
    <img
      :src="landingBlur"
      alt=""
      aria-hidden="true"
      class="landing-gradient-blur"
      draggable="false"
      :style="{ zIndex: 5 }"
    />

    <img
      :src="landingBlur"
      alt=""
      aria-hidden="true"
      class="landing-gradient-blur"
      draggable="false"
      :style="{ zIndex: 5 }"
    />

    <div class="hero-main-content">
      <router-link custom to="" class="hero-new-badge-container">
        <a href="https://www.leaferjs.com/" target="_blank">
          <span class="hero-new-badge">Plugins 🎁 for</span>
          <div class="hero-new-badge-text">
            <span>Leafer</span>
            <i class="pi-arrow-right pi" style="font-size: 0.8rem"></i>
          </div>
        </a>
      </router-link>

      <h1 class="landing-title">
        <ResponsiveSplitText
          :is-mobile="isMobile"
          text="Leafer-HtmlText-Edit"
          class-name="hero-split"
          split-type="chars"
          :delay="30"
          :duration="2"
          ease="elastic.out(0.5, 0.3)"
        />
        <br />
      </h1>

      <ResponsiveSplitText
        :is-mobile="isMobile"
        class-name="landing-subtitle"
        split-type="words"
        :delay="25"
        :duration="1"
        text="一个强大的 Leafer UI 富文本编辑器插件，集成 Quill 2.0，支持 HTML 文本编辑和丰富的文本样式控制。"
      />

      <router-link custom to="" class="landing-button">
        <a href="https://chenyomi.github.io/leafer-htmltext-edit-view/" target="_blank">
          <span>View Live Demo</span>
          <div class="button-arrow-circle">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 12L10 8L6 4"
                stroke="#0b0b0b"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </a>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import SplitText from '@/content/TextAnimations/SplitText/SplitText.vue';
import { defineComponent, h, onMounted, onUnmounted, ref } from 'vue';
import landingBlur from '../../../assets/common/landing-blur.svg';

const ResponsiveSplitText = defineComponent({
  props: {
    isMobile: { type: Boolean, required: true },
    text: { type: String, required: true },
    className: { type: String, default: '' },
    splitType: { type: String as () => 'chars' | 'words' | 'lines' | 'words, chars', default: 'chars' },
    delay: { type: Number, default: 100 },
    duration: { type: Number, default: 0.6 },
    ease: { type: String, default: 'power3.out' },
    from: { type: Object, default: () => ({ opacity: 0, y: 40 }) },
    to: { type: Object, default: () => ({ opacity: 1, y: 0 }) },
    threshold: { type: Number, default: 0.1 },
    rootMargin: { type: String, default: '-100px' },
    textAlign: { type: String as () => 'left' | 'center' | 'right' | 'justify', default: 'center' },
    onLetterAnimationComplete: { type: Function, default: undefined }
  },
  render() {
    if (this.isMobile) {
      return h('span', { class: this.className }, this.text);
    } else {
      return h(SplitText, {
        text: this.text,
        className: this.className,
        splitType: this.splitType,
        delay: this.delay,
        duration: this.duration,
        ease: this.ease,
        from: this.from,
        to: this.to,
        threshold: this.threshold,
        rootMargin: this.rootMargin,
        textAlign: this.textAlign,
        onLetterAnimationComplete: this.onLetterAnimationComplete as (() => void) | undefined
      });
    }
  }
});

const isMobile = ref(false);

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile);
});
</script>

<style scoped>
.placeholder-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
