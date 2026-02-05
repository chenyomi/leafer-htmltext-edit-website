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
        <p class="start-building-subtitle mt-4">基础付费版功能介绍</p>
        <video src="@/assets/video/video.mov" controls class="w-200" style="border-radius: 20px"></video>
        <p class="start-building-subtitle mt-10">高级进阶版（暂不开放）</p>
        <div class="flex w-200 gap-20 items-end">
          <div class="flex-1" style="background: #ffffff; border-radius: 20px">
            <img style="border-radius: 20px" src="@/assets/shu.png" alt="" />
          </div>
          <div class="flex-1" style="background: #ffffff; border-radius: 20px">
            <video
              controls
              src="@/assets/video/cir_.mp4"
              :autoplay="true"
              :loop="true"
              style="border-radius: 20px"
            ></video>
          </div>
        </div>
        <div class="flex w-200 gap-20">
          <p class="flex-1">竖排文字</p>
          <p class="flex-1">弧形文字</p>
        </div>
        <p class="start-building-subtitle mt-10">Playground</p>
        <p class="start-building-subtitle">基础付费版功能在线体验入口（不包含进阶高级版）</p>
        <router-link custom to="" class="start-building-button">
          <a href="https://stackblitz.com/~/github.com/chenyomi/leafer-htmltext-edit-view" target="_blank">
            Just Trying Now
          </a>
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
            text="早鸟价：¥298"
            :colors="['#ffaa40', '#9c40ff', '#ffaa40']"
            :animation-speed="8"
            :show-border="false"
            style="font-size: 40px; margin-bottom: 10px"
          />
          <GradientText
            text="原价：¥398"
            :colors="['#ffaa40', '#9c40ff', '#ffaa40']"
            :animation-speed="8"
            :show-border="false"
            style="font-size: 40px; margin-bottom: 10px; text-decoration: line-through"
          />
          <div style="padding: 20px; border-radius: 20px">
            <p>基础版本功能</p>
            <p>1个域名</p>
            <p>本地开发环境</p>
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
          <p>请备注来意</p>
          <div style="padding: 20px; border-radius: 20px; text-align: center">
            <img src="@/assets/qrcode.jpg" alt="" style="width: 200px; display: inline-block; border-radius: 10px" />
          </div>
        </ParticleCard>

        <ParticleCard class="feature-card card4" :disable-animations="isMobile">
          <h2>企业版</h2>
          <GradientText
            text="早鸟价：¥798"
            :colors="['#ffaa40', '#9c40ff', '#ffaa40']"
            :animation-speed="8"
            :show-border="false"
            style="font-size: 40px; margin-bottom: 10px"
          />
          <GradientText
            text="原价：¥899"
            :colors="['#ffaa40', '#9c40ff', '#ffaa40']"
            :animation-speed="8"
            :show-border="false"
            style="font-size: 40px; margin-bottom: 10px; text-decoration: line-through"
          />
          <div style="padding: 20px; border-radius: 20px">
            <p>基础版本功能</p>
            <p>3个域名</p>
            <p>本地开发环境</p>
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
          <div style="padding: 20px; border-radius: 20px">
            <p style="text-align: left">
              1、购买后可在开发环境使用，无需立即绑定域名（域名访问的除外），但仍需安装授权许可证书。
            </p>

            <p style="text-align: left">2、插件为一次性买断授权，下载的安装包可永久使用。也可以使用npm依赖包。</p>
            <p style="text-align: left">
              3、购买后可获得 1 年内免费升级（视版本而定），包括新功能、兼容性更新及 bug
              修复。免费期结束后，您可继续永久使用已安装版本，无任何功能限制。
            </p>
            <p style="text-align: left">
              4、一个授权仅限
              1个项目使用。如在多个项目中使用，请购买相应数量的授权，批量需求请联系作者。违规使用（未授权跨项目使用）可能触发授权锁定或限制，本人保留追究权利。
            </p>
            <p style="text-align: left">5、授权主域名后，其下所有二级域名和泛域名（*.example.com）自动获得同等授权。</p>
            <p style="text-align: left">
              6、安装包与源码包均内嵌了专属 license 水印标识，可用于追踪源用户身份，不可分发使用。
            </p>
            <p style="text-align: left">
              7、插件为数字商品，购买后即视为交付使用，暂不支持退款。请在购买前确认功能符合需求，如有疑问欢迎联系本人。
            </p>
            <p style="text-align: left">8、购买后享有专属微信交流群支持，企业版优先获得支持。</p>
          </div>
        </ParticleCard>
        <ParticleCard class="feature-card card5" :disable-animations="isMobile">
          <h2>Leafer HTMLText Edit - 投资回报分析</h2>

          <div style="padding: 20px; border-radius: 20px">
            <p class="mb-2" style="text-align: left; font-size: 20px">💰 投资回报 ROI</p>
            <div class="pl-6">
              <p style="text-align: left">
                要自己实现同级别的富文本编辑功能，需要熟悉 Canvas
                渲染、文本排版引擎、光标定位算法、字体测量机制，还得深入理解 Leafer UI 的渲染流程，可能要投入 2
                个月左右甚至更久的开发资源。
              </p>
              <p style="text-align: left">而我们封装好了所有成熟解法：</p>
              <p style="text-align: left">一次授权，立刻可用，长期稳定更新</p>
              <p style="text-align: left">买的是插件，省的是时间，赢的是体验</p>
            </div>
            <p class="mb-3 mt-4" style="text-align: left; font-size: 20px">📊 成本对比</p>
            <div class="pl-6">
              <table style="border-collapse: collapse; border: 1px solid white">
                <thead>
                  <tr>
                    <th>指标</th>
                    <th>自研成本</th>
                    <th>Leafer HTMLText Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>⏰ 开发时间</td>
                    <td>约2个月</td>
                    <td>✅ 即装即用</td>
                  </tr>
                  <tr>
                    <td>💵 人力成本</td>
                    <td>
                      <p>约10万</p>
                      <p>(1人 × 3万 × 2个月)</p>
                    </td>
                    <td>✅ 节省 99%</td>
                  </tr>
                  <tr>
                    <td>🔧 技术难度</td>
                    <td>
                      <p>高，需要深入理解：</p>
                      <p>Canvas 文本渲染</p>
                      <p>光标/选区算法</p>
                      <p>富文本数据结构</p>
                      <p>IME 输入法兼容</p>
                      <p>字体度量与排版</p>
                    </td>
                    <td>✅ 已完美封装</td>
                  </tr>
                  <tr>
                    <td>🛠️ 维护成本</td>
                    <td>
                      <p>高，需持续修复 Bug</p>
                      <p>跟进浏览器更新</p>
                    </td>
                    <td>✅ 定期更新迭代</td>
                  </tr>
                  <tr>
                    <td>🔌 兼容性/集成</td>
                    <td>
                      <p>需深度适配 Leafer UI</p>
                      <p>可能需要改动框架源码</p>
                    </td>
                    <td>
                      <p>✅ 零侵入设计</p>
                      <p>快速集成，10 分钟上手</p>
                    </td>
                  </tr>
                  <tr>
                    <td>🎯 适用场景</td>
                    <td>
                      <p>仅限特定项目</p>
                      <p>难以复用</p>
                    </td>
                    <td>
                      <p>✅ 场景广泛</p>
                      <p>适配各类编辑器需求</p>
                    </td>
                  </tr>
                  <tr>
                    <td>⚠️ 技术风险</td>
                    <td>
                      <p>高，易踩坑：</p>
                      <p>浏览器兼容性</p>
                      <p>性能优化难题</p>
                      <p>边界情况处理</p>
                    </td>
                    <td>✅ 风险极低</td>
                  </tr>
                  <tr>
                    <td>📈 ROI</td>
                    <td>
                      <p>投入高，周期长</p>
                      <p>机会成本巨大</p>
                    </td>
                    <td>
                      <p>✅ 超高性价比</p>
                      <p>节省大量开发时间与人力</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="mb-3 mt-4" style="text-align: left; font-size: 20px">🎯 核心价值</p>
            <div class="pl-6">
              <p style="text-align: left">技术门槛高</p>
              <p style="text-align: left">自研富文本编辑器需要掌握：</p>
              <p style="text-align: left">Canvas 文本渲染：字体度量、文本绘制、抗锯齿处理</p>
              <p style="text-align: left">光标与选区：位置计算、拖拽选择、键盘导航</p>
              <p style="text-align: left">富文本格式：HTML 解析、样式应用、嵌套结构</p>
              <p style="text-align: left">输入法支持：IME 事件处理、组合文本</p>
              <p style="text-align: left">性能优化：虚拟滚动、增量渲染、防抖节流</p>
            </div>
            <p class="mb-3 mt-4" style="text-align: left; font-size: 20px">开发周期长</p>
            <div class="pl-6">
              <table style="border-collapse: collapse; border: 1px solid white">
                <thead>
                  <tr>
                    <th>阶段</th>
                    <th>预计时间</th>
                    <th>主要工作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>需求分析</td>
                    <td>0.5 周</td>
                    <td>调研方案、技术选型</td>
                  </tr>
                  <tr>
                    <td>基础架构</td>
                    <td>1 周</td>
                    <td>Canvas 文本引擎、基础编辑</td>
                  </tr>
                  <tr>
                    <td>富文本支持</td>
                    <td>1.5 周</td>
                    <td>HTML 解析、样式系统</td>
                  </tr>
                  <tr>
                    <td>交互优化</td>
                    <td>2 周</td>
                    <td>光标、选区、快捷键</td>
                  </tr>
                  <tr>
                    <td>兼容性测试</td>
                    <td>1 周</td>
                    <td>浏览器兼容、Bug 修复</td>
                  </tr>
                  <tr>
                    <td>性能调优</td>
                    <td>1 周</td>
                    <td>渲染优化、内存管理</td>
                  </tr>
                  <tr>
                    <td>文档与测试</td>
                    <td>1 周</td>
                    <td>编写文档、单元测试</td>
                  </tr>
                  <tr>
                    <td>总计</td>
                    <td>8 周 ≈ 2 个月</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
</style>
