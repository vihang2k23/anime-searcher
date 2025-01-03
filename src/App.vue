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
      class="mx-2 text-uppercase bg-white gap-3 text-primary d-flex align-center"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :style="{
        backgroundColor: hover ? '#3f8de8' : '',
        transform: hover ? 'scale(1.05)' : '',
        transition: 'all 0.3s ease',
      }"
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
        © {{ new Date().getFullYear() }} Anime Search Application
      </v-col>
    </v-footer>
  </v-app>
</template>
<script>
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const hover = ref(false);
    const router = useRouter();

    const goToHomePage = () => {
      router.push("/");
    };

    return {
      hover,
      goToHomePage,
    };
  },
};
</script>
<style scoped>
.favorites-btn {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: var(--v-primary-base) !important;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.favorites-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--v-primary-base) 0%,
    var(--v-primary-lighten2) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.favorites-btn.on-hover {
  transform: translateY(-2px);
  border-color: var(--v-primary-base);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.favorites-btn.on-hover::before {
  opacity: 0.1;
}

.favorites-btn .v-btn__content {
  z-index: 1;
  position: relative;
}

.favorites-btn:active {
  transform: translateY(1px);
}

/* Animation for the heart icon */
.v-icon {
  transition: transform 0.3s ease;
}

.favorites-btn.on-hover .v-icon {
  transform: scale(1.2);
}

/* Badge styling */
:deep(.v-badge__badge) {
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
