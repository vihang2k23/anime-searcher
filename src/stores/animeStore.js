  import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed, watch, onMounted } from 'vue';

const API_BASE_URL = 'https://api.jikan.moe/v4/anime';

export const useAnimeStore = defineStore('anime', () => {
  const animes = ref([]);
  const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || []);
  const loading = ref(false);
  const error = ref(null); // Added error state

  // Fetch anime data
  const fetchAnimes = async (queryParams = {}) => {
    loading.value = true;
    error.value = null; // Reset error before fetching
    try {
      const response = await axios.get(API_BASE_URL, { params: queryParams });
      animes.value = Array.isArray(response.data.data) ? response.data.data : [];
    } catch (err) {
      console.error('Error fetching animes:', err);
      error.value = 'Failed to load anime data. Please try again later.'; // Set error message
      animes.value = [];
    } finally {
      loading.value = false;
    }
  };

  // Toggle anime in favorites
  const toggleFavorite = (anime) => {
    const existingAnime = favorites.value.find((fav) => fav.mal_id === anime.mal_id);
    if (existingAnime) {
      favorites.value = favorites.value.filter((fav) => fav.mal_id !== anime.mal_id);
    } else {
      favorites.value.push(anime);
    }
  };

  // Computed property for loading state (can be used in components)
  const isLoading = computed(() => loading.value);

  // Persist favorites to localStorage
  watch(favorites, (newFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  });

  // Optionally, fetch anime data on store initialization
  onMounted(() => {
    fetchAnimes(); 
  });

  return { 
    animes, 
    favorites, 
    loading, 
    error, 
    isLoading, 
    fetchAnimes, 
    toggleFavorite 
  };
});
