<template>
  <div class="home">
    <NavbarComponent msg="Welcome to Your Vue.js App" />
    <HeroComponent />
  </div>
</template>

<script>
import HeroComponent from "@/components/HeroComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";

export default {
  name: "HomeView",
  components: {
    NavbarComponent,
    HeroComponent,
  },
};
</script>
