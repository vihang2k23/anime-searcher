<template>
  <v-container class="mb-4">
    <!-- Status Filters -->
    <v-row class="align-center">
    <v-tabs v-model="status" background-color="primary" grow class="border-b">
      <v-col cols="4" class="d-flex align-center">
      <v-tab
        v-for="(tab, index) in statusOptions"
        :key="index"
        :value="index"
        >{{ tab }}</v-tab
      >
      </v-col>
    </v-tabs>
    </v-row>

    <v-row class="align-center">
      <v-col cols="2" class="d-flex align-center">
    <!-- Type Filter -->
    <v-select
      v-model="type"
      :items="typeOptions"
      label="Filter by Type"
      class="mt-4"
      clearable
    />
      </v-col>
      <v-col class="d-flex align-center">
    <!-- Search Input -->
    <v-text-field
      v-model="search"
      label="Search Anime"
      @input="debouncedSearch"
      class="mt-4"
      clearable
    />
      </v-col>
    </v-row>


    <!-- Apply Filters Button -->
    <div class="d-flex justify-center">
    <v-btn color="primary" size="x-large" class="mt-4" @click="applyFilters">Apply Filters</v-btn>
    </div>
  </v-container>
</template>

<script>
import { ref, watch } from "vue";
import { debounce } from "lodash";
import { useFiltersStore } from "../stores/filtersStore"; // Import filters store

export default {
  emits: ["search"], // Emitting search event
  setup(_, { emit }) {
    const filtersStore = useFiltersStore(); // Access filters store

    // Local state for filters
    const status = ref(filtersStore.status);
    const type = ref(filtersStore.type);
    const search = ref(filtersStore.search || ""); // Search term state
    const statusOptions = ["default", "airing", "complete", "upcoming"]; // Status options
    const typeOptions = [
      "tv",
      "movie",
      "ova",
      "special",
      "ona",
      "music",
      "cm",
      "tv_special",
    ];

    // Mapping numeric status values to string values
    const statusMapping = {
      0: "default",
      1: "airing",
      2: "complete",
      3: "upcoming",
    };

    // Debounced search functionality
    const debouncedSearch = debounce(() => {
      filtersStore.search = search.value;
      const searchParams = {
        search: search.value,
      };

      // Only include status if it's neither default nor 0 or empty
      if (
        filtersStore.status &&
        filtersStore.status !== "default" &&
        filtersStore.status !== 0
      ) {
        searchParams.status = filtersStore.status;
      }

      // Only include type if it's not empty
      if (filtersStore.type) {
        searchParams.type = filtersStore.type;
      }

      emit("search", searchParams); // Emit the search event with filters
    }, 300);

    // Apply Filters Button
    const applyFilters = () => {
      console.log("Search:", search.value);
      console.log("Selected status:", status.value);

      const mappedStatus = statusMapping[status.value];
      const filters = {
        search: filtersStore.search,
        status: mappedStatus,
        type: type.value,
      };

      // Update the filters store
      filtersStore.status = mappedStatus;
      filtersStore.type = type.value;

      console.log("filters: ", filters);
      filtersStore.applyFilters(filters); // Trigger the API call with the new filters
    };

    // Watch the store values to update the local component state
    watch(
      () => filtersStore.status,
      (newStatus) => {
        status.value = Object.values(statusMapping).indexOf(newStatus); // Update status based on store
      }
    );

    watch(
      () => filtersStore.type,
      (newType) => {
        type.value = newType; // Update type based on store
      }
    );

    watch(
      () => filtersStore.search,
      (newSearch) => {
        search.value = newSearch; // Update search term based on store
      }
    );

    return { status, type, search, statusOptions, typeOptions, applyFilters, debouncedSearch };
  },
};
</script>
<style>
.v-tab--selected{
  background: #1867c0 !important;
  color: white !important;
  border-radius: 5px !important;
}
</style>