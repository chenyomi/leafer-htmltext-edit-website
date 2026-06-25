# Leafer HTMLText Editor

<p align="center">
  <img src="https://img.shields.io/npm/v/@chenyomi/leafer-htmltext-edit.svg" alt="npm version">
  <img src="https://img.shields.io/npm/dm/@chenyomi/leafer-htmltext-edit.svg" alt="npm downloads">
  <img src="https://img.shields.io/npm/l/@chenyomi/leafer-htmltext-edit.svg" alt="license">
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue.svg" alt="TypeScript">
</p>

一个强大的 Leafer UI 富文本编辑器插件，集成 Quill 2.0，支持 HTML 文本编辑和丰富的文本样式控制。

[English Document](./README.en.md) | [📖 完整文档](https://chenyomi.github.io/leafer-htmltext-edit-website/docs)

## ✨ 特性

- 🎨 **富文本编辑** - 基于 Quill 2.0，支持完整的富文本编辑功能
- 📐 **文本样式** - 字体、大小、颜色、对齐、行高、字间距等全面控制
- 🖊️ **行内描边** - 支持逐字符 `textStroke` 行内描边效果
- 💪 **行内字重** - 支持选区级 `bold` / `fontWeight` 行内加粗控制
- 📋 **列表支持** - 有序列表、无序列表
- 🔐 **授权管理** - 内置授权系统，本地开发不限制，上线有授权检测
- 🔧 **TypeScript** - 完整的类型定义支持
- 🚀 **现代化构建** - ESM + CJS 双格式，支持 Tree Shaking

## 🔗 链接

- [📖 完整文档](https://chenyomi.github.io/leafer-htmltext-edit-website/docs)
- [插件官网](https://chenyomi.github.io/leafer-htmltext-edit-website/)
- [在线演示](https://chenyomi.github.io/leafer-htmltext-edit-view/)
- [问题反馈](https://github.com/chenyomi/leafer-htmltext-edit-view/issues)

## 📦 安装

\`\`\`bash
npm install @chenyomi/leafer-htmltext-edit

# pnpm

pnpm add @chenyomi/leafer-htmltext-edit
\`\`\`

**Peer Dependencies:**

\`\`\`bash
npm install leafer-ui @leafer-ui/core @leafer-in/editor @leafer-in/html quill
\`\`\`

## 🚀 快速开始

\`\`\`typescript
import { App, Frame } from "leafer-ui";
import "leafer-editor";
import {
htmlTextManage,
setLicense,
setHTMLText,
HtmlText,
} from "@chenyomi/leafer-htmltext-edit";

// 1. 设置 License（必须在 init 之前）
const success = await setLicense("your-license-key");
if (!success) {
console.error("License validation failed");
}

// 2. 创建 Leafer App
const leafer = new App({ view: "leafer-view", fill: "#1a1a2e", editor: {} });

// 3. 初始化插件
htmlTextManage.init(leafer);

// 4. 创建画布容器（Frame）
const frame = new Frame({
width: window.innerWidth _ 0.7,
height: window.innerHeight _ 0.7,
x: window.innerWidth _ 0.15,
y: window.innerHeight _ 0.15,
fill: "#fff",
overflow: "show",
});
leafer.tree.add(frame);

// 5. 创建富文本节点
const text = new HtmlText({
editOuter: "TextEditTool",
editable: true,
draggable: true,
fontSize: 30,
lineHeight: 1.5,
letterSpacing: 0,
fontWeight: "bold",
alignContent: "start",
color: "#e74c3c",
content: "Hello World!",
});
frame.add(text);
\`\`\`

> 详细用法、API 文档及常见问题请访问 **[官方文档](https://chenyomi.github.io/leafer-htmltext-edit-website/docs)**。

## 📄 许可证

本项目使用自定义商业许可证，详见 [LICENSE](./LICENSE)。商业使用需授权，请联系开发者获取授权密钥。

## 👤 作者

**chenyomi** · Email: 408550179@qq.com

---

如果这个项目对你有帮助，请给个 ⭐️ Star！
