import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = 'https://api.jikan.moe/v4/anime';

export const useAnimeStore = defineStore('anime', () => {
  const animes = ref([]);
  const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || []);
  const total = ref(0);
  const loading = ref(false);

  const fetchAnimes = async (queryParams = {}) => {
    loading.value = true;
    try {
      const response = await axios.get(API_BASE_URL, { params: queryParams });
      animes.value = response.data.data;
      total.value = response.data.pagination.items.total;
    } catch (error) {
      console.error('Error fetching animes:', error);
    } finally {
      loading.value = false;
    }
  };



  return { animes, favorites, total, loading, fetchAnimes, toggleFavorite };
});
