<template>
  <div class="docs-layout">
    <!-- 左侧导航栏 -->
    <aside class="docs-sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="sidebar-header">
        <span class="sidebar-pkg-name">@chenyomi/leafer-htmltext-edit</span>
        <a
          class="sidebar-npm-badge"
          href="https://www.npmjs.com/package/@chenyomi/leafer-htmltext-edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.shields.io/npm/v/@chenyomi/leafer-htmltext-edit.svg?style=flat-square"
            alt="npm version"
          />
        </a>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-group">
          <p class="nav-group-title">指南</p>
          <a
            v-for="item in guideItems"
            :key="item.id"
            :href="'#' + item.id"
            class="nav-item"
            :class="{ active: activeSection === item.id }"
            @click.prevent="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
        </div>

        <div class="nav-group">
          <p class="nav-group-title">API 参考</p>
          <a
            v-for="item in apiItems"
            :key="item.id"
            :href="'#' + item.id"
            class="nav-item"
            :class="{ active: activeSection === item.id }"
            @click.prevent="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
        </div>

        <div class="nav-group">
          <p class="nav-group-title">更多</p>
          <a
            v-for="item in moreItems"
            :key="item.id"
            :href="'#' + item.id"
            class="nav-item"
            :class="{ active: activeSection === item.id }"
            @click.prevent="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
        </div>
      </nav>
    </aside>

    <!-- 移动端遮罩 -->
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="isSidebarOpen = false" />

    <!-- 主内容区 -->
    <main class="docs-main" ref="mainRef">
      <!-- 移动端菜单按钮 -->
      <button class="mobile-menu-btn" @click="isSidebarOpen = !isSidebarOpen">
        <i class="pi pi-bars"></i>
        <span>文档导航</span>
      </button>

      <div class="docs-content">
        <!-- ─── 介绍 ─── -->
        <section :id="'introduction'" class="doc-section">
          <div class="section-anchor-wrap">
            <h1 class="doc-h1">
              Leafer HTMLText Editor
              <a :href="'#introduction'" class="anchor-link" @click.prevent="scrollTo('introduction')">#</a>
            </h1>
          </div>

          <div class="doc-badges">
            <a href="https://www.npmjs.com/package/@chenyomi/leafer-htmltext-edit" target="_blank">
              <img src="https://img.shields.io/npm/v/@chenyomi/leafer-htmltext-edit.svg" alt="npm version" />
            </a>
            <a href="https://www.npmjs.com/package/@chenyomi/leafer-htmltext-edit" target="_blank">
              <img src="https://img.shields.io/npm/dm/@chenyomi/leafer-htmltext-edit.svg" alt="npm downloads" />
            </a>
            <img src="https://img.shields.io/npm/l/@chenyomi/leafer-htmltext-edit.svg" alt="license" />
            <img src="https://img.shields.io/badge/TypeScript-Ready-blue.svg" alt="TypeScript" />
          </div>
          <div class="doc-npm-link">
            <a
              href="https://www.npmjs.com/package/@chenyomi/leafer-htmltext-edit"
              target="_blank"
              rel="noopener noreferrer"
              class="npm-link-btn"
            >
              <svg width="16" height="16" viewBox="0 0 780 250" fill="currentColor" aria-hidden="true">
                <path
                  d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"
                />
              </svg>
              在 npm 查看
              <i class="pi pi-arrow-up-right" style="font-size: 0.75rem"></i>
            </a>
          </div>

          <p class="doc-lead">
            一个强大的
            <strong>Leafer UI</strong>
            富文本编辑器插件，集成 Quill 2.0，支持完整的 HTML 文本编辑和丰富的文本样式控制。
          </p>

          <div class="doc-community-card">
            <div>
              <strong>接入遇到问题？</strong>
              <p>去社区反馈 Bug、提交功能建议，或者查看其他用户的讨论。</p>
            </div>
            <router-link to="/community">去社区讨论</router-link>
          </div>

          <div class="doc-feature-grid">
            <div class="doc-feature-card" v-for="f in features" :key="f.title">
              <span class="doc-feature-icon">{{ f.icon }}</span>
              <div>
                <strong>{{ f.title }}</strong>
                <p>{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ─── 安装 ─── -->
        <section :id="'installation'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              安装
              <a :href="'#installation'" class="anchor-link" @click.prevent="scrollTo('installation')">#</a>
            </h2>
          </div>

          <div class="callout callout-info">
            需要
            <strong>Node.js ≥ 16</strong>
            ，建议配合 Vite 或 Webpack 使用。
          </div>

          <p class="doc-p">通过包管理器安装：</p>

          <div class="code-tabs">
            <div class="code-tab-headers">
              <button
                v-for="pm in packageManagers"
                :key="pm"
                class="code-tab-btn"
                :class="{ active: activePackageManager === pm }"
                @click="activePackageManager = pm"
              >
                {{ pm }}
              </button>
            </div>
            <div class="code-block-wrap">
              <button class="copy-btn" @click="copyCode(installCommands[activePackageManager])">
                <i class="pi" :class="copiedKey === 'install' ? 'pi-check' : 'pi-copy'"></i>
              </button>
              <pre class="code-block"><code>{{ installCommands[activePackageManager] }}</code></pre>
            </div>
          </div>

          <h3 class="doc-h3">Peer Dependencies</h3>
          <p class="doc-p">请确保已安装以下同级依赖：</p>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(peerDepsInstall, 'peer')">
              <i class="pi" :class="copiedKey === 'peer' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ peerDepsInstall }}</code></pre>
          </div>
        </section>

        <!-- ─── 快速开始 ─── -->
        <section :id="'quick-start'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              快速开始
              <a :href="'#quick-start'" class="anchor-link" @click.prevent="scrollTo('quick-start')">#</a>
            </h2>
          </div>

          <h3 class="doc-h3" id="vite-config">Vite 项目配置</h3>
          <p class="doc-p">为确保插件正常工作，需在 Vite 配置中添加以下设置，避免多实例冲突：</p>
          <div class="code-block-wrap">
            <div class="code-lang-badge">vite.config.ts</div>
            <button class="copy-btn" @click="copyCode(viteConfig, 'vite')">
              <i class="pi" :class="copiedKey === 'vite' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ viteConfig }}</code></pre>
          </div>

          <h3 class="doc-h3" id="webpack-config">Webpack 项目配置</h3>
          <div class="code-block-wrap">
            <div class="code-lang-badge">webpack.config.js</div>
            <button class="copy-btn" @click="copyCode(webpackConfig, 'webpack')">
              <i class="pi" :class="copiedKey === 'webpack' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ webpackConfig }}</code></pre>
          </div>
        </section>

        <!-- ─── 基础用法 ─── -->
        <section :id="'basic-usage'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              基础用法
              <a :href="'#basic-usage'" class="anchor-link" @click.prevent="scrollTo('basic-usage')">#</a>
            </h2>
          </div>

          <h3 class="doc-h3" id="vue3-example">Vue 3 示例</h3>
          <div class="code-block-wrap">
            <div class="code-lang-badge">App.vue</div>
            <button class="copy-btn" @click="copyCode(vue3Example, 'vue3')">
              <i class="pi" :class="copiedKey === 'vue3' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ vue3Example }}</code></pre>
          </div>

          <div class="callout callout-warning">
            <strong>注意：</strong>
            <code>setLicense</code>
            必须在
            <code>htmlTextManage.init()</code>
            <strong>之前</strong>
            调用。本地开发环境无需授权即可使用，生产环境需要购买授权。
          </div>

          <h3 class="doc-h3">初始化自定义字体</h3>
          <p class="doc-p">
            如果创建节点时就需要使用自定义字体，可以同时传入
            <code>fontFamily</code>
            和
            <code>fontBase64</code>
            。插件会在初始 HTML 中注入
            <code>@font-face</code>
            ，节点回显和双击进入编辑态时都会继续使用同一字体。
          </p>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(initialFontExample, 'initial-font')">
              <i class="pi" :class="copiedKey === 'initial-font' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ initialFontExample }}</code></pre>
          </div>
        </section>

        <!-- ─── 数据保存与回显 ─── -->
        <section :id="'data-persistence'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              数据保存与回显
              <a :href="'#data-persistence'" class="anchor-link" @click.prevent="scrollTo('data-persistence')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            <code>HtmlText</code>
            本质上是一个注册到 Leafer 体系里的画布节点。推荐优先保存 Leafer JSON，这样节点位置、宽高、子节点、
            <code>data.textData</code>
            和编辑状态所需元数据都会一起保留。只有在业务系统已经把文字内容、字体资源、素材模板分开存储时，才建议使用下方的
            HTML 内容回显方案。
          </p>

          <h3 class="doc-h3">纯 Leafer 项目：保存整棵画布</h3>
          <p class="doc-p">
            如果页面里的图形、图片、文本都由 Leafer 管理，推荐直接把画布导出成 JSON 存储。下次进入页面时先创建
            <code>App</code>
            、初始化
            <code>htmlTextManage</code>
            ，再用
            <code>set</code>
            覆盖画布或用
            <code>add</code>
            追加 JSON 数据即可。
          </p>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(scenePersistenceExample, 'scene-persistence')">
              <i class="pi" :class="copiedKey === 'scene-persistence' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ scenePersistenceExample }}</code></pre>
          </div>

          <h3 class="doc-h3">混合业务项目：文本节点单独存储</h3>
          <p class="doc-p">
            如果画布只是页面的一部分，或者文本需要跟业务表单、素材库、模板系统分别加载，建议只保存每个
            <code>HtmlText</code>
            的 JSON。回显时每条文本数据都应该创建一个独立节点实例，再添加到画布；如果要更新已有节点，则找到节点后调用
            <code>set(textJson)</code>
            同步属性。
          </p>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(textPersistenceExample, 'text-persistence')">
              <i class="pi" :class="copiedKey === 'text-persistence' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ textPersistenceExample }}</code></pre>
          </div>

          <h3 class="doc-h3">特殊场景：只保存 HTML 内容</h3>
          <p class="doc-p">
            有些业务不会保存完整 Leafer JSON，而是只保存富文本内容
            HTML，同时把字体文件交给字体管理器维护。这种情况下，回显时需要把字体
            <code>@font-face</code>
            和内容 HTML 拼成一个完整的
            <code>text</code>
            字段传给
            <code>new HtmlText({ text })</code>
            。
            <code>text</code>
            是插件渲染和进入编辑态的 HTML 来源：前面的字体
            <code>style</code>
            负责让自定义字体可加载，后面的内容 HTML 负责保留字号、颜色、描边、宽高和对齐等内联样式。插件会自动从内容
            HTML 里反解
            <code>width</code>
            、
            <code>height</code>
            、
            <code>fontSize</code>
            、
            <code>fontFamily</code>
            、
            <code>textStroke</code>
            等编辑所需元数据。
          </p>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(htmlOnlyPersistenceExample, 'html-only-persistence')">
              <i class="pi" :class="copiedKey === 'html-only-persistence' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ htmlOnlyPersistenceExample }}</code></pre>
          </div>

          <div class="callout callout-warning">
            不建议保存 Quill 实例、DOM 或编辑器运行时状态。保存
            <code>HtmlText.toJSON()</code>
            或整棵 Leafer JSON 即可；回显前确保已导入
            <code>HtmlText</code>
            并完成
            <code>htmlTextManage.init(app)</code>
            ，这样双击编辑、选中、缩放等能力才能正常工作。特殊 HTML 回显方案只适合已有业务存储拆分的场景；若只保存 HTML
            内容，必须保留
            <code>&lt;p style="..."&gt;</code>
            、
            <code>&lt;span style="..."&gt;</code>
            等内联样式，并在使用自定义字体时补回对应
            <code>@font-face</code>
            。只剩纯文本时无法恢复字号、字体、描边、颜色、宽高和对齐等视觉效果。
          </div>
        </section>

        <!-- ─── 编辑原理与常见问题 ─── -->
        <section :id="'editing-guide'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              编辑原理与常见问题
              <a :href="'#editing-guide'" class="anchor-link" @click.prevent="scrollTo('editing-guide')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            很多「进不了编辑态」「Quill 没反应」「openInnerEditor 无效」的问题，并不是插件坏了，而是
            <strong>Leafer 编辑器</strong>
            和
            <strong>Quill 内嵌编辑器</strong>
            是两套机制，需要先理解它们的协作关系，再写自定义交互。
          </p>

          <h3 class="doc-h3" id="editing-layers">三层结构：画布节点、渲染层、编辑层</h3>
          <p class="doc-p">一个可编辑的富文本，在运行时其实同时存在三层：</p>
          <ol class="doc-ol">
            <li>
              <strong>
                外层
                <code>HtmlText</code>
                （Leafer Box）
              </strong>
              — 你在画布上创建、拖拽、缩放的对象。默认
              <code>editOuter: 'TextEditTool'</code>
              ，单击后进入「外框编辑态」。
            </li>
            <li>
              <strong>
                内层
                <code>HTMLText</code>
                （Leafer HTML 渲染）
              </strong>
              —
              <code>HtmlText</code>
              自动创建的子节点，负责把 HTML 画到画布上。它带有
              <code>editInner: 'TextEditor'</code>
              ，是进入 Quill 编辑时的真正目标。
            </li>
            <li>
              <strong>
                DOM 层
                <code>#textInnerEditor</code>
                （Quill 容器）
              </strong>
              — 插件在
              <code>document.body</code>
              上创建的固定定位 div，双击后显示，承载 Quill 输入。编辑结束会写回内层
              <code>HTMLText</code>
              的
              <code>text</code>
              字段。
            </li>
          </ol>

          <div class="callout callout-info">
            <strong>记忆口诀：</strong>
            画布上看的是
            <code>HtmlText</code>
            ，富文本内容存在
            <code>HTMLText.text</code>
            ，真正打字的是页面上的
            <code>#textInnerEditor</code>
            。
          </div>

          <h3 class="doc-h3" id="editing-interaction">默认交互：单击选中，双击编辑</h3>
          <p class="doc-p">插件内置的默认行为如下，和常见设计工具一致：</p>
          <ul class="doc-ul">
            <li>
              <strong>单击</strong>
              文本框 → Leafer Editor 选中
              <code>HtmlText</code>
              → 加载外框工具
              <code>TextEditTool</code>
              （可拖拽、缩放、旋转）
            </li>
            <li>
              <strong>双击</strong>
              已选中的文本框 →
              <code>TextEditTool</code>
              监听
              <code>PointerEvent.DOUBLE_TAP</code>
              → 调用
              <code>editor.openInnerEditor(htmlText, true)</code>
              → 打开
              <code>TextEditor</code>
              内嵌编辑器
            </li>
            <li>
              <strong>在内嵌编辑态点击画布空白处</strong>
              → 关闭内嵌编辑器，内容同步回画布
            </li>
          </ul>

          <h3 class="doc-h3" id="editing-naming">最容易混淆的三个名字</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>类型</th>
                  <th>含义</th>
                  <th>常见误用</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>TextEditTool</code></td>
                  <td>外框编辑工具</td>
                  <td>
                    <code>HtmlText.editOuter</code>
                    的默认值。负责选中框、缩放、旋转，监听双击事件。
                  </td>
                  <td>
                    把它当成内嵌编辑器名称传给
                    <code>openInnerEditor</code>
                  </td>
                </tr>
                <tr>
                  <td><code>TextEditor</code></td>
                  <td>内嵌编辑器</td>
                  <td>
                    <code>HTMLText.editInner</code>
                    的默认值。负责加载 Quill、同步样式、写回 HTML。
                  </td>
                  <td>
                    写成
                    <code>textInnerEditor</code>
                    或其他自定义字符串
                  </td>
                </tr>
                <tr>
                  <td><code>textInnerEditor</code></td>
                  <td>DOM 元素 id</td>
                  <td>
                    Quill 挂载的 div 容器，可用
                    <code>document.querySelector('#textInnerEditor')</code>
                    找到。
                  </td>
                  <td>
                    <strong>误传给</strong>
                    <code>openInnerEditor(node, 'textInnerEditor')</code>
                    — 这不会打开编辑器
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="callout callout-warning">
            <strong>重点：</strong>
            <code>textInnerEditor</code>
            是页面 DOM 的 id；
            <code>TextEditor</code>
            才是 Leafer 内嵌编辑器注册名。两者完全不同。
          </div>

          <h3 class="doc-h3" id="editing-open-inner">程序化打开内嵌编辑器</h3>
          <p class="doc-p">
            如果你想把「双击进入编辑」改成「单击进入编辑」，不要直接照抄网上片段里的
            <code>openInnerEditor(node, 'textInnerEditor', true)</code>
            。应按插件内部双击逻辑来写：
          </p>
          <div class="code-block-wrap">
            <div class="code-lang-badge">正确示例</div>
            <button class="copy-btn" @click="copyCode(openInnerEditorExample, 'open-inner-editor')">
              <i class="pi" :class="copiedKey === 'open-inner-editor' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ openInnerEditorExample }}</code></pre>
          </div>
          <p class="doc-p">上面这段和插件源码里的双击逻辑一致，关键点是：</p>
          <ul class="doc-ul">
            <li>
              操作对象是内层
              <code>HTMLText</code>
              ，不是外层
              <code>HtmlText</code>
            </li>
            <li>
              <code>openInnerEditor(htmlText, true)</code>
              的第二个参数是
              <code>boolean</code>
              ，表示「同时选中该目标」，不是编辑器名称
            </li>
            <li>
              若节点尚未处于外框编辑态，需先
              <code>app.editor.target = htmlTextBox</code>
              ，再打开内嵌编辑器
            </li>
            <li>
              <code>htmlTextManage.getQuill()</code>
              和
              <code>setSelection</code>
              应等内嵌编辑器打开后再调用
            </li>
          </ul>

          <h3 class="doc-h3" id="editing-quill">Quill 什么时候可用？</h3>
          <p class="doc-p">
            <code>htmlTextManage.init(app)</code>
            会创建全局唯一的 Quill 实例，但它只有在
            <code>TextEditor</code>
            内嵌编辑器
            <code>load()</code>
            之后，才真正进入可编辑状态：
          </p>
          <ul class="doc-ul">
            <li>
              <strong>仅选中、未双击</strong>
              → 可以调用
              <code>setHTMLText()</code>
              改样式，但看不到 Quill 光标
            </li>
            <li>
              <strong>已进入内嵌编辑态</strong>
              → 可以
              <code>getQuill()</code>
              、监听
              <code>text-change</code>
              、
              <code>setSelection()</code>
            </li>
            <li>
              <strong>关闭内嵌编辑器后</strong>
              → Quill 内容会写回
              <code>HTMLText.text</code>
              ，画布重新渲染
            </li>
          </ul>

          <h3 class="doc-h3" id="editing-faq">常见问题排查</h3>
          <div v-for="item in editingFaq" :key="item.q" class="faq-block">
            <h4 class="faq-q">{{ item.q }}</h4>
            <p class="doc-p">{{ item.a }}</p>
            <ul v-if="item.tips?.length" class="doc-ul">
              <li v-for="tip in item.tips" :key="tip">{{ tip }}</li>
            </ul>
          </div>
        </section>

        <!-- ─── API: HtmlText ─── -->
        <section :id="'api-htmltext'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              API · HtmlText
              <a :href="'#api-htmltext'" class="anchor-link" @click.prevent="scrollTo('api-htmltext')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            <code>HtmlText</code>
            继承自 Leafer UI 的
            <code>Box</code>
            ，是富文本节点的核心类。 通过
            <code>@registerUI()</code>
            注册到 Leafer 系统，可直接添加到画布。
          </p>

          <div class="code-block-wrap">
            <button
              class="copy-btn"
              @click="copyCode(`import { HtmlText } from '@chenyomi/leafer-htmltext-edit'`, 'import-ht')"
            >
              <i class="pi" :class="copiedKey === 'import-ht' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>import { HtmlText } from '@chenyomi/leafer-htmltext-edit'</code></pre>
          </div>

          <h3 class="doc-h3">
            构造参数
            <code>IHtmlTextInputData</code>
          </h3>
          <p class="doc-p">所有参数均为可选，以下为完整参数列表：</p>

          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>参数名</th>
                  <th>类型</th>
                  <th>必填</th>
                  <th>默认值</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in htmlTextParams" :key="p.name">
                  <td>
                    <code>{{ p.name }}</code>
                  </td>
                  <td>
                    <span class="type-badge">{{ p.type }}</span>
                  </td>
                  <td>
                    <span :class="p.required ? 'required-badge' : 'optional-badge'">
                      {{ p.required ? '必填' : '可选' }}
                    </span>
                  </td>
                  <td>
                    <code class="default-val">{{ p.default }}</code>
                  </td>
                  <td class="param-desc">{{ p.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3">示例</h3>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(htmlTextExample, 'ht-example')">
              <i class="pi" :class="copiedKey === 'ht-example' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ htmlTextExample }}</code></pre>
          </div>
        </section>

        <!-- ─── API: HtmlTextManage ─── -->
        <section :id="'api-manage'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              API · HtmlTextManage
              <a :href="'#api-manage'" class="anchor-link" @click.prevent="scrollTo('api-manage')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            <code>HtmlTextManage</code>
            是单例编辑器管理器，负责 Quill 实例的生命周期管理和批量编辑操作。
          </p>

          <div class="code-block-wrap">
            <button
              class="copy-btn"
              @click="copyCode(`import { htmlTextManage } from '@chenyomi/leafer-htmltext-edit'`, 'import-mgr')"
            >
              <i class="pi" :class="copiedKey === 'import-mgr' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>import { htmlTextManage } from '@chenyomi/leafer-htmltext-edit'</code></pre>
          </div>

          <div v-for="method in manageMethods" :key="method.name" class="method-block">
            <h3 class="method-name">
              <code>{{ method.signature }}</code>
              <a
                :href="'#manage-' + method.anchor"
                class="anchor-link small"
                @click.prevent="scrollTo('manage-' + method.anchor)"
              >
                #
              </a>
            </h3>
            <p class="doc-p">{{ method.desc }}</p>

            <div v-if="method.params && method.params.length" class="params-table-wrap">
              <table class="params-table">
                <thead>
                  <tr>
                    <th>参数名</th>
                    <th>类型</th>
                    <th>必填</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in method.params" :key="p.name">
                    <td>
                      <code>{{ p.name }}</code>
                    </td>
                    <td>
                      <span class="type-badge">{{ p.type }}</span>
                    </td>
                    <td>
                      <span :class="p.required ? 'required-badge' : 'optional-badge'">
                        {{ p.required ? '必填' : '可选' }}
                      </span>
                    </td>
                    <td class="param-desc">{{ p.desc }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="method.returns" class="returns-block">
              <span class="returns-label">返回值：</span>
              <span class="type-badge">{{ method.returns.type }}</span>
              <span class="returns-desc">{{ method.returns.desc }}</span>
            </div>

            <div class="code-block-wrap">
              <button class="copy-btn" @click="copyCode(method.example, 'method-' + method.anchor)">
                <i class="pi" :class="copiedKey === 'method-' + method.anchor ? 'pi-check' : 'pi-copy'"></i>
              </button>
              <pre class="code-block"><code>{{ method.example }}</code></pre>
            </div>
          </div>
        </section>

        <!-- ─── API: setHTMLText ─── -->
        <section :id="'api-sethtml'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              API · setHTMLText
              <a :href="'#api-sethtml'" class="anchor-link" @click.prevent="scrollTo('api-sethtml')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            <code>setHTMLText</code>
            是应用文本样式的核心函数。在编辑模式下对选区生效；
            非编辑模式下对整个节点生效；多选时批量应用到所有选中节点。
          </p>

          <div class="code-block-wrap">
            <button
              class="copy-btn"
              @click="copyCode(`import { setHTMLText } from '@chenyomi/leafer-htmltext-edit'`, 'import-set')"
            >
              <i class="pi" :class="copiedKey === 'import-set' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>import { setHTMLText } from '@chenyomi/leafer-htmltext-edit'</code></pre>
          </div>

          <h3 class="doc-h3">函数签名</h3>
          <div class="code-block-wrap">
            <pre class="code-block"><code>setHTMLText(key: string, value?: any, base64font?: string): void</code></pre>
          </div>

          <h3 class="doc-h3">参数说明</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>参数名</th>
                  <th>类型</th>
                  <th>必填</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>key</code></td>
                  <td><span class="type-badge">string</span></td>
                  <td><span class="required-badge">必填</span></td>
                  <td class="param-desc">样式键名，见下方 key 列表</td>
                </tr>
                <tr>
                  <td><code>value</code></td>
                  <td><span class="type-badge">any</span></td>
                  <td><span class="optional-badge">可选</span></td>
                  <td class="param-desc">样式值，不同 key 接受不同类型的值</td>
                </tr>
                <tr>
                  <td><code>base64font</code></td>
                  <td><span class="type-badge">string</span></td>
                  <td><span class="optional-badge">可选</span></td>
                  <td class="param-desc">
                    仅 key 为 "font" 时使用，传入 Base64 格式的字体数据（data:font/woff2;base64,...）
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3">支持的 key 列表</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>key</th>
                  <th>value 类型 / 可选值</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="k in setHtmlTextKeys" :key="k.key">
                  <td>
                    <code>{{ k.key }}</code>
                  </td>
                  <td>
                    <span class="type-badge">{{ k.valueType }}</span>
                  </td>
                  <td class="param-desc">{{ k.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3">示例</h3>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(setHtmlTextExample, 'sethtml-ex')">
              <i class="pi" :class="copiedKey === 'sethtml-ex' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ setHtmlTextExample }}</code></pre>
          </div>
        </section>

        <!-- ─── API: 实验功能 ─── -->
        <section :id="'api-experimental'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              API · 实验功能
              <a :href="'#api-experimental'" class="anchor-link" @click.prevent="scrollTo('api-experimental')">#</a>
            </h2>
          </div>

          <div class="callout callout-warning">
            实验功能默认关闭，需要显式开启后才会生效。未开启时不会影响原有
            <code>fontSize</code>
            全局字号、弧形文字、锁定比例缩放等稳定功能。
          </div>

          <h3 class="doc-h3">局部字号 inlineFontSize</h3>
          <p class="doc-p">
            <code>inlineFontSize</code>
            用于在内嵌编辑状态下给选中的文字设置局部字号。它不会替代
            <code>fontSize</code>
            ：
            <code>fontSize</code>
            仍然表示整个文本对象的全局字号，
            <code>inlineFontSize</code>
            只作为富文本 HTML 中的局部
            <code>span style="font-size: ..."</code>
            保存。
          </p>

          <h3 class="doc-h3">开启方式</h3>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(inlineFontSizeEnableExample, 'inline-size-enable')">
              <i class="pi" :class="copiedKey === 'inline-size-enable' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ inlineFontSizeEnableExample }}</code></pre>
          </div>

          <h3 class="doc-h3">使用方式</h3>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(inlineFontSizeUsageExample, 'inline-size-usage')">
              <i class="pi" :class="copiedKey === 'inline-size-usage' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ inlineFontSizeUsageExample }}</code></pre>
          </div>

          <h3 class="doc-h3">功能边界</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>功能</th>
                  <th>多字号文本下的行为</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in inlineFontSizeLimits" :key="item.name">
                  <td>
                    <code>{{ item.name }}</code>
                  </td>
                  <td class="param-desc">{{ item.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="callout callout-info">
            插件自身保存或导出的 HTML 会保留局部字号并支持再次恢复。第三方网页或其他编辑器复制来的复杂 HTML
            会尽量兼容，但不保证所有样式结构都能完整还原。
          </div>
        </section>

        <!-- ─── API: 授权管理 ─── -->
        <section :id="'api-license'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              API · 授权管理
              <a :href="'#api-license'" class="anchor-link" @click.prevent="scrollTo('api-license')">#</a>
            </h2>
          </div>

          <div class="callout callout-info">
            本地开发环境（
            <code>localhost</code>
            ）不受授权限制，可自由使用全部功能。 部署到生产域名时需购买授权密钥。
          </div>

          <div v-for="fn in licenseFns" :key="fn.name" class="method-block">
            <h3 class="method-name">
              <code>{{ fn.signature }}</code>
              <a
                :href="'#license-' + fn.anchor"
                class="anchor-link small"
                @click.prevent="scrollTo('license-' + fn.anchor)"
              >
                #
              </a>
            </h3>
            <p class="doc-p">{{ fn.desc }}</p>

            <div v-if="fn.params && fn.params.length" class="params-table-wrap">
              <table class="params-table">
                <thead>
                  <tr>
                    <th>参数名</th>
                    <th>类型</th>
                    <th>必填</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in fn.params" :key="p.name">
                    <td>
                      <code>{{ p.name }}</code>
                    </td>
                    <td>
                      <span class="type-badge">{{ p.type }}</span>
                    </td>
                    <td>
                      <span :class="p.required ? 'required-badge' : 'optional-badge'">
                        {{ p.required ? '必填' : '可选' }}
                      </span>
                    </td>
                    <td class="param-desc">{{ p.desc }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="fn.returns" class="returns-block">
              <span class="returns-label">返回值：</span>
              <span class="type-badge">{{ fn.returns.type }}</span>
              <span class="returns-desc">{{ fn.returns.desc }}</span>
            </div>

            <div class="code-block-wrap">
              <button class="copy-btn" @click="copyCode(fn.example, 'fn-' + fn.anchor)">
                <i class="pi" :class="copiedKey === 'fn-' + fn.anchor ? 'pi-check' : 'pi-copy'"></i>
              </button>
              <pre class="code-block"><code>{{ fn.example }}</code></pre>
            </div>
          </div>
        </section>

        <!-- ─── 更新日志 ─── -->
        <section :id="'changelog'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              更新日志
              <a :href="'#changelog'" class="anchor-link" @click.prevent="scrollTo('changelog')">#</a>
            </h2>
          </div>

          <div v-for="entry in changelog" :key="entry.version" class="changelog-entry">
            <div class="changelog-header">
              <span class="changelog-version">v{{ entry.version }}</span>
              <span class="changelog-date">{{ entry.date }}</span>
              <span v-if="entry.tag" :class="'changelog-tag tag-' + entry.tag">{{ entry.tag }}</span>
            </div>
            <ul class="changelog-list">
              <li v-for="item in entry.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </section>

        <!-- ─── 底部链接 ─── -->
        <section class="doc-footer-links">
          <a
            href="https://www.npmjs.com/package/@chenyomi/leafer-htmltext-edit"
            target="_blank"
            class="footer-link-card"
          >
            <i class="pi pi-box"></i>
            <div>
              <strong>npm 包</strong>
              <span>@chenyomi/leafer-htmltext-edit</span>
            </div>
            <i class="pi pi-arrow-up-right"></i>
          </a>
          <a href="https://github.com/chenyomi/leafer-htmltext-edit" target="_blank" class="footer-link-card">
            <i class="pi pi-github"></i>
            <div>
              <strong>GitHub 仓库</strong>
              <span>chenyomi/leafer-htmltext-edit</span>
            </div>
            <i class="pi pi-arrow-up-right"></i>
          </a>
          <a href="https://github.com/chenyomi/leafer-htmltext-edit-view" target="_blank" class="footer-link-card">
            <i class="pi pi-play-circle"></i>
            <div>
              <strong>在线演示</strong>
              <span>leafer-htmltext-edit-view</span>
            </div>
            <i class="pi pi-arrow-up-right"></i>
          </a>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// ─── Sidebar nav items ───────────────────────────────────────────────────────
const guideItems = [
  { id: 'introduction', label: '介绍' },
  { id: 'installation', label: '安装' },
  { id: 'quick-start', label: '快速开始' },
  { id: 'basic-usage', label: '基础用法' },
  { id: 'data-persistence', label: '数据保存与回显' },
  { id: 'editing-guide', label: '编辑原理与常见问题' }
];

const apiItems = [
  { id: 'api-htmltext', label: 'HtmlText' },
  { id: 'api-manage', label: 'HtmlTextManage' },
  { id: 'api-sethtml', label: 'setHTMLText' },
  { id: 'api-experimental', label: '实验功能' },
  { id: 'api-license', label: '授权管理' }
];

const moreItems = [{ id: 'changelog', label: '更新日志' }];

// ─── Features ────────────────────────────────────────────────────────────────
const features = [
  { icon: '🎨', title: '富文本编辑', desc: '基于 Quill 2.0，支持完整的富文本编辑功能，双击节点即可进入内联编辑' },
  { icon: '📐', title: '文本样式', desc: '字体、大小、颜色、对齐、行高、字间距、阴影、描边等全面控制' },
  { icon: '📝', title: '格式化工具', desc: '加粗、斜体、下划线、删除线、上下标、大小写转换' },
  { icon: '📋', title: '列表支持', desc: '有序列表、无序列表' },
  { icon: '🔤', title: '自定义字体', desc: '支持传入 Base64 字体文件，实时切换字体族' },
  { icon: '🎡', title: '弧形文字', desc: '基于 SVG TextPath 将文字沿弧形路径排列' },
  { icon: '🔍', title: '画布缩放', desc: '内置 zoom API：放大 / 缩小 / 适合屏幕 / 1:1' },
  { icon: '🔒', title: '锁定比例', desc: '选中元素后启用，拖拽缩放时保持宽高比不变' },
  { icon: '🔄', title: '旋转 & 缩放', desc: '通过 rotation / scaleX / scaleY 属性控制元素变换' },
  { icon: '🎯', title: '完美集成', desc: '无缝集成到 Leafer UI 生态系统，支持多选批量编辑' },
  { icon: '🔐', title: '授权管理', desc: '内置授权系统，本地开发不限制，生产环境需授权' },
  { icon: '🔧', title: 'TypeScript', desc: '完整的类型定义支持，ESM + CJS 双格式构建' }
];

// ─── Package install commands ─────────────────────────────────────────────────
const packageManagers = ['npm', 'pnpm', 'yarn'] as const;
type PM = (typeof packageManagers)[number];
const activePackageManager = ref<PM>('npm');
const installCommands: Record<PM, string> = {
  npm: 'npm install @chenyomi/leafer-htmltext-edit',
  pnpm: 'pnpm add @chenyomi/leafer-htmltext-edit',
  yarn: 'yarn add @chenyomi/leafer-htmltext-edit'
};
const peerDepsInstall = `npm install leafer-ui @leafer-ui/core @leafer-in/editor @leafer-in/html quill`;

// ─── Code snippets ────────────────────────────────────────────────────────────
const viteConfig = `// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    // 确保使用项目的依赖实例，避免多实例冲突
    dedupe: [
      '@leafer-ui/core',
      '@leafer-in/editor',
      '@leafer-in/html',
      'leafer-ui',
      'quill',
    ],
  },
  optimizeDeps: {
    // 排除插件的预构建
    exclude: ['@chenyomi/leafer-htmltext-edit'],
  },
})`;

const webpackConfig = `// webpack.config.js
module.exports = {
  resolve: {
    // 确保使用单一实例，避免多实例冲突
    alias: {
      quill: require.resolve('quill'),
      '@leafer-ui/core': require.resolve('@leafer-ui/core'),
      '@leafer-in/editor': require.resolve('@leafer-in/editor'),
      '@leafer-in/html': require.resolve('@leafer-in/html'),
      'leafer-ui': require.resolve('leafer-ui'),
    },
  },
}`;

const vue3Example = `<template>
  <div id="leafer-view" style="width: 100vw; height: 100vh;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { App } from 'leafer-ui'
import 'leafer-editor'
import {
  htmlTextManage,
  setLicense,
  HtmlText,
} from '@chenyomi/leafer-htmltext-edit'

onMounted(async () => {
  // 1. 设置 License（必须在 init 之前调用）
  await setLicense('your-license-key')

  // 2. 创建 Leafer App
  const app = new App({
    view: 'leafer-view',
    fill: '#ffffff',
    editor: {},
  })

  // 3. 初始化编辑器管理器
  await htmlTextManage.init(app)

  // 4. 创建富文本节点并添加到画布
  const text = new HtmlText({
    x: 100,
    y: 100,
    fontSize: 24,
    fontFamily: '"Dancing Script", cursive',
    fontBase64: 'data:font/woff2;charset=utf-8;base64,...',
    lineHeight: 1.5,
    padding: [12, 16],
    content: '双击此处编辑文本',
    color: '#e74c3c',
    editable: true,
    draggable: true,
  })

  app.tree.add(text)
})
<\/script>`;

const initialFontExample = `const fontFamily = '"Dancing Script", cursive'
const fontBase64 = 'data:font/woff2;charset=utf-8;base64,...'

const text = new HtmlText({
  x: 100,
  y: 100,
  content: '初始化时加载自定义字体',
  fontFamily,
  fontBase64,
  fontSize: 32,
  editable: true,
  draggable: true,
})

app.tree.add(text)`;

// ─── HtmlText constructor params ──────────────────────────────────────────────
const htmlTextParams = [
  { name: 'x', type: 'number', required: false, default: '0', desc: '节点在画布上的 X 轴坐标（像素）' },
  { name: 'y', type: 'number', required: false, default: '0', desc: '节点在画布上的 Y 轴坐标（像素）' },
  {
    name: 'width',
    type: 'number',
    required: false,
    default: 'auto',
    desc: '节点宽度（像素）。设置后进入固定宽度模式，文字超出宽度时自动换行'
  },
  { name: 'height', type: 'number', required: false, default: 'auto', desc: '节点高度（像素）' },
  {
    name: 'content',
    type: 'string',
    required: false,
    default: '—',
    desc: '纯文本或简单 HTML 标签（如 <strong>text</strong>），插件会自动套用字体样式生成完整 HTML。与 text 同时传入时，text 优先'
  },
  {
    name: 'text',
    type: 'string',
    required: false,
    default: '—',
    desc: '完整 HTML 字符串，直接用作文本内容，优先级高于 content。传入时会自动从 HTML 反解 width / height / fontSize / fontFamily / textStroke / padding 等元数据，兼容字体 style + 内容 HTML 回显'
  },
  { name: 'fontSize', type: 'number', required: false, default: '16', desc: '字体大小（像素）' },
  {
    name: 'fontFamily',
    type: 'string',
    required: false,
    default: '—',
    desc: '字体族名称，例如 "Arial"、"PingFang SC"。与 fontBase64 一起传入时会初始化自定义字体'
  },
  {
    name: 'fontBase64',
    type: 'string',
    required: false,
    default: '—',
    desc: '自定义字体的 Base64 / data URL（如 data:font/woff2;base64,...）。需配合 fontFamily 使用，插件会自动注入 @font-face'
  },
  {
    name: 'fontWeight',
    type: 'number | string',
    required: false,
    default: '—',
    desc: '字重，支持数值（100–900）或关键字（"bold"、"normal"）'
  },
  {
    name: 'italic',
    type: 'boolean',
    required: false,
    default: 'false',
    desc: '是否全局斜体。设为 true 时，初始内容会以 <em> 包裹，并保留斜体字符外溢宽度'
  },
  {
    name: 'lineHeight',
    type: 'number',
    required: false,
    default: '1.5',
    desc: '行高倍数，相对于 fontSize。例如 1.5 表示 1.5 倍行高'
  },
  { name: 'letterSpacing', type: 'number', required: false, default: '0', desc: '字间距（像素）' },
  {
    name: 'padding',
    type: 'number | string | number[]',
    required: false,
    default: '0',
    desc: '文本内边距，支持单个数字、CSS 字符串（如 "12px 16px"）或数组。数组顺序按 CSS 规则解析：[top]、[top, right]、[top, right, bottom]、[top, right, bottom, left]'
  },
  {
    name: 'textShadow',
    type: 'string',
    required: false,
    default: '—',
    desc: 'CSS text-shadow 格式的文字阴影，例如 "2px 2px 4px #000000"'
  },
  {
    name: 'alignContent',
    type: "'start' | 'center' | 'end'",
    required: false,
    default: "'start'",
    desc: '文本垂直对齐方式：顶部对齐 / 居中对齐 / 底部对齐'
  },
  {
    name: 'editable',
    type: 'boolean',
    required: false,
    default: 'true',
    desc: '是否可编辑，设为 true 后双击节点可进入富文本编辑模式'
  },
  { name: 'draggable', type: 'boolean', required: false, default: 'true', desc: '是否可拖拽移动' },
  { name: 'fill', type: 'string', required: false, default: '—', desc: '节点背景色，支持颜色值或渐变' },
  {
    name: 'color',
    type: 'string',
    required: false,
    default: '—',
    desc: '初始文字颜色，CSS color 格式（如 "#e74c3c"、"rgba(0,0,0,0.5)"）。会以字符级 color 格式写入 Quill，同时作为编辑时的光标颜色'
  },
  { name: 'opacity', type: 'number', required: false, default: '1', desc: '不透明度，范围 0–1' }
];

const htmlTextExample = `const text = new HtmlText({
  x: 200,
  y: 150,
  width: 400,           // 固定宽度，超出自动换行
  fontSize: 20,
  fontFamily: 'PingFang SC',
  fontBase64: undefined, // 自定义字体可传 data:font/woff2;base64,...
  fontWeight: 600,
  italic: true,
  lineHeight: 1.8,
  letterSpacing: 1,
  padding: [12, 16],     // 文本内边距，支持 number / CSS 字符串 / 数组
  content: 'Hello World!',
  textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
  alignContent: 'start',
  editable: true,
  draggable: true,
  color: '#2c3e50',
  textStroke: '3px #000'
})
app.tree.add(text)`;

const scenePersistenceExample = `import { App } from 'leafer-ui'
import { htmlTextManage } from '@chenyomi/leafer-htmltext-edit'

// 保存：纯 Leafer 项目建议保存整棵画布
const sceneJson = app.tree.toJSON()
await api.saveDocument({
  id: documentId,
  scene: sceneJson,
})

// 回显：先创建 App 并初始化编辑器能力
const restoredApp = new App({
  view: 'leafer-view',
  fill: '#ffffff',
  editor: {},
})
await htmlTextManage.init(restoredApp)

const { scene } = await api.getDocument(documentId)

// 覆盖当前画布，适合打开一个完整设计稿
restoredApp.tree.set(scene)

// 如果是模板、素材等追加场景，也可以按需 add JSON
// scene.children?.forEach((child) => restoredApp.tree.add(child))`;

const textPersistenceExample = `import { HtmlText } from '@chenyomi/leafer-htmltext-edit'

// 保存：只保存文本节点自己的 JSON
const textJson = htmlText.toJSON()
await api.saveTextElement({
  id: htmlText.id,
  data: textJson,
})

// 回显：每条文本数据创建一个独立实例
const savedTexts = await api.getTextElements(documentId)
savedTexts.forEach((item) => {
  const text = new HtmlText(item.data)
  app.tree.add(text)
})

// 更新已有文本：找到节点后直接同步 JSON
const existingText = app.findId(textId)
existingText?.set(nextTextJson)

// 如果保存的是 Leafer 原始 JSON，且 HtmlText 已注册，也可以直接 add
// app.tree.add(textJson)`;

const htmlOnlyPersistenceExample = `import { HtmlText } from '@chenyomi/leafer-htmltext-edit'

// 推荐优先保存 Leafer JSON。只有业务已经拆分存储时，才使用这种方式：
// 1. contentHtml：保存内容 HTML，必须保留 <p style="..."> / <span style="...">
// 2. fontStyle：回显时由字体管理器按 font-family 拼回 @font-face
const contentHtml = '<div style="width:980px;height:294px;display:flex;flex-direction:column;justify-content:flex-start;"><p class="ql-align-center" style="font-size:70px;line-height:1.5;font-family:YouSheBiaoTiHei-2;"><span style="-webkit-text-stroke:6px rgb(0,66,104);color:rgb(253,225,5);font-family:YouSheBiaoTiHei-2;">上海最新人事！</span></p></div>'

// text 是 HtmlText 的完整 HTML 输入：
// - fontStyle 负责加载自定义字体
// - contentHtml 负责保留字号、颜色、描边、宽高和对齐等样式
const fontStyle = '<style>@font-face{font-family:\\'YouSheBiaoTiHei-2\\';src:url(data:font/woff2;base64,...) format(\\'woff2\\');}</style>'
const text = new HtmlText({
  x: 100,
  y: 100,
  editable: true,
  draggable: true,
  text: fontStyle + contentHtml,
})

app.tree.add(text)

// 注意：
// 1. 不要把 contentHtml strip 成纯文字，否则无法恢复样式。
// 2. 使用自定义字体时必须补回对应 @font-face，否则会回退到系统字体。
// 3. 传入 text 后插件会自动解析 width/height/fontSize/fontFamily/textStroke。
// 4. 显式传入的 width/fontSize/alignContent 等参数优先级更高。`;

const openInnerEditorExample = `import { PointerEvent } from 'leafer-ui'
import { HtmlText, htmlTextManage } from '@chenyomi/leafer-htmltext-edit'

const text = new HtmlText({
  x: 200,
  y: 150,
  editable: true,
  draggable: true,
  content: 'Hello World!',
})

// 单击进入编辑：逻辑与插件内置双击一致
text.on(PointerEvent.TAP, () => {
  const htmlText = text.findOne('HTMLText')
  if (!htmlText || text.parent?.locked) return

  // 1. 先选中外层 HtmlText，加载 TextEditTool
  app.editor.target = text

  // 2. 再对内层 HTMLText 打开内嵌编辑器（第二个参数 true = 选中目标）
  setTimeout(() => {
    app.editor.openInnerEditor(htmlText, true)

    // 3. 内嵌编辑器 load 后再操作 Quill
    requestAnimationFrame(() => {
      htmlTextManage.getQuill()?.setSelection(0, 5)
    })
  }, 0)
})

frame.add(text)`;

const editingFaq = [
  {
    q: '调用了 openInnerEditor，但没有进入编辑态？',
    a: '最常见原因是传错了第二个参数，或目标节点不对。',
    tips: [
      '不要写 openInnerEditor(node, "textInnerEditor") — textInnerEditor 只是 DOM id，不是编辑器名',
      '插件双击实际调用的是 openInnerEditor(htmlTextChild, true)，目标是内层 HTMLText',
      '若节点还没被选中，先执行 app.editor.target = htmlTextBox，再打开内嵌编辑器',
      '需要显式指定名称时，应使用 "TextEditor"，不是 "textInnerEditor"'
    ]
  },
  {
    q: 'getQuill() 返回 null，或 setSelection 没效果？',
    a: 'Quill 只有在授权通过且内嵌编辑器已打开后才处于可编辑状态。',
    tips: [
      '确认 setLicense 成功，且 htmlTextManage.init(app) 已完成',
      '不要在外框选中态直接 setSelection，应等 TextEditor load 完成',
      'setSelection 建议放在 requestAnimationFrame 或 setTimeout 中，避免被内嵌编辑器初始化覆盖'
    ]
  },
  {
    q: 'setHTMLText 改了样式，但画布没变化？',
    a: 'setHTMLText 作用于当前选中节点；部分格式需要选区或内嵌编辑态才生效。',
    tips: [
      '先选中 HtmlText，再调用 setHTMLText',
      'bold / italic / color 等字符级格式，通常需要在内嵌编辑态选中文字',
      'fontSize / lineHeight / alignContent 等块级属性，选中节点后即可修改'
    ]
  },
  {
    q: '双击能编辑，但我写的单击监听不行？',
    a: '插件的双击监听挂在 TextEditTool 上，前提是外框编辑工具已经加载。',
    tips: [
      'PointerEvent.DOWN 触发太早，常在选中完成前就执行了 openInnerEditor',
      '推荐用 PointerEvent.TAP，并先设置 app.editor.target',
      '不要只监听外层 HtmlText 就期望自动进入 Quill，需要补齐「选中 → 打开内嵌编辑器」这两步'
    ]
  },
  {
    q: '编辑后内容丢失，或样式和画布不一致？',
    a: '画布显示的是 HTMLText.text，不是 Quill DOM 本身。',
    tips: [
      '关闭内嵌编辑器时，插件会把 Quill 内容写回 HTMLText.text 并重新渲染',
      '保存时请用 HtmlText.toJSON() 或整棵 Leafer JSON，不要只保存 Quill 实例',
      '若只用 HTML 回显，需保留 <p style> / <span style> 等内联样式和 @font-face'
    ]
  }
];

// ─── HtmlTextManage methods ───────────────────────────────────────────────────
const manageMethods = [
  {
    name: 'init',
    anchor: 'init',
    signature: 'htmlTextManage.init(app): Promise<Quill>',
    desc: '初始化 Quill 编辑器并绑定到指定的 Leafer App 实例。通常在创建 App 后立即调用，且仅需调用一次。',
    params: [{ name: 'app', type: 'App', required: true, desc: 'Leafer App 实例（通过 new App() 创建）' }],
    returns: { type: 'Promise<Quill>', desc: '返回初始化完成的 Quill 编辑器实例' },
    example: `import { App } from 'leafer-ui'
import { htmlTextManage } from '@chenyomi/leafer-htmltext-edit'

const app = new App({ view: 'leafer-view', editor: {} })
await htmlTextManage.init(app)`
  },
  {
    name: 'getQuill',
    anchor: 'get-quill',
    signature: 'htmlTextManage.getQuill(): Quill | null',
    desc: '获取全局 Quill 实例，可调用 Quill 原生 API（如 getContents、setSelection）。未授权时返回 null；字符级操作通常需在内嵌编辑态（TextEditor 已打开）后执行，详见「编辑原理与常见问题」。',
    params: [],
    returns: { type: 'Quill | null', desc: '已初始化的 Quill 实例，授权失败时返回 null' },
    example: `const quill = htmlTextManage.getQuill()
if (quill) {
  // 全选文本
  quill.setSelection(0, quill.getLength())
  // 获取当前内容 Delta
  const delta = quill.getContents()
}`
  },
  {
    name: 'getCanvas',
    anchor: 'get-canvas',
    signature: 'htmlTextManage.getCanvas(): App | null',
    desc: '获取绑定的 Leafer App 实例。未授权时返回 null。返回的 App 包含 editor（选中控制）和 zoom 方法，可用于画布缩放、批量选中等操作。',
    params: [],
    returns: { type: 'App | null', desc: '已绑定的 Leafer App 实例' },
    example: `const canvas = htmlTextManage.getCanvas()

// 画布缩放
canvas?.zoom('in')    // 放大
canvas?.zoom('out')   // 缩小
canvas?.zoom('fit')   // 适合屏幕
canvas?.zoom(1)       // 恢复 1:1

// 获取当前选中的节点列表
const list = canvas?.editor?.list ?? []

// 全选所有节点
canvas?.editor?.select(frame.children)

// 取消选中
canvas?.editor?.cancel()

// 锁定选中元素的宽高比
list.forEach((item) => { item.lockRatio = true })

// 克隆选中元素
list.forEach((item) => {
  const copy = item.clone()
  copy.x += 10; copy.y += 10
  frame.add(copy)
})

// 删除选中元素
const items = [...list]
items.forEach((item) => item.remove())
canvas?.editor?.cancel()`
  },
  {
    name: 'setFeatures',
    anchor: 'set-features',
    signature: 'htmlTextManage.setFeatures(features): void',
    desc: '开启或关闭实验功能。实验功能默认关闭，建议只在明确需要时开启。',
    params: [
      {
        name: 'features',
        type: '{ inlineFontSize?: boolean }',
        required: true,
        desc: '实验功能开关。例如 inlineFontSize 表示选区级局部字号'
      }
    ],
    returns: undefined,
    example: `htmlTextManage.setFeatures({
  inlineFontSize: true
})`
  },
  {
    name: 'isMultiSelect',
    anchor: 'is-multi-select',
    signature: 'htmlTextManage.isMultiSelect(): boolean',
    desc: '判断当前是否处于多选状态（选中了多个画布对象）。常用于工具栏按钮的状态控制。',
    params: [],
    returns: { type: 'boolean', desc: '当前是否多选' },
    example: `if (htmlTextManage.isMultiSelect()) {
  // 批量修改所有选中节点
  htmlTextManage.dateEdit((leaf) => {
    leaf.fontSize = 18
  })
}`
  },
  {
    name: 'dateEdit',
    anchor: 'date-edit',
    signature: 'htmlTextManage.dateEdit(callback, level?, listNew?): void',
    desc: '批量编辑当前选中的节点。当选中多个节点时自动批量应用，单选时仅操作当前节点。',
    params: [
      {
        name: 'callback',
        type: '(leaf: any) => void',
        required: true,
        desc: '编辑回调函数，参数为每个被选中的节点对象，可直接修改其属性'
      },
      { name: 'level', type: 'number', required: false, desc: '操作层级，传 1 时会深入 Box 子节点操作内部 Text 元素' },
      { name: 'listNew', type: 'any[]', required: false, desc: '自定义节点列表，不传则使用当前编辑器选中列表' }
    ],
    returns: undefined,
    example: `// 批量修改字体大小
htmlTextManage.dateEdit((leaf) => {
  leaf.fontSize = 24
}, 1)

// 批量修改颜色（针对内部文本元素）
htmlTextManage.dateEdit((leaf) => {
  leaf.fill = '#ff5500'
}, 1)`
  }
];

// ─── License functions ────────────────────────────────────────────────────────
const licenseFns = [
  {
    name: 'setLicense',
    anchor: 'set-license',
    signature: 'setLicense(licenseKey): Promise<boolean>',
    desc: '设置并验证授权密钥。必须在 htmlTextManage.init() 之前调用。本地开发环境无需授权。',
    params: [{ name: 'licenseKey', type: 'string', required: true, desc: '从作者处获取的授权密钥字符串' }],
    returns: { type: 'Promise<boolean>', desc: '授权验证成功返回 true，失败返回 false' },
    example: `import { setLicense } from '@chenyomi/leafer-htmltext-edit'

const ok = await setLicense('your-license-key')
if (!ok) {
  console.warn('授权验证失败，富文本功能将受限')
}`
  }
];

// ─── setHTMLText key list ─────────────────────────────────────────────────────
const setHtmlTextKeys = [
  {
    key: 'bold',
    valueType: 'boolean（可省略）',
    desc: '切换加粗。省略 value 时自动 toggle；也可传 true/false 明确指定'
  },
  { key: 'italic', valueType: 'boolean（可省略）', desc: '切换斜体。省略 value 时自动 toggle' },
  { key: 'underline', valueType: 'boolean（可省略）', desc: '切换下划线。省略 value 时自动 toggle' },
  { key: 'strike', valueType: 'boolean（可省略）', desc: '切换删除线。省略 value 时自动 toggle' },
  {
    key: 'textCase',
    valueType: '省略 value',
    desc: '大小写转换。根据当前内容循环切换：小写 → 大写 → 大写，需在编辑模式下有选区才生效'
  },
  {
    key: 'script',
    valueType: '"super" | "sub"',
    desc: '上下标。"super" = 上标（X²），"sub" = 下标（H₂O）；再次调用相同值可取消'
  },
  {
    key: 'align',
    valueType: 'false | "center" | "right" | "justify" | "distribute"',
    desc: '水平对齐。false = 左对齐（默认），"center" = 居中，"right" = 右对齐，"justify" = 两端对齐，"distribute" = 分散对齐'
  },
  {
    key: 'alignContent',
    valueType: '"start" | "center" | "end"',
    desc: '垂直对齐。"start" = 顶部，"center" = 居中，"end" = 底部'
  },
  {
    key: 'color',
    valueType: 'string（CSS 颜色值）',
    desc: '文字颜色，例如 "#ff0000"、"rgba(0,0,0,0.5)"；有选区时只改选中文字'
  },
  { key: 'fontSize', valueType: 'number', desc: '字体大小（像素）；全局应用，不支持局部选区' },
  {
    key: 'inlineFontSize',
    valueType: 'number | string',
    desc: '实验功能：选区级局部字号。需先调用 htmlTextManage.setFeatures({ inlineFontSize: true })，且只在内嵌编辑状态下有选区时生效'
  },
  { key: 'fontWeight', valueType: 'number | string', desc: '字重，例如 400、700、"bold"、"normal"；全局应用' },
  { key: 'lineHeight', valueType: 'number', desc: '行高倍数（相对 fontSize），例如 1.5；全局应用' },
  { key: 'letterSpacing', valueType: 'number', desc: '字间距（像素）；全局应用' },
  {
    key: 'textShadow',
    valueType: 'string（CSS text-shadow）',
    desc: '文字阴影，例如 "2px 2px 4px #000"。编辑模式下支持局部选区（再次传相同值可取消）；非编辑模式为全局应用'
  },
  {
    key: 'textStroke',
    valueType: 'string（CSS -webkit-text-stroke）',
    desc: '文字描边，例如 "1px #333"；编辑模式下支持局部选区'
  },
  {
    key: 'list',
    valueType: '"ordered" | "bullet"',
    desc: '列表类型。"ordered" = 有序列表，"bullet" = 无序列表；再次调用可取消'
  },
  {
    key: 'font',
    valueType: 'string（fontFamily）',
    desc: '运行时切换字体族。需同时传第三个参数 base64font；如果是创建节点时初始化字体，优先使用 HtmlText 的 fontBase64'
  }
];

const setHtmlTextExample = `// 1. 基础文字格式（编辑模式下对选区生效）
setHTMLText('bold')           // 切换加粗
setHTMLText('italic')         // 切换斜体
setHTMLText('underline')      // 切换下划线
setHTMLText('strike')         // 切换删除线
setHTMLText('textCase')       // 大小写转换（需有选区）

// 2. 上下标
setHTMLText('script', 'super')  // X²
setHTMLText('script', 'sub')    // H₂O

// 3. 对齐
setHTMLText('align', false)           // 左对齐
setHTMLText('align', 'center')        // 水平居中
setHTMLText('align', 'right')         // 右对齐
setHTMLText('align', 'justify')       // 两端对齐
setHTMLText('align', 'distribute')    // 分散对齐
setHTMLText('alignContent', 'start')  // 垂直顶部
setHTMLText('alignContent', 'center') // 垂直居中
setHTMLText('alignContent', 'end')    // 垂直底部

// 4. 颜色
setHTMLText('color', '#ff5500')   // 改变文字颜色

// 5. 全局属性
setHTMLText('fontSize', 24)
setHTMLText('lineHeight', 1.8)
setHTMLText('letterSpacing', 2)
setHTMLText('textShadow', '2px 2px 4px rgba(0,0,0,0.4)')
setHTMLText('textStroke', '1px #333333')

// 6. 列表
setHTMLText('list', 'ordered')  // 有序列表
setHTMLText('list', 'bullet')   // 无序列表

// 7. 运行时切换自定义字体（初始化字体可直接用 HtmlText 的 fontBase64）
const fontFamily = '"Dancing Script", cursive'
const fontBase64 = 'data:font/woff2;charset=utf-8;base64,...'
setHTMLText('font', fontFamily, fontBase64)`;

const inlineFontSizeEnableExample = `import { htmlTextManage } from '@chenyomi/leafer-htmltext-edit'

// 实验功能默认关闭。只有显式开启后 inlineFontSize 才会生效。
htmlTextManage.setFeatures({
  inlineFontSize: true,
})`;

const inlineFontSizeUsageExample = `import { setHTMLText } from '@chenyomi/leafer-htmltext-edit'

// 1. 双击文本进入内嵌编辑器
// 2. 选中需要调整的文字
// 3. 设置局部字号
setHTMLText('inlineFontSize', 42)

// 如果需要恢复统一字号，使用全局 fontSize。
// 这会统一整段文本字号，并清除局部字号标记。
setHTMLText('fontSize', 24)`;

const inlineFontSizeLimits = [
  {
    name: '弧形文字',
    desc: '多字号文本暂不支持弧形文字。开启局部字号后，弧形排版会被跳过，建议使用统一字号后再应用弧形。'
  },
  {
    name: '锁定比例缩放',
    desc: '多字号文本不会参与锁定比例下的自动字号收口缩放，避免只缩放全局字号导致局部字号比例错乱。'
  },
  {
    name: '全局 fontSize',
    desc: '全局字号用于统一整段文本字号。调用 fontSize 会清除局部字号，让文本回到单字号模式。'
  },
  {
    name: '多选批量局部字号',
    desc: 'inlineFontSize 只在内嵌编辑器中对选区生效，不支持对多个文本节点批量设置局部字号。'
  },
  {
    name: '外部 HTML',
    desc: '插件自身保存或导出的 HTML 支持恢复局部字号。第三方复杂 HTML 会尽量兼容，但不保证所有样式结构完整还原。'
  }
];

// ─── Changelog ────────────────────────────────────────────────────────────────
const changelog = [
  {
    version: '2.6.5',
    date: '2026-06',
    tag: 'latest',
    items: [
      '发布 v2.6.5'
    ]
  },
  {
    version: '2.6.1',
    date: '2026-06',
    tag: 'patch',
    items: [
      '发布 v2.6.1'
    ]
  },
  {
    version: '2.5.11',
    date: '2026-06',
    tag: 'minor',
    items: [
      '发布 v2.5.11'
    ]
  },
  {
    version: '2.5.9',
    date: '2026-06',
    tag: 'patch',
    items: [
      '在 HtmlText 组件中添加 padding 属性支持',
      '实现 applyPaddingToTextHtml 函数以应用内边距样式',
      '在 TextEditor 中同步内边距样式',
      '在 utils 中添加 syncInnerEditorPadding 函数',
      '在 parseHtmlTextData 中解析内边距',
      '新增 padding.ts 文件，定义 HtmlTextPadding 类型及相关函数'
    ]
  },
  {
    version: '2.5.8',
    date: '2026-06',
    tag: 'patch',
    items: [
      '新增 .github/workflows/publish-tgz.yml 文件，实现 TGZ 文件的自动发布',
      '新增 scripts/create-tgz.mjs 脚本，处理 TGZ 文件的创建和版本管理',
      '在 package.json 中添加 `pack:tgz` 和 `pack:dry` 脚本',
      '修改 HtmlText.ts 中的样式规则，增加对 -webkit-text-stroke 的支持',
      '更新 utils.ts 中的样式生成逻辑，确保 -webkit-text-stroke 正确渲染'
    ]
  },
  {
    version: '2.5.7',
    date: '2026-06',
    tag: 'patch',
    items: [
      '更新版本号至 2.5.7',
      '优化 HtmlText 类构造函数，合并解析后的数据',
      '改进 TextEditor 类的文本加载逻辑，确保正确处理 HtmlText',
      '扩展 parseHtmlTextData 函数，支持提取宽度和高度',
      '增加字体规则注入和提取功能，确保样式正确应用'
    ]
  },
  {
    version: '2.5.6',
    date: '2026-06',
    tag: 'patch',
    items: [
      '添加 parseHtmlTextData 函数用于从 HTML 字符串中提取文本元数据',
      '在 HtmlText 组件中集成解析逻辑，确保文本渲染时具备必要的 CSS',
      '优化文本元素创建时的样式处理'
    ]
  },
  {
    version: '2.5.5',
    date: '2026-06',
    tag: 'patch',
    items: [
      '更新版本号至 2.5.5',
      '移除冗余的样式设置代码',
      '确保在编辑器加载时应用字体、字号、行高等样式'
    ]
  },
  {
    version: '2.5.4',
    date: '2026-06',
    tag: 'patch',
    items: [
      '在 IHtmlTextContentData 接口中添加 fontBase64 属性以支持自定义字体',
      '在 HtmlText 类中处理 fontBase64 以注入 @font-face',
      '在 TextEditor 类中根据 fontFamily 设置字体样式',
      '在 utils.ts 中调整字体处理逻辑以支持单字体模型',
      '添加新的许可证密钥',
      '更新许可证信息，包括域名、过期日期、发行日期、邮箱、用户ID、功能和版本',
      '将许可证有效期延长至 800 天'
    ]
  },
  {
    version: '2.5.3',
    date: '2026-06',
    tag: 'patch',
    items: [
      '更新版本号至 2.5.3',
      '在 dateEdit 方法中使用 resolveHTMLTextLeaf 处理回调参数'
    ]
  }
];

// ─── Scroll & active section tracking ────────────────────────────────────────
const activeSection = ref('introduction');
const isSidebarOpen = ref(false);
const mainRef = ref<HTMLElement | null>(null);
const copiedKey = ref('');

const allSectionIds = [...guideItems.map(i => i.id), ...apiItems.map(i => i.id), ...moreItems.map(i => i.id)];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
    isSidebarOpen.value = false;
    // Update URL hash without full navigation
    history.replaceState(null, '', '#' + id);
  }
};

const onScroll = () => {
  let current = allSectionIds[0];
  for (const id of allSectionIds) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 120) {
      current = id;
    }
  }
  activeSection.value = current;
};

const copyCode = async (code: string, key = 'default') => {
  try {
    await navigator.clipboard.writeText(code.trim());
    copiedKey.value = key;
    setTimeout(() => {
      copiedKey.value = '';
    }, 1500);
  } catch {
    // clipboard not available
  }
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  // Handle direct link to anchor
  const hash = window.location.hash.slice(1);
  if (hash) {
    setTimeout(() => scrollTo(hash), 100);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
@import '../css/docs.css';
</style>
