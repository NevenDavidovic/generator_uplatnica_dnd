<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <h3 class="text-xl font-semibold mb-4">{{ title }}</h3>
    <div v-if="loading" class="text-center">Učitavanje grafikona...</div>
    <BarChart v-else :data="chartData" />
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
  components: { BarChart },
  props: ["title", "chartData", "loading"],
};
</script>
