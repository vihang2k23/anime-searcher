<template>
  <v-container class="mb-4">
    <!-- Applied Filters -->
    <v-row class="mb-4 align-center">
      <v-col
        class="d-flex align-center"
        v-for="(filter, index) in filtersStore.appliedFilters"
        :key="index"
        cols="auto"
      >
        <span class="font-black">{{ filter?.key }}</span> &nbsp;
        <v-chip
          closable
          @click:close="removeFilter(filter.key, filter?.value)"
          variant="elevated"
        >
          {{ filter?.value }}
        </v-chip>
      </v-col>

      <!-- <v-btn >Clear All</v-btn> -->
      <v-chip
        prepend-icon="mdi-delete"
        v-if="filtersStore.appliedFilters.length"
        @click="clearFilters"
        color="red"
        class="cursor-pointer"
        variant="outlined"
      >
        Clear All
      </v-chip>
    </v-row>

    <!-- Anime Data Table -->
    <v-data-table
      :headers="headers"
      :items="filteredAnimes"
      :loading="loading"
      class="elevation-1"
      item-value="mal_id"
      :items-per-page="5"
    >
      <!-- Toolbar -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Anime Search</v-toolbar-title>
        </v-toolbar>
      </template>

      <!-- Custom Body -->
      <template v-slot:body="{ items }">
        <tr v-for="anime in items" :key="anime.mal_id">
          <td class="flex flex-col items-center justify-center space-y-2">
            <img
              v-if="anime?.images?.jpg?.small_image_url"
              class="rounded-xl w-16 h-16"
              :src="anime.images.jpg.small_image_url"
              alt="Anime Image"
            />
            <span class="text-center">{{ anime.title }}</span>
          </td>
          <td class="text-center">{{ anime.rank }}</td>
          <td class="text-center">{{ anime.type }}</td>
          <td class="text-center">{{ anime.status }}</td>
          <td class="text-center">
            <v-btn color="primary" @click="toggleFavorite(anime)">
              {{
                isFavorite(anime) ? "Remove from Favorites" : "Add to Favorites"
              }}
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { computed, onMounted, watch } from "vue";
import { useAnimeStore } from "../stores/animeStore";
import { useFiltersStore } from "../stores/filtersStore";

export default {
  name: "AnimeTable",
  setup() {
    const animeStore = useAnimeStore();
    const filtersStore = useFiltersStore();

    // Reactive values from the stores
    const animes = computed(() => animeStore.animes);
    const loading = computed(() => animeStore.loading);
    const favorites = computed(() => animeStore.favorites);

    // Fetch filtered animes when the filters change
    const fetchFilteredAnimes = () => {
      const queryParams = {
        status:
          filtersStore.status === "default" || filtersStore.status === 0
            ? ""
            : filtersStore.status,
        type: filtersStore.type,
      };

      animeStore.fetchAnimes(queryParams); // Pass filters to fetch function
    };

    // Watch for changes in filters and fetch new animes
    watch(
      [filtersStore.status, filtersStore.type],
      () => {
        
        // filtersStore.applyFilters(); // Update applied filters
        // fetchFilteredAnimes(); // Re-fetch the filtered data
      },
      { immediate: true }
    );
   

    // Helper to check if the anime is a favorite
    const isFavorite = (anime) =>
      favorites.value.some((fav) => fav.mal_id === anime.mal_id);

    // Fetch anime data on component mount
    // onMounted(() => {
    //   if (!animes.value.length) {
    //     fetchFilteredAnimes(); // Initial fetch with default filters
    //   }
    // });

    // Remove individual filter
    const removeFilter = (key, value) => {
  console.log("Removing filter: ", key, value);

  // Remove only the specific filter key and value from appliedFilters
  filtersStore.appliedFilters = filtersStore.appliedFilters.filter(
    (filter) => !(filter.key === key && filter.value === value)
  );

  // Check which filter was removed and update the store accordingly
  if (key === "Status: ") {
    filtersStore.status = "";  // Reset only the status
  } else if (key === "Type: ") {
    filtersStore.type = "";  // Reset only the type
  } else if (key === "Search: ") {
    filtersStore.search = "";  // Reset only the search
  }

  // Reapply the filters after removal
  filtersStore.applyFilters();  // Trigger filter application
};


    // Clear all filters
    const clearFilters = () => {
      filtersStore.status = 0
      console.log('filtersStore.status: ', filtersStore.status);
      filtersStore.clearFilters(); // Reset filters in store
      filtersStore.applyFilters(); // Reapply empty filters
    };

    return {
      animes,
      loading,
      toggleFavorite: animeStore.toggleFavorite,
      isFavorite,
      removeFilter,
      clearFilters,
      filtersStore,
      headers: [
        { text: "Title", value: "title" },
        { text: "Rank", value: "rank" },
        { text: "Type", value: "type" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      filteredAnimes: computed(() => animes.value),
    };
  },
};
</script>

<style scoped>
.elevation-1 {
  margin-top: 20px;
}

td {
  padding: 8px;
  text-align: left;
}
</style>
