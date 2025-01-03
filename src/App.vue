<template>
  <v-app>
    <!-- Header -->
    <v-app-bar color="primary" app>
      <v-toolbar-title>Anime Search Application</v-toolbar-title>
      <v-spacer />
      <v-btn
        to="/favorites"
        rounded
        elevation="2"
        class="mx-2 text-uppercase bg-white text-primary"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        :style="{
          backgroundColor: hover ? '#3f8de8' : '',
          transform: hover ? 'scale(1.05)' : '',
          transition: 'all 0.3s ease',
        }"
      >
        Favorites
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-col class="text-center">
        © {{ new Date().getFullYear() }} Anime Search Application
      </v-col>
    </v-footer>
  </v-app>
</template>
