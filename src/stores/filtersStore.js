import { defineStore } from "pinia";
import { ref } from "vue";
import { useAnimeStore } from "./animeStore"; // Import animeStore

export const useFiltersStore = defineStore("filters", () => {
  const searchQuery = ref("");
  const status = ref(0);
  const type = ref("");
  const orderBy = ref("rank");
  const page = ref(1);
  const limit = ref(5);
  const search = ref("");
  const appliedFilters = ref([]); // Track applied filters

  // Access anime store
  const animeStore = useAnimeStore();

  // Apply Filters
  const applyFilters = () => {
    const filters = [];
    if (status.value) filters.push({ key: "Status: ", value: status.value });
    if (type.value) filters.push({ key: "Type: ", value: type.value });
    appliedFilters.value = filters;

    // Call the fetchAnimes method from animeStore with the current filter values
    const queryParams = {
      status:
        status.value == 0 || status.value == "default" ? "" : status.value,
      type: type.value,
      orderBy: orderBy.value,
      page: page.value,
      search: search.value,
      limit: limit.value,
    };
    console.log("queryParams: ", queryParams);

    // Trigger API call to fetch filtered animes
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
