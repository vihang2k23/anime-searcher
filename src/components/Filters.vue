<template>
    <v-container class="mb-4">
      <v-tabs v-model="status" background-color="primary" grow>
        <v-tab v-for="tab in statusOptions" :key="tab">{{ tab }}</v-tab>
      </v-tabs>
  
      <v-select
        v-model="type"
        :items="typeOptions"
        label="Filter by Type"
        class="mt-4"
        clearable
      />
  
      <v-btn class="mt-4" @click="applyFilters">Apply Filters</v-btn>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    emits: ['filter'],
    setup(_, { emit }) {
      const status = ref('');
      const type = ref('');
      const statusOptions = ['airing', 'complete', 'upcoming'];
      const typeOptions = [
        'tv',
        'movie',
        'ova',
        'special',
        'ona',
        'music',
        'cm',
        'pv',
        'tv_special',
      ];
  
      const applyFilters = () => {
        emit('filter', { status: status.value, type: type.value });
      };
  
      return { status, type, statusOptions, typeOptions, applyFilters };
    },
  };
  </script>
  