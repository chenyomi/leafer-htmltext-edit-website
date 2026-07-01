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
          <div class="doc-resource-links">
            <a
              href="https://www.npmjs.com/package/@chenyomi/leafer-htmltext-edit"
              target="_blank"
              rel="noopener noreferrer"
              class="doc-resource-card"
            >
              <i class="pi pi-box"></i>
              <div>
                <strong>npm 包</strong>
                <span>@chenyomi/leafer-htmltext-edit</span>
              </div>
              <i class="pi pi-arrow-up-right"></i>
            </a>
            <a
              href="https://github.com/chenyomi/leafer-htmltext-edit-view"
              target="_blank"
              rel="noopener noreferrer"
              class="doc-resource-card"
            >
              <i class="pi pi-github"></i>
              <div>
                <strong>GitHub示例源码</strong>
                <span>chenyomi/leafer-htmltext-edit-view</span>
              </div>
              <i class="pi pi-arrow-up-right"></i>
            </a>
            <a
              href="https://chenyomi.github.io/leafer-htmltext-edit-view/"
              target="_blank"
              rel="noopener noreferrer"
              class="doc-resource-card"
            >
              <i class="pi pi-play-circle"></i>
              <div>
                <strong>在线演示</strong>
                <span>chenyomi.github.io/leafer-htmltext-edit-view</span>
              </div>
              <i class="pi pi-arrow-up-right"></i>
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

        <!-- ─── 初始化指南 ─── -->
        <section :id="'init-guide'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              初始化指南
              <a :href="'#init-guide'" class="anchor-link" @click.prevent="scrollTo('init-guide')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            接入插件时需要理解
            <strong>两层初始化</strong>
            ：先在页面里挂载编辑器能力，再按业务场景创建
            <code>HtmlText</code>
            节点。两层都完成后，双击编辑、样式工具栏、保存回显才会正常工作。
          </p>

          <div class="init-layer-grid">
            <div class="init-layer-card" v-for="layer in initLayers" :key="layer.step">
              <span class="init-layer-step">{{ layer.step }}</span>
              <strong>{{ layer.title }}</strong>
              <p>{{ layer.desc }}</p>
              <code class="init-layer-code">{{ layer.code }}</code>
            </div>
          </div>

          <h3 class="doc-h3" id="plugin-bootstrap">第一层：页面级初始化</h3>
          <p class="doc-p">
            每个页面只需执行一次。顺序固定：
            <code>setLicense</code>
            → 创建
            <code>App</code>
            →
            <code>htmlTextManage.init(app)</code>
            。
          </p>
          <div class="code-block-wrap">
            <div class="code-lang-badge">App.vue</div>
            <button class="copy-btn" @click="copyCode(pluginBootstrapExample, 'plugin-bootstrap')">
              <i class="pi" :class="copiedKey === 'plugin-bootstrap' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ pluginBootstrapExample }}</code></pre>
          </div>

          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>步骤</th>
                  <th>调用</th>
                  <th>参数 / 说明</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in pluginBootstrapSteps" :key="row.step">
                  <td>{{ row.step }}</td>
                  <td>
                    <code>{{ row.call }}</code>
                  </td>
                  <td class="param-desc">{{ row.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="callout callout-warning">
            <strong>授权顺序：</strong>
            <code>setLicense</code>
            必须在
            <code>htmlTextManage.init()</code>
            之前调用。本地
            <code>localhost</code>
            开发不受限；生产域名需有效 License。
          </div>

          <h3 class="doc-h3">先想清楚：你在接哪一种业务？</h3>
          <p class="doc-p">
            这个插件既能当「画布里的富文本节点」，也能接进模板系统、素材库、字体库或业务表单。不同业务的重点不一样，先按下面这张表选路线，会比直接看
            API 更不容易绕。
          </p>
          <div class="params-table-wrap">
            <table class="params-table init-mode-table">
              <thead>
                <tr>
                  <th>业务目标</th>
                  <th>推荐主数据</th>
                  <th>创建 / 回显</th>
                  <th>编辑后保存</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in integrationRoutes" :key="row.goal">
                  <td>
                    <strong>{{ row.goal }}</strong>
                  </td>
                  <td class="param-desc">{{ row.data }}</td>
                  <td class="param-desc">{{ row.restore }}</td>
                  <td class="param-desc">{{ row.save }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3" id="content-modes">第二层：节点内容初始化方式</h3>
          <p class="doc-p">
            创建
            <code>HtmlText</code>
            时，内容来源有四种常见方式。先选对方式，再补样式和布局参数。
          </p>

          <div class="params-table-wrap">
            <table class="params-table init-mode-table">
              <thead>
                <tr>
                  <th>方式</th>
                  <th>适用场景</th>
                  <th>关键字段</th>
                  <th>行为说明</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="mode in initModes" :key="mode.name">
                  <td>
                    <strong>{{ mode.name }}</strong>
                  </td>
                  <td class="param-desc">{{ mode.scene }}</td>
                  <td>
                    <code>{{ mode.fields }}</code>
                  </td>
                  <td class="param-desc">{{ mode.behavior }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="callout callout-info">
            <strong>优先级规则（避免回显错乱）：</strong>
            <ul class="doc-ul">
              <li>
                同时传
                <code>text</code>
                和
                <code>content</code>
                时，以
                <code>text</code>
                为准，
                <code>content</code>
                会被忽略
              </li>
              <li>
                传
                <code>text</code>
                时，插件会从 HTML 反解
                <code>fontSize</code>
                、
                <code>fontFamily</code>
                、
                <code>padding</code>
                等元数据；但你
                <strong>显式传入的参数优先级更高</strong>
              </li>
              <li>
                只传
                <code>content</code>
                时，插件会按
                <code>fontSize</code>
                、
                <code>color</code>
                、
                <code>align</code>
                等样式参数自动拼出完整 HTML
              </li>
              <li>
                既不传
                <code>content</code>
                也不传
                <code>text</code>
                时，会生成默认占位文本
                <code>Hello World</code>
              </li>
            </ul>
          </div>

          <h3 class="doc-h3">不要混用的几件事</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>容易混的事</th>
                  <th>正确理解</th>
                  <th>建议</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in dataBoundaryRules" :key="row.name">
                  <td>
                    <strong>{{ row.name }}</strong>
                  </td>
                  <td class="param-desc">{{ row.meaning }}</td>
                  <td class="param-desc">{{ row.suggestion }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3" id="init-scenarios">按场景初始化</h3>
          <p class="doc-p">
            涉及多种自定义字体回显时，先看
            <a href="#font-echo-guide" @click.prevent="scrollTo('font-echo-guide')">多字体与回显</a>
            专章。
          </p>

          <div v-for="scenario in initScenarios" :key="scenario.id" class="init-scenario-block">
            <h4 class="init-scenario-title">
              {{ scenario.title }}
              <span class="init-scenario-tag">{{ scenario.mode }}</span>
            </h4>
            <p class="doc-p">{{ scenario.desc }}</p>
            <ul v-if="scenario.tips?.length" class="doc-ul">
              <li v-for="tip in scenario.tips" :key="tip">{{ tip }}</li>
            </ul>
            <div class="code-block-wrap">
              <div v-if="scenario.lang" class="code-lang-badge">{{ scenario.lang }}</div>
              <button class="copy-btn" @click="copyCode(scenario.code, 'scenario-' + scenario.id)">
                <i class="pi" :class="copiedKey === 'scenario-' + scenario.id ? 'pi-check' : 'pi-copy'"></i>
              </button>
              <pre class="code-block"><code>{{ scenario.code }}</code></pre>
            </div>
          </div>

          <h3 class="doc-h3" id="init-params">构造参数一览</h3>
          <p class="doc-p">
            <code>new HtmlText(data)</code>
            接受
            <code>IHtmlTextInputData</code>
            ，即插件文本属性 + Leafer
            <code>Box</code>
            通用属性。以下按用途分组，完整字段表见
            <a href="#api-htmltext" @click.prevent="scrollTo('api-htmltext')">API · HtmlText</a>
            。
          </p>

          <div v-for="group in initParamGroups" :key="group.title" class="init-param-group">
            <h4 class="init-param-group-title">{{ group.title }}</h4>
            <div class="params-table-wrap">
              <table class="params-table">
                <thead>
                  <tr>
                    <th>参数</th>
                    <th>类型</th>
                    <th>默认值</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in group.params" :key="p.name">
                    <td>
                      <code>{{ p.name }}</code>
                    </td>
                    <td>
                      <span class="type-badge">{{ p.type }}</span>
                    </td>
                    <td>
                      <code class="default-val">{{ p.default }}</code>
                    </td>
                    <td class="param-desc">{{ p.desc }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ─── 多字体与回显 ─── -->
        <section :id="'font-echo-guide'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              多字体与回显
              <a :href="'#font-echo-guide'" class="anchor-link" @click.prevent="scrollTo('font-echo-guide')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            四个和字体相关的构造参数容易混。先记住：
            <strong>新建单字体用 fontFamily + fontBase64；多字体和局部字体回显优先存 JSON 或完整 HTML。</strong>
          </p>

          <h3 class="doc-h3">四个字体参数分别干什么？</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>参数</th>
                  <th>类型</th>
                  <th>干什么用</th>
                  <th>什么时候用</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in fontFieldsGuide" :key="row.name">
                  <td>
                    <code>{{ row.name }}</code>
                  </td>
                  <td>
                    <span class="type-badge">{{ row.type }}</span>
                  </td>
                  <td class="param-desc">{{ row.role }}</td>
                  <td class="param-desc">{{ row.when }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="callout callout-warning">
            <code>fontFamily + fontBase64</code>
            只能注册
            <strong>一个</strong>
            主自定义字体。一段文字里要回显多种自定义字体，最稳妥的方式是在
            <code>text</code>
            的
            <code>&lt;style&gt;</code>
            里写多条
            <code>@font-face</code>
            。
          </div>

          <h3 class="doc-h3">多字体回显：三种写法（选一种即可）</h3>
          <div class="params-table-wrap">
            <table class="params-table init-mode-table">
              <thead>
                <tr>
                  <th>写法</th>
                  <th>你怎么存数据</th>
                  <th>怎么传</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in fontEchoModes" :key="row.name">
                  <td>
                    <strong>{{ row.name }}</strong>
                  </td>
                  <td class="param-desc">{{ row.storage }}</td>
                  <td class="param-desc">
                    <code>{{ row.how }}</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="doc-h4">写法 1：Leafer JSON（最推荐）</h4>
          <p class="doc-p">
            保存
            <code>htmlText.toJSON()</code>
            ，回显
            <code>new HtmlText(json)</code>
            。字体、局部 span、textData 都在里面。
          </p>

          <h4 class="doc-h4">写法 2：完整 HTML 一个字段</h4>
          <p class="doc-p">
            <code>text</code>
            里自带
            <code>&lt;style&gt;</code>
            （可含多条
            <code>@font-face</code>
            ）+ 带
            <code>font-family</code>
            的
            <code>&lt;p&gt;/&lt;span&gt;</code>
            。只传
            <code>new HtmlText({ text })</code>
            即可，不必再额外传字体资源字段 。
          </p>

          <h4 class="doc-h4">写法 3：字体和内容分开存（场景 E）</h4>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(initScenarioMultiFontCode, 'multi-font-echo')">
              <i class="pi" :class="copiedKey === 'multi-font-echo' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ initScenarioMultiFontCode }}</code></pre>
          </div>
          <p class="doc-p">
            注意：多字体时在一个
            <code>&lt;style&gt;</code>
            里写
            <strong>多条</strong>
            <code>@font-face</code>
            ，不是多个
            <code>&lt;style&gt;</code>
            标签各写一个。
          </p>

          <div class="callout callout-info">
            当前公开类型里稳定的构造入口是
            <code>content</code>
            、
            <code>text</code>
            、
            <code>fontFamily</code>
            和
            <code>fontBase64</code>
            。如果业务已有多个字体文件，不要只把字体数组传给构造函数后期待自动回显局部字体；请生成完整
            <code>&lt;style&gt;</code>
            + 内容 HTML，或直接保存
            <code>toJSON()</code>
            。
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
            本质是 Leafer 画布节点。保存与回显时，优先选择与
            <a href="#content-modes" @click.prevent="scrollTo('content-modes')">初始化方式</a>
            对应的方案即可，不必重复拼 HTML。
          </p>

          <h3 class="doc-h3">先选存储方案</h3>
          <p class="doc-p">
            如果不确定怎么存，优先存
            <code>toJSON()</code>
            。它会把外层位置、宽高、内层 HTML、局部字体、局部字号、局部字间距等一起保存；再次回显时直接传回
            <code>new HtmlText(json)</code>
            即可。
          </p>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>你的业务数据</th>
                  <th>保存什么</th>
                  <th>回显怎么传</th>
                  <th>适合程度</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in persistenceChoices" :key="row.scene">
                  <td class="param-desc">{{ row.scene }}</td>
                  <td>
                    <code>{{ row.save }}</code>
                  </td>
                  <td>
                    <code>{{ row.restore }}</code>
                  </td>
                  <td class="param-desc">{{ row.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3">为什么要拆分存储？</h3>
          <p class="doc-p">
            <code>fontStyle + contentHtml</code>
            不是插件强制的数据格式，而是业务上常见的
            <strong>轻量存储方案</strong>
            ：字体 base64
            往往很大，如果每个文本节点都把完整字体写进数据库，会造成大量重复。更合理的做法是字体、图片等大资源单独入库或走
            CDN，文本节点只保存引用和必要的 HTML 样式；回显时再把资源拼回
            <code>text</code>
            传给
            <code>HtmlText</code>
            。
          </p>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>资源 / 数据</th>
                  <th>建议存哪里</th>
                  <th>文本节点里存什么</th>
                  <th>回显时怎么还原</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in storageSeparationRules" :key="row.name">
                  <td>
                    <strong>{{ row.name }}</strong>
                  </td>
                  <td class="param-desc">{{ row.storage }}</td>
                  <td class="param-desc">{{ row.reference }}</td>
                  <td class="param-desc">{{ row.restore }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="callout callout-info">
            <strong>判断原则：</strong>
            会被多个文本、多个模板重复使用，或者体积明显大的内容，不要塞进每条文本记录。字体文件、图片、素材、模板资源适合单独存；位置、宽高、颜色、描边、局部
            span 样式这类轻量状态适合跟文本 JSON 或 HTML 一起存。
          </div>

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

          <h3 class="doc-h3">更新已有节点：三种常见方式</h3>
          <p class="doc-p">
            回显不是只有
            <code>new HtmlText()</code>
            。如果画布上已经有文本节点，需要按你更新的是「整份节点」「纯内容」还是「工具栏样式」选择不同入口。
          </p>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>你要更新什么</th>
                  <th>用哪个入口</th>
                  <th>会保留什么</th>
                  <th>注意点</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in updateStrategies" :key="row.name">
                  <td>
                    <strong>{{ row.name }}</strong>
                  </td>
                  <td>
                    <code>{{ row.api }}</code>
                  </td>
                  <td class="param-desc">{{ row.keep }}</td>
                  <td class="param-desc">{{ row.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(updateExistingTextExample, 'update-existing-text')">
              <i class="pi" :class="copiedKey === 'update-existing-text' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ updateExistingTextExample }}</code></pre>
          </div>

          <h3 class="doc-h3">局部样式后的保存与回显</h3>
          <p class="doc-p">
            局部字体、局部字号、局部字间距都不是单独传一个
            <code>style</code>
            字段回去，而是写进内部
            <code>HTMLText.text</code>
            的
            <code>&lt;span style&gt;</code>
            里。用户编辑完成后保存节点 JSON，回显时原样传回，局部样式才不会丢。
          </p>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(localStylePersistenceExample, 'local-style-persistence')">
              <i class="pi" :class="copiedKey === 'local-style-persistence' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ localStylePersistenceExample }}</code></pre>
          </div>

          <h3 class="doc-h3">特殊场景：只保存 HTML 内容</h3>
          <p class="doc-p">
            业务把字体和内容分开存储时，回显请使用
            <code>text</code>
            字段，把
            <code>@font-face</code>
            与内容 HTML 拼在一起传入。这通常是为了避免把很大的字体 base64 重复保存到每条文本数据里。完整示例见
            <a href="#init-scenarios" @click.prevent="scrollTo('init-scenarios')">初始化指南 · 场景 4</a>
            。
          </p>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(htmlOnlyPersistenceExample, 'html-only-persistence')">
              <i class="pi" :class="copiedKey === 'html-only-persistence' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ htmlOnlyPersistenceExample }}</code></pre>
          </div>

          <h3 class="doc-h3">多字体与 HTML 回显</h3>
          <p class="doc-p">
            一段文本可同时嵌入多个自定义字体。保存时 HTML 的
            <code>&lt;style&gt;</code>
            里会有多条
            <code>@font-face</code>
            ；局部字体还会出现在
            <code>&lt;span style="font-family:..."&gt;</code>
            。只传
            <code>text</code>
            初始化或回显时，插件会通过
            <code>parseHtmlTextData</code>
            反解基础样式；进入编辑时也会把 HTML 里的
            <code>@font-face</code>
            注入到编辑器环境 。
          </p>
          <ul class="doc-ul">
            <li>
              推荐：保存
              <code>HtmlText.toJSON()</code>
              或整棵 Leafer JSON，可同时保留节点位置、textData 与内部 HTML
            </li>
            <li>
              只存 HTML：必须保留完整
              <code>&lt;style&gt;</code>
              （含所有
              <code>@font-face</code>
              ）和内容
              <code>&lt;span&gt;</code>
              样式
            </li>
            <li>
              初始化多字体：优先把多条
              <code>@font-face</code>
              和内容 HTML 一起作为
              <code>text</code>
              传入
            </li>
          </ul>

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
            等内联样式，并在使用自定义字体时补回
            <strong>全部</strong>
            <code>@font-face</code>
            （多字体场景可能有多条）。只剩纯文本时无法恢复字号、字体、描边、颜色、宽高和对齐等视觉效果。
          </div>

          <h3 class="doc-h3">保存前检查清单</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>检查项</th>
                  <th>为什么重要</th>
                  <th>推荐做法</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in saveChecklist" :key="row.name">
                  <td>
                    <strong>{{ row.name }}</strong>
                  </td>
                  <td class="param-desc">{{ row.why }}</td>
                  <td class="param-desc">{{ row.action }}</td>
                </tr>
              </tbody>
            </table>
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
            是应用文本样式的核心函数。多选时批量应用到所有选中节点。 使用前请先读
            <a href="#api-experimental" @click.prevent="scrollTo('api-experimental')">局部与全局样式</a>
            里的「三种操作场景」——大部分看不懂的问题都是没双击或没拖选文字。
          </p>

          <div class="callout callout-info">
            <strong>快速记：</strong>
            整段改字号 / 行高 / 字重 → 选中节点即可； 某几个字加粗 / 改色 → 双击编辑后拖选再调用； 某几个字改字号 / 字体
            / 字间距 → 双击 + 拖选（字号还需
            <code>setFeatures({ inlineFontSize: true })</code>
            ）。
          </div>

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

        <!-- ─── API: 局部与全局样式 ─── -->
        <section :id="'api-experimental'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              API · 局部与全局样式
              <a :href="'#api-experimental'" class="anchor-link" @click.prevent="scrollTo('api-experimental')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            <code>setHTMLText</code>
            是改样式的 API。搞懂下面两件事就不会乱：
          </p>
          <ol class="doc-ol">
            <li>
              <strong>先选中</strong>
              画布上的
              <code>HtmlText</code>
              节点（出现外框）。
            </li>
            <li>
              改「某几个字」时：
              <strong>双击进入内嵌编辑</strong>
              → 用鼠标
              <strong>拖选一段字</strong>
              （光标闪烁不算选区）。
            </li>
          </ol>

          <h3 class="doc-h3">三种操作场景（决定改局部还是改整段）</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>场景</th>
                  <th>你怎么操作</th>
                  <th>多数 API 的效果</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in editScenarios" :key="row.name">
                  <td>
                    <strong>{{ row.name }}</strong>
                  </td>
                  <td class="param-desc">{{ row.how }}</td>
                  <td class="param-desc">{{ row.effect }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="callout callout-warning">
            <strong>常见踩坑：</strong>
            <ul class="doc-ul">
              <li>只单击选中节点、没双击 → 只能改「整段全局」类属性（fontSize、lineHeight 等）</li>
              <li>
                双击进了编辑但只闪光标、没拖蓝字 → 多数字符格式会作用在
                <strong>全文</strong>
                ，不是局部
              </li>
              <li>
                <code>inlineFontSize</code>
                、局部
                <code>font</code>
                、局部
                <code>letterSpacing</code>
                <strong>必须有拖选的一段字</strong>
                才生效
              </li>
              <li>
                内嵌编辑里
                <strong>全选</strong>
                再改
                <code>font</code>
                → 按整段全局字体处理，不是局部
              </li>
            </ul>
          </div>

          <h3 class="doc-h3">按你的目标查：该用哪个 API？</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>你想做什么</th>
                  <th>要不要双击编辑</th>
                  <th>要不要拖选文字</th>
                  <th>调用</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in formatCookbook" :key="row.goal">
                  <td>{{ row.goal }}</td>
                  <td class="param-desc">{{ row.needInner }}</td>
                  <td class="param-desc">{{ row.needSelection }}</td>
                  <td>
                    <code>{{ row.call }}</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3">技术细节：各 key 在三种场景下的行为</h3>
          <p class="doc-p">给需要对照源码的同学。列标题对应上面的三种场景。</p>
          <div class="params-table-wrap format-matrix-wrap">
            <table class="params-table format-matrix-table">
              <thead>
                <tr>
                  <th>key</th>
                  <th>① 外框选中</th>
                  <th>
                    ② 内嵌编辑
                    <br />
                    无拖选
                  </th>
                  <th>
                    ③ 内嵌编辑
                    <br />
                    有拖选
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in formatScopeMatrix" :key="row.key">
                  <td>
                    <code>{{ row.key }}</code>
                  </td>
                  <td class="param-desc">{{ row.outer }}</td>
                  <td class="param-desc">{{ row.innerNoSel }}</td>
                  <td class="param-desc">{{ row.innerSel }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="callout callout-info">
            <strong>多选节点：</strong>
            <code>setHTMLText</code>
            会对每个选中节点执行；但带「拖选」的局部样式只作用于当前内嵌编辑器里的 Quill
            选区，不能一次给多个节点里的某几个字批量设样式。
          </div>

          <h3 class="doc-h3">局部字体与多字体（font）</h3>
          <p class="doc-p">
            <code>setHTMLText('font', fontFamily, base64font)</code>
            默认开启，无需
            <code>setFeatures</code>
            。 内嵌编辑且有选区时，只给选中文字加
            <code>span style="font-family:..."</code>
            ；无选区或全选时改全局
            <code>textData.fontFamily</code>
            并清除局部字体。自定义字体请传第三个参数
            <code>base64font</code>
            ，插件会写入内部 HTML 的
            <code>&lt;style&gt;</code>
            中，并在需要时合并多个
            <code>@font-face</code>
            。
          </p>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(inlineFontUsageExample, 'inline-font-usage')">
              <i class="pi" :class="copiedKey === 'inline-font-usage' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ inlineFontUsageExample }}</code></pre>
          </div>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>场景</th>
                  <th>行为</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in inlineFontNotes" :key="item.name">
                  <td>
                    <code>{{ item.name }}</code>
                  </td>
                  <td class="param-desc">{{ item.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3">局部字间距（letterSpacing）</h3>
          <p class="doc-p">
            <code>setHTMLText('letterSpacing', n)</code>
            在内嵌编辑且有选区时写入
            <code>span style="letter-spacing:..."</code>
            ；否则更新全局
            <code>textData.letterSpacing</code>
            并清除局部标记。与局部字号类似，全局字间距写在
            <code>&lt;p&gt;</code>
            上，局部写在
            <code>&lt;span&gt;</code>
            上。
          </p>

          <h3 class="doc-h3">局部字号 inlineFontSize（实验功能）</h3>
          <div class="callout callout-warning">
            <code>inlineFontSize</code>
            是唯一仍需
            <code>htmlTextManage.setFeatures({ inlineFontSize: true })</code>
            的样式能力。未开启时不影响
            <code>fontSize</code>
            、局部字体、弧形文字等稳定功能。
          </div>
          <p class="doc-p">
            <code>inlineFontSize</code>
            不会替代
            <code>fontSize</code>
            ：
            <code>fontSize</code>
            表示整个文本对象的全局字号，
            <code>inlineFontSize</code>
            只作为
            <code>span style="font-size: ..."</code>
            保存。调用全局
            <code>fontSize</code>
            会清除所有局部字号。
          </p>

          <h4 class="doc-h4">开启方式</h4>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(inlineFontSizeEnableExample, 'inline-size-enable')">
              <i class="pi" :class="copiedKey === 'inline-size-enable' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ inlineFontSizeEnableExample }}</code></pre>
          </div>

          <h4 class="doc-h4">使用方式</h4>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(inlineFontSizeUsageExample, 'inline-size-usage')">
              <i class="pi" :class="copiedKey === 'inline-size-usage' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ inlineFontSizeUsageExample }}</code></pre>
          </div>

          <h4 class="doc-h4">局部字号的影响与限制</h4>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>关联能力</th>
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
            插件导出的 HTML 会保留局部字号 / 局部字体 / 局部字间距，并通过
            <code>parseHtmlTextData</code>
            反解基础样式。只存
            <code>text</code>
            回显时，务必保留
            <code>&lt;style&gt;</code>
            内全部
            <code>@font-face</code>
            与
            <code>&lt;span style&gt;</code>
            ；第三方复杂 HTML 会尽量兼容，但不保证完整还原。
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
  { id: 'init-guide', label: '初始化指南' },
  { id: 'font-echo-guide', label: '多字体与回显' },
  { id: 'data-persistence', label: '数据保存与回显' },
  { id: 'editing-guide', label: '编辑原理与常见问题' }
];

const apiItems = [
  { id: 'api-htmltext', label: 'HtmlText' },
  { id: 'api-manage', label: 'HtmlTextManage' },
  { id: 'api-sethtml', label: 'setHTMLText' },
  { id: 'api-experimental', label: '局部与全局样式' },
  { id: 'api-license', label: '授权管理' }
];

const moreItems = [{ id: 'changelog', label: '更新日志' }];

// ─── Features ────────────────────────────────────────────────────────────────
const features = [
  { icon: '🎨', title: '富文本编辑', desc: '基于 Quill 2.0，支持完整的富文本编辑功能，双击节点即可进入内联编辑' },
  { icon: '📐', title: '文本样式', desc: '字体、大小、颜色、对齐、行高、字间距、阴影、描边等全面控制' },
  { icon: '📝', title: '格式化工具', desc: '加粗、斜体、下划线、删除线、上下标、大小写转换' },
  { icon: '📋', title: '列表支持', desc: '有序列表、无序列表' },
  { icon: '🔤', title: '自定义与多字体', desc: 'Base64 字体注入、多 @font-face、内嵌编辑下选区换字体' },
  { icon: '🔡', title: '局部样式', desc: '局部字号（实验）、局部字体、局部字间距；与全局样式分层保存' },
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

const pluginBootstrapExample = `<template>
  <div id="leafer-view" style="width: 100vw; height: 100vh;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { App } from 'leafer-ui'
import 'leafer-editor'
import { htmlTextManage, setLicense, HtmlText } from '@chenyomi/leafer-htmltext-edit'

onMounted(async () => {
  // ① 授权（必须在 init 之前）
  await setLicense('your-license-key')

  // ② 创建画布
  const app = new App({ view: 'leafer-view', fill: '#ffffff', editor: {} })

  // ③ 初始化插件（每页一次）
  await htmlTextManage.init(app)

  // ④ 创建文本节点（见下方「按场景初始化」）
  const text = new HtmlText({
    x: 100,
    y: 100,
    content: '双击编辑',
    fontSize: 24,
    editable: true,
    draggable: true,
  })
  app.tree.add(text)
})
<\/script>`;

const initLayers = [
  {
    step: '①',
    title: '页面级：挂载编辑器能力',
    desc: '每个页面执行一次，负责 License、Quill 实例和 Leafer Editor 绑定。',
    code: 'setLicense → new App() → htmlTextManage.init(app)'
  },
  {
    step: '②',
    title: '节点级：创建 HtmlText',
    desc: '按业务选择 content / text / JSON 等方式传入内容，再 add 到画布。',
    code: 'new HtmlText({ ... }) → app.tree.add(text)'
  }
];

const pluginBootstrapSteps = [
  {
    step: '1',
    call: 'setLicense(key)',
    desc: '验证授权。本地 localhost 可跳过；生产域名需有效密钥。必须在 init 之前调用。'
  },
  {
    step: '2',
    call: 'new App({ view, editor })',
    desc: 'view 为容器 id 或 DOM；editor: {} 开启选中、缩放、内嵌编辑能力。'
  },
  {
    step: '3',
    call: 'htmlTextManage.init(app)',
    desc: '绑定 App、创建全局 Quill。参数为 Leafer App 实例，每页调用一次即可。'
  },
  {
    step: '4',
    call: 'new HtmlText(data)',
    desc: '创建富文本节点。data 为 IHtmlTextInputData，内容字段见下方对比表。'
  }
];

const integrationRoutes = [
  {
    goal: '画布 / 设计稿编辑器',
    data: '整棵 Leafer JSON',
    restore: '初始化插件后 app.tree.set(sceneJson)',
    save: '保存 app.tree.toJSON()，最完整'
  },
  {
    goal: '业务表单里嵌一个富文本框',
    data: '单个 HtmlText JSON 或完整 text HTML',
    restore: 'new HtmlText(savedData)',
    save: '保存 htmlText.toJSON()；只需要 HTML 时保存内部 HTMLText.text'
  },
  {
    goal: '模板系统 / 海报生成',
    data: '模板 JSON + 用户覆盖字段',
    restore: '先加载模板，再替换指定文本节点',
    save: '模板和用户内容分开存，避免每份作品复制整套模板'
  },
  {
    goal: '字体库 / 素材库接入',
    data: '文本存引用，大资源单独存',
    restore: '按 fontId、assetId 查资源，再拼回 text 或节点 JSON',
    save: '文本记录不重复保存字体 base64、图片 base64'
  },
  {
    goal: '跨系统导入 HTML',
    data: '完整 HTML 字符串',
    restore: 'new HtmlText({ text: savedHtml })',
    save: '保留 <style>、<p style>、<span style>，不要转成纯文本'
  }
];

const dataBoundaryRules = [
  {
    name: 'content 和 text',
    meaning: 'content 是给插件包装的原始内容；text 是已经完整成型的 HTML',
    suggestion: '新建简单文本用 content；回显、导入、保留局部样式用 text。两者同时传时 text 优先'
  },
  {
    name: '全局样式和局部样式',
    meaning: 'fontSize、lineHeight 等全局样式在 textData / 段落上；局部样式在 span style 上',
    suggestion: '整段改样式用 setHTMLText 的全局 key；几个字改样式必须双击进入编辑并拖选'
  },
  {
    name: '资源和内容',
    meaning: '字体、图片、模板资源可能很大，内容 HTML / 节点 JSON 是轻量状态',
    suggestion: '大资源单独存，文本里存 id、url、font-family、assetId 等引用'
  },
  {
    name: '运行时和持久化',
    meaning: 'Quill 实例、DOM、当前光标、临时选区只存在运行时',
    suggestion: '数据库只保存 JSON / HTML / 业务引用，不保存编辑器对象'
  },
  {
    name: '新增和更新',
    meaning: 'new HtmlText 是创建新节点；existing.set(...) 是同步已有节点',
    suggestion: '打开历史数据用 new；替换画布上已有元素用 set 或 setHTMLText'
  }
];

const initModes = [
  {
    name: 'content + 样式参数',
    scene: '新建文本、工具栏创建、简单模板',
    fields: 'content, fontSize, color, fontFamily...',
    behavior: '插件按样式属性自动拼 HTML；自定义单字体用 fontFamily + fontBase64'
  },
  {
    name: 'text 完整 HTML',
    scene: '业务只存 HTML、模板回显、跨系统导入',
    fields: 'text',
    behavior: '原样渲染；缺 Quill CSS 会自动补全；从 HTML 反解 fontSize / padding 等元数据'
  },
  {
    name: 'text = 字体 + 内容',
    scene: '字体库与正文分开存储',
    fields: 'text: fontStyle + contentHtml',
    behavior: 'fontStyle 注入 @font-face，contentHtml 保留内联样式'
  },
  {
    name: 'Leafer JSON 回显',
    scene: '纯 Leafer 项目、保存过 toJSON()',
    fields: '整份节点 JSON',
    behavior: '最完整，位置、样式、textData 一次恢复'
  }
];

const initScenarioContentCode = `// 场景 A：新建简单文本（推荐入门）
const text = new HtmlText({
  x: 120,
  y: 80,
  content: '双击此处编辑',
  fontSize: 24,
  color: '#e74c3c',
  editable: true,
  draggable: true,
})
app.tree.add(text)`;

const initScenarioFullStyleCode = `// 场景 B：新建带完整样式 + 自定义字体
const fontFamily = '"Dancing Script", cursive'
const fontBase64 = 'data:font/woff2;charset=utf-8;base64,...'

const text = new HtmlText({
  x: 100,
  y: 100,
  width: 400,              // 固定宽度，超出自动换行
  content: '标题文字',
  fontFamily,
  fontBase64,              // 与 fontFamily 配合，自动注入 @font-face
  fontSize: 32,
  fontWeight: 600,
  italic: true,
  lineHeight: 1.5,
  letterSpacing: 1,
  padding: [12, 16],
  color: '#2c3e50',
  textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
  textStroke: '2px #000',
  align: 'center',
  alignContent: 'center',
  editable: true,
  draggable: true,
})
app.tree.add(text)`;

const initScenarioTextCode = `// 场景 C：直接传入完整 HTML（业务已保存富文本）
const savedHtml = \`<div style="width:400px;padding:12px 16px;">
  <p class="ql-align-center" style="font-size:28px;line-height:1.5;">
    <span style="color:#e74c3c;">已保存的标题</span>
  </p>
</div>\`

const text = new HtmlText({
  x: 200,
  y: 150,
  text: savedHtml,         // 优先级高于 content
  editable: true,
  draggable: true,
})
app.tree.add(text)`;

const initScenarioJsonCode = `// 场景 D：Leafer JSON 回显（推荐纯 Leafer 项目）
const saved = await api.getTextElement(id)  // 之前 text.toJSON() 存下的数据

const text = new HtmlText(saved.data)     // 直接传入整份节点数据
app.tree.add(text)

// 更新已有节点
const existing = app.findId(saved.data.id)
existing?.set(saved.data)`;

const initScenarioSplitStorageCode = `// 场景 E：字体与内容分开存储
const contentHtml = '<div style="width:980px;height:294px;"><p class="ql-align-center" style="font-size:70px;font-family:YouSheBiaoTiHei-2;"><span style="-webkit-text-stroke:6px rgb(0,66,104);color:rgb(253,225,5);">标题</span></p></div>'

const fontStyle = '<style>@font-face{font-family:\\'YouSheBiaoTiHei-2\\';src:url(data:font/woff2;base64,...) format(\\'woff2\\');}</style>'

const text = new HtmlText({
  x: 100,
  y: 100,
  text: fontStyle + contentHtml,  // 拼接后作为 text 传入
  editable: true,
  draggable: true,
})
app.tree.add(text)`;

const initScenarioMultiFontCode = `// 字体库按 id 查出多条 base64，拼进一个 <style>
const fontStyle = \`<style>
@font-face { font-family: 'YouSheBiaoTiHei-2'; src: url(data:font/woff2;base64,AAA...) format('woff2'); }
@font-face { font-family: 'Dancing Script'; src: url(data:font/woff2;base64,BBB...) format('woff2'); }
</style>\`

// 正文 HTML：不同 span 引用不同 font-family
const contentHtml = \`<div style="width:400px;">
  <p style="font-size:28px;font-family:YouSheBiaoTiHei-2;">
    <span style="font-family:YouSheBiaoTiHei-2;">标题</span>
    <span style="font-family:'Dancing Script',cursive;">副标题</span>
  </p>
</div>\`

new HtmlText({
  text: fontStyle + contentHtml,
})`;

const fontFieldsGuide = [
  {
    name: 'fontFamily',
    type: 'string',
    role: '整段文字的默认字体名（写在 <p> 上）',
    when: '新建文本时指定全局字体；单字体场景'
  },
  {
    name: 'fontBase64',
    type: 'string',
    role: '与 fontFamily 配对的主字体文件（data URL）',
    when: '只有一个自定义字体时，和 fontFamily 一起传'
  },
  {
    name: 'text',
    type: 'string',
    role: '完整 HTML 输入，可包含 <style>@font-face</style> 和 span 局部样式',
    when: '回显多字体、局部字体、局部字号、跨系统导入时优先使用'
  },
  {
    name: 'base64font',
    type: 'string',
    role: 'setHTMLText("font", family, base64font) 的第三个参数',
    when: '用户在内嵌编辑器里给选区局部换自定义字体'
  }
];

const fontEchoModes = [
  {
    name: 'Leafer JSON',
    storage: '之前调过 htmlText.toJSON()',
    how: 'new HtmlText(savedJson)'
  },
  {
    name: '完整 HTML',
    storage: '一个字符串含 <style>多条@font-face + 内容',
    how: 'new HtmlText({ text: savedHtml })'
  },
  {
    name: '字体+内容拆开',
    storage: 'fontStyle 一列、contentHtml 一列',
    how: 'new HtmlText({ text: fontStyle + contentHtml })'
  },
  {
    name: '运行时选区换字体',
    storage: '编辑完成后保存 toJSON() 或完整 HTML',
    how: 'setHTMLText("font", family, base64)'
  }
];

const initScenarios = [
  {
    id: 'content',
    title: '场景 A：新建简单文本',
    mode: 'content',
    desc: '只写文字和基础样式，让插件自动包装 HTML。适合「插入文本框」按钮、空白画布新建。',
    tips: ['支持 content 里带 <strong>、<em> 等简单标签', '不传 content/text 时默认显示 Hello World'],
    lang: 'main.ts',
    code: initScenarioContentCode
  },
  {
    id: 'full-style',
    title: '场景 B：带完整样式 + 自定义字体',
    mode: 'content + 样式参数',
    desc: '创建时就把字体、描边、对齐、内边距等定好。fontBase64 会在初始 HTML 注入 @font-face。',
    tips: ['width > 0 时进入固定宽度模式，文字自动换行', 'italic: true 会用 <em> 包裹，保留斜体外溢宽度'],
    lang: 'main.ts',
    code: initScenarioFullStyleCode
  },
  {
    id: 'text-html',
    title: '场景 C：完整 HTML 回显',
    mode: 'text',
    desc: '业务系统只保存富文本 HTML 时使用。插件会反解字号、字体、padding、对齐等到 textData。',
    tips: [
      '保留 <p style>、<span style> 等内联样式，不要 strip 成纯文本',
      '若 HTML 只有 @font-face 没有 Quill CSS，插件会自动补全'
    ],
    lang: 'main.ts',
    code: initScenarioTextCode
  },
  {
    id: 'split-storage',
    title: '场景 E：字体与内容分开存储',
    mode: 'text = fontStyle + contentHtml',
    desc: '字体由字体管理器维护，正文单独存 HTML。回显时拼接为 text 字段。多字体时在一个 <style> 里写多条 @font-face。',
    tips: [
      '自定义字体必须补回对应 @font-face（几种字体写几条）',
      'contentHtml 里 <span style="font-family:..."> 要和 @font-face 名字一致',
      '显式传入的 width/fontSize 等参数优先级高于反解值'
    ],
    lang: 'main.ts',
    code: initScenarioSplitStorageCode
  },
  {
    id: 'json',
    title: '场景 D：Leafer JSON 回显',
    mode: 'toJSON()',
    desc: '保存过 HtmlText.toJSON() 或整棵画布 JSON 时，直接把数据传给构造函数或 set()。',
    tips: ['回显前仍需 htmlTextManage.init(app)', '这是最完整、最不易丢样式的方案'],
    lang: 'main.ts',
    code: initScenarioJsonCode
  }
];

const initParamGroups = [
  {
    title: '内容来源（二选一，text 优先）',
    params: [
      {
        name: 'content',
        type: 'string',
        default: '—',
        desc: '纯文本或简单标签；插件按样式参数自动包装 HTML'
      },
      {
        name: 'text',
        type: 'string',
        default: '—',
        desc: '完整 HTML；自动反解元数据，缺 CSS 时自动补全'
      }
    ]
  },
  {
    title: '文本样式',
    params: [
      { name: 'fontSize', type: 'number', default: '16', desc: '全局字号（像素）' },
      { name: 'fontFamily', type: 'string', default: '—', desc: '字体族名称' },
      {
        name: 'fontBase64',
        type: 'string',
        default: '—',
        desc: '主自定义字体 data URL，配合 fontFamily 注入 @font-face'
      },
      { name: 'fontWeight', type: 'number | string', default: '—', desc: '字重，如 600、"bold"' },
      { name: 'italic', type: 'boolean', default: 'false', desc: '全局斜体，用 <em> 包裹' },
      { name: 'lineHeight', type: 'number | string', default: '1.5', desc: '行高倍数或 "40px"' },
      { name: 'letterSpacing', type: 'number', default: '0', desc: '字间距（像素）' },
      { name: 'color', type: 'string', default: '—', desc: '文字颜色，写入 Quill 字符级 color' },
      { name: 'textShadow', type: 'string', default: '—', desc: 'CSS text-shadow' },
      { name: 'textStroke', type: 'string', default: '—', desc: 'CSS -webkit-text-stroke，如 "2px #000"' },
      {
        name: 'align',
        type: 'false | "center" | "right" | "justify" | "distribute"',
        default: 'false',
        desc: '水平对齐：左 / 中 / 右 / 两端 / 分散'
      },
      {
        name: 'alignContent',
        type: "'start' | 'center' | 'end'",
        default: "'start'",
        desc: '垂直对齐：顶 / 中 / 底'
      },
      { name: 'padding', type: 'number | string | number[]', default: '0', desc: '文本内边距' }
    ]
  },
  {
    title: '布局与节点行为',
    params: [
      { name: 'x / y', type: 'number', default: '0', desc: '画布坐标（像素）' },
      { name: 'width', type: 'number', default: 'auto', desc: '固定宽度模式，超出换行' },
      { name: 'height', type: 'number', default: 'auto', desc: '节点高度' },
      { name: 'editable', type: 'boolean', default: 'true', desc: '是否可双击进入编辑' },
      { name: 'draggable', type: 'boolean', default: 'true', desc: '是否可拖拽' },
      { name: 'fill', type: 'string', default: '—', desc: '节点背景色' },
      { name: 'opacity', type: 'number', default: '1', desc: '不透明度 0–1' },
      { name: 'rotation', type: 'number', default: '0', desc: '旋转角度' },
      { name: 'scaleX / scaleY', type: 'number', default: '1', desc: '缩放' },
      { name: 'lockRatio', type: 'boolean', default: 'false', desc: '锁定宽高比缩放' }
    ]
  }
];

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
    desc: '完整 HTML 字符串，直接用作文本内容，优先级高于 content。传入时会自动从 HTML 反解 width / height / fontSize / fontFamily / textStroke / padding 等基础元数据'
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
    desc: '主自定义字体的 Base64 / data URL。需配合 fontFamily 使用，插件会自动注入 @font-face'
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
    type: 'number | string',
    required: false,
    default: '1.5',
    desc: '行高倍数（如 1.5）或像素字符串（如 "40px"）'
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
    name: 'textStroke',
    type: 'string',
    required: false,
    default: '—',
    desc: 'CSS -webkit-text-stroke 格式的文字描边，例如 "2px #333"'
  },
  {
    name: 'align',
    type: 'false | "center" | "right" | "justify" | "distribute"',
    required: false,
    default: 'false',
    desc: '水平对齐：false=左对齐，"center"=居中，"right"=右对齐，"justify"=两端对齐，"distribute"=分散对齐'
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

const persistenceChoices = [
  {
    scene: '设计稿、画布页面、模板编辑器',
    save: 'app.tree.toJSON()',
    restore: 'app.tree.set(sceneJson)',
    note: '最完整，图形、图片、文本位置和样式一起恢复'
  },
  {
    scene: '只管理文本元素，但要保留局部样式',
    save: 'htmlText.toJSON()',
    restore: 'new HtmlText(textJson)',
    note: '推荐。局部字体、局部字号、描边、宽高都能保留'
  },
  {
    scene: '业务数据库只允许保存 HTML 字符串',
    save: 'inner HTMLText.text',
    restore: 'new HtmlText({ text })',
    note: '可用，但必须保留 style、p/span 内联样式和 @font-face'
  },
  {
    scene: '字体资源和正文分表保存',
    save: 'fontId + contentHtml',
    restore: 'new HtmlText({ text: fontStyle + contentHtml })',
    note: '字体 base64 大，单独存字体库；回显前按 fontId 拼 @font-face'
  },
  {
    scene: '只存纯文本',
    save: 'content',
    restore: 'new HtmlText({ content, ...style })',
    note: '只能恢复基础文字，无法恢复局部样式'
  }
];

const storageSeparationRules = [
  {
    name: '字体文件',
    storage: '字体库、对象存储或 CDN。数据库只存 fontId、family、url/base64 索引',
    reference: 'contentHtml 中保留 font-family；业务记录里保存用到的 fontId 列表',
    restore: '按 fontId 查字体，生成 <style>@font-face...</style>，再与 contentHtml 拼成 text'
  },
  {
    name: '图片 / 贴图',
    storage: '素材库、对象存储或 CDN',
    reference: '节点 JSON 里存 src、assetId、裁剪参数、位置和尺寸',
    restore: '先确保图片地址可访问，再恢复 Leafer Image / 节点 JSON'
  },
  {
    name: '业务模板',
    storage: '模板表或模板文件，作为可复用母版',
    reference: '文档只存 templateId 和用户覆盖的字段',
    restore: '加载模板 JSON，再把用户修改过的文本、图片、样式覆盖进去'
  },
  {
    name: '轻量样式',
    storage: '直接跟文本 JSON 或 HTML 一起存',
    reference: 'fontSize、color、textStroke、padding、局部 span style 等',
    restore: '直接 new HtmlText(json) 或 new HtmlText({ text })'
  },
  {
    name: '编辑器运行状态',
    storage: '不建议持久化',
    reference: 'Quill 实例、DOM、光标、临时选区不入库',
    restore: '重新 init 插件；保存内容本身即可'
  }
];

const saveChecklist = [
  {
    name: '是否退出内嵌编辑',
    why: '编辑中内容先在 Quill 里，退出后才稳定写回内部 HTMLText.text',
    action: '保存按钮触发前先关闭内嵌编辑器，或确认 updateHtmlText 已完成'
  },
  {
    name: '是否保留完整 HTML',
    why: '局部字体、局部字号、颜色、描边等都可能在 <span style> 里',
    action: '只存 HTML 时不要清洗成纯文本，不要丢 <style>、<p style>、<span style>'
  },
  {
    name: '字体资源是否可恢复',
    why: 'HTML 里只有 font-family 名字时，浏览器找不到自定义字体会回退',
    action: '保存 fontId / font-family 映射；回显时补齐对应 @font-face'
  },
  {
    name: '大资源是否重复入库',
    why: '字体 base64、图片 base64、素材 JSON 重复写入会让数据库迅速膨胀',
    action: '资源进素材库或 CDN，文本节点只保存引用'
  },
  {
    name: '是否保存运行时对象',
    why: 'Quill、DOM、selection、editor.target 刷新页面后都不可复用',
    action: '只保存 JSON、HTML、业务 id；页面加载后重新 init'
  },
  {
    name: '更新方式是否匹配',
    why: '用完整 set 会覆盖节点；只改 inner.text 才能保留外层布局',
    action: '整份数据用 set；只改文案用内部 HTMLText.text；样式交互用 setHTMLText'
  }
];

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

const updateStrategies = [
  {
    name: '整份节点数据',
    api: 'existing.set(textJson)',
    keep: '以 JSON 为准，位置、宽高、内部 HTML、textData 一起更新',
    note: '适合接口返回完整节点数据；注意不要误覆盖用户刚编辑但未保存的状态'
  },
  {
    name: '只替换富文本内容',
    api: 'inner.set({ text })',
    keep: '外层 HtmlText 的位置、缩放、旋转、拖拽状态保留',
    note: '适合模板变量替换、AI 改写文案、从业务字段重建 HTML'
  },
  {
    name: '工具栏改样式',
    api: 'setHTMLText(key, value)',
    keep: '按当前选中节点或 Quill 选区应用样式',
    note: '需要先选中节点；局部样式还需要双击进入编辑并拖选文字'
  },
  {
    name: '替换字体资源',
    api: 'new HtmlText({ text: fontStyle + contentHtml })',
    keep: 'HTML 内的 span 样式保留，字体由新的 @font-face 提供',
    note: '适合字体库迁移、字体 CDN 地址变化、base64 改 url'
  }
];

const updateExistingTextExample = `import { HtmlText, setHTMLText } from '@chenyomi/leafer-htmltext-edit'

// 方式 1：接口返回完整 HtmlText JSON，直接同步已有节点
const existing = app.findId(textId)
const nextJson = await api.getTextElement(textId)
existing?.set(nextJson.data)

// 方式 2：只替换内部 HTML，保留外层位置、宽高、旋转
const textBox = app.findId(textId) as HtmlText | undefined
const inner = textBox?.findOne('HTMLText')
inner?.set({
  text: nextFullHtml, // 必须是完整 HTML；自定义字体要带 @font-face
})

// 方式 3：工具栏交互，基于当前选中节点或选中文字改样式
app.editor.target = textBox
setHTMLText('fontSize', 32)
setHTMLText('color', '#ff5500')

// 方式 4：模板变量替换，只改内容，不动文本框布局
const html = textBox?.findOne('HTMLText')
const replacedText = html?.text.replace('{{title}}', form.title)
html?.set({ text: replacedText })`;

const localStylePersistenceExample = `import { setHTMLText, htmlTextManage, HtmlText } from '@chenyomi/leafer-htmltext-edit'

// 例子：用户给一段文字局部换字体后保存
// 1. 页面已经选中 HtmlText，并双击进入内嵌编辑器
// 2. 用户拖选几个字
setHTMLText('font', '"Dancing Script", cursive', 'data:font/woff2;base64,...')

// 局部字号是实验功能，需要先开启；局部字体不需要开启
htmlTextManage.setFeatures({ inlineFontSize: true })
setHTMLText('inlineFontSize', 42)
setHTMLText('letterSpacing', 4)

// 3. 让用户退出内嵌编辑器后保存外层 HtmlText 的 JSON
//    退出时插件会把 Quill 内容写回内部 HTMLText.text
const textJson = htmlText.toJSON()
await api.saveTextElement({
  id: htmlText.id,
  data: textJson,
})

// 4. 回显时不要重新拆 style + text，直接传回 JSON
const saved = await api.getTextElement(id)
const restored = new HtmlText(saved.data)
app.tree.add(restored)

// 如果业务只能保存 HTML，也请保存内部 HTMLText.text 的完整字符串
const inner = htmlText.findOne('HTMLText')
await api.saveHtml({
  id: htmlText.id,
  text: inner?.text,
})

const { text } = await api.getHtml(id)
app.tree.add(new HtmlText({ text }))`;

const htmlOnlyPersistenceExample = `import { HtmlText } from '@chenyomi/leafer-htmltext-edit'

// 推荐优先保存 Leafer JSON。只有业务已经拆分存储时，才使用这种方式：
// 1. contentHtml：保存内容 HTML，必须保留 <p style="..."> / <span style="...">
// 2. fontId：数据库只保存字体引用，不在每条文本里重复保存很大的 base64
// 3. fontStyle：回显时由字体管理器按 fontId / font-family 拼回 @font-face
const contentHtml = '<div style="width:980px;height:294px;display:flex;flex-direction:column;justify-content:flex-start;"><p class="ql-align-center" style="font-size:70px;line-height:1.5;font-family:YouSheBiaoTiHei-2;"><span style="-webkit-text-stroke:6px rgb(0,66,104);color:rgb(253,225,5);font-family:YouSheBiaoTiHei-2;">上海最新人事！</span></p></div>'

const fontIds = ['font_youshe_biaotihei_2']
const fonts = await fontApi.getFonts(fontIds)

// text 是 HtmlText 的完整 HTML 输入：
// - fontStyle 负责加载自定义字体，由字体库动态生成
// - contentHtml 负责保留字号、颜色、描边、宽高和对齐等样式
const fontStyle = fonts
  .map((font) => \`@font-face{font-family:'\${font.family}';src:url(\${font.urlOrBase64}) format('woff2');}\`)
  .join('')

const text = new HtmlText({
  x: 100,
  y: 100,
  editable: true,
  draggable: true,
  text: \`<style>\${fontStyle}</style>\` + contentHtml,
})

app.tree.add(text)

// 注意：
// 1. 不要把 contentHtml strip 成纯文字，否则无法恢复样式。
// 2. 使用自定义字体时必须补回对应 @font-face，否则会回退到系统字体。
// 3. 传入 text 后插件会自动解析 width/height/fontSize/fontFamily/textStroke/padding 等基础样式。
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
      'bold / italic / color / font 等：内嵌编辑态选中文字后生效',
      'fontSize / lineHeight / alignContent：选中节点即可，作用于全局',
      'inlineFontSize 需先 setFeatures({ inlineFontSize: true })',
      '局部 font / letterSpacing：内嵌编辑 + 选区；全选 font 会走全局路径'
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
    desc: '开启实验功能。目前仅 inlineFontSize（局部字号）需要显式开启；局部字体 font、局部字间距 letterSpacing 默认可用。',
    params: [
      {
        name: 'features',
        type: '{ inlineFontSize?: boolean }',
        required: true,
        desc: '实验功能开关。当前仅 inlineFontSize（局部字号）需开启'
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
    desc: '加粗。外框选中→整段全局字重；内嵌编辑→改 Quill 字符（无拖选时作用于全文）'
  },
  { key: 'italic', valueType: 'boolean（可省略）', desc: '斜体。规则同 bold' },
  { key: 'underline', valueType: 'boolean（可省略）', desc: '下划线。内嵌编辑时改字符；外框选中时作用于全文' },
  { key: 'strike', valueType: 'boolean（可省略）', desc: '删除线。规则同 underline' },
  {
    key: 'textCase',
    valueType: '省略 value',
    desc: '大小写转换。必须内嵌编辑且有拖选，否则不执行'
  },
  {
    key: 'script',
    valueType: '"super" | "sub"',
    desc: '上下标。内嵌编辑时改字符（无拖选→全文）；外框选中→全文'
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
    desc: '文字颜色。有拖选→只改选中字；无拖选→全文改色（内嵌编辑或外框选中均可）'
  },
  {
    key: 'fontSize',
    valueType: 'number',
    desc: '整段全局字号。选中节点即可，不需双击；会清除所有 inlineFontSize'
  },
  {
    key: 'inlineFontSize',
    valueType: 'number | string',
    desc: '【实验】局部字号。必须：setFeatures 开启 + 双击编辑 + 拖选一段字'
  },
  {
    key: 'fontWeight',
    valueType: 'number | string',
    desc: '整段全局字重。选中节点即可，例如 400、700、"bold"'
  },
  {
    key: 'lineHeight',
    valueType: 'number | string',
    desc: '整段全局行高。选中节点即可（倍数或 "40px"）'
  },
  {
    key: 'letterSpacing',
    valueType: 'number',
    desc: '有拖选→局部字间距 span；无拖选→整段全局 letterSpacing'
  },
  {
    key: 'textShadow',
    valueType: 'string',
    desc: '外框选中→整段全局阴影；内嵌编辑→改字符（无拖选时全文）'
  },
  {
    key: 'textStroke',
    valueType: 'string',
    desc: '外框选中→整段全局描边；内嵌编辑→改字符（无拖选时全文）'
  },
  {
    key: 'list',
    valueType: '"ordered" | "bullet"',
    desc: '列表。内嵌编辑时切换当前行；外框选中时作用于全文段落'
  },
  {
    key: 'font',
    valueType: 'string + base64font?',
    desc: '有拖选且非全选→局部字体 span；否则→整段 fontFamily。第三个参数用于注入自定义字体'
  }
];

const editScenarios = [
  {
    name: '① 外框选中',
    how: '单击文本，出现缩放框，未双击进编辑器',
    effect: 'fontSize / lineHeight / alignContent 等「整段属性」生效；bold 等会改 textData 全局'
  },
  {
    name: '② 内嵌编辑，无拖选',
    how: '双击进入编辑，光标闪但没有任何文字被拖蓝',
    effect: 'bold / color / textShadow 等会作用在全文；inlineFontSize / 局部 font 不生效'
  },
  {
    name: '③ 内嵌编辑，有拖选',
    how: '双击进入编辑，拖蓝一部分文字',
    effect: '可设局部字号 / 局部字体 / 局部字间距；bold / color 等只改选中部分'
  }
];

const formatCookbook = [
  { goal: '整段字号变大', needInner: '否', needSelection: '否', call: "setHTMLText('fontSize', 32)" },
  { goal: '几个字变大', needInner: '是', needSelection: '是', call: "setHTMLText('inlineFontSize', 48)" },
  { goal: '整段换字体', needInner: '否', needSelection: '否', call: "setHTMLText('font', family, base64)" },
  { goal: '几个字换字体', needInner: '是', needSelection: '是（勿全选）', call: "setHTMLText('font', family, base64)" },
  { goal: '几个字加粗', needInner: '是', needSelection: '是', call: "setHTMLText('bold')" },
  { goal: '整段加粗', needInner: '否', needSelection: '否', call: "setHTMLText('bold')" },
  { goal: '整段字间距', needInner: '否', needSelection: '否', call: "setHTMLText('letterSpacing', 2)" },
  { goal: '几个字间距', needInner: '是', needSelection: '是', call: "setHTMLText('letterSpacing', 4)" },
  { goal: '垂直居中', needInner: '否', needSelection: '否', call: "setHTMLText('alignContent', 'center')" }
];

const formatScopeMatrix = [
  {
    key: 'fontSize / lineHeight / fontWeight / padding / alignContent',
    outer: '整段 textData',
    innerNoSel: '整段 textData',
    innerSel: '整段 textData（忽略选区）'
  },
  {
    key: 'inlineFontSize',
    outer: '不生效',
    innerNoSel: '不生效',
    innerSel: '仅选区 span（需 setFeatures）'
  },
  {
    key: 'font',
    outer: '整段 fontFamily',
    innerNoSel: '整段 fontFamily',
    innerSel: '选区 span（全选→整段）'
  },
  {
    key: 'letterSpacing',
    outer: '整段 letterSpacing',
    innerNoSel: '整段 letterSpacing',
    innerSel: '选区 span'
  },
  {
    key: 'bold / italic',
    outer: 'textData 全局',
    innerNoSel: 'Quill 全文字符',
    innerSel: 'Quill 选区字符'
  },
  {
    key: 'underline / strike / color',
    outer: '全文字符',
    innerNoSel: '全文字符',
    innerSel: '选区字符'
  },
  {
    key: 'textCase',
    outer: '不执行',
    innerNoSel: '不执行',
    innerSel: '仅选区'
  },
  {
    key: 'textShadow / textStroke',
    outer: 'textData 全局',
    innerNoSel: 'Quill 全文字符',
    innerSel: 'Quill 选区字符'
  },
  { key: 'align', outer: '全文段落', innerNoSel: '光标所在段落', innerSel: '选区涉及段落' },
  { key: 'list', outer: '全文段落', innerNoSel: '当前行 toggle', innerSel: '当前行 toggle' }
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

// 5. 全局属性（选中节点即可，无需选区）
setHTMLText('fontSize', 24)       // 会清除局部字号
setHTMLText('lineHeight', 1.8)
setHTMLText('letterSpacing', 2)   // 无选区时全局；编辑中选区 → 局部

// 6. 局部样式（需内嵌编辑 + 文字选区）
setHTMLText('inlineFontSize', 42) // 需先 setFeatures({ inlineFontSize: true })
setHTMLText('font', '"Dancing Script", cursive', fontBase64) // 选区局部字体

// 7. 列表
setHTMLText('list', 'ordered')  // 有序列表
setHTMLText('list', 'bullet')   // 无序列表

// 8. 阴影 / 描边（编辑中选区 → 局部；否则全局）
setHTMLText('textShadow', '2px 2px 4px rgba(0,0,0,0.4)')
setHTMLText('textStroke', '1px #333333')

// 9. 运行时切换自定义字体
const fontFamily = '"Dancing Script", cursive'
const fontBase64 = 'data:font/woff2;charset=utf-8;base64,...'
setHTMLText('font', fontFamily, fontBase64)`;

const inlineFontUsageExample = `import { setHTMLText } from '@chenyomi/leafer-htmltext-edit'

// 1. 双击进入内嵌编辑器，选中一段文字
// 2. 局部换字体（第三个参数为 base64 / data URL）
const fontA = '"Dancing Script", cursive'
const fontABase64 = 'data:font/woff2;base64,...'
setHTMLText('font', fontA, fontABase64)

// 3. 全选或无选区时，同一 API 会改全局 fontFamily 并清除局部字体
setHTMLText('font', '"PingFang SC", sans-serif')`;

const inlineFontNotes = [
  {
    name: '@font-face 注入',
    desc: '每次 setHTMLText("font", ..., base64) 会让导出的 HTML 带上对应 @font-face；多种局部字体会形成多条 @font-face'
  },
  {
    name: '全选改字体',
    desc: '内嵌编辑下全选等同于全局改字体，会清除所有 span 局部 font-family'
  },
  {
    name: '编辑中写回',
    desc: '局部改字体时编辑过程中不写回 leaf.text，退出内嵌编辑后统一 updateHtmlText，避免混显'
  },
  {
    name: '只存 HTML 回显',
    desc: '只存 HTML 时必须保留 <style> 里的全部 @font-face；进入编辑时插件会把这些字体注入编辑器环境'
  }
];

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
    desc: '存在局部字号（hasInlineFontSize）时弧形排版会被跳过；建议统一字号后再做弧形'
  },
  {
    name: '锁定比例缩放',
    desc: '多字号文本不参与 lockRatio 下的全局 fontSize 收口缩放，避免局部字号比例错乱'
  },
  {
    name: '全局 fontSize',
    desc: '调用 fontSize 会清除所有 inlineFontSize，文本回到单字号模式'
  },
  {
    name: '与局部字体并存',
    desc: '同一文本可同时有局部字号与局部字体；各自保存在不同 span style 属性上'
  },
  {
    name: '多选批量',
    desc: 'inlineFontSize 只对内嵌编辑器内 Quill 选区生效，不支持多节点批量局部字号'
  },
  {
    name: '外部 HTML',
    desc: '插件导出 HTML 可恢复局部字号；第三方 HTML 尽量兼容，不保证完整还原'
  }
];

// ─── Changelog ────────────────────────────────────────────────────────────────
const changelog = [
  {
    version: '2.6.11',
    date: '2026-07',
    tag: 'latest',
    items: [
      '重构文档接入指南，按业务路线、初始化、更新、保存、回显、排错梳理使用链路',
      '补充资源拆分存储说明，明确字体、图片、模板等大资源不应重复写入文本数据',
      '新增已有节点更新策略、保存前检查清单和局部样式保存回显示例',
      '将 npm、实例源码、在线演示入口上移到文档顶部，并修正源码与演示链接'
    ]
  },
  {
    version: '2.6.10',
    date: '2026-06',
    tag: 'minor',
    items: [
      '支持多 @font-face 与局部字体 inlineFontFamily',
      '支持局部字间距 inlineLetterSpacing',
      '进入编辑时会注入 HTML 中的 @font-face',
      '@font-face 字体名含空格时自动加引号'
    ]
  },
  {
    version: '2.6.7',
    date: '2026-06',
    tag: 'patch',
    items: ['修改 __updateBoxBounds 方法，优化固定宽度模式下的内容高度测量逻辑']
  },
  {
    version: '2.6.6',
    date: '2026-06',
    tag: 'patch',
    items: [
      '引入新的文本描边处理函数，优化编辑器样式',
      '修复全局文本描边在排版格式化后的问题',
      '清理不必要的文本描边样式，确保编辑器渲染正确'
    ]
  },
  {
    version: '2.6.5',
    date: '2026-06',
    tag: 'patch',
    items: [
      '在 HtmlText.ts 中调整内容高度计算方式，确保在固定宽度模式下正确测量',
      '在 innerEditorSync.ts 中添加内容高度测量函数，处理固定高度布局',
      '在 addFontSizeToP.ts 中修正高度计算，使用 Math.ceil 确保准确性',
      '在 updateHtmlText.ts 中集成新的内容高度测量逻辑'
    ]
  },
  {
    version: '2.6.4',
    date: '2026-06',
    tag: 'patch',
    items: [
      '添加 syncInnerEditorDomToLeaf 函数以同步编辑器样式',
      '优化 TextEditTool 和 TextEditor 中的样式处理逻辑',
      '在 updateHtmlText 中集成样式同步功能',
      '移除不必要的全局字号处理，确保局部字号的独立性',
      '优化 HTML 文本解析，确保局部字号的正确识别',
      '调整样式处理，确保行高和字体大小的兼容性'
    ]
  },
  {
    version: '2.6.3',
    date: '2026-06',
    tag: 'patch',
    items: [
      '添加新版本 TGZ 文件',
      '更新 manifest.json 和 package.json 中的版本信息',
      '实现行高同步功能，确保文本编辑器内联元素的行高一致性',
      '优化字体大小处理逻辑，支持更复杂的格式化场景',
      '如果令牌缺失，输出错误信息并终止工作流',
      '更新 git push 命令以使用指定的远程 URL',
      '修复网站仓库访问令牌的使用方式',
      '将依赖安装命令从 npm ci 修改为 npm install'
    ]
  },
  {
    version: '2.6.2',
    date: '2026-06',
    tag: 'patch',
    items: [
      '添加行高应用功能，支持根据缩放比例设置行高',
      '引入逻辑字号解析功能，确保格式变更后正确应用字号',
      '优化 inlineFontSize 处理，确保 HTML 内容中的字号正确注册',
      '移除不必要的行高样式设置'
    ]
  },
  {
    version: '2.6.1',
    date: '2026-06',
    tag: 'patch',
    items: ['优化了数据处理逻辑', '增强了错误处理机制']
  },
  {
    version: '2.6.0',
    date: '2026-06',
    tag: 'patch',
    items: [
      '实现全局文本数据处理函数 createGlobalTextDataHandler',
      '增强布局处理功能，新增 handleAlign、handleAlignContent 和 handleList 函数',
      '增加文本样式处理函数，包括 handleBold、handleItalic 和 handleTextCase',
      '实现 HTML 文本更新功能，支持字体、大小、颜色等样式的动态更新',
      '引入新的辅助函数，简化 HTML 文本的粘贴和格式化操作',
      '注册自定义 Quill 格式，包括 fontWeight、textStroke 和 textShadow',
      '增强 HTML 文本节点的数据结构，支持更多样式属性',
      '在 `TextEditTool` 中集成了锁定比例缩放逻辑',
      '优化了文本描边和字号的处理，确保在缩放时保持一致性',
      '增强了对 inline 文本描边的支持',
      '在 utils.ts 中添加 scaleCSSValueByRatio 和 scaleCssPxValues 函数，用于处理 CSS px 值的缩放',
      '更新 TextEditor.ts 和 HtmlTextManage.ts，集成文本阴影的缩放逻辑',
      '优化文本编辑器的样式应用，确保文本阴影在缩放时正确显示'
    ]
  },
  {
    version: '2.5.12',
    date: '2026-06',
    tag: 'minor',
    items: [
      '支持设置和获取行内字体大小',
      '支持检测和同步列表项的字体大小',
      '支持缩放编辑器中的行内字体大小',
      '支持恢复原始行内字体大小',
      '新增 inlineTextStroke.ts 文件，提供行内文本描边的处理功能',
      '支持缩放编辑器中的文本描边',
      '支持恢复原始文本描边',
      '设置版本为 2.5.11',
      '指定最新版本和文件下载链接',
      '更新日期为 2026-06-15'
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
