import { ref, onMounted } from 'vue';
import { getStarsCount } from '@/utils/utils';

const CACHE_KEY = 'github_stars_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export function useStars() {
  const stars = ref<number>(0);

  const fetchStars = async () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);

      if (cachedData) {
        const { count, timestamp } = JSON.parse(cachedData);
        const now = Date.now();

        if (now - timestamp < CACHE_DURATION) {
          stars.value = count;
          return;
        }
      }

      const count = await getStarsCount();
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          count,
          timestamp: Date.now()
        })
      );

      stars.value = count;
    } catch (error) {
      console.error('Error fetching stars:', error);

      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { count } = JSON.parse(cachedData);
        stars.value = count;
      }
    }
  };

  onMounted(() => {
    fetchStars();
  });

  return stars;
}
