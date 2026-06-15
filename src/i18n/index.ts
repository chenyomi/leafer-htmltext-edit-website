import { computed, ref } from 'vue';

export type Locale = 'zh-CN' | 'en-US';

const STORAGE_KEY = 'app-locale';

const messages = {
  'zh-CN': {
    nav: {
      home: '首页',
      case: '案例',
      price: '价格',
      docs: '文档',
      community: '社区',
      changelog: '更新日志',
      loading: '加载中...',
      noData: '暂无数据',
      githubLogin: 'GitHub 登录',
      logout: '退出',
      starGithub: '在 GitHub 上点星'
    },
    common: {
      backHome: '返回首页',
      refresh: '刷新',
      close: '关闭',
      required: '必填',
      optional: '可选'
    },
    landing: {
      badge: 'Leafer 插件',
      subtitle: '一个强大的 Leafer UI 富文本编辑器插件，集成 Quill 2.0，支持 HTML 文本编辑和丰富的文本样式控制。',
      liveDemo: '查看在线演示',
      quickStart: '快速开始',
      communityTitle: '有问题或建议？来社区讨论',
      communityDesc: '反馈 Bug、提交功能建议、分享案例，也可以查看最新讨论。',
      enterCommunity: '进入社区'
    },
    footer: {
      description: '由 chenyomi 用心制作的 Leafer 插件网站',
      builtOn: '基于开源项目 Vue Bits 构建。'
    },
    sidebar: {
      usefulLinks: '常用链接',
      whoMadeThis: '原项目作者'
    },
    download: {
      eyebrow: '离线包',
      title: 'Leafer HTMLText Edit 离线包下载',
      description: '下载最新的 npm tgz 离线安装包。插件包本身可以公开下载，实际使用权限仍由运行时 License 校验控制。',
      loading: '正在读取最新版本信息...',
      readError: '读取下载信息失败',
      package: '包名',
      version: '版本',
      updated: '更新时间',
      downloadLatest: '下载最新 TGZ'
    },
    community: {
      eyebrow: '社区',
      title: '社区',
      description: '围绕 Leafer HTMLText Edit 交流问题、反馈 Bug、提交功能建议，也可以分享案例和使用经验。',
      newTopic: '发起讨论',
      loggedIn: '已登录',
      topics: '讨论',
      topicsTitle: '社区讨论',
      search: '搜索',
      searchPlaceholder: '搜索标题或内容',
      status: '状态',
      sort: '排序',
      mineOnly: '我的帖子',
      discussionsCount: '{count} 个讨论',
      allCategories: '全部分类',
      loadingPosts: '正在读取帖子...',
      emptyPosts: '暂无帖子，点击右上角发起第一个讨论。',
      pinned: '置顶',
      views: '{count} 浏览',
      replies: '回复',
      modalTitle: '发起讨论',
      closeCompose: '关闭发帖弹窗',
      loginToPost: '登录后发布帖子',
      loginToPostDesc: '使用 GitHub 身份发起问题、Bug 反馈或功能建议。发布后会展示你的 GitHub 头像、昵称和主页链接。',
      loginGithub: '使用 GitHub 登录',
      postAs: '以此身份发布',
      categoryAria: '帖子分类',
      titlePlaceholder: '标题，例如：padding 在编辑态显示不一致',
      contentPlaceholder: '描述你的问题、建议或案例...',
      posting: '发布中...',
      publishPost: '发布帖子',
      detailEyebrow: '讨论详情',
      detailTitle: '讨论详情',
      closeDetail: '关闭详情',
      loadingDetail: '正在读取详情...',
      missingPostTitle: '帖子不存在或读取失败',
      missingPostDesc: '可以返回列表重新选择一个讨论。',
      backList: '返回列表',
      unpin: '取消置顶',
      deletePost: '删除帖子',
      noReplies: '还没有回复。',
      delete: '删除',
      replyPlaceholder: '写下你的回复...',
      replying: '回复中...',
      submitReply: '提交回复',
      loginToReply: '登录 GitHub 后可以回复。',
      lastReply: '最后回复 {date}',
      postedAt: '发布于 {date}',
      titleError: '标题至少 2 个字符',
      contentError: '内容至少 10 个字符',
      replyError: '回复内容至少 2 个字符',
      checkPost: '请检查发帖内容',
      checkReply: '请检查回复内容',
      readPostsFailed: '读取帖子失败',
      readDetailFailed: '读取详情失败',
      postCreated: '帖子已发布',
      postFailed: '发布失败',
      replyCreated: '回复已提交',
      replyFailed: '回复失败',
      statusUpdated: '帖子状态已更新',
      statusFailed: '更新状态失败',
      pinnedDone: '已置顶',
      unpinnedDone: '已取消置顶',
      pinFailed: '置顶操作失败',
      confirmDeletePost: '确认删除这个帖子吗？',
      postDeleted: '帖子已删除',
      deletePostFailed: '删除帖子失败',
      confirmDeleteReply: '确认删除这条回复吗？',
      replyDeleted: '回复已删除',
      deleteReplyFailed: '删除回复失败',
      logoutDone: '已退出登录',
      logoutFailed: '退出失败'
    },
    categories: {
      all: '全部',
      question: '问题',
      bug: 'Bug',
      feature: '功能建议',
      showcase: '案例展示',
      discussion: '讨论',
      allDesc: '所有开放讨论',
      questionDesc: '使用疑问',
      bugDesc: '异常反馈',
      featureDesc: '新能力提议',
      showcaseDesc: '项目与效果',
      discussionDesc: '开放话题'
    },
    status: {
      all: '全部状态',
      open: '进行中',
      resolved: '已解决',
      closed: '已关闭'
    },
    sort: {
      recently_replied: '最新回复',
      latest: '最新发布',
      most_replied: '最多回复',
      most_viewed: '最多浏览'
    }
  },
  'en-US': {
    nav: {
      home: 'Home',
      case: 'Case',
      price: 'Price',
      docs: 'Docs',
      community: 'Community',
      changelog: 'Changelog',
      loading: 'Loading...',
      noData: 'No data yet',
      githubLogin: 'GitHub Login',
      logout: 'Logout',
      starGithub: 'Star on GitHub'
    },
    common: {
      backHome: 'Back to Home',
      refresh: 'Refresh',
      close: 'Close',
      required: 'Required',
      optional: 'Optional'
    },
    landing: {
      badge: 'Plugins for Leafer',
      subtitle:
        'A powerful rich text editor plugin for Leafer UI, powered by Quill 2.0, with HTML text editing and fine-grained style controls.',
      liveDemo: 'View Live Demo',
      quickStart: 'Quick Start',
      communityTitle: 'Questions or ideas? Join the community',
      communityDesc: 'Report bugs, request features, share showcases, and browse the latest discussions.',
      enterCommunity: 'Enter Community'
    },
    footer: {
      description: 'A Leafer plugin website crafted by chenyomi',
      builtOn: 'Built on top of the open-source project Vue Bits.'
    },
    sidebar: {
      usefulLinks: 'Useful Links',
      whoMadeThis: 'Who made this?'
    },
    download: {
      eyebrow: 'Offline Package',
      title: 'Download Leafer HTMLText Edit Offline Package',
      description:
        'Download the latest npm tgz package for offline installation. The package is public, while actual usage is still controlled by runtime License validation.',
      loading: 'Loading latest version information...',
      readError: 'Failed to read download information',
      package: 'Package',
      version: 'Version',
      updated: 'Updated',
      downloadLatest: 'Download Latest TGZ'
    },
    community: {
      eyebrow: 'Community',
      title: 'Community',
      description:
        'Discuss Leafer HTMLText Edit, report bugs, request features, and share showcases or usage experience.',
      newTopic: 'New Topic',
      loggedIn: 'Logged in',
      topics: 'Topics',
      topicsTitle: 'Community Discussions',
      search: 'Search',
      searchPlaceholder: 'Search title or content',
      status: 'Status',
      sort: 'Sort',
      mineOnly: 'My Posts',
      discussionsCount: '{count} discussions',
      allCategories: 'All Categories',
      loadingPosts: 'Loading posts...',
      emptyPosts: 'No posts yet. Start the first discussion from the top right.',
      pinned: 'Pinned',
      views: '{count} views',
      replies: 'Replies',
      modalTitle: 'New Topic',
      closeCompose: 'Close compose dialog',
      loginToPost: 'Log in to publish',
      loginToPostDesc:
        'Use your GitHub identity to ask questions, report bugs, or request features. Your GitHub avatar, name, and profile link will be shown after publishing.',
      loginGithub: 'Log in with GitHub',
      postAs: 'Posting as',
      categoryAria: 'Post category',
      titlePlaceholder: 'Title, e.g. padding looks inconsistent while editing',
      contentPlaceholder: 'Describe your question, suggestion, or showcase...',
      posting: 'Publishing...',
      publishPost: 'Publish Post',
      detailEyebrow: 'Topic Detail',
      detailTitle: 'Topic Detail',
      closeDetail: 'Close detail',
      loadingDetail: 'Loading details...',
      missingPostTitle: 'Post does not exist or failed to load',
      missingPostDesc: 'Return to the list and choose another discussion.',
      backList: 'Back to List',
      unpin: 'Unpin',
      deletePost: 'Delete Post',
      noReplies: 'No replies yet.',
      delete: 'Delete',
      replyPlaceholder: 'Write your reply...',
      replying: 'Replying...',
      submitReply: 'Submit Reply',
      loginToReply: 'Log in with GitHub to reply.',
      lastReply: 'Last reply {date}',
      postedAt: 'Posted {date}',
      titleError: 'Title must be at least 2 characters',
      contentError: 'Content must be at least 10 characters',
      replyError: 'Reply must be at least 2 characters',
      checkPost: 'Please check your post content',
      checkReply: 'Please check your reply',
      readPostsFailed: 'Failed to load posts',
      readDetailFailed: 'Failed to load details',
      postCreated: 'Post published',
      postFailed: 'Failed to publish',
      replyCreated: 'Reply submitted',
      replyFailed: 'Failed to reply',
      statusUpdated: 'Post status updated',
      statusFailed: 'Failed to update status',
      pinnedDone: 'Pinned',
      unpinnedDone: 'Unpinned',
      pinFailed: 'Pin action failed',
      confirmDeletePost: 'Delete this post?',
      postDeleted: 'Post deleted',
      deletePostFailed: 'Failed to delete post',
      confirmDeleteReply: 'Delete this reply?',
      replyDeleted: 'Reply deleted',
      deleteReplyFailed: 'Failed to delete reply',
      logoutDone: 'Logged out',
      logoutFailed: 'Failed to log out'
    },
    categories: {
      all: 'All',
      question: 'Question',
      bug: 'Bug',
      feature: 'Feature',
      showcase: 'Showcase',
      discussion: 'Discussion',
      allDesc: 'All open discussions',
      questionDesc: 'Usage questions',
      bugDesc: 'Bug reports',
      featureDesc: 'Feature ideas',
      showcaseDesc: 'Projects and effects',
      discussionDesc: 'Open topics'
    },
    status: {
      all: 'All Statuses',
      open: 'Open',
      resolved: 'Resolved',
      closed: 'Closed'
    },
    sort: {
      recently_replied: 'Recently Replied',
      latest: 'Latest',
      most_replied: 'Most Replied',
      most_viewed: 'Most Viewed'
    }
  }
} as const;

type MessageKey = keyof (typeof messages)['zh-CN'];

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'zh-CN';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'zh-CN' || saved === 'en-US') return saved;
  return window.navigator.language.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en-US';
}

const locale = ref<Locale>(getInitialLocale());

function resolveMessage(path: string) {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, messages[locale.value]);
}

export function setLocale(nextLocale: Locale) {
  locale.value = nextLocale;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
  }
}

export function useI18n() {
  const currentLocale = computed(() => locale.value);
  const isZh = computed(() => locale.value === 'zh-CN');

  const t = (path: string, params?: Record<string, string | number>) => {
    const message = resolveMessage(path);
    if (typeof message !== 'string') return path;

    return Object.entries(params ?? {}).reduce(
      (text, [key, value]) => text.split(`{${key}}`).join(String(value)),
      message
    );
  };

  const toggleLocale = () => setLocale(locale.value === 'zh-CN' ? 'en-US' : 'zh-CN');

  return {
    locale: currentLocale,
    isZh,
    t,
    setLocale,
    toggleLocale,
    messages: computed(() => messages[locale.value] as (typeof messages)[Locale]),
    section: <K extends MessageKey>(key: K) => computed(() => messages[locale.value][key])
  };
}

setLocale(locale.value);
