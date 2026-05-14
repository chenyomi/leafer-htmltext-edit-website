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
      const response = await fetch(
        'https://api.github.com/repos/chenyomi/npm-chenyomi-leafer-htmltext-edit/commits?per_page=30',
        {
          headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      );
      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const commits = (await response.json()) as Array<{
        sha: string;
        commit: { message: string; author: { date: string } };
      }>;

      const data: ChangelogItem[] = commits
        .map(c => ({
          sha: c.sha.slice(0, 7),
          date: c.commit.author.date.slice(0, 10),
          message: c.commit.message.split('\n')[0],
          detail: c.commit.message
            .split('\n')
            .slice(1)
            .map(l => l.trim())
            .filter(l => l.startsWith('-'))
        }))
        .filter(c => /^(feat|fix|refactor|perf)/i.test(c.message));
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
