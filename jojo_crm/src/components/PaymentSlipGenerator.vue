<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">📜 Uplatnice</h2>

    <!-- Loading State -->
    <p v-if="loading">🔄 Učitavanje podataka...</p>

    <!-- Error Message -->
    <p v-if="error" class="text-red-500">⚠️ Greška: {{ error }}</p>

    <!-- Render payment slips -->
    <div v-if="contacts.length" class="payments" ref="paymentSlipsContainer">
      <div v-for="user in contacts" :key="user.id">
        <PaymentSlip
          ref="paymentSlips"
          :userData="user"
          @barcode-generated="collectBarcodeData"
        />
      </div>
    </div>

    <!-- No Data Message -->
    <p v-if="!loading && contacts.length === 0">⚠️ Nema dostupnih kontakata.</p>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { usePrimateljiStore } from "@/store/primateljiStore";
import { useOrganizationStore } from "@/store/organizationStore";
import PaymentSlip from "@/components/PaymentSlip.vue";

export default {
  components: { PaymentSlip },
  setup() {
    const primateljiStore = usePrimateljiStore();
    const organizationStore = useOrganizationStore();
    const loading = ref(true);
    const error = ref(null);

    // Fetch contacts independently
    onMounted(async () => {
      try {
        const orgId = organizationStore.organization?.id;
        if (orgId) {
          await primateljiStore.fetchPrimatelji(orgId);
        } else {
          error.value = "Nema ID organizacije.";
        }
      } catch (err) {
        error.value = err.message || "Greška pri dohvaćanju podataka.";
      } finally {
        loading.value = false;
      }
    });

    // Computed contacts list
    const contacts = computed(() => primateljiStore.primatelji);

    // Collect barcode data if needed
    function collectBarcodeData(barcode) {
      console.log("Generated Barcode:", barcode);
    }

    return {
      contacts,
      loading,
      error,
      collectBarcodeData,
    };
  },
};
</script>

<style scoped>
.payments {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
