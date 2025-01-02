<template>

  <v-container >
    <Filters @filter="applyFilters" @search="searchAnimes" />

    <AnimeTable
      :animes="animes"
      :loading="isLoading"
      @toggle-favorite="toggleFavorite"
    />
  </v-container>
</template>
  
  <script>
import { onMounted, ref } from "vue";
import { useAnimeStore } from "../stores/animeStore";

import Filters from "@/components/Filters.vue";
import AnimeTable from "@/components/AnimeTable.vue";

import { useFiltersStore } from "../stores/filtersStore";
export default {
  components: { Filters, AnimeTable },
  setup() {
    const filtersStore = useFiltersStore();
    const store = useAnimeStore();
    const { animes, total, isLoading, fetchAnimes, toggleFavorite } = store;
    console.log('isLoading: ', isLoading);

    const limit = ref(5);
    const currentFilters = ref({});

    const searchAnimes = (query) => {
      console.log("query: ", query);

      fetchAnimes({ query, limit: limit.value });
    };

    const applyFilters = (filters) => {
      currentFilters.value = filters;
      // fetchAnimes({ ...filters, limit: limit.value });
    };

    const changePage = (page) => {
      fetchAnimes({ page, ...currentFilters.value, limit: limit.value });
    };

    const changeLimit = (newLimit) => {
      limit.value = newLimit;
      fetchAnimes({ limit: limit.value, ...currentFilters.value });
    };

    // onMounted(() => fetchAnimes({ sort: "desc", limit: limit.value }));

    return {
      animes,
      total,
      isLoading,
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
  