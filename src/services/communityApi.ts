const API_BASE = (import.meta.env.VITE_COMMUNITY_API_BASE || 'https://chenyomi-api.408550179.workers.dev').replace(
  /\/$/,
  ''
);

export interface CommunityUser {
  id: string;
  login: string;
  name?: string | null;
  avatar_url?: string | null;
  html_url?: string | null;
}

export interface CommunityPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: CommunityCategory;
  status: CommunityStatus;
  is_pinned: number;
  created_at: string;
  updated_at: string;
  login: string;
  name?: string | null;
  avatar_url?: string | null;
  html_url?: string | null;
  reply_count?: number;
}

export interface CommunityReply {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  login: string;
  name?: string | null;
  avatar_url?: string | null;
  html_url?: string | null;
}

export type CommunityCategory = 'question' | 'bug' | 'feature' | 'showcase' | 'discussion';
export type CommunityStatus = 'open' | 'closed' | 'resolved';

interface RequestOptions extends RequestInit {
  query?: Record<string, string | undefined>;
  timeoutMs?: number;
}

function buildUrl(path: string, query?: RequestOptions['query']) {
  const url = new URL(`${API_BASE}${path}`);
  Object.entries(query || {}).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs ?? 8000);

  let response: Response;
  try {
    response = await fetch(buildUrl(path, options.query), {
      ...options,
      credentials: 'include',
      signal: options.signal || controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('请求超时，请稍后重试');
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || `请求失败：${response.status}`);
  }
  return data as T;
}

export const communityApi = {
  apiBase: API_BASE,
  loginUrl: `${API_BASE}/auth/github/start`,

  getMe() {
    return request<{ user: CommunityUser | null }>('/me');
  },

  logout() {
    return request<{ ok: boolean }>('/logout', { method: 'POST' });
  },

  listPosts(query: { category?: CommunityCategory; status?: CommunityStatus } = {}) {
    return request<{ posts: CommunityPost[] }>('/community/posts', { query });
  },

  createPost(input: { title: string; content: string; category: CommunityCategory }) {
    return request<{ ok: boolean; id: string }>('/community/posts', {
      method: 'POST',
      body: JSON.stringify(input)
    });
  },

  getPost(id: string) {
    return request<{ post: CommunityPost; replies: CommunityReply[] }>(`/community/posts/${id}`);
  },

  createReply(postId: string, input: { content: string }) {
    return request<{ ok: boolean; id: string }>(`/community/posts/${postId}/replies`, {
      method: 'POST',
      body: JSON.stringify(input)
    });
  }
};
