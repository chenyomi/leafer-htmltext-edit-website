<template>
  <main class="community-page">
    <section class="community-hero">
      <div>
        <router-link class="back-link" to="/">{{ t('common.backHome') }}</router-link>
        <p class="eyebrow">{{ t('community.eyebrow') }}</p>
        <h1>{{ t('community.title') }}</h1>
        <p class="description">
          {{ t('community.description') }}
        </p>
      </div>

      <div class="hero-actions">
        <button class="primary-button" type="button" @click="openCompose">{{ t('community.newTopic') }}</button>
        <button v-if="!user" class="secondary-button" type="button" @click="login">{{ t('nav.githubLogin') }}</button>
      </div>
    </section>

    <div v-if="message" class="notice community-notice" :class="{ error: messageType === 'error' }">{{ message }}</div>

    <section class="community-layout">
      <section class="topics-board">
        <div class="board-toolbar">
          <div>
            <p class="eyebrow">{{ t('community.topics') }}</p>
            <h2>{{ t('community.topicsTitle') }}</h2>
          </div>
          <div class="toolbar-actions">
            <button class="ghost-button" type="button" @click="loadPosts">{{ t('common.refresh') }}</button>
            <button class="primary-button" type="button" @click="openCompose">{{ t('community.newTopic') }}</button>
          </div>
        </div>

        <div class="category-tabs" aria-label="帖子分类筛选">
          <button
            v-for="item in categoryOptions"
            :key="item.value"
            class="category-chip"
            :class="{ active: activeCategory === item.value }"
            type="button"
            @click="setCategory(item.value)"
          >
            {{ item.label }}
          </button>
        </div>

        <div class="topic-filters">
          <label class="search-field">
            <span>{{ t('community.search') }}</span>
            <input v-model="searchQuery" type="search" :placeholder="t('community.searchPlaceholder')" />
          </label>
          <label>
            <span>{{ t('community.status') }}</span>
            <select v-model="activeStatus">
              <option v-for="item in statusOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
            </select>
          </label>
          <label>
            <span>{{ t('community.sort') }}</span>
            <select v-model="activeSort">
              <option v-for="item in sortOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
            </select>
          </label>
          <button class="filter-toggle" :class="{ active: mineOnly }" type="button" @click="mineOnly = !mineOnly">
            {{ t('community.mineOnly') }}
          </button>
        </div>

        <div class="list-summary">
          <span>{{ t('community.discussionsCount', { count: posts.length }) }}</span>
          <span>{{ activeCategory === 'all' ? t('community.allCategories') : categoryLabel(activeCategory) }}</span>
        </div>

        <div v-if="loadingPosts" class="empty-state">{{ t('community.loadingPosts') }}</div>
        <div v-else-if="posts.length === 0" class="empty-state">{{ t('community.emptyPosts') }}</div>
        <div v-else class="post-list">
          <button
            v-for="post in posts"
            :key="post.id"
            class="post-item"
            :class="{ active: post.id === activePostId }"
            type="button"
            @click="openPost(post.id)"
          >
            <div class="post-main">
              <div class="post-title-row">
                <span class="category-tag">{{ categoryLabel(post.category) }}</span>
                <span v-if="post.is_pinned" class="pinned-tag">{{ t('community.pinned') }}</span>
                <span class="status-pill" :class="`status-${post.status}`">{{ statusLabel(post.status) }}</span>
                <strong class="post-title">{{ post.title }}</strong>
              </div>
              <p class="post-preview">{{ post.content }}</p>
              <div class="post-meta">
                <span>{{ post.name || post.login }}</span>
                <span>{{ formatActivity(post) }}</span>
                <span>{{ t('community.views', { count: post.view_count || 0 }) }}</span>
              </div>
            </div>
            <div class="reply-count">
              <strong>{{ post.reply_count || 0 }}</strong>
              <span>{{ t('community.replies') }}</span>
            </div>
          </button>
        </div>
      </section>
    </section>

    <Teleport to="body">
      <Transition name="compose-fade">
        <div v-if="composeOpen" class="compose-overlay" @click.self="closeCompose">
          <section class="compose-modal" role="dialog" aria-modal="true" aria-labelledby="compose-title">
            <div class="modal-heading">
              <div>
                <p class="eyebrow">{{ t('community.newTopic') }}</p>
                <h2 id="compose-title">{{ t('community.modalTitle') }}</h2>
              </div>
              <button class="icon-button" type="button" :aria-label="t('community.closeCompose')" @click="closeCompose">
                ×
              </button>
            </div>

            <div v-if="!user" class="login-panel">
              <div>
                <h3>{{ t('community.loginToPost') }}</h3>
                <p>{{ t('community.loginToPostDesc') }}</p>
              </div>
              <button class="primary-button" type="button" @click="login">{{ t('community.loginGithub') }}</button>
            </div>

            <form v-else class="post-form" novalidate @submit.prevent="createPost">
              <div class="composer-user">
                <img v-if="user.avatar_url" :src="user.avatar_url" alt="" />
                <div>
                  <span>{{ t('community.postAs') }}</span>
                  <strong>{{ user.name || user.login }}</strong>
                </div>
                <button class="ghost-button" type="button" :disabled="authLoading" @click="handleLogout">
                  {{ t('nav.logout') }}
                </button>
              </div>
              <select v-model="draft.category" :aria-label="t('community.categoryAria')">
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
                :placeholder="t('community.titlePlaceholder')"
                maxlength="120"
                @blur="postSubmitAttempted = true"
              />
              <p v-if="showPostValidation && titleError" class="field-error">{{ titleError }}</p>
              <textarea
                v-model="draft.content"
                :placeholder="t('community.contentPlaceholder')"
                rows="8"
                maxlength="5000"
                @blur="postSubmitAttempted = true"
              ></textarea>
              <p v-if="showPostValidation && contentError" class="field-error">{{ contentError }}</p>
              <div class="form-actions">
                <span>{{ draft.content.length }}/5000</span>
                <button class="primary-button" type="submit" :disabled="submitting">
                  {{ submitting ? t('community.posting') : t('community.publishPost') }}
                </button>
              </div>
            </form>
          </section>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="compose-fade">
        <div v-if="activePostId" class="detail-overlay" @click.self="closeDetail">
          <section class="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <div class="modal-heading">
              <div>
                <p class="eyebrow">{{ t('community.detailEyebrow') }}</p>
                <h2 id="detail-title">{{ t('community.detailTitle') }}</h2>
              </div>
              <button class="icon-button" type="button" :aria-label="t('community.closeDetail')" @click="closeDetail">
                ×
              </button>
            </div>

            <div v-if="loadingDetail" class="empty-state">{{ t('community.loadingDetail') }}</div>
            <div v-else-if="!activePost" class="detail-empty">
              <h3>{{ t('community.missingPostTitle') }}</h3>
              <p>{{ t('community.missingPostDesc') }}</p>
              <button class="secondary-button" type="button" @click="closeDetail">{{ t('community.backList') }}</button>
            </div>
            <template v-else>
              <article class="detail-card">
                <div class="detail-header">
                  <span class="category-tag">{{ categoryLabel(activePost.category) }}</span>
                  <span class="status-pill" :class="`status-${activePost.status}`">
                    {{ statusLabel(activePost.status) }}
                  </span>
                </div>
                <div v-if="isAdmin" class="admin-actions">
                  <button class="ghost-button" type="button" :disabled="adminBusy" @click="togglePin(activePost)">
                    {{ activePost.is_pinned ? t('community.unpin') : t('community.pinned') }}
                  </button>
                  <button
                    v-for="item in statusOptions.filter(item => item.value !== 'all')"
                    :key="item.value"
                    class="ghost-button"
                    type="button"
                    :disabled="adminBusy || activePost.status === item.value"
                    @click="changePostStatus(activePost, item.value)"
                  >
                    {{ item.label }}
                  </button>
                  <button class="danger-button" type="button" :disabled="adminBusy" @click="removePost(activePost)">
                    {{ t('community.deletePost') }}
                  </button>
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
                <h3>{{ t('community.replies') }}</h3>
                <div v-if="replies.length === 0" class="empty-state compact">{{ t('community.noReplies') }}</div>
                <article v-for="reply in replies" :key="reply.id" class="reply-item">
                  <div class="author-row">
                    <img v-if="reply.avatar_url" :src="reply.avatar_url" alt="" />
                    <a v-if="reply.html_url" :href="reply.html_url" target="_blank" rel="noreferrer">
                      {{ reply.name || reply.login }}
                    </a>
                    <span v-else>{{ reply.name || reply.login }}</span>
                    <small>{{ formatDate(reply.created_at) }}</small>
                    <button
                      v-if="isAdmin"
                      class="reply-delete"
                      type="button"
                      :disabled="adminBusy"
                      @click="removeReply(reply)"
                    >
                      {{ t('community.delete') }}
                    </button>
                  </div>
                  <p>{{ reply.content }}</p>
                </article>

                <form v-if="user" class="reply-form" novalidate @submit.prevent="createReply">
                  <textarea
                    v-model="replyDraft"
                    :placeholder="t('community.replyPlaceholder')"
                    rows="4"
                    maxlength="5000"
                    @blur="replySubmitAttempted = true"
                  ></textarea>
                  <p v-if="showReplyValidation && replyError" class="field-error">{{ replyError }}</p>
                  <button class="primary-button" type="submit" :disabled="submittingReply">
                    {{ submittingReply ? t('community.replying') : t('community.submitReply') }}
                  </button>
                </form>
                <div v-else class="login-hint compact">{{ t('community.loginToReply') }}</div>
              </section>
            </template>
          </section>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  communityApi,
  type CommunityCategory,
  type CommunityPost,
  type CommunityReply,
  type CommunitySort,
  type CommunityStatus
} from '@/services/communityApi';
import { useAuth } from '@/composables/useAuth';
import { useI18n } from '@/i18n';

