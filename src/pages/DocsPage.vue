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
          <p class="nav-group-title">{{ doc.ui.sidebar.guideTitle }}</p>
          <a
            v-for="item in doc.guideItems"
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
          <p class="nav-group-title">{{ doc.ui.sidebar.apiTitle }}</p>
          <a
            v-for="item in doc.apiItems"
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
          <p class="nav-group-title">{{ doc.ui.sidebar.moreTitle }}</p>
          <a
            v-for="item in doc.moreItems"
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
        <span>{{ doc.ui.sidebar.mobileNav }}</span>
      </button>

      <div class="docs-content">
        <!-- ─── 介绍 ─── -->
        <section :id="'introduction'" class="doc-section">
          <div class="section-anchor-wrap">
            <h1 class="doc-h1">
              {{ doc.ui.introduction.title }}
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
                <strong>{{ doc.ui.introduction.npmPackage }}</strong>
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
                <strong>{{ doc.ui.introduction.githubSource }}</strong>
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
                <strong>{{ doc.ui.introduction.liveDemo }}</strong>
                <span>chenyomi.github.io/leafer-htmltext-edit-view</span>
              </div>
              <i class="pi pi-arrow-up-right"></i>
            </a>
          </div>

          <p class="doc-lead">
            {{ doc.ui.introduction.lead }}
            <strong>{{ doc.ui.introduction.leadStrong }}</strong>
            {{ doc.ui.introduction.leadSuffix }}
          </p>

          <div class="doc-community-card">
            <div>
              <strong>{{ doc.ui.introduction.communityTitle }}</strong>
              <p>{{ doc.ui.introduction.communityDesc }}</p>
            </div>
            <router-link to="/community">{{ doc.ui.introduction.communityLink }}</router-link>
          </div>

          <div class="doc-feature-grid">
            <div class="doc-feature-card" v-for="f in doc.features" :key="f.title">
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
              {{ doc.ui.installation.title }}
              <a :href="'#installation'" class="anchor-link" @click.prevent="scrollTo('installation')">#</a>
            </h2>
          </div>

          <div class="callout callout-info">
            {{ doc.ui.installation.callout }}
            <strong>{{ doc.ui.installation.calloutNode }}</strong>
            {{ doc.ui.installation.calloutSuffix }}
          </div>

          <p class="doc-p">{{ doc.ui.installation.installVia }}</p>

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

          <h3 class="doc-h3">{{ doc.ui.installation.peerDepsTitle }}</h3>
          <p class="doc-p">{{ doc.ui.installation.peerDepsDesc }}</p>
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
              {{ doc.ui.quickStart.title }}
              <a :href="'#quick-start'" class="anchor-link" @click.prevent="scrollTo('quick-start')">#</a>
            </h2>
          </div>

          <h3 class="doc-h3" id="vite-config">{{ doc.ui.quickStart.viteTitle }}</h3>
          <p class="doc-p">{{ doc.ui.quickStart.viteDesc }}</p>
          <div class="code-block-wrap">
            <div class="code-lang-badge">vite.config.ts</div>
            <button class="copy-btn" @click="copyCode(doc.code.viteConfig, 'vite')">
              <i class="pi" :class="copiedKey === 'vite' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.viteConfig }}</code></pre>
          </div>

          <h3 class="doc-h3" id="webpack-config">{{ doc.ui.quickStart.webpackTitle }}</h3>
          <div class="code-block-wrap">
            <div class="code-lang-badge">webpack.config.js</div>
            <button class="copy-btn" @click="copyCode(doc.code.webpackConfig, 'webpack')">
              <i class="pi" :class="copiedKey === 'webpack' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.webpackConfig }}</code></pre>
          </div>
        </section>

        <!-- ─── 初始化指南 ─── -->
        <section :id="'init-guide'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              {{ doc.ui.initGuide.title }}
              <a :href="'#init-guide'" class="anchor-link" @click.prevent="scrollTo('init-guide')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            {{ doc.ui.initGuide.intro }}
            <strong>{{ doc.ui.initGuide.introTwoLayers }}</strong>
            {{ doc.ui.initGuide.introMiddle }}
            <code>HtmlText</code>
            {{ doc.ui.initGuide.introSuffix }}
          </p>

          <div class="init-layer-grid">
            <div class="init-layer-card" v-for="layer in doc.initLayers" :key="layer.step">
              <span class="init-layer-step">{{ layer.step }}</span>
              <strong>{{ layer.title }}</strong>
              <p>{{ layer.desc }}</p>
              <code class="init-layer-code">{{ layer.code }}</code>
            </div>
          </div>

          <h3 class="doc-h3" id="plugin-bootstrap">{{ doc.ui.initGuide.layer1Title }}</h3>
          <p class="doc-p">
            {{ doc.ui.initGuide.layer1Desc }}
            <code>setLicense</code>
            {{ doc.ui.initGuide.layer1FlowMiddle }}
            <code>App</code>
            →
            <code>htmlTextManage.init(app)</code>
            {{ doc.ui.initGuide.layer1Suffix }}
          </p>
          <div class="code-block-wrap">
            <div class="code-lang-badge">App.vue</div>
            <button class="copy-btn" @click="copyCode(doc.code.pluginBootstrapExample, 'plugin-bootstrap')">
              <i class="pi" :class="copiedKey === 'plugin-bootstrap' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.pluginBootstrapExample }}</code></pre>
          </div>

          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.step }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.call }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.stepParamDesc }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.pluginBootstrapSteps" :key="row.step">
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
            <strong>{{ doc.ui.initGuide.licenseCalloutTitle }}</strong>
            <code>setLicense</code>
            {{ doc.ui.initGuide.licenseCallout }}
            <code>htmlTextManage.init()</code>
            {{ doc.ui.initGuide.licenseCalloutBefore }}
            <code>localhost</code>
            {{ doc.ui.initGuide.licenseCalloutDev }}
          </div>

          <h3 class="doc-h3">{{ doc.ui.initGuide.businessQuestionTitle }}</h3>
          <p class="doc-p">{{ doc.ui.initGuide.businessQuestionDesc }}</p>
          <div class="params-table-wrap">
            <table class="params-table init-mode-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.goal }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.recommendedData }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.createRestore }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.saveAfterEdit }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.integrationRoutes" :key="row.goal">
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

          <h3 class="doc-h3" id="content-modes">{{ doc.ui.initGuide.contentModesTitle }}</h3>
          <p class="doc-p">
            {{ doc.ui.initGuide.contentModesDesc }}
            <code>HtmlText</code>
            {{ doc.ui.initGuide.contentModesMiddle }}
          </p>

          <div class="params-table-wrap">
            <table class="params-table init-mode-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.writeMode }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.scene }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.keyFields }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.behavior }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="mode in doc.initModes" :key="mode.name">
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
            <strong>{{ doc.ui.initGuide.priorityTitle }}</strong>
            <ul class="doc-ul">
              <li v-for="(rule, i) in doc.ui.initGuide.priorityRules" :key="i">{{ rule }}</li>
            </ul>
          </div>

          <h3 class="doc-h3">{{ doc.ui.initGuide.dontMixTitle }}</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.confusable }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.correctUnderstanding }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.suggestion }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.dataBoundaryRules" :key="row.name">
                  <td>
                    <strong>{{ row.name }}</strong>
                  </td>
                  <td class="param-desc">{{ row.meaning }}</td>
                  <td class="param-desc">{{ row.suggestion }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3" id="init-scenarios">{{ doc.ui.initGuide.scenariosTitle }}</h3>
          <p class="doc-p">
            {{ doc.ui.initGuide.scenariosDesc }}
            <a href="#font-echo-guide" @click.prevent="scrollTo('font-echo-guide')">
              {{ doc.ui.initGuide.scenariosLink }}
            </a>
            {{ doc.ui.initGuide.scenariosSuffix }}
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

          <h3 class="doc-h3" id="init-params">{{ doc.ui.initGuide.paramsTitle }}</h3>
          <p class="doc-p">
            <code>new HtmlText(data)</code>
            {{ doc.ui.initGuide.paramsDesc }}
            <code>IHtmlTextInputData</code>
            {{ doc.ui.initGuide.paramsMiddle }}
            <code>Box</code>
            {{ doc.ui.initGuide.paramsSuffix }}
            <a href="#api-htmltext" @click.prevent="scrollTo('api-htmltext')">{{ doc.ui.initGuide.paramsLink }}</a>
            {{ doc.ui.initGuide.paramsEnd }}
          </p>

          <div v-for="group in doc.initParamGroups" :key="group.title" class="init-param-group">
            <h4 class="init-param-group-title">{{ group.title }}</h4>
            <div class="params-table-wrap">
              <table class="params-table">
                <thead>
                  <tr>
                    <th>{{ doc.ui.shared.tableHeaders.param }}</th>
                    <th>{{ doc.ui.shared.tableHeaders.type }}</th>
                    <th>{{ doc.ui.shared.tableHeaders.default }}</th>
                    <th>{{ doc.ui.shared.tableHeaders.desc }}</th>
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
              {{ doc.ui.fontEchoGuide.title }}
              <a :href="'#font-echo-guide'" class="anchor-link" @click.prevent="scrollTo('font-echo-guide')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            <strong>{{ doc.ui.fontEchoGuide.introSingle }}</strong>
            <code>fontFamily + fontBase64</code>
            ;
            <strong>{{ doc.ui.fontEchoGuide.introMulti }}</strong>
            {{ doc.ui.fontEchoGuide.introHydrate }}
            —
            <strong>{{ doc.ui.fontEchoGuide.introNoPluginChange }}</strong>
            <code>HtmlText</code>
            <code>@font-face</code>
            <code>text</code>
          </p>

          <div class="callout callout-warning">
            <strong>{{ doc.ui.fontEchoGuide.whyNoUrlTitle }}</strong>
            {{ doc.ui.fontEchoGuide.whyNoUrlBody }}
          </div>

          <h3 class="doc-h3">{{ doc.ui.fontEchoGuide.fontParamsTitle }}</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.param }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.type }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.fontRole }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.fontWhen }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.fontFieldsGuide" :key="row.name">
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
            {{ doc.ui.fontEchoGuide.singleFontWarning }}
          </div>

          <h3 class="doc-h3">{{ doc.ui.fontEchoGuide.echoModesTitle }}</h3>
          <div class="params-table-wrap">
            <table class="params-table init-mode-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.writeMode }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.howYouStore }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.howToPass }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.fontEchoModes" :key="row.name">
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

          <h4 class="doc-h4">{{ doc.ui.fontEchoGuide.mode1Title }}</h4>
          <p class="doc-p">
            {{ doc.ui.fontEchoGuide.mode1Desc1 }}
            <strong>{{ doc.ui.fontEchoGuide.mode1Strong }}</strong>
          </p>
          <p class="doc-p">
            <strong>{{ doc.ui.fontEchoGuide.mode1Desc2 }}</strong>
            {{ doc.ui.fontEchoGuide.mode1Desc2Suffix }}
          </p>

          <h4 class="doc-h4">{{ doc.ui.fontEchoGuide.mode2Title }}</h4>
          <p class="doc-p">{{ doc.ui.fontEchoGuide.mode2Desc }}</p>

          <h4 class="doc-h4">{{ doc.ui.fontEchoGuide.mode3Title }}</h4>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(doc.code.initScenarioMultiFontCode, 'multi-font-echo')">
              <i class="pi" :class="copiedKey === 'multi-font-echo' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.initScenarioMultiFontCode }}</code></pre>
          </div>
          <p class="doc-p">{{ doc.ui.fontEchoGuide.mode3Note }}</p>

          <div class="callout callout-info">{{ doc.ui.fontEchoGuide.stableApiCallout }}</div>

          <h3 class="doc-h3">{{ doc.ui.fontEchoGuide.bizSplitTitle }}</h3>
          <p class="doc-p">{{ doc.ui.fontEchoGuide.bizSplitDesc }}</p>

          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.phase }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.businessStore }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.passToPlugin }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.multiFontWorkflowSteps" :key="row.phase">
                  <td>
                    <strong>{{ row.phase }}</strong>
                  </td>
                  <td class="param-desc">{{ row.store }}</td>
                  <td class="param-desc">{{ row.pass }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="callout callout-info">
            <strong>{{ doc.ui.fontEchoGuide.innerVsCanvasTitle }}</strong>
            {{ doc.ui.fontEchoGuide.innerVsCanvas }}
          </div>

          <h4 class="doc-h4">{{ doc.ui.fontEchoGuide.schemaTitle }}</h4>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(doc.code.multiFontStorageSchemaExample, 'multi-font-schema')">
              <i class="pi" :class="copiedKey === 'multi-font-schema' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.multiFontStorageSchemaExample }}</code></pre>
          </div>

          <h4 class="doc-h4">{{ doc.ui.fontEchoGuide.hydrateTitle }}</h4>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(doc.code.multiFontHydrateExample, 'multi-font-hydrate')">
              <i class="pi" :class="copiedKey === 'multi-font-hydrate' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.multiFontHydrateExample }}</code></pre>
          </div>

          <h4 class="doc-h4">{{ doc.ui.fontEchoGuide.optimizeTitle }}</h4>
          <ul class="doc-ul">
            <li v-for="(item, i) in doc.ui.fontEchoGuide.optimizeItems" :key="i">{{ item }}</li>
          </ul>

          <div class="callout callout-warning">
            <strong>{{ doc.ui.fontEchoGuide.dontDoTitle }}</strong>
            {{ doc.ui.fontEchoGuide.dontDo }}
          </div>
        </section>

        <!-- ─── 数据保存与回显 ─── -->
        <section :id="'data-persistence'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              {{ doc.ui.dataPersistence.title }}
              <a :href="'#data-persistence'" class="anchor-link" @click.prevent="scrollTo('data-persistence')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            <code>HtmlText</code>
            {{ doc.ui.dataPersistence.intro }}
            <a href="#content-modes" @click.prevent="scrollTo('content-modes')">
              {{ doc.ui.dataPersistence.introLink }}
            </a>
            {{ doc.ui.dataPersistence.introSuffix }}
          </p>

          <h3 class="doc-h3">{{ doc.ui.dataPersistence.chooseTitle }}</h3>
          <p class="doc-p">
            {{ doc.ui.dataPersistence.chooseDesc1 }}
            <strong>{{ doc.ui.dataPersistence.chooseSingle }}</strong>
            {{ doc.ui.dataPersistence.chooseSingleAction }}
            <strong>{{ doc.ui.dataPersistence.chooseMulti }}</strong>
            {{ doc.ui.dataPersistence.chooseMultiAction }}
            <a href="#font-echo-guide" @click.prevent="scrollTo('font-echo-guide')">
              {{ doc.ui.dataPersistence.chooseMultiLink }}
            </a>
            {{ doc.ui.dataPersistence.chooseMultiSuffix }}
          </p>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.yourBusinessData }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.whatToSave }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.howToRestore }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.fitLevel }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.persistenceChoices" :key="row.scene">
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

          <h3 class="doc-h3">{{ doc.ui.dataPersistence.whySplitTitle }}</h3>
          <p class="doc-p">{{ doc.ui.dataPersistence.whySplitDesc }}</p>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.resourceData }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.whereToStore }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.nodeStores }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.howToRestoreResource }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.storageSeparationRules" :key="row.name">
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
            <strong>{{ doc.ui.dataPersistence.judgeCalloutTitle }}</strong>
            {{ doc.ui.dataPersistence.judgeCallout }}
          </div>

          <h3 class="doc-h3">{{ doc.ui.dataPersistence.leaferSceneTitle }}</h3>
          <p class="doc-p">
            {{ doc.ui.dataPersistence.leaferSceneDesc }}
            <a href="#font-echo-guide" @click.prevent="scrollTo('font-echo-guide')">
              {{ doc.ui.dataPersistence.leaferSceneLink }}
            </a>
            {{ doc.ui.dataPersistence.leaferSceneEnd }}
          </p>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(doc.code.scenePersistenceExample, 'scene-persistence')">
              <i class="pi" :class="copiedKey === 'scene-persistence' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.scenePersistenceExample }}</code></pre>
          </div>

          <h3 class="doc-h3">{{ doc.ui.dataPersistence.mixedTitle }}</h3>
          <p class="doc-p">{{ doc.ui.dataPersistence.mixedDesc }}</p>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(doc.code.textPersistenceExample, 'text-persistence')">
              <i class="pi" :class="copiedKey === 'text-persistence' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.textPersistenceExample }}</code></pre>
          </div>

          <h3 class="doc-h3">{{ doc.ui.dataPersistence.updateTitle }}</h3>
          <p class="doc-p">{{ doc.ui.dataPersistence.updateDesc }}</p>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.whatToUpdate }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.entry }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.whatKept }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.notes }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.updateStrategies" :key="row.name">
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
            <button class="copy-btn" @click="copyCode(doc.code.updateExistingTextExample, 'update-existing-text')">
              <i class="pi" :class="copiedKey === 'update-existing-text' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.updateExistingTextExample }}</code></pre>
          </div>

          <h3 class="doc-h3">{{ doc.ui.dataPersistence.localStyleTitle }}</h3>
          <p class="doc-p">{{ doc.ui.dataPersistence.localStyleDesc }}</p>
          <div class="code-block-wrap">
            <button
              class="copy-btn"
              @click="copyCode(doc.code.localStylePersistenceExample, 'local-style-persistence')"
            >
              <i class="pi" :class="copiedKey === 'local-style-persistence' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.localStylePersistenceExample }}</code></pre>
          </div>

          <h3 class="doc-h3">{{ doc.ui.dataPersistence.htmlOnlyTitle }}</h3>
          <p class="doc-p">
            {{ doc.ui.dataPersistence.htmlOnlyDesc }}
            <a href="#init-scenarios" @click.prevent="scrollTo('init-scenarios')">
              {{ doc.ui.dataPersistence.htmlOnlyLink }}
            </a>
            {{ doc.ui.dataPersistence.htmlOnlyEnd }}
          </p>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(doc.code.htmlOnlyPersistenceExample, 'html-only-persistence')">
              <i class="pi" :class="copiedKey === 'html-only-persistence' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.htmlOnlyPersistenceExample }}</code></pre>
          </div>

          <h3 class="doc-h3">{{ doc.ui.dataPersistence.multiFontHtmlTitle }}</h3>
          <p class="doc-p">{{ doc.ui.dataPersistence.multiFontHtmlDesc }}</p>
          <ul class="doc-ul">
            <li v-for="(item, i) in doc.ui.dataPersistence.multiFontHtmlItems" :key="i">{{ item }}</li>
          </ul>

          <div class="callout callout-warning">{{ doc.ui.dataPersistence.saveWarning }}</div>

          <h3 class="doc-h3">{{ doc.ui.dataPersistence.checklistTitle }}</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.checkItem }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.whyImportant }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.recommendedAction }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.saveChecklist" :key="row.name">
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
              {{ doc.ui.editingGuide.title }}
              <a :href="'#editing-guide'" class="anchor-link" @click.prevent="scrollTo('editing-guide')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            {{ doc.ui.editingGuide.intro }}
            <strong>{{ doc.ui.editingGuide.introLeafer }}</strong>
            {{ doc.ui.editingGuide.introAnd }}
            <strong>{{ doc.ui.editingGuide.introQuill }}</strong>
            {{ doc.ui.editingGuide.introSuffix }}
          </p>

          <h3 class="doc-h3" id="editing-layers">{{ doc.ui.editingGuide.layersTitle }}</h3>
          <p class="doc-p">{{ doc.ui.editingGuide.layersDesc }}</p>
          <ol class="doc-ol">
            <li v-for="(layer, i) in doc.ui.editingGuide.layers" :key="i">{{ layer }}</li>
          </ol>

          <div class="callout callout-info">
            <strong>{{ doc.ui.editingGuide.mnemonicTitle }}</strong>
            {{ doc.ui.editingGuide.mnemonic }}
          </div>

          <h3 class="doc-h3" id="editing-interaction">{{ doc.ui.editingGuide.interactionTitle }}</h3>
          <p class="doc-p">{{ doc.ui.editingGuide.interactionDesc }}</p>
          <ul class="doc-ul">
            <li v-for="(item, i) in doc.ui.editingGuide.interactionItems" :key="i">{{ item }}</li>
          </ul>

          <h3 class="doc-h3" id="editing-naming">{{ doc.ui.editingGuide.namingTitle }}</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.name }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.type }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.meaning }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.commonMisuse }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.ui.editingGuide.namingRows" :key="row.name">
                  <td>
                    <code>{{ row.name }}</code>
                  </td>
                  <td>{{ row.type }}</td>
                  <td class="param-desc">{{ row.meaning }}</td>
                  <td class="param-desc">{{ row.misuse }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="callout callout-warning">
            <strong>{{ doc.ui.editingGuide.namingWarningTitle }}</strong>
            {{ doc.ui.editingGuide.namingWarning }}
          </div>

          <h3 class="doc-h3" id="editing-open-inner">{{ doc.ui.editingGuide.openInnerTitle }}</h3>
          <p class="doc-p">{{ doc.ui.editingGuide.openInnerDesc }}</p>
          <div class="code-block-wrap">
            <div class="code-lang-badge">{{ doc.ui.editingGuide.openInnerBadge }}</div>
            <button class="copy-btn" @click="copyCode(doc.code.openInnerEditorExample, 'open-inner-editor')">
              <i class="pi" :class="copiedKey === 'open-inner-editor' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.openInnerEditorExample }}</code></pre>
          </div>
          <p class="doc-p">{{ doc.ui.editingGuide.openInnerPointsTitle }}</p>
          <ul class="doc-ul">
            <li v-for="(point, i) in doc.ui.editingGuide.openInnerPoints" :key="i">{{ point }}</li>
          </ul>

          <h3 class="doc-h3" id="editing-quill">{{ doc.ui.editingGuide.quillTitle }}</h3>
          <p class="doc-p">{{ doc.ui.editingGuide.quillDesc }}</p>
          <ul class="doc-ul">
            <li v-for="(item, i) in doc.ui.editingGuide.quillItems" :key="i">{{ item }}</li>
          </ul>

          <h3 class="doc-h3" id="editing-faq">{{ doc.ui.editingGuide.faqTitle }}</h3>
          <div v-for="item in doc.editingFaq" :key="item.q" class="faq-block">
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
              {{ doc.ui.apiHtmlText.title }}
              <a :href="'#api-htmltext'" class="anchor-link" @click.prevent="scrollTo('api-htmltext')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            <code>HtmlText</code>
            {{ doc.ui.apiHtmlText.intro }}
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
            {{ doc.ui.apiHtmlText.paramsTitle }}
            <code>IHtmlTextInputData</code>
          </h3>
          <p class="doc-p">{{ doc.ui.apiHtmlText.paramsSubtitle }}</p>

          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.paramName }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.type }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.required }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.default }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.desc }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in doc.htmlTextParams" :key="p.name">
                  <td>
                    <code>{{ p.name }}</code>
                  </td>
                  <td>
                    <span class="type-badge">{{ p.type }}</span>
                  </td>
                  <td>
                    <span :class="p.required ? 'required-badge' : 'optional-badge'">
                      {{ p.required ? doc.ui.shared.badges.required : doc.ui.shared.badges.optional }}
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

          <h3 class="doc-h3">{{ doc.ui.apiHtmlText.exampleTitle }}</h3>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(doc.code.htmlTextExample, 'ht-example')">
              <i class="pi" :class="copiedKey === 'ht-example' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.htmlTextExample }}</code></pre>
          </div>
        </section>

        <!-- ─── API: HtmlTextManage ─── -->
        <section :id="'api-manage'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              {{ doc.ui.apiManage.title }}
              <a :href="'#api-manage'" class="anchor-link" @click.prevent="scrollTo('api-manage')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            <code>HtmlTextManage</code>
            {{ doc.ui.apiManage.intro }}
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
                    <th>{{ doc.ui.shared.tableHeaders.paramName }}</th>
                    <th>{{ doc.ui.shared.tableHeaders.type }}</th>
                    <th>{{ doc.ui.shared.tableHeaders.required }}</th>
                    <th>{{ doc.ui.shared.tableHeaders.desc }}</th>
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
                        {{ p.required ? doc.ui.shared.badges.required : doc.ui.shared.badges.optional }}
                      </span>
                    </td>
                    <td class="param-desc">{{ p.desc }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="method.returns" class="returns-block">
              <span class="returns-label">{{ doc.ui.shared.returnsLabel }}</span>
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
              {{ doc.ui.apiSetHtml.title }}
              <a :href="'#api-sethtml'" class="anchor-link" @click.prevent="scrollTo('api-sethtml')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            <code>setHTMLText</code>
            {{ doc.ui.apiSetHtml.intro }}
            <a href="#api-experimental" @click.prevent="scrollTo('api-experimental')">
              {{ doc.ui.apiSetHtml.introLink }}
            </a>
            {{ doc.ui.apiSetHtml.introSuffix }}
          </p>

          <div class="callout callout-info">
            <strong>{{ doc.ui.apiSetHtml.quickNoteTitle }}</strong>
            {{ doc.ui.apiSetHtml.quickNote }}
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

          <h3 class="doc-h3">{{ doc.ui.apiSetHtml.signatureTitle }}</h3>
          <div class="code-block-wrap">
            <pre class="code-block"><code>setHTMLText(key: string, value?: any, base64font?: string): void</code></pre>
          </div>

          <h3 class="doc-h3">{{ doc.ui.apiSetHtml.paramsTitle }}</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.paramName }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.type }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.required }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.desc }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in doc.ui.apiSetHtml.setHtmlParams" :key="p.name">
                  <td>
                    <code>{{ p.name }}</code>
                  </td>
                  <td>
                    <span class="type-badge">{{ p.type }}</span>
                  </td>
                  <td>
                    <span :class="p.required ? 'required-badge' : 'optional-badge'">
                      {{ p.required ? doc.ui.shared.badges.required : doc.ui.shared.badges.optional }}
                    </span>
                  </td>
                  <td class="param-desc">{{ p.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3">{{ doc.ui.apiSetHtml.keysTitle }}</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.key }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.valueType }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.desc }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="k in doc.setHtmlTextKeys" :key="k.key">
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

          <h3 class="doc-h3">{{ doc.ui.apiHtmlText.exampleTitle }}</h3>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(doc.code.setHtmlTextExample, 'sethtml-ex')">
              <i class="pi" :class="copiedKey === 'sethtml-ex' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.setHtmlTextExample }}</code></pre>
          </div>
        </section>

        <!-- ─── API: 局部与全局样式 ─── -->
        <section :id="'api-experimental'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              {{ doc.ui.apiExperimental.title }}
              <a :href="'#api-experimental'" class="anchor-link" @click.prevent="scrollTo('api-experimental')">#</a>
            </h2>
          </div>

          <p class="doc-p">
            <code>setHTMLText</code>
            {{ doc.ui.apiExperimental.intro }}
          </p>
          <ol class="doc-ol">
            <li v-for="(step, i) in doc.ui.apiExperimental.steps" :key="i">{{ step }}</li>
          </ol>

          <h3 class="doc-h3">{{ doc.ui.apiExperimental.scenariosTitle }}</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.scenario }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.howYouOperate }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.apiEffect }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.editScenarios" :key="row.name">
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
            <strong>{{ doc.ui.apiExperimental.pitfallsTitle }}</strong>
            <ul class="doc-ul">
              <li v-for="(pitfall, i) in doc.ui.apiExperimental.pitfalls" :key="i">{{ pitfall }}</li>
            </ul>
          </div>

          <h3 class="doc-h3">{{ doc.ui.apiExperimental.cookbookTitle }}</h3>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.whatYouWant }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.needInnerEdit }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.needSelection }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.call }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.formatCookbook" :key="row.goal">
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

          <h3 class="doc-h3">{{ doc.ui.apiExperimental.matrixTitle }}</h3>
          <p class="doc-p">{{ doc.ui.apiExperimental.matrixDesc }}</p>
          <div class="params-table-wrap format-matrix-wrap">
            <table class="params-table format-matrix-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.key }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.outerSelected }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.innerNoSelection }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.innerWithSelection }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in doc.formatScopeMatrix" :key="row.key">
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
            <strong>{{ doc.ui.apiExperimental.multiSelectCalloutTitle }}</strong>
            <code>setHTMLText</code>
            {{ doc.ui.apiExperimental.multiSelectCallout }}
          </div>

          <h3 class="doc-h3">{{ doc.ui.apiExperimental.inlineFontTitle }}</h3>
          <p class="doc-p">{{ doc.ui.apiExperimental.inlineFontDesc }}</p>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(doc.code.inlineFontUsageExample, 'inline-font-usage')">
              <i class="pi" :class="copiedKey === 'inline-font-usage' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.inlineFontUsageExample }}</code></pre>
          </div>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.scenario }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.inlineBehavior }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in doc.inlineFontNotes" :key="item.name">
                  <td>
                    <code>{{ item.name }}</code>
                  </td>
                  <td class="param-desc">{{ item.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3">{{ doc.ui.apiExperimental.letterSpacingTitle }}</h3>
          <p class="doc-p">{{ doc.ui.apiExperimental.letterSpacingDesc }}</p>

          <h3 class="doc-h3">{{ doc.ui.apiExperimental.inlineFontSizeTitle }}</h3>
          <div class="callout callout-warning">
            <code>inlineFontSize</code>
            {{ doc.ui.apiExperimental.inlineFontSizeWarning }}
          </div>
          <p class="doc-p">{{ doc.ui.apiExperimental.inlineFontSizeDesc }}</p>

          <h4 class="doc-h4">{{ doc.ui.apiExperimental.enableTitle }}</h4>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(doc.code.inlineFontSizeEnableExample, 'inline-size-enable')">
              <i class="pi" :class="copiedKey === 'inline-size-enable' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.inlineFontSizeEnableExample }}</code></pre>
          </div>

          <h4 class="doc-h4">{{ doc.ui.apiExperimental.usageTitle }}</h4>
          <div class="code-block-wrap">
            <button class="copy-btn" @click="copyCode(doc.code.inlineFontSizeUsageExample, 'inline-size-usage')">
              <i class="pi" :class="copiedKey === 'inline-size-usage' ? 'pi-check' : 'pi-copy'"></i>
            </button>
            <pre class="code-block"><code>{{ doc.code.inlineFontSizeUsageExample }}</code></pre>
          </div>

          <h4 class="doc-h4">{{ doc.ui.apiExperimental.limitsTitle }}</h4>
          <div class="params-table-wrap">
            <table class="params-table">
              <thead>
                <tr>
                  <th>{{ doc.ui.shared.tableHeaders.relatedCapability }}</th>
                  <th>{{ doc.ui.shared.tableHeaders.multiSizeBehavior }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in doc.inlineFontSizeLimits" :key="item.name">
                  <td>
                    <code>{{ item.name }}</code>
                  </td>
                  <td class="param-desc">{{ item.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="callout callout-info">{{ doc.ui.apiExperimental.exportCallout }}</div>
        </section>

        <!-- ─── API: 授权管理 ─── -->
        <section :id="'api-license'" class="doc-section">
          <div class="section-anchor-wrap">
            <h2 class="doc-h2">
              {{ doc.ui.apiLicense.title }}
              <a :href="'#api-license'" class="anchor-link" @click.prevent="scrollTo('api-license')">#</a>
            </h2>
          </div>

          <div class="callout callout-info">{{ doc.ui.apiLicense.callout }}</div>

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
                    <th>{{ doc.ui.shared.tableHeaders.paramName }}</th>
                    <th>{{ doc.ui.shared.tableHeaders.type }}</th>
                    <th>{{ doc.ui.shared.tableHeaders.required }}</th>
                    <th>{{ doc.ui.shared.tableHeaders.desc }}</th>
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
                        {{ p.required ? doc.ui.shared.badges.required : doc.ui.shared.badges.optional }}
                      </span>
                    </td>
                    <td class="param-desc">{{ p.desc }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="fn.returns" class="returns-block">
              <span class="returns-label">{{ doc.ui.shared.returnsLabel }}</span>
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
              {{ doc.ui.changelog.title }}
              <a :href="'#changelog'" class="anchor-link" @click.prevent="scrollTo('changelog')">#</a>
            </h2>
          </div>

          <div v-for="entry in doc.changelog" :key="entry.version" class="changelog-entry">
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
import { useI18n } from '@/i18n';
import { useDocsContent } from '@/i18n/docs';

useI18n();
const { doc, initScenarios, manageMethods, licenseFns, allSectionIds } = useDocsContent();

const packageManagers = ['npm', 'pnpm', 'yarn'] as const;
type PM = (typeof packageManagers)[number];
const activePackageManager = ref<PM>('npm');
const installCommands: Record<PM, string> = {
  npm: 'npm install @chenyomi/leafer-htmltext-edit',
  pnpm: 'pnpm add @chenyomi/leafer-htmltext-edit',
  yarn: 'yarn add @chenyomi/leafer-htmltext-edit'
};
const peerDepsInstall = `npm install leafer-ui @leafer-ui/core @leafer-in/editor @leafer-in/html quill`;

const activeSection = ref('introduction');
const isSidebarOpen = ref(false);
const mainRef = ref<HTMLElement | null>(null);
const copiedKey = ref('');

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
    isSidebarOpen.value = false;
    history.replaceState(null, '', '#' + id);
  }
};

const onScroll = () => {
  let current = allSectionIds.value[0];
  for (const id of allSectionIds.value) {
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
