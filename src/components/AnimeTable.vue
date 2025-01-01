<template>
    <v-data-table
      :headers="headers"
      :items="animes"
      :loading="loading"
      class="elevation-1"
      item-value="mal_id"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Anime Search</v-toolbar-title>
        </v-toolbar>
      </template>
  
      <template v-slot:body="{ items }">
        <tr v-for="anime in items" :key="anime.mal_id">
          <td>
            <img
              v-if="anime?.images?.jpg?.small_image_url"
              class="rounded-full w-16 h-16"
              :src="anime.images.jpg.small_image_url"
            />
          </td>
          <td>{{ anime.title }}</td>
          <td>{{ anime.status }}</td>
          <td>{{ anime.type }}</td>
          <td>
            <v-btn color="primary" @click="toggleFavorite(anime)">
              {{ favorites.some(fav => fav.mal_id === anime.mal_id) ? 'Remove from Favorites' : 'Add to Favorites' }}
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </template>
  
  
  <script>
  import { onMounted } from 'vue';
  import { useAnimeStore } from '../stores/animeStore';
  
  export default {
    name: 'AnimeTable',
    setup() {
      const animeStore = useAnimeStore();
  
      // Fetch anime data when the component is mounted
      onMounted(() => {
        if (!animeStore.animes.length) {
          animeStore.fetchAnimes();
        }
      });
  
      return {
        animes: animeStore.animes,
        favorites: animeStore.favorites,
        toggleFavorite: animeStore.toggleFavorite,
        loading: animeStore.loading,
      };
    },
  };
  </script>
  
  
  <style scoped>
  /* Add necessary styles here */
  .elevation-1 {
    margin-top: 20px;
  }
  
  td {
    padding: 8px;
    text-align: left;
  }
  </style>
  