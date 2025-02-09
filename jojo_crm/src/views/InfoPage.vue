<template>
  <NavbarComponent />
  <div
    class="flex items-center justify-center min-h-screen bg-primary"
    :style="{
      backgroundImage: `url(${require('@/assets/images/hero-section-image.png')})`,
    }"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
      <i class="fas fa-exclamation-circle text-red-500 text-5xl mb-4"></i>
      <h2 class="text-2xl font-semibold text-gray-800">
        Vaš email nije na popisu korisnika DND-a?
      </h2>
      <p class="text-gray-600 mt-2">
        Ako mislite da je došlo do greške ili trebate pristup, kontaktirajte
        administratora na:
      </p>
      <p class="text-blue-600 font-semibold mt-1">dnd.porec1996@gmail.com</p>

      <button
        @click="goHome"
        class="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
      >
        Vrati se na naslovnicu
      </button>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";

export default {
  components: {
    NavbarComponent,
  },
  methods: {
    goHome() {
      this.$router.replace("/");
    },
  },
};
</script>
