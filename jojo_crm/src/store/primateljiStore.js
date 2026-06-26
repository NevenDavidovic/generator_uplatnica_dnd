import { defineStore } from "pinia";

const LS_KEY = "jojo_primatelji";

function load() {
  const stored = localStorage.getItem(LS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function save(primatelji) {
  localStorage.setItem(LS_KEY, JSON.stringify(primatelji));
}

export const usePrimateljiStore = defineStore("primatelji", {
  state: () => ({
    primatelji: load(),
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPrimatelji() {
      this.loading = true;
      this.primatelji = load();
      this.loading = false;
    },

    async createPrimatelj(newPrimatelj) {
      this.loading = true;
      const record = {
        ...newPrimatelj,
        id: Date.now(),
        created_at: new Date().toISOString(),
      };
      this.primatelji.push(record);
      save(this.primatelji);
      this.loading = false;
    },

    async updatePrimatelj(primateljId, updatedFields) {
      if (!primateljId) return;
      this.loading = true;
      const index = this.primatelji.findIndex((p) => p.id === primateljId);
      if (index !== -1) {
        this.primatelji[index] = { ...this.primatelji[index], ...updatedFields };
        save(this.primatelji);
      }
      this.loading = false;
    },

    async deletePrimatelj(primateljId) {
      if (!primateljId) return;
      this.loading = true;
      this.primatelji = this.primatelji.filter((p) => p.id !== primateljId);
      save(this.primatelji);
      this.loading = false;
    },

    async deleteAllPrimatelji() {
      this.loading = true;
      this.primatelji = [];
      save(this.primatelji);
      this.loading = false;
    },
  },
  getters: {
    totalContacts: (state) => state.primatelji.length,
  },
});
