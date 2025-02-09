import { defineStore } from "pinia";
import supabase from "@/config_db/supabase";

export const usePostavkeStore = defineStore("postavke", {
  state: () => ({
    emailSettings: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchEmailSettings(organizationId) {
      if (!organizationId) {
        this.error = { message: "No organization ID provided" };
        return;
      }

      this.loading = true;

      const { data, error } = await supabase
        .from("postavke") // Table name
        .select("*")
        .eq("id_organizacija", organizationId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching email settings:", error);
        this.error = error;
      } else {
        console.log("Received email settings:", data);
        this.emailSettings = data;
      }
      this.loading = false;
    },

    async updateEmailSettings(updatedSettings) {
      if (!this.emailSettings?.id) {
        console.error("No settings ID found.");
        return;
      }

      this.loading = true;
      console.log("Updating email settings with ID:", this.emailSettings.id);
      console.log("Data to update:", updatedSettings);

      const { data, error } = await supabase
        .from("postavke")
        .update(updatedSettings)
        .eq("id", this.emailSettings.id)
        .select();

      if (error) {
        this.error = error;
      } else {
        console.log("Updated email settings:", data);
        this.emailSettings = data?.[0] || null;
      }

      this.loading = false;
    },
  },
});
