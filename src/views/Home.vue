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
  
<script setup>
import { onMounted, ref } from "vue";
import { useAnimeStore } from "../stores/animeStore";
import { useFiltersStore } from "../stores/filtersStore";

import Filters from "@/components/Filters.vue";
import AnimeTable from "@/components/AnimeTable.vue";

// Stores
const filtersStore = useFiltersStore();
const animeStore = useAnimeStore();
const { animes, total, isLoading, fetchAnimes, toggleFavorite } = animeStore;

// Reactive state
const limit = ref(5);
const currentFilters = ref({});

// Methods
const searchAnimes = (query) => {
  console.log("query: ", query);
  fetchAnimes({ query, limit: limit.value });
};

const applyFilters = (filters) => {
  currentFilters.value = filters;
  
};

const changePage = (page) => {
  fetchAnimes({ page, ...currentFilters.value, limit: limit.value });
};

const changeLimit = (newLimit) => {
  limit.value = newLimit;
  fetchAnimes({ limit: limit.value, ...currentFilters.value });
};


</script>
