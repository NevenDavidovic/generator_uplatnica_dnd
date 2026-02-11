<template>
  <div class="bg-primary px-4 md:px-8">
    <!-- Navigation Bar -->
    <nav class="flex items-center justify-between py-4 max-w-7xl mx-auto">
      <!-- Left Section -->
      <div class="flex items-center gap-8">
        <!-- Logo -->
        <div
          class="flex items-center gap-2 cursor-pointer"
          @click="$router.push('/')"
        >
          <img src="../assets/images/logo.png" alt="Dnd" class="w-[50px]" />
          <span class="text-white text-xl font-semibold">
            Društvo "Naša Djeca" Poreč</span
          >
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <router-link
          class="bg-white text-white px-4 py-2 rounded-md font-medium hover:bg-white/90 transition-colors"
          to="/signin"
          >Prijava</router-link
        >
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {};
  },
};
</script>
