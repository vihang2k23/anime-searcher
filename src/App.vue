<template>
  <v-app>
    <!-- Header -->
    <v-app-bar color="primary" app>
      <v-toolbar-title>Anime Search Application</v-toolbar-title>
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

<script>
export default {
  name: "App",
};
</script>

<style>
/* Add any global styles here */
</style>