type CategoryFilter = CommunityCategory | 'all';

const route = useRoute();
const router = useRouter();
const { user, loading: authLoading, login, logout } = useAuth();
const { locale, t } = useI18n();

const categoryOptions = computed<Array<{ value: CategoryFilter; label: string; desc: string }>>(() => [
  { value: 'all', label: t('categories.all'), desc: t('categories.allDesc') },
  { value: 'question', label: t('categories.question'), desc: t('categories.questionDesc') },
  { value: 'bug', label: t('categories.bug'), desc: t('categories.bugDesc') },
  { value: 'feature', label: t('categories.feature'), desc: t('categories.featureDesc') },
  { value: 'showcase', label: t('categories.showcase'), desc: t('categories.showcaseDesc') },
  { value: 'discussion', label: t('categories.discussion'), desc: t('categories.discussionDesc') }
]);

const statusOptions = computed<Array<{ value: CommunityStatus | 'all'; label: string }>>(() => [
  { value: 'all', label: t('status.all') },
  { value: 'open', label: t('status.open') },
  { value: 'resolved', label: t('status.resolved') },
  { value: 'closed', label: t('status.closed') }
]);

const sortOptions = computed<Array<{ value: CommunitySort; label: string }>>(() => [
  { value: 'recently_replied', label: t('sort.recently_replied') },
  { value: 'latest', label: t('sort.latest') },
  { value: 'most_replied', label: t('sort.most_replied') },
  { value: 'most_viewed', label: t('sort.most_viewed') }
]);

