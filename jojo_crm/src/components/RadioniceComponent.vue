<template>
  <div class="p-6 bg-white shadow-lg rounded-lg">
    <!-- Header -->
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Radionice</h2>

    <!-- Error Message -->
    <p v-if="radionicaStore.error" class="text-red-600">
      ⚠️ {{ radionicaStore.error }}
    </p>

    <!-- Form -->
    <div class="mb-6 p-4 bg-gray-100 rounded-lg">
      <h3 class="text-lg font-medium text-gray-700 mb-2">
        {{ isEditing ? "Uredi radionicu" : "Dodaj novu radionicu" }}
      </h3>

      <form @submit.prevent="handleSave">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-1"
            >Naziv radionice</label
          >
          <input
            v-model="form.naziv"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-1">Voditelj</label>
          <input
            v-model="form.voditelj"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
        >
          {{ isEditing ? "Ažuriraj" : "Dodaj" }} radionicu
        </button>
      </form>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Naziv
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Voditelj
            </th>
            <th
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Akcije
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="radionica in radionicaStore.radionice" :key="radionica.id">
            <td class="px-6 py-4">{{ radionica.naziv }}</td>
            <td class="px-6 py-4">{{ radionica.voditelj }}</td>
            <td class="px-6 py-4 text-center">
              <button
                @click="editRadionica(radionica)"
                class="text-green-600 hover:text-green-900 mx-2"
              >
                ✏️ Uredi
              </button>
              <button
                @click="deleteRadionica(radionica.id)"
                class="text-red-600 hover:text-red-900 mx-2"
              >
                🗑️ Obriši
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useRadionicaStore } from "@/store/radionicaStore";
import { onMounted, reactive, ref } from "vue";

export default {
  setup() {
    const radionicaStore = useRadionicaStore();
    const isEditing = ref(false);
    const form = reactive({
      id: null,
      naziv: "",
      voditelj: "",
    });

    onMounted(() => {
      radionicaStore.fetchRadionice(); // Fetch radionice on load
    });

    const handleSave = async () => {
      if (form.naziv.trim() === "" || form.voditelj.trim() === "") return;

      try {
        if (isEditing.value) {
          console.log("Updating radionica:", form.id, form.naziv);
          await radionicaStore.updateRadionica(form.id, {
            naziv: form.naziv,
            voditelj: form.voditelj,
          });
        } else {
          console.log("Creating new radionica:", form.naziv);
          await radionicaStore.createRadionica({
            naziv: form.naziv,
            voditelj: form.voditelj,
          });
        }

        // Reset form
        form.id = null;
        form.naziv = "";
        form.voditelj = "";
        isEditing.value = false;
      } catch (error) {
        console.error("Error saving radionica:", error);
      }
    };

    const editRadionica = (radionica) => {
      console.log("Editing radionica:", radionica);
      form.id = radionica.id;
      form.naziv = radionica.naziv;
      form.voditelj = radionica.voditelj;
      isEditing.value = true;
    };

    const deleteRadionica = async (id) => {
      if (confirm("Jeste li sigurni da želite obrisati ovu radionicu?")) {
        await radionicaStore.deleteRadionica(id);
      }
    };

    return {
      radionicaStore,
      form,
      isEditing,
      handleSave,
      editRadionica,
      deleteRadionica,
    };
  },
};
</script>
