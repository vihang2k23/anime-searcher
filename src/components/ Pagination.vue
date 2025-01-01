<template>
    <v-container>
      <v-pagination v-model="page" :length="totalPages" @input="changePage" />
      <v-select
        v-model="limit"
        :items="[5, 10, 15, 25]"
        label="Items per page"
        class="mt-2"
        @change="changeLimit"
      />
    </v-container>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    props: {
      total: Number,
      limit: Number,
    },
    emits: ['page', 'limit'],
    setup(props, { emit }) {
      const page = ref(1);
      const limit = ref(props.limit || 5);
  
      const totalPages = computed(() => Math.ceil(props.total / limit.value));
  
      const changePage = () => {
        emit('page', page.value);
      };
  
      const changeLimit = () => {
        emit('limit', limit.value);
      };
  
      return { page, limit, totalPages, changePage, changeLimit };
    },
  };
  </script>
  