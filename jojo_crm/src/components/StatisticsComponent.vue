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

    <!-- Transactions Table -->
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h3 class="text-xl font-semibold mb-4">📋 Zadnje transakcije</h3>

      <div v-if="statisticsStore.loading" class="text-center">
        Učitavanje podataka...
      </div>

      <table v-else class="w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">Datum</th>
            <th class="border border-gray-300 px-4 py-2">Ime i Prezime</th>
            <th class="border border-gray-300 px-4 py-2">Iznos (€)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="txn in statisticsStore.transactions.slice(0, 10)"
            :key="txn.id"
            class="border-t"
          >
            <td class="border border-gray-300 px-4 py-2">
              {{ formatDate(txn.created_at) }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{ txn.ime_prezime }}
            </td>
            <td
              class="border border-gray-300 px-4 py-2 text-green-600 font-bold"
            >
              {{ txn.iznos }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Transactions Chart -->
    <div class="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h3 class="text-xl font-semibold mb-4">📈 Mjesečne Uplate</h3>
      <div v-if="statisticsStore.loading" class="text-center">
        Učitavanje grafikona...
      </div>
      <BarChart v-else :data="chartData" />
    </div>
  </div>
</template>

<script>
import { useStatisticsStore } from "@/store/statisticsStore";
import { useOrganizationStore } from "@/store/organizationStore";
import BarChart from "@/components/BarChart.vue";

export default {
  components: { BarChart },
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
