// src/stores/authStore.js
import { defineStore } from "pinia";
import { firebaseAuth } from "@/services/firebase";
import supabase from "@/config_db/supabase";
import { useOrganizationStore } from "@/store/organizationStore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isLoading: true,
  }),
  actions: {
    async initializeAuth() {
      this.isLoading = true;
      firebaseAuth.onAuthStateChanged(async (user) => {
        this.user = user;
        this.isLoading = false;

        // If a user is logged in, check for a matching record in `korisnik`
        if (user) {
          await this.fetchKorisnikAndOrganization();
        }
      });
    },

    setUser(user) {
      this.user = user;
    },

    async signOut() {
      await firebaseAuth.signOut();
      this.user = null;
    },

    // New action: Fetch the user's record from `korisnik` and then the organization.
    async fetchKorisnikAndOrganization() {
      if (!this.user || !this.user.email) {
        console.error("User or user email not found.");
        return;
      }

      const email = this.user.email;
      console.log("Querying korisnik for email:", email);

      const { data, error } = await supabase
        .from("korisnik")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (error) {
        console.error("Error fetching korisnik record:", error);
        return;
      }

      if (data && data.id_organizacija) {
        console.log("Found korisnik record:", data);
        const organizationStore = useOrganizationStore();
        await organizationStore.fetchOrganization(data.id_organizacija);
      } else {
        console.warn("No korisnik record found matching email:", email);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
