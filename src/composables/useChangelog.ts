import { ref, onMounted } from 'vue';

export interface ChangelogItem {
  sha: string;
  date: string;
  message: string;
  detail: string[];
}

const CACHE_KEY = 'changelog_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export function useChangelog() {
  const changelog = ref<ChangelogItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchChangelog = async () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          changelog.value = data;
          return;
        }
      }

      loading.value = true;
      const response = await fetch('/api/changelog');
      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data: ChangelogItem[] = await response.json();
      changelog.value = data;
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (e) {
      error.value = String(e);
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data } = JSON.parse(cachedData);
        changelog.value = data;
      }
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchChangelog);

  return { changelog, loading, error };
}
