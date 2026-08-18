<div align="center">

# Leafer HTMLText Editor

**Leafer UI 富文本编辑器插件** · 集成 Quill 2.0 · 支持 HTML 文本与完整样式控制

<br>

[![npm version](https://img.shields.io/npm/v/@chenyomi/leafer-htmltext-edit.svg?style=flat-square)](https://www.npmjs.com/package/@chenyomi/leafer-htmltext-edit)
[![npm downloads](https://img.shields.io/npm/dm/@chenyomi/leafer-htmltext-edit.svg?style=flat-square)](https://www.npmjs.com/package/@chenyomi/leafer-htmltext-edit)
[![license](https://img.shields.io/npm/l/@chenyomi/leafer-htmltext-edit.svg?style=flat-square)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<br>

[English](./README.en.md) · [📖 完整文档](https://chenyomi.github.io/leafer-htmltext-edit-website/docs) · [在线演示](https://chenyomi.github.io/leafer-htmltext-edit-view/) · [插件官网](https://chenyomi.github.io/leafer-htmltext-edit-website/)

</div>

---

## ✨ 特性

|                         |                                                                 |
| :---------------------- | :-------------------------------------------------------------- |
| 🎨 **富文本编辑**       | 基于 Quill 2.0，支持完整的富文本编辑能力                        |
| 📐 **文本样式**         | 字体、大小、颜色、对齐、行高、字间距等全面控制                  |
| 🔤 **多字体与局部字体** | 支持多 `@font-face`、选区局部换字体和自定义字体回显             |
| 🔡 **局部样式**         | 支持局部字体、局部字间距，并与全局 `textData` 分层保存          |
| 🧪 **实验室**           | 实验能力需 `setFeatures` 开启；目前为局部字号 `inlineFontSize`  |
| ∑ **公式拓展**          | 独立包 `@chenyomi/leafer-htmltext-formula`，内置 KaTeX 插入公式 |
| 🧹 **格式刷**           | 支持复制选区或整段 HtmlText 格式，并应用到其它选区或文本节点    |
| 🖊️ **行内描边**         | 支持逐字符 `textStroke` 行内描边效果                            |
| 💪 **行内字重**         | 支持选区级 `bold` / `fontWeight` 行内加粗控制                   |
| 📋 **列表支持**         | 有序列表、无序列表                                              |
| 🔐 **授权管理**         | 内置授权系统，本地开发不限制，上线有授权检测                    |
| 🔧 **TypeScript**       | 完整的类型定义支持                                              |
| 🚀 **现代化构建**       | ESM + CJS 双格式，支持 Tree Shaking                             |

---

## 🔗 相关链接

| 资源        | 链接                                                                                                                 |
| :---------- | :------------------------------------------------------------------------------------------------------------------- |
| 📖 完整文档 | [chenyomi.github.io/leafer-htmltext-edit-website/docs](https://chenyomi.github.io/leafer-htmltext-edit-website/docs) |
| 🌐 插件官网 | [chenyomi.github.io/leafer-htmltext-edit-website](https://chenyomi.github.io/leafer-htmltext-edit-website/)          |
| 🎮 在线演示 | [chenyomi.github.io/leafer-htmltext-edit-view](https://chenyomi.github.io/leafer-htmltext-edit-view/)                |
| 🐛 问题反馈 | [GitHub Issues](https://github.com/chenyomi/leafer-htmltext-edit-view/issues)                                        |

> 使用方式、API 说明及常见问题，请查阅 **[官方文档](https://chenyomi.github.io/leafer-htmltext-edit-website/docs)**。

---

## 📦 安装

```bash
npm install @chenyomi/leafer-htmltext-edit
```

或使用其他包管理器：

```bash
pnpm add @chenyomi/leafer-htmltext-edit
# yarn
yarn add @chenyomi/leafer-htmltext-edit
```

### Peer Dependencies

插件依赖以下包，请确保一并安装：

```bash
npm install leafer-ui @leafer-ui/core @leafer-in/editor @leafer-in/html quill
```

| 依赖                | 说明           |
| :------------------ | :------------- |
| `leafer-ui`         | Leafer UI 主包 |
| `@leafer-ui/core`   | Leafer 核心    |
| `@leafer-in/editor` | 编辑器扩展     |
| `@leafer-in/html`   | HTML 渲染支持  |
| `quill`             | 富文本引擎     |

### 拓展插件（可选）

公式能力由独立包提供，不装也不影响核心编辑器：

```bash
npm install @chenyomi/leafer-htmltext-edit @chenyomi/leafer-htmltext-formula
```

`@chenyomi/leafer-htmltext-formula` 为 MIT 免费插件，内置 KaTeX，需核心包 ≥ 2.6.15。导入后即可使用 `insertHTMLTextFormula` / `renderFormulaHtml`。

---

## 📄 许可证

本项目使用自定义商业许可证，详见 [LICENSE](./LICENSE)。

商业使用需授权，请联系开发者获取授权密钥。

---

<div align="center">

### 👤 作者

**chenyomi** · [408550179@qq.com](mailto:408550179@qq.com)

<br>

如果这个项目对你有帮助，请给个 ⭐️ Star！

</div>
