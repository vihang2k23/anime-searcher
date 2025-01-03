<template>
  <v-container class="mb-4">
    <!-- Status Filters -->
    <v-row class="align-center">
      <v-tabs v-model="status" background-color="primary" grow class="border-b">
        <v-col
          cols="12" sm="4"
          class="d-flex align-center"
        >
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
      <!-- Type Filter on Small Screens - Full Width -->
      <v-col
        cols="12" sm="4"
        class="d-flex align-center"
      >
        <v-select
          v-model="type"
          :items="typeOptions"
          @click:clear="removeFilter('Type', type)"
          label="Filter by Type"
          class="mt-4"
          clearable
        />
      </v-col>

      <!-- Search Input on Small Screens - Full Width -->
      <v-col
        cols="12" sm="8"
        class="d-flex align-center"
      >
        <v-text-field
          v-model="search"
          label="Search Anime"
          @input="debouncedSearch"
          @click:clear="debouncedSearch"
          class="mt-4"
          clearable
        />
      </v-col>
    </v-row>

    <!-- Apply Filters Button -->
    <div class="d-flex justify-center">
      <v-btn
        color="primary"
        size="x-large"
        class="mt-4"
        @click="applyFilters"
        :disabled="!(type || status > 0)"
      >
        Apply Filters
      </v-btn>
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
    const search = ref(filtersStore.search || "");
    const statusOptions = ["default", "airing", "complete", "upcoming"];
    const typeOptions = ["Tv", "Movie", "Ova", "Special", "Ona", "Music", "Cm", "Tv_special"]

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

  const mappedStatus = statusMapping[status.value] || 'default';
  const filters = {
    search: filtersStore.search,
    status: mappedStatus,
    type: type.value,
  };

  // Update the filters store
  filtersStore.status = mappedStatus;
  filtersStore.type = type.value;

  console.log("filters: ", filters);
  filtersStore.applyFilters(filters);
};

    // Watch the store values to update the local component state
    watch(
  () => filtersStore.status,
  (newStatus) => {
    // Convert string status to numeric index
    const statusIndex = Object.values(statusMapping).indexOf(newStatus);
    status.value = statusIndex >= 0 ? statusIndex : 0; // Default to 0 if not found
  }
);
    watch(
      () => filtersStore.type,
      (newType) => {
        type.value = newType;
      }
    );

    watch(
      () => filtersStore.search,
      (newSearch) => {
        search.value = newSearch;
      }
    );
     // Remove individual filter
     const removeFilter = (key, value) => {
      console.log("value: ", value);
      console.log("key: ", key);

      // Filter out the object with the specified key and value
      const originalLength = filtersStore.appliedFilters.length;
      console.log(
        " filtersStore.appliedFilters: ",
        filtersStore.appliedFilters
      );
      filtersStore.appliedFilters = filtersStore.appliedFilters.filter(
        (filter) => {
          console.log("filter: ", filter);
          filter.key !== key || filter.value !== value;
        }
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

    return {
      status,
      type,
      search,
      statusOptions,
      typeOptions,
      applyFilters,
      debouncedSearch,
      removeFilter
    };
  },
};
</script>
<style>
.v-tab--selected {
  background: #1867c0 !important;
  color: white !important;
  border-radius: 5px !important;
}
</style>
