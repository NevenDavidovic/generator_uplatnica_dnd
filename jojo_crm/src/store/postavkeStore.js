import { defineStore } from "pinia";

const LS_KEY = "jojo_postavke";

function load() {
  const stored = localStorage.getItem(LS_KEY);
  return stored ? JSON.parse(stored) : { id: 1 };
}

export const usePostavkeStore = defineStore("postavke", {
  state: () => ({
    emailSettings: load(),
    loading: false,
    error: null,
  }),

  actions: {
    async fetchEmailSettings() {
      this.loading = true;
      this.emailSettings = load();
      this.loading = false;
    },

    async updateEmailSettings(updatedSettings) {
      this.loading = true;
      this.emailSettings = { ...this.emailSettings, ...updatedSettings };
      localStorage.setItem(LS_KEY, JSON.stringify(this.emailSettings));
      this.loading = false;
    },
  },
});
