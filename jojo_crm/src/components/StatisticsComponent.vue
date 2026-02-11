<template>
  <div class="max-w-6xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">📊 Statistika Transakcija</h2>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-blue-100 p-4 rounded-lg text-center shadow">
        <h3 class="text-lg font-semibold">Ukupan broj transakcija</h3>
        <p class="text-2xl font-bold text-blue-600">
          {{ statisticsStore.totalTransactions }}
        </p>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center shadow">
        <h3 class="text-lg font-semibold">Ukupno cifra za platiti</h3>
        <p class="text-2xl font-bold text-green-600">
          €{{ statisticsStore.totalAmount.toFixed(2) }}
        </p>
      </div>
    </div>

   

    
  </div>
</template>

<script>
import { useStatisticsStore } from "@/store/statisticsStore";
import { useOrganizationStore } from "@/store/organizationStore";


export default {
  
  setup() {
    const statisticsStore = useStatisticsStore();
    const organizationStore = useOrganizationStore();
    return { statisticsStore, organizationStore };
  },
  async mounted() {
    const orgId = this.organizationStore.organization?.id;
    if (orgId) {
      await this.statisticsStore.fetchTransactions(orgId);
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.statisticsStore.monthlyStats.map((m) => m.month),
        datasets: [
          {
            label: "Iznos uplata (€)",
            data: this.statisticsStore.monthlyStats.map((m) => m.amount),
          },
        ],
      };
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("hr-HR");
    },
  },
};
</script>
