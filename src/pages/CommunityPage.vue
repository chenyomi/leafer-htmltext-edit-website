<template>
  <main class="community-page">
    <section class="community-hero">
      <div>
        <router-link class="back-link" to="/">Back to Home</router-link>
        <p class="eyebrow">Community</p>
        <h1>Leafer HTMLText Edit 社区</h1>
        <p class="description">用 GitHub 身份提问题、反馈 bug、提交功能建议，像轻量版 Issue 一样讨论。</p>
      </div>

      <div class="hero-actions">
        <a class="primary-button" href="#new-topic">发起讨论</a>
        <button v-if="!user" class="secondary-button" type="button" @click="login">GitHub 登录</button>
        <div v-else class="hero-user-card">
          <img v-if="user.avatar_url" :src="user.avatar_url" alt="" />
          <div>
            <span>已登录</span>
            <strong>{{ user.name || user.login }}</strong>
            <small>@{{ user.login }}</small>
          </div>
        </div>
      </div>
    </section>

    <section class="community-layout">
      <aside class="community-sidebar">
        <button
          v-for="item in categoryOptions"
          :key="item.value"
          class="category-button"
          :class="{ active: activeCategory === item.value }"
          type="button"
          @click="setCategory(item.value)"
        >
          <span>{{ item.label }}</span>
          <small>{{ item.desc }}</small>
        </button>
      </aside>

      <div class="community-main">
        <div v-if="message" class="notice" :class="{ error: messageType === 'error' }">{{ message }}</div>

        <section id="new-topic" class="compose-card">
          <div class="section-heading">
            <div>
              <p class="eyebrow">New Topic</p>
              <h2>发起讨论</h2>
            </div>
            <span class="status-pill">默认 open</span>
          </div>

          <div v-if="!user" class="login-panel">
            <div>
              <h3>登录后发布帖子</h3>
              <p>使用 GitHub 身份发起问题、Bug 反馈或功能建议。发布后会展示你的 GitHub 头像、昵称和主页链接。</p>
            </div>
            <button class="primary-button" type="button" @click="login">使用 GitHub 登录</button>
          </div>
          <form v-else class="post-form" @submit.prevent="createPost">
            <div class="composer-user">
              <img v-if="user.avatar_url" :src="user.avatar_url" alt="" />
              <div>
                <span>以此身份发布</span>
                <strong>{{ user.name || user.login }}</strong>
              </div>
              <button class="ghost-button" type="button" :disabled="authLoading" @click="handleLogout">退出</button>
            </div>
            <select v-model="draft.category" aria-label="帖子分类">
              <option
                v-for="item in categoryOptions.filter(item => item.value !== 'all')"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <input
              v-model="draft.title"
              type="text"
              placeholder="标题，例如：padding 在编辑态显示不一致"
              maxlength="120"
            />
            <textarea
              v-model="draft.content"
              placeholder="描述你的问题、建议或案例..."
              rows="6"
              maxlength="5000"
            ></textarea>
            <div class="form-actions">
              <span>{{ draft.content.length }}/5000</span>
              <button class="primary-button" type="submit" :disabled="submitting">
                {{ submitting ? '发布中...' : '发布帖子' }}
              </button>
            </div>
          </form>
        </section>

        <section class="posts-card">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Topics</p>
              <h2>社区帖子</h2>
            </div>
            <button class="ghost-button" type="button" @click="loadPosts">刷新</button>
          </div>

          <div v-if="loadingPosts" class="empty-state">正在读取帖子...</div>
          <div v-else-if="posts.length === 0" class="empty-state">暂无帖子，发起第一个讨论吧。</div>
          <div v-else class="post-list">
            <button
              v-for="post in posts"
              :key="post.id"
              class="post-item"
              :class="{ active: post.id === activePostId }"
              type="button"
              @click="openPost(post.id)"
            >
              <div class="post-title-row">
                <span class="category-tag">{{ categoryLabel(post.category) }}</span>
                <strong>{{ post.title }}</strong>
              </div>
              <p>{{ post.content }}</p>
              <div class="post-meta">
                <span>{{ post.login }}</span>
                <span>{{ formatDate(post.updated_at) }}</span>
                <span>{{ post.reply_count || 0 }} 回复</span>
              </div>
            </button>
          </div>
        </section>
      </div>

      <aside class="detail-panel">
        <div v-if="loadingDetail" class="empty-state">正在读取详情...</div>
        <div v-else-if="!activePost" class="detail-empty">
          <p class="eyebrow">Topic Detail</p>
          <h3>选择帖子查看详情</h3>
          <p>左侧帖子会在这里展示完整内容和回复。也可以直接发起一个新的讨论。</p>
          <a class="secondary-button" href="#new-topic">发起讨论</a>
        </div>
        <template v-else>
          <article class="detail-card">
            <div class="detail-header">
              <span class="category-tag">{{ categoryLabel(activePost.category) }}</span>
              <span class="status-pill">{{ activePost.status }}</span>
            </div>
            <h2>{{ activePost.title }}</h2>
            <div class="author-row">
              <img v-if="activePost.avatar_url" :src="activePost.avatar_url" alt="" />
              <a v-if="activePost.html_url" :href="activePost.html_url" target="_blank" rel="noreferrer">
                {{ activePost.name || activePost.login }}
              </a>
              <span v-else>{{ activePost.name || activePost.login }}</span>
              <small>{{ formatDate(activePost.created_at) }}</small>
            </div>
            <p class="detail-content">{{ activePost.content }}</p>
          </article>

          <section class="replies-card">
            <h3>回复</h3>
            <div v-if="replies.length === 0" class="empty-state compact">还没有回复。</div>
            <article v-for="reply in replies" :key="reply.id" class="reply-item">
              <div class="author-row">
                <img v-if="reply.avatar_url" :src="reply.avatar_url" alt="" />
                <a v-if="reply.html_url" :href="reply.html_url" target="_blank" rel="noreferrer">
                  {{ reply.name || reply.login }}
                </a>
                <span v-else>{{ reply.name || reply.login }}</span>
                <small>{{ formatDate(reply.created_at) }}</small>
              </div>
              <p>{{ reply.content }}</p>
            </article>

            <form v-if="user" class="reply-form" @submit.prevent="createReply">
              <textarea v-model="replyDraft" placeholder="写下你的回复..." rows="4" maxlength="5000"></textarea>
              <button class="primary-button" type="submit" :disabled="submittingReply">
                {{ submittingReply ? '回复中...' : '提交回复' }}
              </button>
            </form>
            <div v-else class="login-hint compact">登录 GitHub 后可以回复。</div>
          </section>
        </template>
      </aside>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { communityApi, type CommunityCategory, type CommunityPost, type CommunityReply } from '@/services/communityApi';
