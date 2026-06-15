<template>
  <header class="header">
    <div class="header-container">
      <router-link to="/" class="logo">
        <VueBitsLogo />
      </router-link>

      <nav class="landing-nav-items">
        <router-link class="nav-link" :class="{ 'active-link': activeItem === 'home' }" to="/" @click.prevent="goHome">
          {{ t('nav.home') }}
        </router-link>
        <router-link class="nav-link" to="/" @click.prevent="goCase">{{ t('nav.case') }}</router-link>
        <router-link class="nav-link" to="/" @click.prevent="goPrice">{{ t('nav.price') }}</router-link>
        <router-link class="nav-link" to="/docs" :class="{ 'active-link': activeItem === 'docs' }">
          {{ t('nav.docs') }}
        </router-link>
        <router-link class="nav-link" to="/community" :class="{ 'active-link': activeItem === 'community' }">
          {{ t('nav.community') }}
        </router-link>
        <div
          v-if="changelog.length > 0"
          class="changelog-nav-wrapper"
          @mouseenter="openChangelog"
          @mouseleave="closeChangelog"
        >
          <span class="nav-link changelog-trigger">{{ t('nav.changelog') }}</span>
          <Transition name="changelog-fade">
            <div v-if="changelogOpen" class="changelog-dropdown">
              <div class="changelog-header">{{ t('nav.changelog') }}</div>
              <div v-if="changelogLoading" class="changelog-loading">{{ t('nav.loading') }}</div>
              <div v-else-if="changelog.length === 0" class="changelog-loading">{{ t('nav.noData') }}</div>
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

      <div class="nav-cta-group">
        <LanguageSwitch />
        <button
          class="star-chip"
          type="button"
          :aria-label="t('nav.starGithub')"
          :title="t('nav.starGithub')"
          @click="openGitHub"
        >
          <img :src="starIcon" alt="" />
          <span ref="starCountRef">{{ stars || 0 }}</span>
        </button>
        <div class="auth-actions">
          <button v-if="!isAuthenticated" class="auth-button" type="button" @click="login">
            {{ t('nav.githubLogin') }}
          </button>
          <div v-else class="auth-user">
            <router-link class="auth-profile" to="/community">
              <img v-if="user?.avatar_url" :src="user.avatar_url" alt="" />
              <span>{{ user?.name || user?.login }}</span>
            </router-link>
            <button class="auth-logout" type="button" :disabled="authLoading" @click="handleLogout">
              {{ t('nav.logout') }}
            </button>
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
import LanguageSwitch from '@/components/common/LanguageSwitch.vue';
import { useI18n } from '@/i18n';
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
const { t } = useI18n();

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
