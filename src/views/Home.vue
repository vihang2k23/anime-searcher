<template>
    <v-container>
      <SearchBar @search="searchAnimes" />
      <Filters @filter="applyFilters" />
      <AnimeTable
        :animes="animes"
        :loading="loading"
        @toggle-favorite="toggleFavorite"
      />
      <Pagination
        :total="total"
        :limit="limit"
        @page="changePage"
        @limit="changeLimit"
      />
    </v-container>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import { useAnimeStore } from '../stores/animeStore';
  import SearchBar from '@/components/SearchBar.vue';
  import Filters from '@/components/Filters.vue';
  import AnimeTable from '@/components/AnimeTable.vue';
  import Pagination from '../components/ Pagination.vue';
  
  export default {
    components: { SearchBar, Filters, AnimeTable, Pagination },
    setup() {
      const store = useAnimeStore();
      const { animes, total, loading, fetchAnimes, toggleFavorite } = store;
  
      const limit = ref(5);
      const currentFilters = ref({});
  
      const searchAnimes = (query) => {
        fetchAnimes({ q: query, ...currentFilters.value, limit: limit.value });
      };
  
      const applyFilters = (filters) => {
        currentFilters.value = filters;
        fetchAnimes({ ...filters, limit: limit.value });
      };
  
      const changePage = (page) => {
        fetchAnimes({ page, ...currentFilters.value, limit: limit.value });
      };
  
      const changeLimit = (newLimit) => {
        limit.value = newLimit;
        fetchAnimes({ limit: limit.value, ...currentFilters.value });
      };
  
      onMounted(() => fetchAnimes({ sort: 'desc', limit: limit.value }));
  
      return {
        animes,
        total,
        loading,
        searchAnimes,
        applyFilters,
        toggleFavorite,
        changePage,
        changeLimit,
        limit,
      };
    },
  };
  </script>
  