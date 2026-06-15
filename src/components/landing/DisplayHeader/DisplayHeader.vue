<template>
  <header class="header">
    <div class="header-container">
      <router-link to="/" class="logo">
        <VueBitsLogo />
      </router-link>

      <div class="nav-cta-group">
        <nav class="landing-nav-items">
          <router-link
            class="nav-link"
            :class="{ 'active-link': activeItem === 'home' }"
            to="/"
            @click.prevent="goHome"
          >
            Home
          </router-link>
          <router-link class="nav-link" to="/" @click.prevent="goCase">Case</router-link>
          <router-link class="nav-link" to="/" @click.prevent="goPrice">Price</router-link>
          <router-link class="nav-link" to="/docs" :class="{ 'active-link': activeItem === 'docs' }">Docs</router-link>
          <router-link class="nav-link" to="/community" :class="{ 'active-link': activeItem === 'community' }">
            Community
          </router-link>
          <div class="changelog-nav-wrapper" @mouseenter="openChangelog" @mouseleave="closeChangelog">
            <span class="nav-link changelog-trigger">Changelog</span>
            <Transition name="changelog-fade">
              <div v-if="changelogOpen" class="changelog-dropdown">
                <div class="changelog-header">Changelog</div>
                <div v-if="changelogLoading" class="changelog-loading">Loading...</div>
                <div v-else-if="changelog.length === 0" class="changelog-loading">No data yet</div>
                <ul v-else class="changelog-list">
                  <li v-for="item in changelog" :key="item.sha" class="changelog-item">
                    <div class="changelog-item-header">
                      <span class="changelog-tag" :class="getTagClass(item.message)">{{ getTag(item.message) }}</span>
                      <span class="changelog-title">{{ stripTag(item.message) }}</span>
                      <span class="changelog-date">{{ item.date }}</span>
                    </div>
                    <ul v-if="item.detail.length" class="changelog-detail">
                      <li v-for="(d, i) in item.detail" :key="i">{{ d }}</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </nav>
        <button class="cta-button" @click="openGitHub">
          Star On GitHub
          <span ref="starCountRef">
            <img :src="starIcon" alt="Star Icon" />
            {{ stars || 0 }}
          </span>
        </button>
        <div class="auth-actions">
          <button v-if="!isAuthenticated" class="auth-button" type="button" :disabled="authLoading" @click="login">
            {{ authLoading ? 'Checking...' : 'GitHub 登录' }}
          </button>
          <div v-else class="auth-user">
            <router-link class="auth-profile" to="/community">
              <img v-if="user?.avatar_url" :src="user.avatar_url" alt="" />
              <span>{{ user?.name || user?.login }}</span>
            </router-link>
            <button class="auth-logout" type="button" :disabled="authLoading" @click="handleLogout">退出</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, useTemplateRef, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import VueBitsLogo from '@/components/common/Logo.vue';
import { useStars } from '@/composables/useStars';
import { useChangelog } from '@/composables/useChangelog';
import { useAuth } from '@/composables/useAuth';
import starIcon from '@/assets/common/star.svg';
import './DisplayHeader.css';

interface Props {
  activeItem?: string | null;
}

defineProps<Props>();

const starCountRef = useTemplateRef<HTMLElement>('starCountRef');
const router = useRouter();
const stars = useStars();
const { changelog, loading: changelogLoading } = useChangelog();
const { user, loading: authLoading, isAuthenticated, login, logout } = useAuth();

const changelogOpen = ref(false);
let closeTimer: ReturnType<typeof setTimeout> | null = null;

const openChangelog = () => {
  if (closeTimer) clearTimeout(closeTimer);
  changelogOpen.value = true;
};
const closeChangelog = () => {
  closeTimer = setTimeout(() => {
    changelogOpen.value = false;
  }, 200);
};

const getTag = (message: string) => {
  const match = message.match(/^(feat|fix|refactor|perf)/i);
  return match ? match[1].toLowerCase() : 'fix';
};
const getTagClass = (message: string) => {
  const tag = getTag(message);
  return `tag-${tag}`;
};
const stripTag = (message: string) => {
  return message.replace(/^(feat|fix|refactor|perf):\s*/i, '');
};

const openGitHub = () => {
  window.open('https://github.com/chenyomi/leafer-htmltext-edit-view', '_blank');
};

const handleLogout = async () => {
  await logout();
};

const scrollToId = async (id: string) => {
  const doScroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  if (router.currentRoute.value.path !== '/') {
    await router.push('/');
    await nextTick();
    doScroll();
  } else {
    doScroll();
  }
};

const goCase = () => scrollToId('case');
const goPrice = () => scrollToId('price');
const goHome = () => scrollToId('home');
watch(
  stars,
  newStars => {
    if (newStars && starCountRef.value) {
      gsap.fromTo(
        starCountRef.value,
        {
          scale: 0,
          width: 0,
          opacity: 0
        },
        {
          scale: 1,
          width: '100px',
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1)'
        }
      );
    }
  },
  { immediate: true }
);
</script>
