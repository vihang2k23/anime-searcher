<template>
  <v-app>
    <!-- Header -->
    <v-app-bar color="primary" app>
      <v-toolbar-title @click="goToHomePage" class="cursor-pointer">
        Anime Search Application
      </v-toolbar-title>

      <v-spacer />
      <v-btn
        to="/favorites"
        rounded
        elevation="2"
        class="favorites-btn mx-2 text-primary text-uppercase gap-3 d-flex align-center"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        :style="hoverStyles"
      >
        <v-icon color="red">mdi-heart</v-icon>
        <span>Favorites</span>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-col class="text-center">
        © {{ currentYear }} Anime Search Application
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Reactive state
const hover = ref(false);

// Router instance
const router = useRouter();

// Navigate to home page
const goToHomePage = () => {
  router.push("/");
};

// Computed styles for hover effect
const hoverStyles = computed(() => ({
  backgroundColor: hover.value ? "#3f8de8" : "",
  transform: hover.value ? "scale(1.05)" : "",
  transition: "all 0.3s ease",
}));

// Get current year
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.favorites-btn {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
 
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.favorites-btn:hover {
  transform: translateY(-2px);
  border-color: var(--v-primary-base);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.favorites-btn .v-btn__content {
  position: relative;
  z-index: 1;
}

.favorites-btn .v-icon {
  transition: transform 0.3s ease;
}

.favorites-btn:hover .v-icon {
  transform: scale(1.2);
}
</style>