const posts = ref<CommunityPost[]>([]);
const activePost = ref<CommunityPost | null>(null);
const replies = ref<CommunityReply[]>([]);
const activeCategory = ref<CategoryFilter>('all');
const activeStatus = ref<CommunityStatus | 'all'>('open');
const activeSort = ref<CommunitySort>('recently_replied');
const searchQuery = ref('');
const mineOnly = ref(false);
const loadingPosts = ref(false);
const loadingDetail = ref(false);
const adminBusy = ref(false);
const submitting = ref(false);
const submittingReply = ref(false);
const composeOpen = ref(false);
const postSubmitAttempted = ref(false);
const replySubmitAttempted = ref(false);
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

const trimmedTitle = computed(() => draft.title.trim());
const trimmedContent = computed(() => draft.content.trim());
const trimmedReply = computed(() => replyDraft.value.trim());
const titleError = computed(() => (trimmedTitle.value.length < 2 ? t('community.titleError') : ''));
const contentError = computed(() => (trimmedContent.value.length < 10 ? t('community.contentError') : ''));
const replyError = computed(() => (trimmedReply.value.length < 2 ? t('community.replyError') : ''));
const canSubmitPost = computed(() => !titleError.value && !contentError.value);
const canSubmitReply = computed(() => trimmedReply.value.length >= 2);
const showPostValidation = computed(() => postSubmitAttempted.value || Boolean(draft.title || draft.content));
const showReplyValidation = computed(() => replySubmitAttempted.value || Boolean(replyDraft.value));
const isAdmin = computed(() => user.value?.login === 'chenyuming');

