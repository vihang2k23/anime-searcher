<template>
  <v-container class="mb-4">
    <!-- Status Filters -->

    <v-tabs v-model="status" background-color="primary" grow>
      <v-tab v-for="(tab, index) in statusOptions" :key="index" :value="index">
        {{ tab }}</v-tab
      >
    </v-tabs>

    <!-- Type Filter -->
    <v-select
      v-model="type"
      :items="typeOptions"
      label="Filter by Type"
      class="mt-4"
      clearable
    />

    <!-- Search Input -->
    <v-text-field
      v-model="search"
      label="Search Anime"
      @input="debouncedSearch"
      clearable
      class="mb-4"
    />

    <!-- Apply Filters Button -->
    <v-btn class="mt-4" @click="applyFilters">Apply Filters</v-btn>
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
    const status = ref(filtersStore.status); // Status state
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

      // Ensure status is 0 if it's not selected
      const mappedStatus = statusMapping[status.value] || "default"; // Default to "default" if status is undefined

      const filters = {
        search: filtersStore.search,
        status: mappedStatus === "default" ? "" : mappedStatus, // Map default status to 0
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

    return {
      status,
      type,
      search,
      statusOptions,
      typeOptions,
      applyFilters,
      debouncedSearch,
    };
  },
};
</script>
