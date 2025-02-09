<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Postojeća organizacija</h2>
      <button
        @click="toggleOrgEdit"
        class="text-primary hover:opacity-80"
        :disabled="loading"
      >
        <i :class="['fas', orgEditMode ? 'fa-save' : 'fa-edit', 'text-xl']"></i>
      </button>
    </div>

    <div v-if="loading" class="mb-4">Učitavanje...</div>
    <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" v-if="localOrg">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Naziv organizacije
        </label>
        <input
          v-model="localOrg.naziv"
          :disabled="!orgEditMode || loading"
          class="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Ulica</label
        >
        <input
          v-model="localOrg.ulica"
          :disabled="!orgEditMode || loading"
          class="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Grad</label>
        <input
          v-model="localOrg.grad"
          :disabled="!orgEditMode || loading"
          class="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Email</label
        >
        <input
          v-model="localOrg.email"
          :disabled="!orgEditMode || loading"
          type="email"
          class="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">IBAN</label>
        <input
          v-model="localOrg.IBAN"
          :disabled="!orgEditMode || loading"
          class="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Link za sliku
        </label>
        <input
          v-model="localOrg.slika"
          :disabled="!orgEditMode || loading"
          type="url"
          class="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useOrganizationStore } from "@/store/organizationStore";

export default {
  name: "OrganizationComponent",
  data() {
    return {
      orgEditMode: false,
      localOrg: null,
    };
  },
  computed: {
    loading() {
      return this.organizationStore.loading;
    },
    error() {
      return this.organizationStore.error?.message || null;
    },
  },
  created() {
    this.organizationStore = useOrganizationStore();
    this.initializeData();
  },
  methods: {
    /**
     * Grabs the existing organization ID from the store (if any)
     * and re-fetches the organization data. This ensures we're
     * passing a valid ID to fetchOrganization.
     */
    async initializeData() {
      try {
        const orgId = this.organizationStore.organization?.id;

        if (orgId) {
          await this.organizationStore.fetchOrganization(orgId);
        } else {
          alert(
            "No organization ID available. Make sure the user is logged in or the record exists."
          );
        }

        if (this.organizationStore.organization) {
          this.localOrg = { ...this.organizationStore.organization };
        } else {
          alert("No organization found after fetch.");
          this.localOrg = this.createEmptyOrganization();
        }
      } catch (error) {
        alert("Initialization error:", error);
      }
    },

    createEmptyOrganization() {
      return {
        naziv: "",
        ulica: "",
        grad: "",
        email: "",
        IBAN: "",
        slika: "",
      };
    },

    async toggleOrgEdit() {
      if (this.orgEditMode) {
        try {
          await this.organizationStore.updateOrganization(this.localOrg);

          this.localOrg = { ...this.organizationStore.organization };

          this.orgEditMode = false;
        } catch (error) {
          alert("Update failed:", error);
        }
      } else {
        this.orgEditMode = true;
      }
    },
  },
};
</script>
