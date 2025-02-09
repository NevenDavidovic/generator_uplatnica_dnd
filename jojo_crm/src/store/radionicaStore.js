import { defineStore } from "pinia";
import supabase from "@/config_db/supabase";

export const useRadionicaStore = defineStore("radionicaStore", {
  state: () => ({
    radionice: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchRadionice() {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase.from("radionica").select("*");
        if (error) throw error;
        this.radionice = data;
      } catch (error) {
        console.error("Error fetching radionica:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async createRadionica(newRadionica) {
      this.loading = true;
      try {
        const { data, error } = await supabase
          .from("radionica")
          .insert([newRadionica])
          .select();

        if (error) throw error;

        this.radionice.push(data[0]);
      } catch (error) {
        console.error("Error creating radionica:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async updateRadionica(id, updatedFields) {
      if (!id) {
        console.error("No ID provided for updateRadionica");
        return;
      }

      this.loading = true;
      try {
        const { data, error } = await supabase
          .from("radionica")
          .update(updatedFields)
          .eq("id", id)
          .select();

        if (error) throw error;

        const index = this.radionice.findIndex((r) => r.id === id);
        if (index !== -1) {
          this.radionice[index] = data[0];
        }
      } catch (error) {
        console.error("Error updating radionica:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteRadionica(id) {
      if (!id) {
        console.error("No ID provided for deleteRadionica");
        return;
      }

      this.loading = true;
      try {
        const { error } = await supabase
          .from("radionica")
          .delete()
          .eq("id", id);
        if (error) throw error;

        this.radionice = this.radionice.filter((r) => r.id !== id);
      } catch (error) {
        console.error("Error deleting radionica:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
