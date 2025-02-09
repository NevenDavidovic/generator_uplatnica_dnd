// store/paymentSlipStore.js
import { defineStore } from "pinia";

export const usePaymentSlipStore = defineStore("paymentSlip", {
  state: () => ({
    selectedContact: null,
  }),
  actions: {
    setSelectedContact(contact) {
      this.selectedContact = contact;
    },
    clearSelectedContact() {
      this.selectedContact = null;
    },
  },
});
