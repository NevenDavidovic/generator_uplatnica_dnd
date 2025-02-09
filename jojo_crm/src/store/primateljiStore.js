// src/stores/primateljiStore.js
import { defineStore } from "pinia";
import supabase from "@/config_db/supabase";

export const usePrimateljiStore = defineStore("primatelji", {
  state: () => ({
    primatelji: [], // Will hold multiple rows
    loading: false,
    error: null,
  }),
  actions: {
    /**
     * Fetch all rows from `primatelji_uplatnice` filtered by an organization ID
     */
    async fetchPrimatelji(organizationId) {
      if (!organizationId) {
        console.error("No organization ID provided to fetchPrimatelji.");
        this.error = { message: "No organization ID provided." };
        return;
      }

      this.loading = true;
      console.log("Fetching primatelji_uplatnice for org ID:", organizationId);

      const { data, error } = await supabase
        .from("primatelji_uplatnice")
        .select("*")
        .eq("id_organizacija", organizationId);

      if (error) {
        console.error("Error fetching primatelji_uplatnice:", error);
        this.error = error;
      } else {
        console.log("Fetched primatelji_uplatnice:", data);
        this.primatelji = data || [];
      }
      this.loading = false;
    },

    /**
     * Create (insert) a new row in `primatelji_uplatnice`.
     * Make sure to include `id_organizacija` in `newPrimatelj`.
     */
    async createPrimatelj(newPrimatelj) {
      this.loading = true;
      console.log("Creating new primatelj:", newPrimatelj);

      const { data, error } = await supabase
        .from("primatelji_uplatnice")
        .insert([newPrimatelj]) // ✅ Ensure this is an array
        .select();

      if (error) {
        console.error("Error creating primatelj:", error);
        this.error = error;
      } else {
        console.log("Created primatelj:", data);
        if (data && data.length) {
          this.primatelji.push(data[0]);
        }
      }
      this.loading = false;
    },

    async updatePrimatelj(primateljId, updatedFields) {
      if (!primateljId) {
        console.error("No ID provided to updatePrimatelj.");
        return;
      }

      this.loading = true;
      console.log("Updating primatelj with ID:", primateljId, updatedFields);

      const { data, error } = await supabase
        .from("primatelji_uplatnice")
        .update(updatedFields)
        .eq("id", primateljId)
        .select();

      if (error) {
        console.error("Error updating primatelj:", error);
        this.error = error;
      } else {
        console.log("Updated primatelj result:", data);
        if (data && data.length) {
          const index = this.primatelji.findIndex((p) => p.id === primateljId);
          if (index !== -1) {
            this.primatelji[index] = data[0];
          }
        }
      }
      this.loading = false;
    },

    /**
     * Delete a single row from `primatelji_uplatnice` by ID
     */
    async deletePrimatelj(primateljId) {
      if (!primateljId) {
        console.error("No ID provided to deletePrimatelj.");
        return;
      }

      this.loading = true;
      console.log("Deleting primatelj with ID:", primateljId);

      const { data, error } = await supabase
        .from("primatelji_uplatnice")
        .delete()
        .eq("id", primateljId)
        .select();

      if (error) {
        console.error("Error deleting primatelj:", error);
        this.error = error;
      } else {
        console.log("Deleted primatelj:", data);
        // Remove the deleted row from `primatelji`
        this.primatelji = this.primatelji.filter((p) => p.id !== primateljId);
      }
      this.loading = false;
    },
  },
  getters: {
    totalContacts: (state) => state.primatelji.length, // ✅ Add this line
  },
});
