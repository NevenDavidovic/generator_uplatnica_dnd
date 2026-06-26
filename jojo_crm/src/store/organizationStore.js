import { defineStore } from "pinia";

const LS_KEY = "jojo_organizacija";
const DEFAULT_ORG = {
  id: 1,
  naziv: "Društvo „Naša djeca“ Poreč",
  ulica: "Trg kneza Branimira 2",
  grad: "Poreč",
  email: "",
  IBAN: "HR5823800061110007659",
  slika: "",
};

function load() {
  const stored = localStorage.getItem(LS_KEY);
  return stored ? JSON.parse(stored) : { ...DEFAULT_ORG };
}

export const useOrganizationStore = defineStore("organization", {
  state: () => ({
    organization: load(),
    loading: false,
    error: null,
  }),
  actions: {
    fetchOrganization() {
      this.organization = load();
    },

    async updateOrganization(updatedOrg) {
      this.loading = true;
      this.organization = { ...this.organization, ...updatedOrg };
      localStorage.setItem(LS_KEY, JSON.stringify(this.organization));
      this.loading = false;
    },
  },
});
