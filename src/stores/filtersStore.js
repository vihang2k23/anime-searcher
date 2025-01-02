import { defineStore } from "pinia";
import { ref } from "vue";
import { useAnimeStore } from "./animeStore";

export const useFiltersStore = defineStore("filters", () => {
  const searchQuery = ref("");
  const status = ref(0);
  const type = ref("");
  const orderBy = ref("rank");
  const page = ref(1);
  const limit = ref(5);
  const search = ref("");
  const appliedFilters = ref([]); 


  const animeStore = useAnimeStore();

  // Apply Filters
  const applyFilters = () => {
  
    const filters = [];

    // Check if status filter is set and not equal to default value
    if (status.value && status.value !== 0 && status.value !== "default") {
      filters.push({ key: "Status: ", value: status.value });
    }

    // Check if type filter is set
    if (type.value) {
      filters.push({ key: "Type: ", value: type.value });
    }

    // Update appliedFilters with the current filters
    appliedFilters.value = filters;

    // Prepare query parameters for the API request
    const queryParams = {
      status:
        status.value == 0 || status.value == "default" ? "" : status.value,
      type: type.value,
      orderBy: orderBy.value,
      page: page.value,
      search: search.value,
      limit: limit.value,
    };

    console.log("Applied Filters: ", filters);
    console.log("Query Parameters: ", queryParams);

    // Call the fetchAnimes method from animeStore with the current filter values
    animeStore.fetchAnimes(queryParams);
  };

  // Clear Filters
  const clearFilters = () => {
    status.value = 0;
    type.value = "";
    search.value = "";
    appliedFilters.value = [];
    // Trigger API call to fetch all animes without filters
    animeStore.fetchAnimes();
  };

  return {
    searchQuery,
    status,
    type,
    orderBy,
    page,
    search,
    limit,
    appliedFilters,
    applyFilters,
    clearFilters,
  };
});