import { useAuth } from '@/composables/useAuth';

type CategoryFilter = CommunityCategory | 'all';

const route = useRoute();
const router = useRouter();
const { user, loading: authLoading, login, logout } = useAuth();

const categoryOptions: Array<{ value: CategoryFilter; label: string; desc: string }> = [
  { value: 'all', label: '全部', desc: '所有开放讨论' },
  { value: 'question', label: '问题', desc: '使用疑问' },
  { value: 'bug', label: 'Bug', desc: '异常反馈' },
  { value: 'feature', label: '功能建议', desc: '新能力提议' },
  { value: 'showcase', label: '案例展示', desc: '项目与效果' },
  { value: 'discussion', label: '讨论', desc: '开放话题' }
];

const posts = ref<CommunityPost[]>([]);
const activePost = ref<CommunityPost | null>(null);
const replies = ref<CommunityReply[]>([]);
const activeCategory = ref<CategoryFilter>('all');
const loadingPosts = ref(false);
const loadingDetail = ref(false);
const submitting = ref(false);
const submittingReply = ref(false);
const message = ref('');
const messageType = ref<'info' | 'error'>('info');
const replyDraft = ref('');

const draft = reactive<{
  title: string;
  content: string;
  category: CommunityCategory;
}>({
  title: '',
  content: '',
  category: 'question'
});

