<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  props: ["data"],
  mounted() {
    new Chart(this.$refs.chartCanvas, {
      type: "bar",
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  },
};
</script>
