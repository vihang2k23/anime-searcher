<template>
  <v-container class="mb-4">
    <!-- Applied Filters -->
    <v-row class="mb-4 align-center">
      <!-- Status Filter Chip -->
      <v-col class="d-flex align-center" v-if="filtersStore.status && filtersStore.status !== 'default' && filtersStore.status !== 0" cols="auto">
        <span class="font-black">Status: </span> &nbsp;
        <v-chip
          closable
          @click:close="removeFilter('Status', filtersStore.status)"
          variant="elevated"
        >
          {{ filtersStore.status }}
        </v-chip>
      </v-col>

      <!-- Type Filter Chip -->
      <v-col class="d-flex align-center" v-if="filtersStore.type" cols="auto">
        <span class="font-black">Type: </span> &nbsp;
        <v-chip
          closable
          @click:close="removeFilter('Type', filtersStore.type)"
          variant="elevated"
        >
          {{ filtersStore.type }}
        </v-chip>
      </v-col>

      <!-- Clear All Button -->
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
          <td class="d-flex align-center h-auto py-2">
            <img
              v-if="anime?.images?.jpg?.small_image_url"
              class="rounded-xl custom-avatar-img"
              :src="anime.images.jpg.small_image_url"
              alt="Anime Image"
            />
            <span class="text-center ml-3 font-weight-semibold">{{ anime.title }}</span>
          </td>
          <td class="text-center">{{ anime.rank }}</td>
          <td class="text-center">{{ anime.type }}</td>
          <td class="text-center">{{ anime.status }}</td>
          <td class="text-end">
       
              <v-icon color="red"  @click="toggleFavorite(anime)" v-if=" isFavorite(anime)">mdi-heart</v-icon>
              <v-icon  @click="toggleFavorite(anime)" v-else>mdi-heart-outline</v-icon>
        
            
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
        filtersStore.applyFilters(); // Update applied filters
        fetchFilteredAnimes(); // Re-fetch the filtered data
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
  console.log("value: ", value);
  console.log("key: ", key);

  // Filter out the object with the specified key and value
  const originalLength = filtersStore.appliedFilters.length;
  console.log(' filtersStore.appliedFilters: ',  filtersStore.appliedFilters);
  filtersStore.appliedFilters = filtersStore.appliedFilters.filter(
    (filter) => 
   { console.log('filter: ', filter)
   filter.key !== key || filter.value !== value}
  );

  if (filtersStore.appliedFilters.length < originalLength) {
    console.log(`Removed filter with key "${key}" and value "${value}".`);

    // Clear the corresponding filter in the store
    if (key === "Status") {
      filtersStore.status = 0; // Reset the status filter
    } else if (key === "Type") {
      filtersStore.type = ""; // Reset the type filter
    }

    // Reapply the filters
    filtersStore.applyFilters(); // Call applyFilters to update the store with new filters
  }
};


    // Clear all filters
    const clearFilters = () => {
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
.custom-avatar-img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.elevation-1 {
  margin-top: 20px;
}

th{
  font-weight: 700 !important;
}

td {
  padding: 8px;
  text-align: left;
}
</style>
