import { computed } from 'vue';
import type { Locale } from './index';
import { useI18n } from './index';

const pricingZhCN = {
  caseTitle: 'Case',
  caseSubtitle: '基础付费版功能介绍',
  demoLabels: {
    verticalText: '一键竖排文字/段落竖排',
    outline: '轮廓线',
    bracket: '括号',
    arcText: '弧形文字',
    circle: '圆',
    linearCircle: '线性圆',
    star: '星星'
  },
  comingSoon: '其他功能（暂未开放）',
  playground: 'Playground',
  playgroundDesc: '基础付费版功能在线体验入口（不包含进阶高级版）',
  tryNow: '立即体验',
  earlyBird: '早鸟价',
  original: '原价',
  contactAuthor: '联系作者',
  contactModalTitle: '联系作者',
  contactModalDesc: '扫码添加微信，请备注「Leafer 插件授权」。',
  contactModalClose: '关闭',
  plans: {
    personal: {
      title: '个人版',
      features: [
        '基础版本功能',
        '1个主域名',
        '包含 www 子域名',
        '不含泛解析/多子域名',
        '本地开发环境',
        '支持离线永久授权',
        '提供编译包',
        '安装包永久授权',
        '一年内免费升级',
        '专属微信群'
      ]
    },
    pro: {
      title: '专业版',
      badge: '推荐商业项目使用',
      features: [
        '完整基础版本功能',
        '3个域名/子域名',
        '本地开发环境',
        '支持离线永久授权',
        '提供编译包',
        '安装包永久授权',
        '一年内免费升级',
        '优先技术支持'
      ]
    },
    enterprise: {
      title: '企业版',
      features: [
        '完整商业授权功能',
        '10个域名/子域名',
        '可支持泛域名授权',
        '本地开发环境',
        '支持离线永久授权',
        '提供编译包',
        '安装包永久授权',
        '一年内免费升级',
        '专属微信群/优先支持'
      ]
    }
  },
  tipsTitle: 'Tips',
  tips: [
    '1、购买后可在开发环境使用，无需立即绑定域名（域名访问的除外），但仍需安装授权许可证书。',
    '2、插件为一次性买断授权，下载的安装包可永久使用。也可以使用 npm 依赖包。',
    '3、购买后可获得 1 年内免费升级（视版本而定），包括新功能、兼容性更新及 bug 修复。免费期结束后，您可继续永久使用已安装版本，无任何功能限制。',
    '4、一个授权仅限 1 个项目使用。如在多个项目中使用，请购买相应数量的授权，批量需求请联系作者。违规使用（未授权跨项目使用）可能触发授权锁定或限制，本人保留追究权利。',
    '5、个人版的 1 个域名指 1 个主域名，例如 example.com，并包含 www.example.com；不包含 *.example.com 泛解析，也不包含 admin.example.com、app.example.com 等多个业务子域名。',
    '6、专业版按域名/子域名单独计数；企业版可按需支持 10 个域名或泛域名授权，适合 SaaS、多租户和企业内多个系统。',
    '7、安装包与源码包均内嵌了专属 license 水印标识，可用于追踪源用户身份，不可分发使用。',
    '8、插件为数字商品，购买后即视为交付使用，暂不支持退款。请在购买前确认功能符合需求，如有疑问欢迎联系本人。',
    '9、购买后享有专属微信交流群支持，专业版和企业版优先获得支持。'
  ],
  roiTitle: 'Leafer HTMLText Edit - 投资回报分析',
  roiSections: {
    roi: {
      title: '💰 投资回报 ROI',
      paragraphs: [
        '要自己实现同级别的富文本编辑功能，需要熟悉 Canvas 渲染、文本排版引擎、光标定位算法、字体测量机制，还得深入理解 Leafer UI 的渲染流程，可能要投入 2 个月左右甚至更久的开发资源。',
        '而我们封装好了所有成熟解法：',
        '一次授权，立刻可用，长期稳定更新',
        '买的是插件，省的是时间，赢的是体验'
      ]
    },
    cost: {
      title: '📊 成本对比',
      headers: ['指标', '自研成本', 'Leafer HTMLText Edit'],
      rows: [
        ['⏰ 开发时间', '约2个月', '✅ 即装即用'],
        ['💵 人力成本', '约6万\n(1人 × 3万 × 2个月)', '✅ 节省 99%'],
        [
          '🔧 技术难度',
          '高，需要深入理解：\nCanvas 文本渲染\n光标/选区算法\n富文本数据结构\nIME 输入法兼容\n字体度量与排版',
          '✅ 已完美封装'
        ],
        ['🛠️ 维护成本', '高，需持续修复 Bug\n跟进浏览器更新', '✅ 定期更新迭代'],
        ['🔌 兼容性/集成', '需深度适配 Leafer UI\n可能需要改动框架源码', '✅ 零侵入设计\n快速集成，10 分钟上手'],
        ['🎯 适用场景', '仅限特定项目\n难以复用', '✅ 场景广泛\n适配各类编辑器需求'],
        ['⚠️ 技术风险', '高，易踩坑：\n浏览器兼容性\n性能优化难题\n边界情况处理', '✅ 风险极低'],
        ['📈 ROI', '投入高，周期长\n机会成本巨大', '✅ 超高性价比\n节省大量开发时间与人力']
      ]
    },
    value: {
      title: '🎯 核心价值',
      paragraphs: [
        '技术门槛高',
        '自研富文本编辑器需要掌握：',
        'Canvas 文本渲染：字体度量、文本绘制、抗锯齿处理',
        '光标与选区：位置计算、拖拽选择、键盘导航',
        '富文本格式：HTML 解析、样式应用、嵌套结构',
        '输入法支持：IME 事件处理、组合文本',
        '性能优化：虚拟滚动、增量渲染、防抖节流'
      ]
    },
    timeline: {
      title: '开发周期长',
      headers: ['阶段', '预计时间', '主要工作'],
      rows: [
        ['需求分析', '0.5 周', '调研方案、技术选型'],
        ['基础架构', '1 周', 'Canvas 文本引擎、基础编辑'],
        ['富文本支持', '1.5 周', 'HTML 解析、样式系统'],
        ['交互优化', '2 周', '光标、选区、快捷键'],
        ['兼容性测试', '1 周', '浏览器兼容、Bug 修复'],
        ['性能调优', '1 周', '渲染优化、内存管理'],
        ['文档与测试', '1 周', '编写文档、单元测试'],
        ['总计', '8 周 ≈ 2 个月', '-']
      ]
    }
  }
} as const;