const activePostId = computed(() => {
  const id = route.params.postId;
  return typeof id === 'string' ? id : '';
});

function showMessage(text: string, type: 'info' | 'error' = 'info') {
  message.value = text;
  messageType.value = type;
  window.setTimeout(() => {
    if (message.value === text) message.value = '';
  }, 3600);
}

function categoryLabel(category: CommunityCategory) {
  return categoryOptions.find(item => item.value === category)?.label || category;
}

function formatDate(input: string) {
  if (!input) return '-';
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(input));
}

async function loadPosts() {
  loadingPosts.value = true;
  try {
    const result = await communityApi.listPosts({
      category: activeCategory.value === 'all' ? undefined : activeCategory.value,
      status: 'open'
    });
    posts.value = result.posts;
  } catch (error) {
    showMessage(error instanceof Error ? error.message : '读取帖子失败', 'error');
  } finally {
    loadingPosts.value = false;
  }
}

async function loadDetail(id: string) {
  if (!id) {
    activePost.value = null;
    replies.value = [];
    return;
  }

  loadingDetail.value = true;
  try {
    const result = await communityApi.getPost(id);
    activePost.value = result.post;
    replies.value = result.replies;
  } catch (error) {
    activePost.value = null;
    replies.value = [];
    showMessage(error instanceof Error ? error.message : '读取详情失败', 'error');
  } finally {
    loadingDetail.value = false;
  }
}

function setCategory(category: CategoryFilter) {
  activeCategory.value = category;
  loadPosts();
}

function openPost(id: string) {
  router.push({ name: 'community-detail', params: { postId: id } });
}

async function createPost() {
  if (!user.value) return;
  submitting.value = true;
  try {
    const result = await communityApi.createPost({
      title: draft.title,
      content: draft.content,
      category: draft.category
    });
    draft.title = '';
    draft.content = '';
    showMessage('帖子已发布');
    await loadPosts();
    openPost(result.id);
  } catch (error) {
    showMessage(error instanceof Error ? error.message : '发布失败', 'error');
  } finally {
    submitting.value = false;
  }
}

async function createReply() {
  if (!user.value || !activePostId.value) return;
  submittingReply.value = true;
  try {
    await communityApi.createReply(activePostId.value, { content: replyDraft.value });
    replyDraft.value = '';
    showMessage('回复已提交');
    await loadDetail(activePostId.value);
    await loadPosts();
  } catch (error) {
    showMessage(error instanceof Error ? error.message : '回复失败', 'error');
  } finally {
    submittingReply.value = false;
  }
}

async function handleLogout() {
  try {
    await logout();
    showMessage('已退出登录');
  } catch (error) {
    showMessage(error instanceof Error ? error.message : '退出失败', 'error');
  }
}

watch(activePostId, id => loadDetail(id), { immediate: true });

onMounted(async () => {
  await loadPosts();
});
</script>

<style scoped>
.community-page {
  min-height: 100vh;
  padding: 130px clamp(18px, 4vw, 56px) 80px;
  color: #ffffff;
  background:
    radial-gradient(circle at top left, rgba(92, 95, 255, 0.26), transparent 32%),
    radial-gradient(circle at top right, rgba(40, 220, 130, 0.16), transparent 28%), #050505;
}

.community-hero,
.community-layout {
  width: min(1200px, 100%);
  margin: 0 auto;
}

.community-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.back-link {
  color: rgba(255, 255, 255, 0.62);
  text-decoration: none;
}

.back-link:hover {
  color: #fff;
}

