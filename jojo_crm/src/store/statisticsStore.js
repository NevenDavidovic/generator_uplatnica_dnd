import { defineStore } from "pinia";
import supabase from "@/config_db/supabase";

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
    // ✅ Fetch transactions based on organization ID
    async fetchTransactions(organizationId) {
      if (!organizationId) {
        console.error("No organization ID provided.");
        this.error = { message: "No organization ID provided" };
        return;
      }

      this.loading = true;
      console.log("Fetching transactions for organization ID:", organizationId);

      // ✅ Fetch Transactions
      const { data: transactions, error: txnError } = await supabase
        .from("primatelji_uplatnice")
        .select("*")
        .eq("id_organizacija", organizationId)
        .order("created_at", { ascending: false });

      if (txnError) {
        console.error("Error fetching transactions:", txnError);
        this.error = txnError;
      } else {
        this.transactions = transactions;
      }

      // ✅ Fetch Total Recipients (All rows count)
      const { count: totalRecipients, error: countError } = await supabase
        .from("primatelji_uplatnice")
        .select("*", { count: "exact", head: true })
        .eq("id_organizacija", organizationId);

      if (countError) {
        console.error("Error fetching total rows:", countError);
      } else {
        this.totalRows = totalRecipients;
      }

      // ✅ Fetch Grouped Count by City
      const { data: rawData, error: cityError } = await supabase
        .from("primatelji_uplatnice")
        .select("grad")
        .eq("id_organizacija", organizationId);

      if (cityError) {
        console.error("Error fetching city data:", cityError);
      } else {
        // ✅ Normalize city names and count occurrences
        const cityCountsMap = rawData.reduce((acc, row) => {
          const cityName = row.grad.trim(); // Remove extra spaces

          if (!acc[cityName]) {
            acc[cityName] = 0;
          }
          acc[cityName] += 1; // Increase count for the city
          return acc;
        }, {});

        // ✅ Convert back to an array format for the chart
        this.cityCounts = Object.entries(cityCountsMap).map(
          ([grad, count]) => ({
            grad,
            count,
          })
        );

        console.log("Updated cityCounts:", this.cityCounts); // Debugging log
      }

      // ✅ Fetch Grouped Count by Radionica
      const { data: rawRadionicaData, error: radionicaError } = await supabase
        .from("primatelji_uplatnice")
        .select("id_radionica")
        .eq("id_organizacija", organizationId);

      if (radionicaError) {
        console.error("Error fetching radionica data:", radionicaError);
      } else {
        // ✅ Count occurrences of each id_radionica
        const radionicaCountsMap = rawRadionicaData.reduce((acc, row) => {
          const radionicaId = row.id_radionica;

          if (!radionicaId) return acc; // Ignore null values

          if (!acc[radionicaId]) {
            acc[radionicaId] = 0;
          }
          acc[radionicaId] += 1; // Increase count for the radionica
          return acc;
        }, {});

        // ✅ Fetch Radionica Names for Display
        const { data: radionice, error: radionicaNameError } = await supabase
          .from("radionica")
          .select("id, naziv");

        if (radionicaNameError) {
          console.error("Error fetching radionica names:", radionicaNameError);
        } else {
          // ✅ Merge counts with radionica names
          this.radionicaCounts = radionice.map((r) => ({
            naziv: r.naziv,
            count: radionicaCountsMap[r.id] || 0, // Default to 0 if no participants
          }));

          console.log("Updated radionicaCounts:", this.radionicaCounts);
        }
      }
      // ✅ Fetch Total Number of Radionica
      const { count: totalRadionica, error: radionicaCountError } =
        await supabase
          .from("radionica")
          .select("*", { count: "exact", head: true });

      if (radionicaCountError) {
        console.error("Error fetching total radionica:", radionicaCountError);
      } else {
        this.totalRadionica = totalRadionica;
      }

      this.loading = false;
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

        if (!months[month]) {
          months[month] = { count: 0, totalAmount: 0 };
        }
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