function showMessage(text: string, type: 'info' | 'error' = 'info') {
  message.value = text;
  messageType.value = type;
  window.setTimeout(() => {
    if (message.value === text) message.value = '';
  }, 3600);
}

function categoryLabel(category: CategoryFilter) {
  return categoryOptions.value.find(item => item.value === category)?.label || category;
}

function statusLabel(status: CommunityStatus) {
  return statusOptions.value.find(item => item.value === status)?.label || status;
}

function formatActivity(post: CommunityPost) {
  const input = post.last_reply_at || post.updated_at || post.created_at;
  const date = formatDate(input);
  return post.last_reply_at ? t('community.lastReply', { date }) : t('community.postedAt', { date });
}

function formatDate(input: string) {
  if (!input) return '-';
  return new Intl.DateTimeFormat(locale.value, {
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
      status: activeStatus.value === 'all' ? undefined : activeStatus.value,
      q: searchQuery.value.trim() || undefined,
      sort: activeSort.value,
      mine: mineOnly.value
    });
    posts.value = result.posts;
  } catch (error) {
    showMessage(error instanceof Error ? error.message : t('community.readPostsFailed'), 'error');
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
    showMessage(error instanceof Error ? error.message : t('community.readDetailFailed'), 'error');
  } finally {
    loadingDetail.value = false;
  }
}

function setCategory(category: CategoryFilter) {
  activeCategory.value = category;
}

function openPost(id: string) {
  router.push({ name: 'community-detail', params: { postId: id } });
}

function closeDetail() {
  if (submittingReply.value) return;
  router.push({ name: 'community' });
}

function openCompose() {
  composeOpen.value = true;
}

function closeCompose() {
  if (submitting.value) return;
  composeOpen.value = false;
  postSubmitAttempted.value = false;
}

async function createPost() {
  if (!user.value) return;
  postSubmitAttempted.value = true;
  if (!canSubmitPost.value) {
    showMessage(titleError.value || contentError.value || t('community.checkPost'), 'error');
    return;
  }

  submitting.value = true;
  try {
    const result = await communityApi.createPost({
      title: trimmedTitle.value,
      content: trimmedContent.value,
      category: draft.category
    });
    draft.title = '';
    draft.content = '';
    postSubmitAttempted.value = false;
    composeOpen.value = false;
    showMessage(t('community.postCreated'));
    await loadPosts();
    openPost(result.id);
  } catch (error) {
    showMessage(error instanceof Error ? error.message : t('community.postFailed'), 'error');
  } finally {
    submitting.value = false;
  }
}

async function createReply() {
  if (!user.value || !activePostId.value) return;
  replySubmitAttempted.value = true;
  if (!canSubmitReply.value) {
    showMessage(replyError.value || t('community.checkReply'), 'error');
    return;
  }

  submittingReply.value = true;
  try {
    await communityApi.createReply(activePostId.value, { content: trimmedReply.value });
    replyDraft.value = '';
    replySubmitAttempted.value = false;
    showMessage(t('community.replyCreated'));
    await loadDetail(activePostId.value);
    await loadPosts();
  } catch (error) {
    showMessage(error instanceof Error ? error.message : t('community.replyFailed'), 'error');
  } finally {
    submittingReply.value = false;
  }
}

async function changePostStatus(post: CommunityPost, status: CommunityStatus | 'all') {
  if (!isAdmin.value || status === 'all') return;
  adminBusy.value = true;
  try {
    await communityApi.updatePostStatus(post.id, status);
    showMessage(t('community.statusUpdated'));
    await loadDetail(post.id);
    await loadPosts();
  } catch (error) {
    showMessage(error instanceof Error ? error.message : t('community.statusFailed'), 'error');
  } finally {
    adminBusy.value = false;
  }
}

