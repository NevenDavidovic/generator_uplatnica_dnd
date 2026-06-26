import { defineStore } from "pinia";
import { usePrimateljiStore } from "@/store/primateljiStore";
import { useRadionicaStore } from "@/store/radionicaStore";

export const useStatisticsStore = defineStore("statistics", {
  state: () => ({
    transactions: [],
    totalRows: 0,
    cityCounts: [],
    radionicaCounts: [],
    totalRadionica: 0,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTransactions() {
      if (this.transactions.length > 0) return;
      this._compute();
    },

    _compute() {
      this.loading = true;

      const primateljiStore = usePrimateljiStore();
      const radionicaStore = useRadionicaStore();

      const primatelji = primateljiStore.primatelji;
      const radionice = radionicaStore.radionice;

      const radionicaMap = {};
      radionice.forEach((r) => {
        radionicaMap[r.id] = r.naziv;
      });

      this.transactions = primatelji.map((p) => ({
        ...p,
        radionica: p.id_radionica
          ? { id: p.id_radionica, naziv: radionicaMap[p.id_radionica] }
          : null,
      }));

      this.totalRows = this.transactions.length;

      const cityCountsMap = primatelji.reduce((acc, row) => {
        const city = row.grad?.trim();
        if (!city) return acc;
        acc[city] = (acc[city] || 0) + 1;
        return acc;
      }, {});
      this.cityCounts = Object.entries(cityCountsMap).map(([grad, count]) => ({
        grad,
        count,
      }));

      const radionicaCountsMap = primatelji.reduce((acc, row) => {
        const id = row.id_radionica;
        if (!id) return acc;
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});
      this.radionicaCounts = Object.entries(radionicaCountsMap).map(([id, count]) => ({
        naziv: radionicaMap[id] || "Nepoznato",
        count,
      }));

      this.totalRadionica = radionice.length;
      this.loading = false;
    },

    resetAndRefetch() {
      this.transactions = [];
      this.totalRows = 0;
      this.cityCounts = [];
      this.radionicaCounts = [];
      this.totalRadionica = 0;
      this.error = null;
      this._compute();
    },
  },

  getters: {
    totalAmount: (state) =>
      state.transactions.reduce(
        (sum, txn) => sum + parseFloat(txn.iznos || 0),
        0
      ),

    totalTransactions: (state) => state.transactions.length,

    monthlyStats: (state) => {
      const months = {};
      state.transactions.forEach((txn) => {
        const date = new Date(txn.created_at);
        const month = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
        if (!months[month]) months[month] = { count: 0, totalAmount: 0 };
        months[month].count += 1;
        months[month].totalAmount += parseFloat(txn.iznos || 0);
      });
      return Object.entries(months).map(([month, stats]) => ({
        month,
        transactions: stats.count,
        amount: stats.totalAmount,
      }));
    },
  },
});
