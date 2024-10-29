<template>
  <div class="bg-indigo-600 px-4 md:px-8">
    <!-- Navigation Bar -->
    <nav class="flex items-center justify-between py-4 max-w-7xl mx-auto">
      <!-- Left Section -->
      <div class="flex items-center gap-8">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <img src="../assets/images/logo.png" alt="JoJo" class="w-[50px]" />
          <span class="text-white text-xl font-semibold">CRM</span>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center gap-6">
          <div class="relative">
            <router-link
              class="text-white hover:text-white/90 px-2 py-1 rounded-md transition-colors"
              to="/"
              >Home</router-link
            >
          </div>
          <div class="relative">
            <router-link
              class="text-white hover:text-white/90 px-2 py-1 rounded-md transition-colors"
              to="/about"
              >About</router-link
            >
          </div>
          <div class="relative">
            <router-link
              class="text-white hover:text-white/90 px-2 py-1 rounded-md transition-colors"
              to="/pricing"
              >Pricing</router-link
            >
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <router-link
          class="text-white hover:text-white/90 px-2 py-1 rounded-md transition-colors"
          to="/signin"
          >Sign In</router-link
        >

        <router-link
          class="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-white/90 transition-colors"
          to="/signin"
          >Log In</router-link
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
