<template>
  <div
    class="bg-primary"
    :style="{
      backgroundImage: `url(${require('@/assets/images/hero-section-image.png')})`,
    }"
  >
    <NavbarComponent />
    <div
      class="flex-col sm:flex max-w-[90%] mx-auto justify-center align-center items-center py-[50px]"
    >
      <contactTrialComponent />
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import contactTrialComponent from "@/components/freeComponents/contactTrialComponent.vue";

export default {
  name: "AuthView",
  components: {
    NavbarComponent,
    contactTrialComponent,
  },
  data() {
    return {};
  },

  mounted() {},
  methods: {},
};
</script>
