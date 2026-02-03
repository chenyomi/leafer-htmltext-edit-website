<template>
  <FadeContent :blur="true" :duration="600">
    <footer class="landing-footer">
      <div class="footer-content">
        <div class="footer-left">
          <ShinyText text="Leafer HtmlText Edit" :disabled="false" :speed="2" class-name="footer-logo" />
          <p class="footer-description">
            A plugins website created with
            <i class="pi pi-heart-fill footer-heart"></i>
            by
            <a href="https://davidhaz.com/" target="_blank" class="footer-creator-link">chenyomi</a>
          </p>
          <p class="footer-description">Built on top of the open-source project Vue Bits.</p>
          <p class="footer-copyright">© {{ new Date().getFullYear() }}</p>
        </div>

        <div class="footer-links">
          <a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub</a>

          <a href="https://www.npmjs.com/package/@chenyomi/leafer-htmltext-edit" target="_blank" class="footer-link">
            Docs
          </a>
          <a href="https://www.leaferjs.com/" target="_blank" class="footer-link">Leafer</a>
          <a href="https://quilljs.com/" target="_blank" class="footer-link">Quill</a>
        </div>
      </div>
    </footer>
  </FadeContent>
</template>

<script setup lang="ts">
import FadeContent from '@/content/Animations/FadeContent/FadeContent.vue';
import ShinyText from '@/content/TextAnimations/ShinyText/ShinyText.vue';
import './Footer.css';
</script>
