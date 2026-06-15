import { computed, ref } from 'vue';
import { communityApi, type CommunityUser } from '@/services/communityApi';

const user = ref<CommunityUser | null>(null);
const loading = ref(false);
const loaded = ref(false);
const error = ref('');
let pendingRequest: Promise<CommunityUser | null> | null = null;

async function refreshUser() {
  if (pendingRequest) return pendingRequest;

  loading.value = true;
  error.value = '';

  pendingRequest = communityApi
    .getMe()
    .then(result => {
      user.value = result.user;
      loaded.value = true;
      return result.user;
    })
    .catch(err => {
      user.value = null;
      loaded.value = true;
      error.value = err instanceof Error ? err.message : '读取登录状态失败';
      return null;
    })
    .finally(() => {
      loading.value = false;
      pendingRequest = null;
    });

  return pendingRequest;
}

async function ensureLoaded() {
  if (loaded.value) return user.value;
  return refreshUser();
}

function login() {
  window.location.href = communityApi.loginUrl;
}

async function logout() {
  loading.value = true;
  error.value = '';

  try {
    await communityApi.logout();
    user.value = null;
    loaded.value = true;
  } catch (err) {
    error.value = err instanceof Error ? err.message : '退出登录失败';
    throw err;
  } finally {
    loading.value = false;
  }
}

export function useAuth() {
  return {
    user,
    loading,
    loaded,
    error,
    isAuthenticated: computed(() => Boolean(user.value)),
    login,
    logout,
    refreshUser,
    ensureLoaded
  };
}
