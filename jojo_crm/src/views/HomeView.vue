<template>
  <div class="home">
    <NavbarComponent msg="Welcome to Your Vue.js App" />
    <HeroComponent />
    <LandingContent />
    <PrefooterComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import HeroComponent from "@/components/HeroComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import LandingContent from "@/components/LandingContent.vue";
import PrefooterComponent from "@/components/PrefooterComponent.vue";

export default {
  name: "HomeView",
  components: {
    NavbarComponent,
    HeroComponent,
    LandingContent,
    PrefooterComponent,
  },
};
</script>
