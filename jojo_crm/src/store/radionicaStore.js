import { defineStore } from "pinia";

const LS_KEY = "jojo_radionice";

function load() {
  const stored = localStorage.getItem(LS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function save(radionice) {
  localStorage.setItem(LS_KEY, JSON.stringify(radionice));
}

export const useRadionicaStore = defineStore("radionicaStore", {
  state: () => ({
    radionice: load(),
    loading: false,
    error: null,
  }),

  actions: {
    async fetchRadionice() {
      this.loading = true;
      this.radionice = load();
      this.loading = false;
    },

    async createRadionica(newRadionica) {
      this.loading = true;
      const record = { ...newRadionica, id: Date.now() };
      this.radionice.push(record);
      save(this.radionice);
      this.loading = false;
    },

    async updateRadionica(id, updatedFields) {
      if (!id) return;
      this.loading = true;
      const index = this.radionice.findIndex((r) => r.id === id);
      if (index !== -1) {
        this.radionice[index] = { ...this.radionice[index], ...updatedFields };
        save(this.radionice);
      }
      this.loading = false;
    },

    async deleteRadionica(id) {
      if (!id) return;
      this.loading = true;
      this.radionice = this.radionice.filter((r) => r.id !== id);
      save(this.radionice);
      this.loading = false;
    },
  },
});
