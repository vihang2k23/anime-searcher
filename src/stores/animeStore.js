
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, watch } from 'vue';

const API_BASE_URL = 'https://api.jikan.moe/v4/anime';

export const useAnimeStore = defineStore('anime', () => {
  const animes = ref([]); 
  const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || []);
  const loading = ref(false);

  const fetchAnimes = async (queryParams = {}) => {
    loading.value = true;
    try {
      const response = await axios.get(API_BASE_URL, { params: queryParams });
      animes.value = Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
      console.error('Error fetching animes:', error);
      animes.value = []; 
    } finally {
      loading.value = false;
    }
  };

  const toggleFavorite = (anime) => {
    const index = favorites.value.findIndex((fav) => fav.mal_id === anime.mal_id);
    if (index === -1) {
      favorites.value.push(anime);
    } else {
      favorites.value.splice(index, 1);
    }
  };

  // Persist favorites to localStorage
  watch(favorites, (newFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  });

  return { animes, favorites, loading, fetchAnimes, toggleFavorite };
});
