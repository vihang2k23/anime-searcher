<template>
    <v-container class="mb-4">
      <v-row class="mb-4">
        <!-- List of Favorite Animes -->
        <v-col v-if="favorites.length > 0">
          <v-data-table
            :headers="headers"
            :items="favorites"
            item-value="mal_id"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Favorite Animes</v-toolbar-title>
              </v-toolbar>
            </template>
  
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
                  <v-icon
                    color="red"
                    @click="toggleFavorite(anime)"
                    v-if="isFavorite(anime)"
                  >
                    mdi-heart
                  </v-icon>
                  <v-icon @click="toggleFavorite(anime)" v-else>
                    mdi-heart-outline
                  </v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
  
        <!-- If No Favorites -->
        <v-col v-else>
          <v-alert type="info" dismissible>
            No favorite animes yet. Add some from the home page!
          </v-alert>
        </v-col>
      </v-row>
  
      <!-- Go to Home Button -->
      <v-row class="mt-4" align="center">
        <v-btn @click="goToHome" color="primary">Go to Home</v-btn>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useAnimeStore } from "../stores/animeStore";
  import { useRouter } from "vue-router";
  
  // Headers definition for the table
  const headers = [
    { title: "Title", key: "title", align: "start" },
    { title: "Rank", key: "rank", align: "center" },
    { title: "Type", key: "type", align: "center" },
    { title: "Status", key: "status", align: "center" },
    { title: "Actions", key: "actions", sortable: false, align: "end" },
  ];
  
  // Anime store and router
  const animeStore = useAnimeStore();
  const router = useRouter();
  
  // Computed property for favorites
  const favorites = computed(() => animeStore.favorites);
  
  // Helper to check if the anime is a favorite
  const isFavorite = (anime) =>
    favorites.value.some((fav) => fav.mal_id === anime.mal_id);
  
  // Navigation function
  const goToHome = () => {
    router.push({ name: "Home" });
  };
  </script>
  
  <style scoped>
  .custom-avatar-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .elevation-1 {
    margin-top: 20px;
  }
  </style>
  