async function togglePin(post: CommunityPost) {
  if (!isAdmin.value) return;
  adminBusy.value = true;
  try {
    await communityApi.pinPost(post.id, !post.is_pinned);
    showMessage(post.is_pinned ? t('community.unpinnedDone') : t('community.pinnedDone'));
    await loadDetail(post.id);
    await loadPosts();
  } catch (error) {
    showMessage(error instanceof Error ? error.message : t('community.pinFailed'), 'error');
  } finally {
    adminBusy.value = false;
  }
}

async function removePost(post: CommunityPost) {
  if (!isAdmin.value || !window.confirm(t('community.confirmDeletePost'))) return;
  adminBusy.value = true;
  try {
    await communityApi.deletePost(post.id);
    showMessage(t('community.postDeleted'));
    await loadPosts();
    closeDetail();
  } catch (error) {
    showMessage(error instanceof Error ? error.message : t('community.deletePostFailed'), 'error');
  } finally {
    adminBusy.value = false;
  }
}

async function removeReply(reply: CommunityReply) {
  if (!isAdmin.value || !activePostId.value || !window.confirm(t('community.confirmDeleteReply'))) return;
  adminBusy.value = true;
  try {
    await communityApi.deleteReply(activePostId.value, reply.id);
    showMessage(t('community.replyDeleted'));
    await loadDetail(activePostId.value);
    await loadPosts();
  } catch (error) {
    showMessage(error instanceof Error ? error.message : t('community.deleteReplyFailed'), 'error');
  } finally {
    adminBusy.value = false;
  }
}

async function handleLogout() {
  try {
    await logout();
    showMessage(t('community.logoutDone'));
  } catch (error) {
    showMessage(error instanceof Error ? error.message : t('community.logoutFailed'), 'error');
  }
}

let searchTimer: number | null = null;

watch([activeCategory, activeStatus, activeSort, mineOnly], () => {
  loadPosts();
});

watch(searchQuery, () => {
  if (searchTimer) window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(() => loadPosts(), 320);
});

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
  font-size: clamp(44px, 6vw, 72px);
  line-height: 1.05;
  letter-spacing: -0.045em;
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

.field-error {
  margin: -4px 2px 0;
  color: #ff9f9f;
  font-size: 13px;
  line-height: 1.5;
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
    font-size: clamp(38px, 14vw, 56px);
    letter-spacing: -0.04em;
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

/* ── Community redesign overrides ────────────────────────────────────────── */
.community-notice {
  width: min(1200px, 100%);
  margin: 0 auto 18px;
}

.community-layout {
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
}

.topics-board,
.detail-card,
.replies-card,
.detail-empty {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(18px);
}

.topics-board {
  padding: 18px;
  border-radius: 26px;
}

.board-toolbar,
.toolbar-actions,
.category-tabs,
.list-summary,
.post-item,
.reply-count,
.modal-heading {
  display: flex;
  align-items: center;
}

.board-toolbar {
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.board-toolbar .eyebrow,
.modal-heading .eyebrow {
  margin: 0 0 6px;
}

.board-toolbar h2,
.modal-heading h2 {
  font-size: 28px;
  letter-spacing: -0.03em;
}

.toolbar-actions {
  gap: 10px;
}

.toolbar-actions .ghost-button {
  margin-left: 0;
}

.category-tabs {
  gap: 8px;
  margin: 0 -4px 14px;
  padding: 0 4px 4px;
  overflow-x: auto;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.category-chip {
  flex: 0 0 auto;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.05);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
}

.category-chip.active {
  color: #ffffff;
  border-color: rgba(125, 249, 255, 0.32);
  background: rgba(125, 249, 255, 0.13);
}

.topic-filters {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 150px 150px auto;
  gap: 10px;
  margin-bottom: 14px;
}

.topic-filters label {
  display: grid;
  gap: 6px;
}

.topic-filters label span {
  color: rgba(255, 255, 255, 0.45);
  font-size: 12px;
  font-weight: 700;
}

.topic-filters input,
.topic-filters select {
  min-height: 42px;
  border-radius: 999px;
  padding: 0 14px;
}

.filter-toggle,
.danger-button,
.reply-delete {
  cursor: pointer;
  font: inherit;
}

.filter-toggle {
  align-self: end;
  min-height: 42px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.05);
  font-size: 13px;
  font-weight: 800;
}

.filter-toggle.active {
  color: #050505;
  background: #ffffff;
}

.list-summary {
  justify-content: space-between;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.46);
  font-size: 13px;
}

