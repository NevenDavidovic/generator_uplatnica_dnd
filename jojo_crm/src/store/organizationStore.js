import { defineStore } from "pinia";
import supabase from "@/config_db/supabase";

export const useOrganizationStore = defineStore("organization", {
  state: () => ({
    organization: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchOrganization(organizationId) {
      if (!organizationId) {
        this.error = { message: "No organization id provided" };
        return;
      }
      this.loading = true;

      const { data, error } = await supabase
        .from("organizacija")
        .select("*")
        .eq("id", organizationId)
        .maybeSingle();

      if (error) {
        alert("Error fetching organizacija:", error);
        this.error = error;
      } else {
        this.organization = data;
      }
      this.loading = false;
    },

    async updateOrganization(updatedOrg) {
      this.loading = true;
      // Using current organization's id for update
      const organizationId = Number(this.organization?.id);

      const { data, error } = await supabase
        .from("organizacija") // Make sure the table name is correct
        .update(updatedOrg)
        .eq("id", organizationId)
        .select(); // or select("*") if you want all columns

      if (error) {
        this.error = error;
      } else {
        this.organization = data?.[0] || null;
      }
      this.loading = false;
    },
  },
});
