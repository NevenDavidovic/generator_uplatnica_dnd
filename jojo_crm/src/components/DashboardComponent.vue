<template>
  <div class="max-w-6xl mx-auto p-6">
    <h2 class="text-3xl font-bold mb-6">📊 Pregled</h2>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Ukupno Iznos (€)"
        :value="formattedTotalAmount"
        bgColor="bg-green-100"
        textColor="text-green-600"
      />
      <StatCard
        title="Ukupan Broj Primatelja"
        :value="statisticsStore.totalRows"
        bgColor="bg-yellow-100"
        textColor="text-yellow-600"
      />
    </div>
    <!-- Charts Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <ChartCard
        v-if="cityChartData"
        title="📍 Broj Primatelja po Gradovima"
        :chartData="cityChartData"
      />

      <ChartCard
        v-if="radionicaChartData"
        title="🎨 Broj Primatelja po Radionicama"
        :chartData="radionicaChartData"
      />
    </div>
    <!-- Recent Activity Section -->
    
  </div>
</template>

<script>
import { useStatisticsStore } from "@/store/statisticsStore";
import { usePrimateljiStore } from "@/store/primateljiStore";
import { useOrganizationStore } from "@/store/organizationStore";
import { ref, watchEffect } from "vue";
import StatCard from "@/components/pageElements/StatCard.vue";

import ChartCard from "@/components/pageElements/ChartCard.vue";

export default {
  components: { StatCard,  ChartCard },
  setup() {
    const statisticsStore = useStatisticsStore();
    const primateljiStore = usePrimateljiStore();
    const organizationStore = useOrganizationStore();

    const cityChartData = ref(null);
    const radionicaChartData = ref(null);

    watchEffect(() => {
      if (statisticsStore.cityCounts?.length) {
        cityChartData.value = {
          labels: statisticsStore.cityCounts.map((c) => c.grad),
          datasets: [
            {
              label: "Broj primatelja",
              data: statisticsStore.cityCounts.map((c) => c.count),
              backgroundColor: "#f59e0b",
            },
          ],
        };
      }

      if (statisticsStore.radionicaCounts?.length) {
        radionicaChartData.value = {
          labels: statisticsStore.radionicaCounts.map((r) => r.naziv),
          datasets: [
            {
              label: "Broj primatelja",
              data: statisticsStore.radionicaCounts.map((r) => r.count),
              backgroundColor: "#3b82f6",
            },
          ],
        };
      }
    });

    return {
      statisticsStore,
      primateljiStore,
      organizationStore,
      cityChartData,
      radionicaChartData,
    };
  },

  async mounted() {
    const orgId = this.organizationStore.organization?.id;
    if (orgId) {
      await Promise.all([
        this.statisticsStore.fetchTransactions(orgId),
        this.primateljiStore.fetchPrimatelji(orgId),
      ]);
    }
  },

  computed: {
    formattedTotalAmount() {
      return `€${this.statisticsStore.totalAmount.toFixed(2)}`;
    },
  },
};
</script>
