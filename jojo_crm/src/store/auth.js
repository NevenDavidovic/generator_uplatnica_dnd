import { defineStore } from "pinia";
import { firebaseAuth } from "@/services/firebase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isLoading: true,
  }),
  actions: {
    async initializeAuth() {
      this.isLoading = true;
      firebaseAuth.onAuthStateChanged((user) => {
        this.user = user;
        this.isLoading = false;
      });
    },

    setUser(user) {
      this.user = user;
    },

    async signOut() {
      await firebaseAuth.signOut();
      this.user = null;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