.eyebrow {
  margin: 28px 0 10px;
  color: #8b9cff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1,
h2,
h3 {
  margin: 0;
}

h1 {
  max-width: 780px;
  font-size: clamp(42px, 7vw, 76px);
  line-height: 1.02;
  letter-spacing: -0.06em;
}

.description {
  max-width: 680px;
  margin: 20px 0 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 17px;
  line-height: 1.8;
}

.hero-user-card,
.compose-card,
.posts-card,
.detail-card,
.replies-card,
.community-sidebar,
.detail-empty {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(18px);
}

.hero-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  min-width: 320px;
}

.hero-user-card,
.composer-user,
.author-row,
.section-heading,
.form-actions,
.detail-header,
.post-meta {
  display: flex;
  align-items: center;
}

.hero-user-card {
  gap: 12px;
  min-width: 240px;
  padding: 10px 14px 10px 10px;
  border-radius: 999px;
}

.composer-user {
  gap: 12px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.045);
}

.hero-user-card img,
.composer-user img,
.author-row img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}

.hero-user-card span,
.hero-user-card small,
.composer-user span,
.post-meta,
.author-row small {
  color: rgba(255, 255, 255, 0.52);
  font-size: 12px;
}

.hero-user-card strong,
.hero-user-card small,
.composer-user strong {
  display: block;
  margin-top: 2px;
}

.primary-button,
.ghost-button,
.category-button,
.post-item {
  cursor: pointer;
  border: none;
  font: inherit;
}

.primary-button,
.secondary-button,
.ghost-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  text-decoration: none;
  white-space: nowrap;
}

.primary-button {
  color: #050505;
  background: #ffffff;
  font-weight: 800;
}

.secondary-button {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.primary-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ghost-button {
  margin-left: auto;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.community-layout {
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr) 380px;
  gap: 18px;
  align-items: start;
}

.community-sidebar,
.compose-card,
.posts-card,
.detail-card,
.replies-card {
  border-radius: 24px;
  padding: 18px;
}

.community-sidebar {
  position: sticky;
  top: 120px;
  display: grid;
  gap: 10px;
}

.category-button {
  padding: 14px;
  border-radius: 16px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  text-align: left;
}

.category-button span,
.category-button small {
  display: block;
}

.category-button small {
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.45);
}

.category-button.active {
  background: linear-gradient(135deg, rgba(30, 160, 63, 0.5), rgba(24, 47, 255, 0.28));
}

.community-main {
  display: grid;
  gap: 18px;
}

.section-heading {
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.section-heading .eyebrow {
  margin: 0 0 6px;
}

.status-pill,
.category-tag {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
}

.status-pill {
  color: #b9ffc9;
  background: rgba(30, 160, 63, 0.18);
  border: 1px solid rgba(30, 160, 63, 0.28);
}

.category-tag {
  flex-shrink: 0;
  color: #cfd6ff;
  background: rgba(139, 156, 255, 0.16);
  border: 1px solid rgba(139, 156, 255, 0.24);
}

.login-hint,
.login-panel,
.empty-state,
.detail-empty,
.notice {
  padding: 18px;
  border-radius: 16px;
  color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.05);
}

.login-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.login-panel h3,
.detail-empty h3 {
  margin: 0 0 8px;
  color: #ffffff;
}

.login-panel p,
.detail-empty p {
  margin: 0;
  color: rgba(255, 255, 255, 0.64);
  line-height: 1.7;
}

.detail-empty {
  border-radius: 24px;
}

.detail-empty .eyebrow {
  margin-top: 0;
}

.detail-empty .secondary-button {
  margin-top: 18px;
}

.notice {
  border: 1px solid rgba(125, 249, 255, 0.28);
}

.notice.error {
  color: #ffb4b4;
  border-color: rgba(255, 100, 100, 0.32);
}

.compact {
  padding: 12px;
}

.post-form,
.reply-form {
  display: grid;
  gap: 12px;
}

