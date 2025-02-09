<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Email postavke</h2>
        <button @click="toggleEmailEdit" class="text-primary hover:opacity-80">
          <i
            :class="['fas', emailEditMode ? 'fa-save' : 'fa-edit', 'text-xl']"
          ></i>
        </button>
      </div>

      <div v-if="postavkeStore.loading" class="text-center text-gray-500">
        Učitavanje postavki...
      </div>

      <div v-if="!postavkeStore.loading" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Subjekt maila</label
          >
          <input
            v-model="emailSettings.subject"
            :disabled="!emailEditMode"
            class="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Poruka unutar maila</label
          >
          <textarea
            v-model="emailSettings.message"
            :disabled="!emailEditMode"
            rows="4"
            class="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePostavkeStore } from "@/store/postavkeStore";
import { useOrganizationStore } from "@/store/organizationStore";

export default {
  data() {
    return {
      emailEditMode: false,
      emailSettings: {
        e_mail: "",
        gmail_key: "",
        subject: "",
        message: "",
        filename: "",
      },
    };
  },
  setup() {
    const postavkeStore = usePostavkeStore();
    const organizationStore = useOrganizationStore();
    return { postavkeStore, organizationStore };
  },
  async mounted() {
    const orgId = this.organizationStore.organization?.id;
    if (orgId) {
      await this.postavkeStore.fetchEmailSettings(orgId);
      if (this.postavkeStore.emailSettings) {
        this.emailSettings = { ...this.postavkeStore.emailSettings };
      }
    }
  },
  methods: {
    async toggleEmailEdit() {
      if (this.emailEditMode) {
        await this.saveEmailChanges();
      }
      this.emailEditMode = !this.emailEditMode;
    },

    async saveEmailChanges() {
      await this.postavkeStore.updateEmailSettings(this.emailSettings);
      alert("Postavke su uspješno ažurirane!");
    },
  },
};
</script>
