<template>
    <v-text-field
      v-model="search"
      label="Search Anime"
      @input="debouncedSearch"
      clearable
      class="mb-4"
    />
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  import { debounce } from 'lodash';
  
  export default {
    emits: ['search'],
    setup(_, { emit }) {
      const search = ref('');
  
      const debouncedSearch = debounce(() => {
        emit('search', search.value);
      }, 300);
  
      watch(search, debouncedSearch);
  
      return { search, debouncedSearch };
    },
  };
  </script>
  