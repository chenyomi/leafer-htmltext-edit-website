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
        <h4 class="start-building-title">Case</h4>
        <p class="start-building-subtitle">功能介绍</p>
        <video src="@/assets/video/video.mov" controls class="w-200" style="border-radius: 20px"></video>
        <router-link custom to="" class="start-building-button">
          <a href="https://chenyomi.github.io/leafer-htmltext-edit-view/" target="_blank">Just Trying Now</a>
        </router-link>
      </div>
    </div>
  </section>
  <section class="start-building-section" id="price">
    <div class="start-building-container">
      <div class="bento-grid" ref="gridRef">
        <ParticleCard class="feature-card card1" :disable-animations="isMobile">
          <h2>个人版</h2>
          <GradientText
            text="¥399.00"
            :colors="['#ffaa40', '#9c40ff', '#ffaa40']"
            :animation-speed="8"
            :show-border="false"
            style="font-size: 40px; margin-bottom: 10px"
          />
          <div style="padding: 20px; background: #111111; border-radius: 20px">
            <p>1个域名</p>
            <p>本地开发环境</p>
            <p>1位开发者</p>
            <p>支持离线永久授权</p>
            <p>提供编译包</p>
            <p>安装包永久授权</p>
            <p>一年内免费升级</p>
            <p>专属微信群</p>
          </div>
          <ElectricBorder
            :color="'#7df9ff'"
            :speed="1"
            :chaos="0.5"
            :thickness="2"
            :style="{ borderRadius: '16px', width: '150px', margin: '20px auto auto auto' }"
          >
            <div class="py-3">
              <p :style="{ margin: '6px 0 0', color: '#b0f29e' }">联系作者</p>
            </div>
          </ElectricBorder>
        </ParticleCard>

        <ParticleCard class="feature-card card2" :disable-animations="isMobile">
          <h2>定制版</h2>
          <GradientText
            text="联系作者"
            :colors="['#ffaa40', '#9c40ff', '#ffaa40']"
            :animation-speed="8"
            :show-border="false"
            style="font-size: 40px; margin-bottom: 10px"
          />
          <div style="padding: 20px; background: #111111; border-radius: 20px; text-align: center">
            <img src="@/assets/qrcode.jpg" alt="" style="width: 200px; display: inline-block; border-radius: 10px" />
          </div>
        </ParticleCard>

        <ParticleCard class="feature-card card4" :disable-animations="isMobile">
          <h2>企业版</h2>
          <GradientText
            text="¥899.00"
            :colors="['#ffaa40', '#9c40ff', '#ffaa40']"
            :animation-speed="8"
            :show-border="false"
            style="font-size: 40px; margin-bottom: 10px"
          />
          <div style="padding: 20px; background: #111111; border-radius: 20px">
            <p>3个域名</p>
            <p>本地开发环境</p>
            <p>支持10位开发者</p>
            <p>支持离线永久授权</p>
            <p>提供编译包</p>
            <p>安装包永久授权</p>
            <p>一年内免费升级</p>
            <p>专属微信群</p>
          </div>
          <ElectricBorder
            :color="'#7df9ff'"
            :speed="1"
            :chaos="0.5"
            :thickness="2"
            :style="{ borderRadius: '16px', width: '150px', margin: '20px auto auto auto' }"
          >
            <div class="py-3">
              <p :style="{ margin: '6px 0 0', color: '#b0f29e' }">联系作者</p>
            </div>
          </ElectricBorder>
        </ParticleCard>
        <ParticleCard class="feature-card card3" :disable-animations="isMobile">
          <h2>Tips</h2>
          <div style="padding: 20px; background: #111111; border-radius: 20px">
            <p style="text-align: left">
              购买后可在开发环境使用，无需立即绑定域名（域名访问的除外），但仍需安装授权许可证书。
            </p>
            <p style="text-align: left">
              授权项目的团队使用人数（查看文档、下载插件、下载证书），会按购买的版本限制，请根据实际开发者使用人数购买对应版本。
            </p>
            <p style="text-align: left">插件为一次性买断授权，下载的安装包可永久使用。也可以使用npm依赖包。</p>
            <p style="text-align: left">
              购买后可获得 1 年内免费升级（视版本而定），包括新功能、兼容性更新及 bug
              修复。免费期结束后，您可继续永久使用已安装版本，无任何功能限制。
            </p>
            <p style="text-align: left">
              一个授权仅限 1
              个项目使用。如在多个项目中使用，请购买相应数量的授权，批量需求请联系作者。违规使用（未授权跨项目使用）可能触发授权锁定或限制，本人保留追究权利。
            </p>
            <p style="text-align: left">授权主域名后，其下所有二级域名和泛域名（*.example.com）自动获得同等授权。</p>
            <p style="text-align: left">
              安装包与源码包均内嵌了专属 license 水印标识，可用于追踪源用户身份，不可你发。
            </p>
            <p style="text-align: left">
              插件为数字商品，购买后即视为交付使用，暂不支持退款。请在购买前确认功能符合需求，如有疑问欢迎联系本人。
            </p>
            <p style="text-align: left">购买后享有专属微信交流群支持，企业版优先获得支持。</p>
          </div>
        </ParticleCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import './StartBuilding.css';
import { ref, onMounted, onUnmounted } from 'vue';
import Squares from '@/content/Backgrounds/Squares/Squares.vue';
import '../FeatureCards/FeatureCards.css';
import GradientText from '@/content/TextAnimations/GradientText/GradientText.vue';
import ElectricBorder from '@/content/Animations/ElectricBorder/ElectricBorder.vue';
const isMobile = ref(false);
const show = ref(false);
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
