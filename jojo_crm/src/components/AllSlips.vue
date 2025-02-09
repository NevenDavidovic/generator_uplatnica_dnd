<template>
  <div>
    <div v-if="isLoading">
      <LoadingSpinner />
    </div>

    <div v-else-if="showPaymentSlips">
      <h2 class="text-2xl font-bold mb-4">📜 Generirane uplatnice</h2>

      <div v-if="contacts && contacts.length">
        <div v-for="contact in contacts" :key="contact.id">
          <Suspense>
            <template #default>
              <MultiplePayment :contact="contact" />
            </template>
            <template #fallback>
              <LoadingSpinner />
            </template>
          </Suspense>
        </div>
      </div>

      <p v-else class="text-red-500">⚠️ Nema dostupnih kontakata.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { usePrimateljiStore } from "@/store/primateljiStore";
import { useOrganizationStore } from "@/store/organizationStore";
import MultiplePayment from "@/components/MultiplePayment.vue";
import LoadingSpinner from "@/components/pageElements/LoadingSpinner.vue";

export default {
  components: { MultiplePayment, LoadingSpinner },

  setup() {
    const primateljiStore = usePrimateljiStore();
    const organizationStore = useOrganizationStore();
    const showPaymentSlips = ref(false);
    const isLoading = ref(true);

    const contacts = computed(() => primateljiStore.primatelji || []);

    onMounted(async () => {
      try {
        const orgId = organizationStore.organization?.id;
        if (orgId) {
          await primateljiStore.fetchPrimatelji(orgId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        isLoading.value = false;
        showPaymentSlips.value = true;
      }
    });

    return {
      contacts,
      showPaymentSlips,
      isLoading,
    };
  },
};
</script>