select,
input,
textarea {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  outline: none;
  padding: 14px 16px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.28);
}

textarea {
  resize: vertical;
  line-height: 1.7;
}

.form-actions {
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.45);
  font-size: 13px;
}

.post-list {
  display: grid;
  gap: 12px;
}

.post-item {
  width: 100%;
  padding: 16px;
  border-radius: 18px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.045);
  text-align: left;
  transition:
    transform 0.18s ease,
    background 0.18s ease;
}

.post-item:hover,
.post-item.active {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.08);
}

.post-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.post-title-row strong {
  font-size: 17px;
}

.post-item p {
  display: -webkit-box;
  margin: 0 0 12px;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.66);
  line-height: 1.7;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.post-meta {
  gap: 12px;
}

.detail-panel {
  position: sticky;
  top: 120px;
  display: grid;
  gap: 18px;
}

.detail-header {
  justify-content: space-between;
  margin-bottom: 14px;
}

.detail-card h2 {
  font-size: 28px;
  line-height: 1.25;
}

.author-row {
  gap: 10px;
  margin: 16px 0;
}

.author-row a {
  color: #ffffff;
  font-weight: 700;
  text-decoration: none;
}

.detail-content,
.reply-item p {
  white-space: pre-wrap;
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.8;
}

.replies-card h3 {
  margin-bottom: 12px;
}

.reply-item {
  padding: 14px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.reply-form {
  margin-top: 14px;
}

@media (max-width: 1100px) {
  .community-layout {
    grid-template-columns: 190px minmax(0, 1fr);
  }

  .detail-panel {
    grid-column: 1 / -1;
    position: static;
  }
}

@media (max-width: 760px) {
  .community-page {
    padding: 104px 14px 48px;
  }

  .community-hero {
    align-items: stretch;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 18px;
  }

  h1 {
    font-size: clamp(34px, 12vw, 48px);
    letter-spacing: -0.045em;
  }

  .description {
    margin-top: 14px;
    font-size: 15px;
    line-height: 1.7;
  }

  .hero-actions {
    align-items: stretch;
    flex-direction: column;
    min-width: 0;
  }

  .hero-actions .primary-button,
  .hero-actions .secondary-button {
    width: 100%;
  }

  .hero-user-card {
    min-width: 0;
    width: 100%;
    border-radius: 20px;
  }

  .community-layout {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .community-sidebar {
    position: static;
    display: flex;
    gap: 10px;
    margin: 0 -14px;
    padding: 0 14px 4px;
    overflow-x: auto;
    border: none;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
    scroll-snap-type: x mandatory;
  }

  .community-sidebar::-webkit-scrollbar {
    display: none;
  }

  .category-button {
    flex: 0 0 auto;
    min-width: 128px;
    padding: 12px 14px;
    scroll-snap-align: start;
  }

  .category-button small {
    display: none;
  }

  .compose-card,
  .posts-card,
  .detail-card,
  .replies-card {
    padding: 16px;
    border-radius: 20px;
  }

  .section-heading {
    align-items: flex-start;
    gap: 12px;
  }

  .section-heading h2 {
    font-size: 22px;
  }

  .post-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .post-title-row strong {
    font-size: 16px;
    line-height: 1.45;
  }

  .post-meta {
    flex-wrap: wrap;
    gap: 8px 12px;
  }

  .detail-card h2 {
    font-size: 23px;
  }

  .form-actions {
    align-items: stretch;
    flex-direction: column;
    gap: 10px;
  }

  .form-actions .primary-button,
  .login-panel .primary-button,
  .reply-form .primary-button {
    width: 100%;
  }

  .login-panel {
    align-items: stretch;
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .community-page {
    padding-top: 92px;
  }

  .composer-user {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .composer-user .ghost-button {
    width: 100%;
    margin-left: 0;
  }

  .author-row {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  select,
  input,
  textarea {
    border-radius: 14px;
    font-size: 16px;
  }
}
</style>