.post-item {
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
}

.post-main {
  min-width: 0;
}

.post-title-row {
  margin-bottom: 8px;
}

.post-title-row strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-title,
.post-preview {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.post-title {
  -webkit-line-clamp: 2;
  white-space: normal;
}

.post-preview {
  -webkit-line-clamp: 2;
}

.reply-count {
  flex: 0 0 64px;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.52);
  font-size: 12px;
  text-align: center;
}

.reply-count strong {
  color: #ffffff;
  font-size: 20px;
  line-height: 1.1;
}

.pinned-tag {
  flex-shrink: 0;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  color: #ffe9a8;
  background: rgba(255, 200, 87, 0.14);
  border: 1px solid rgba(255, 200, 87, 0.24);
  font-size: 12px;
  font-weight: 800;
}

.status-closed {
  color: #d4d4d4;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.14);
}

.status-resolved {
  color: #b9ffc9;
  background: rgba(30, 160, 63, 0.18);
  border-color: rgba(30, 160, 63, 0.28);
}

.admin-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.admin-actions .ghost-button {
  margin-left: 0;
}

.danger-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid rgba(255, 106, 106, 0.28);
  border-radius: 999px;
  color: #ffb4b4;
  background: rgba(255, 106, 106, 0.1);
}

.reply-delete {
  margin-left: auto;
  border: none;
  color: #ffb4b4;
  background: transparent;
  font-size: 12px;
  font-weight: 800;
}

.detail-empty .secondary-button {
  border: none;
}

.compose-overlay,
.detail-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.68);
  backdrop-filter: blur(18px);
}

.compose-modal,
.detail-modal {
  width: min(620px, 100%);
  max-height: min(760px, calc(100vh - 48px));
  overflow-y: auto;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  color: #ffffff;
  background: radial-gradient(circle at top right, rgba(125, 249, 255, 0.16), transparent 34%), rgba(12, 12, 14, 0.96);
  box-shadow: 0 32px 120px rgba(0, 0, 0, 0.55);
}

.detail-modal {
  width: min(860px, 100%);
  display: grid;
  gap: 16px;
}

.detail-modal .detail-card,
.detail-modal .replies-card {
  box-shadow: none;
}

.modal-heading {
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.icon-button {
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  cursor: pointer;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  font: inherit;
  font-size: 24px;
  line-height: 1;
}

.compose-fade-enter-active,
.compose-fade-leave-active {
  transition: opacity 0.18s ease;
}

.compose-fade-enter-from,
.compose-fade-leave-to {
  opacity: 0;
}

@media (max-width: 980px) {
  .community-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .community-notice {
    margin-bottom: 14px;
  }

  .board-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .toolbar-actions {
    width: 100%;
  }

  .toolbar-actions .ghost-button,
  .toolbar-actions .primary-button {
    flex: 1;
  }

  .topics-board {
    padding: 14px;
    border-radius: 22px;
  }

  .topic-filters {
    grid-template-columns: 1fr;
  }

  .filter-toggle {
    align-self: stretch;
  }

  .post-item {
    gap: 12px;
  }

  .reply-count {
    flex-basis: 50px;
  }

  .post-title-row strong {
    white-space: normal;
  }

  .compose-overlay,
  .detail-overlay {
    align-items: end;
    padding: 12px;
  }

  .compose-modal,
  .detail-modal {
    max-height: calc(100vh - 24px);
    padding: 18px;
    border-radius: 24px;
  }
}

@media (max-width: 480px) {
  .post-item {
    flex-direction: column;
  }

  .reply-count {
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    gap: 6px;
    flex-basis: auto;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-left: none;
    text-align: left;
  }
}
</style>