const pricingEnUS = {
  caseTitle: 'Case',
  caseSubtitle: 'Paid tier feature overview',
  demoLabels: {
    verticalText: 'One-click vertical text / paragraph layout',
    outline: 'Outline stroke',
    bracket: 'Brackets',
    arcText: 'Arc text',
    circle: 'Circle',
    linearCircle: 'Linear circle',
    star: 'Star'
  },
  comingSoon: 'More features (coming soon)',
  playground: 'Playground',
  playgroundDesc: 'Online trial for paid-tier basics (advanced tier not included)',
  tryNow: 'Try Now',
  earlyBird: 'Early bird',
  original: 'Original price',
  contactAuthor: 'Contact author',
  contactModalTitle: 'Contact author',
  contactModalDesc: 'Scan the WeChat QR code and note "Leafer plugin license".',
  contactModalClose: 'Close',
  plans: {
    personal: {
      title: 'Personal',
      features: [
        'Core tier features',
        '1 primary domain',
        'Includes www subdomain',
        'No wildcard / multiple subdomains',
        'Local development',
        'Offline perpetual license',
        'Compiled package included',
        'Perpetual install license',
        '1 year of free upgrades',
        'Private WeChat group'
      ]
    },
    pro: {
      title: 'Pro',
      badge: 'Recommended for commercial projects',
      features: [
        'Full core tier features',
        '3 domains / subdomains',
        'Local development',
        'Offline perpetual license',
        'Compiled package included',
        'Perpetual install license',
        '1 year of free upgrades',
        'Priority support'
      ]
    },
    enterprise: {
      title: 'Enterprise',
      features: [
        'Full commercial license',
        '10 domains / subdomains',
        'Wildcard domain support available',
        'Local development',
        'Offline perpetual license',
        'Compiled package included',
        'Perpetual install license',
        '1 year of free upgrades',
        'Private WeChat group / priority support'
      ]
    }
  },
  tipsTitle: 'Tips',
  tips: [
    '1. After purchase you can use the plugin in development without binding a domain immediately (except when accessed via domain), but you still need to install the license certificate.',
    '2. This is a one-time buyout license. Downloaded packages can be used forever. You may also use the npm dependency.',
    '3. You get 1 year of free upgrades (version-dependent), including new features, compatibility updates, and bug fixes. After that period you may keep using the installed version permanently with no feature limits.',
    '4. One license is for one project only. For multiple projects, purchase the corresponding number of licenses; contact the author for bulk needs. Unauthorized cross-project use may trigger license lock or restrictions.',
    '5. Personal tier "1 domain" means one primary domain, e.g. example.com including www.example.com; it does not include *.example.com wildcard or multiple business subdomains like admin.example.com.',
    '6. Pro tier counts each domain/subdomain separately; Enterprise can support 10 domains or wildcard licensing for SaaS, multi-tenant, or multiple internal systems.',
    '7. Install and source packages embed a unique license watermark for traceability; redistribution is not allowed.',
    '8. This is a digital product. Purchase constitutes delivery; refunds are not supported. Please confirm requirements before buying; contact the author if unsure.',
    '9. Purchasers get a private WeChat group; Pro and Enterprise tiers receive priority support.'
  ],
  roiTitle: 'Leafer HTMLText Edit — ROI Analysis',
  roiSections: {
    roi: {
      title: '💰 Return on investment',
      paragraphs: [
        'Building comparable rich-text editing in-house requires deep knowledge of Canvas rendering, text layout engines, caret positioning, font metrics, and Leafer UI integration — often 2+ months of engineering.',
        'We packaged proven solutions for you:',
        'One license, ready immediately, stable long-term updates',
        'You buy a plugin, save time, and win on experience'
      ]
    },
    cost: {
      title: '📊 Cost comparison',
      headers: ['Metric', 'Build in-house', 'Leafer HTMLText Edit'],
      rows: [
        ['⏰ Dev time', '~2 months', '✅ Ready to use'],
        ['💵 Labor cost', '~¥60k\n(1 dev × ¥30k × 2 months)', '✅ Save ~99%'],
        [
          '🔧 Technical depth',
          'High — requires:\nCanvas text rendering\nCaret/selection algorithms\nRich-text data structures\nIME compatibility\nFont metrics & layout',
          '✅ Fully packaged'
        ],
        ['🛠️ Maintenance', 'High — ongoing bugs\nbrowser updates', '✅ Regular updates'],
        [
          '🔌 Integration',
          'Deep Leafer UI adaptation\nmay require framework changes',
          '✅ Zero-intrusion design\n~10 min to integrate'
        ],
        ['🎯 Use cases', 'Single project\nhard to reuse', '✅ Broad scenarios\nfits many editor needs'],
        ['⚠️ Risk', 'High — browser quirks\nperformance traps\nedge cases', '✅ Very low risk'],
        ['📈 ROI', 'High cost, long cycle\nhuge opportunity cost', '✅ Excellent value\nsaves dev time & headcount']
      ]
    },
    value: {
      title: '🎯 Core value',
      paragraphs: [
        'High technical bar',
        'Building your own rich-text editor requires:',
        'Canvas text rendering: metrics, drawing, anti-aliasing',
        'Caret & selection: positioning, drag select, keyboard nav',
        'Rich text: HTML parsing, styles, nesting',
        'IME: composition events, combined text',
        'Performance: virtual scroll, incremental render, debounce/throttle'
      ]
    },
    timeline: {
      title: 'Long build cycle',
      headers: ['Phase', 'Estimate', 'Main work'],
      rows: [
        ['Requirements', '0.5 wk', 'Research, tech selection'],
        ['Foundation', '1 wk', 'Canvas text engine, basic editing'],
        ['Rich text', '1.5 wk', 'HTML parsing, style system'],
        ['Interaction', '2 wk', 'Caret, selection, shortcuts'],
        ['Compatibility', '1 wk', 'Browsers, bug fixes'],
        ['Performance', '1 wk', 'Render & memory tuning'],
        ['Docs & tests', '1 wk', 'Documentation, unit tests'],
        ['Total', '8 wk ≈ 2 months', '-']
      ]
    }
  }
} as const;

export type PricingContent = typeof pricingZhCN | typeof pricingEnUS;

const pricingByLocale: Record<Locale, PricingContent> = {
  'zh-CN': pricingZhCN,
  'en-US': pricingEnUS
};

export function usePricing() {
  const { locale } = useI18n();
  return computed(() => pricingByLocale[locale.value]);
}
