<template>
  <div class="bg-primary min-h-screen p-6 rounded-xl">
    <div class="max-w-6xl mx-auto p-6">
      <div class="flex justify-center items-center mb-6">
        <div class="relative w-2/3">
          <input
            v-model="searchQuery"
            type="text"
            placeholder=" Pretraži kontakte... "
            class="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
          <span
            class="absolute inset-y-0 right-4 flex items-center text-gray-400"
          >
            <i class="fas fa-search text-xl"></i>
          </span>
        </div>
      </div>

      <div
        class="mb-6 flex flex-wrap gap-4 items-center align-center justify-center"
      >
        <button
          @click="openModal"
          class="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Unos korisnika
        </button>
        <button
          @click="deleteSelectedContacts"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          :disabled="loading || selectedContacts.length === 0"
        >
          Obriši odabrane ({{ selectedContacts.length }})
        </button>
        <button
          @click="sendSelectedPaymentSlips"
          class="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          :disabled="sending || selectedContacts.length === 0"
        >
          Pošalji odabrane ({{ selectedContacts.length }})
        </button>
        <button
          @click="deleteAllContacts"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          :disabled="loading"
        >
          Obriši sve
        </button>
      </div>

      <!-- Contacts Table -->
      <div class="bg-white rounded-lg shadow overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  @change="toggleSelectAll"
                  :checked="selectedContacts.length === contacts.length"
                />
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                @click="sortBy('name')"
              >
                Ime i Prezime
                <span v-if="sortKey === 'name'">{{
                  sortOrder === "asc" ? "▲" : "▼"
                }}</span>
              </th>

              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                @click="sortBy('postalCode')"
              >
                Poštanski broj i Grad
                <span v-if="sortKey === 'postalCode'">{{
                  sortOrder === "asc" ? "▲" : "▼"
                }}</span>
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                @click="sortBy('email')"
              >
                Email
                <span v-if="sortKey === 'email'">{{
                  sortOrder === "asc" ? "▲" : "▼"
                }}</span>
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                @click="sortBy('amount')"
              >
                Iznos
                <span v-if="sortKey === 'amount'">{{
                  sortOrder === "asc" ? "▲" : "▼"
                }}</span>
              </th>
              <th
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                contact akciju
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="contact in sortedContacts" :key="contact.id">
              <td class="px-4 py-4 text-center">
                <input
                  type="checkbox"
                  :value="contact.id"
                  v-model="selectedContacts"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ contact.name }}</td>

              <td class="px-6 py-4 whitespace-nowrap">
                {{ contact.postalCode }} {{ contact.city }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ contact.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatAmount(contact.amount) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <button
                  @click="generateBarcode(contact)"
                  class="text-blue-600 hover:text-blue-900 mx-2"
                >
                  <i class="fas fa-barcode"></i>
                </button>
                <button
                  @click="editContact(contact)"
                  class="text-green-600 hover:text-green-900 mx-2"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="deleteContact(contact)"
                  class="text-red-600 hover:text-red-900 mx-2"
                  :disabled="loading"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1050]"
    >
      <div
        class="bg-white rounded-lg p-6 w-[90vw] h-[90vh] max-w-4xl max-h-[90vh] shadow-lg overflow-y-auto"
      >
        <div class="mb-4">
          <h2 class="text-xl font-bold text-gray-800">Unos korisnika</h2>

          <!-- Entry Type Selection -->
          <div class="mt-4 mb-6">
            <div class="flex gap-4 flex-wrap">
              <button
                @click="entryType = 'single'"
                :class="[
                  entryType === 'single'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800',
                  'px-4 py-2 rounded shadow hover:bg-blue-500 hover:text-white transition',
                ]"
              >
                Single Entry
              </button>
              <button
                @click="entryType = 'csv'"
                :class="[
                  entryType === 'csv'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800',
                  'px-4 py-2 rounded shadow hover:bg-blue-500 hover:text-white transition',
                ]"
              >
                Unos podataka preko csv-a
              </button>
              <button
                @click="entryType = 'xml'"
                :class="[
                  entryType === 'xml'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800',
                  'px-4 py-2 rounded shadow hover:bg-blue-500 hover:text-white transition',
                ]"
              >
                Unos podataka preko XML-a
              </button>
            </div>
          </div>

          <!-- Single Entry Form -->
          <form
            v-if="entryType === 'single'"
            @submit.prevent="saveContact"
            class="space-y-4"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Improved Input Fields -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Ime i Prezime</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Adresa</label
                >
                <input
                  v-model="form.address"
                  type="text"
                  class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Poštanski broj</label
                >
                <input
                  v-model="form.postalCode"
                  type="text"
                  class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Grad</label
                >
                <input
                  v-model="form.city"
                  type="text"
                  class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Email</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Iznos</label
                >
                <input
                  v-model="form.amount"
                  type="number"
                  class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Model Plaćanja</label
                >
                <input
                  v-model="form.paymentModel"
                  type="text"
                  class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Opis Plaćanja</label
                >
                <input
                  v-model="form.paymentDescription"
                  type="text"
                  class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Poziv na broj primatelja</label
                >
                <input
                  v-model="form.recipientReference"
                  type="text"
                  class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Odaberite radionicu</label
                >
                <select
                  v-model="form.radionica"
                  class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>Odaberite radionicu</option>
                  <option
                    v-for="radionica in radionicaStore.radionice"
                    :key="radionica.id"
                    :value="radionica.id"
                  >
                    {{ radionica.naziv }}
                  </option>
                </select>
              </div>
            </div>
          </form>

          <!-- Bulk Entry Forms (CSV / XML) - Implementation is up to you -->
          <div v-else-if="entryType === 'csv'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Učitaj .csv datoteku</label
              >
              <input
                @change="uploadCSV"
                type="file"
                accept=".csv"
                class="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Successfully Added Contacts -->
            <div v-if="csvContacts.length">
              <p class="text-green-600 text-left">
                ✅ Uspješno učitani kontakti:
              </p>
              <ul class="list-none pl-5 text-green-700 text-left">
                <li v-for="contact in csvContacts" :key="contact.e_mail">
                  {{ contact.ime_prezime }} - {{ contact.e_mail }}
                </li>
              </ul>
            </div>

            <!-- Skipped Contacts with Reasons -->
            <div v-if="skippedContacts.length">
              <p class="text-red-600 text-left mt-4">
                ❌ Preskočeni kontakti (razlog):
              </p>
              <ul class="list-none pl-5 text-red-700 text-left">
                <li v-for="(contact, index) in skippedContacts" :key="index">
                  {{ contact.data.ime_prezime || "Nepoznato ime" }} -
                  {{ contact.reason }}
                </li>
              </ul>
            </div>
          </div>

          <div v-else-if="entryType === 'xml'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Učitaj .xml datoteku</label
              >
              <input
                @change="uploadXML"
                type="file"
                accept=".xml"
                class="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <!-- Successfully Added Contacts -->
              <div v-if="xmlContacts.length">
                <p class="text-green-600 mt-[50px] text-left">
                  ✅ Uspješno učitani kontakti:
                </p>
                <ul class="list-none pl-5 text-green-700 text-left">
                  <li v-for="contact in xmlContacts" :key="contact.e_mail">
                    {{ contact.ime_prezime }} - {{ contact.e_mail }}
                  </li>
                </ul>
              </div>

              <!-- Skipped Contacts with Reasons -->
              <div v-if="skippedContacts.length">
                <p class="text-red-600 mt-4 text-left">
                  ❌ Preskočeni kontakti (razlog):
                </p>
                <ul class="list-none pl-5 text-red-700 text-left">
                  <li v-for="(contact, index) in skippedContacts" :key="index">
                    {{ contact.data.ime_prezime || "Nepoznato ime" }} -
                    {{ contact.reason }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="mt-6 flex justify-end gap-4">
            <button
              @click="closeModal"
              class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Zatvori
            </button>
            <button
              @click="handleSave"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Spremi
            </button>
          </div>

          <div
            v-if="isLoading"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-100"
          >
            <div
              class="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
            >
              <div
                class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"
              ></div>
              <p class="mt-2 text-gray-700">Obrada datoteke...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePrimateljiStore } from "@/store/primateljiStore";
import { useOrganizationStore } from "@/store/organizationStore";
import { usePaymentSlipStore } from "@/store/paymentSlipStore";
import emailjs from "emailjs-com";
emailjs.init(process.env.VUE_APP_EMAILJS_PUBLIC_KEY);
import { useRadionicaStore } from "@/store/radionicaStore";
import { onMounted } from "vue";
import { usePostavkeStore } from "@/store/postavkeStore";

export default {
  setup() {
    const radionicaStore = useRadionicaStore();

    onMounted(() => {
      radionicaStore.fetchRadionice();
    });

    return { radionicaStore };
  },

  data() {
    return {
      isLoading: false,
      showModal: false,
      entryType: "single",
      uploadedFile: null,
      xmlContacts: [],
      addedContacts: [],
      skippedContacts: [],
      csvContacts: [],
      selectedContacts: [],
      sortKey: "",
      sortOrder: "asc",
      searchQuery: "",

      form: {
        id: null,
        name: "",
        address: "",
        postalCode: "",
        city: "",
        email: "",
        amount: "",
        paymentModel: "",
        paymentDescription: "",
        recipientReference: "",
        radionica: "",
      },
    };
  },
  computed: {
    // Access the store's loading/error states if needed
    loading() {
      return this.primateljiStore.loading;
    },
    error() {
      return this.primateljiStore.error?.message || null;
    },
    postavkeStore() {
      return usePostavkeStore();
    },
    sortedContacts() {
      return [...this.filteredContacts].sort((a, b) => {
        if (!this.sortKey) return 0;
        const valueA = a[this.sortKey];
        const valueB = b[this.sortKey];

        if (typeof valueA === "string") {
          return this.sortOrder === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          return this.sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        }
      });
    },

    filteredContacts() {
      if (!this.searchQuery) {
        return this.contacts;
      }

      const query = this.searchQuery.toLowerCase();

      return this.contacts.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(query) ||
          contact.address.toLowerCase().includes(query) ||
          contact.postalCode.toLowerCase().includes(query) ||
          contact.city.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.amount.toString().toLowerCase().includes(query)
        );
      });
    },

    /**
     * Map raw data from the store (which uses DB columns) to the "contact" shape for the table
     */
    contacts() {
      return this.primateljiStore.primatelji.map((p) => ({
        id: p.id,

        name: p.ime_prezime,
        address: p.ulica,
        postalCode: p.postanski_broj,
        city: p.grad,
        email: p.e_mail,
        amount: p.iznos,
        paymentModel: p.model_placanja,
        paymentDescription: p.opis_placanja,
        recipientReference: p.poziv_na_primatelja,
        radionica: p.id_radionica,
      }));
    },
  },
  created() {
    // Initialize store references
    this.primateljiStore = usePrimateljiStore();
    this.postavkeStore = usePostavkeStore();
    this.organizationStore = useOrganizationStore();

    // On component create, fetch data for the current organization
    const orgId = this.organizationStore.organization?.id;
    if (orgId) {
      this.primateljiStore.fetchPrimatelji(orgId);
      this.postavkeStore.fetchEmailSettings(orgId);
    } else {
      alert("No organization ID found. Cannot fetch contacts.");
    }
  },

  methods: {
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
      }
    },

    formatAmount(amount) {
    return parseFloat(amount).toFixed(2);
  },

    toggleSelectAll(event) {
      if (event.target.checked) {
        this.selectedContacts = this.contacts.map((c) => c.id);
      } else {
        this.selectedContacts = [];
      }
    },

    async deleteSelectedContacts() {
      if (this.selectedContacts.length === 0) {
        alert("No contacts selected.");
        return;
      }

      if (
        confirm(
          `Are you sure you want to delete ${this.selectedContacts.length} selected contacts?`
        )
      ) {
        for (const id of this.selectedContacts) {
          await this.primateljiStore.deletePrimatelj(id);
        }
        this.selectedContacts = []; // Clear selection after deletion
      }
    },

    uploadCSV(event) {
      this.uploadedFile = event.target.files[0];
      this.parseCSV();
    },
    uploadXML(event) {
      this.uploadedFile = event.target.files[0];
      this.parseXML();
    },

    async handleSave() {
      if (this.entryType === "single") {
        await this.saveContact();
      } else if (this.entryType === "csv") {
        this.isLoading = true;
        this.saveCSVContacts();
        this.isLoading = false;
      } else if (this.entryType === "xml") {
        this.isLoading = true;
        this.saveContacts();
        this.isLoading = false;
      }
    },

    async parseXML() {
      if (!this.uploadedFile) {
        alert("Molimo odaberite XML datoteku.");
        return;
      }

      const orgId = this.organizationStore.organization?.id;
      if (!orgId) {
        alert("Organizacija nije učitana.");
        return;
      }

      this.isLoading = true; // Start loading animation

      const reader = new FileReader();

      reader.onload = (event) => {
        const xmlText = event.target.result;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        const rows = xmlDoc.querySelectorAll("rowNalog");
        let parsedContacts = [];
        let skipped = [];

        rows.forEach((row) => {
          const mainPart = row.querySelector("mainPartNalog");

          if (!mainPart) {
            skipped.push({ reason: "Missing mainPartNalog", data: row });
            return;
          }

          const contact = {
            ime_prezime:
              mainPart.querySelector("platiteljNaziv")?.textContent || "",
            ulica: mainPart.querySelector("platiteljAdresa")?.textContent || "",
            postanski_broj:
              mainPart.querySelector("postanskiBroj")?.textContent || "00000",
            grad: mainPart.querySelector("platiteljMjesto")?.textContent || "",
            e_mail: mainPart.querySelector("emailAdresa")?.textContent || "",
            iznos: parseFloat(
              mainPart.querySelector("iznos")?.textContent.replace(",", ".") ||
                0
            ),
            poziv_na_primatelja:
              mainPart.querySelector("pozivNaBrojPrimatelja")?.textContent ||
              "",
            opis_placanja:
              mainPart.querySelector("opisPlacanja")?.textContent || "",
            id_organizacija: orgId,
          };

          // Validate Data
          if (
            !contact.ime_prezime ||
            !contact.ulica ||
            !contact.grad ||
            !contact.e_mail
          ) {
            skipped.push({ reason: "Missing required fields", data: contact });
          } else {
            parsedContacts.push(contact);
          }
        });

        this.xmlContacts = parsedContacts;
        this.skippedContacts = skipped;

        this.isLoading = false; // Hide loading animation
      };

      reader.readAsText(this.uploadedFile);
    },

    async saveContacts() {
      this.isLoading = true; // Show loading animation
      this.addedContacts = [];
      this.skippedContacts = [];

      for (const contact of this.xmlContacts) {
        try {
          await this.primateljiStore.createPrimatelj(contact);
          this.addedContacts.push(contact); // Add to successfully saved list
        } catch (error) {
          this.skippedContacts.push({
            reason: "Database error",
            data: contact,
          });
        }
      }
      this.isLoading = false; // Hide loading animation
      this.closeModal();
      alert(
        `Uspješno spremljeno: ${this.addedContacts.length}, preskočeno: ${this.skippedContacts.length}`
      );
    },

    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        id: null,
        name: "",
        address: "",
        postalCode: "",
        city: "",
        email: "",
        amount: "",
        paymentModel: "",
        paymentDescription: "",
        recipientReference: "",
      };
      this.entryType = "single";
    },

    /**
     * Save or update the record in Supabase
     */
    async saveContact() {
      const orgId = this.organizationStore.organization?.id;
      if (!orgId) {
        alert("No organization ID found. Cannot save contact.");
        return;
      }

      // ✅ Ensure form.radionica is an ID, not an object
      const radionicaId = this.form.radionica || null;

      if (this.form.id) {
        // ✅ Update existing record
        await this.primateljiStore.updatePrimatelj(this.form.id, {
          ime_prezime: this.form.name,
          ulica: this.form.address,
          postanski_broj: this.form.postalCode,
          grad: this.form.city,
          e_mail: this.form.email,
          iznos: this.form.amount,
          model_placanja: this.form.paymentModel,
          opis_placanja: this.form.paymentDescription,
          poziv_na_primatelja: this.form.recipientReference,
          id_radionica: radionicaId, // ✅ Save only the ID
        });
      } else {
        // ✅ Create a new record
        await this.primateljiStore.createPrimatelj({
          ime_prezime: this.form.name,
          ulica: this.form.address,
          postanski_broj: this.form.postalCode,
          grad: this.form.city,
          e_mail: this.form.email,
          iznos: this.form.amount,
          model_placanja: this.form.paymentModel,
          opis_placanja: this.form.paymentDescription,
          poziv_na_primatelja: this.form.recipientReference,
          id_organizacija: orgId,
          id_radionica: radionicaId, // ✅ Save only the ID
        });
      }

      this.closeModal();
    },
    /**
     * Delete all records for the current org
     */
    async deleteAllContacts() {
      const orgId = this.organizationStore.organization?.id;
      if (!orgId) {
        alert("No organization ID found. Cannot delete all contacts.");
        return;
      }
      // Call your store action to delete all for this org
      if (confirm("Are you sure you want to delete ALL contacts?")) {
        await this.primateljiStore.deleteAllPrimatelji(orgId);
        this.selectedContacts = [];
      }
    },
    
      async sendSelectedPaymentSlips() {
  if (this.selectedContacts.length === 0) {
    alert("Nema odabranih kontakata za slanje.");
    return;
  }

  if (
    confirm(
      `Jeste li sigurni da želite poslati ${this.selectedContacts.length} uplatnica?`
    )
  ) {
    this.sending = true;

    // EmailJS credentials
    const serviceID = process.env.VUE_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.VUE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.VUE_APP_EMAILJS_PUBLIC_KEY;
    const baseUrl = process.env.VUE_APP_BASE_URL || "http://localhost:8080";

    try {
      for (const contactId of this.selectedContacts) {
        const contact = this.contacts.find((c) => c.id === contactId);
        if (!contact) continue;

        // Generate dynamic link
        const queryParams = new URLSearchParams({
          iznosTransakcije: contact.amount,
          imePlatitelja: contact.name,
          adresaPlatitelja: contact.address,
          postanskiBrojIMjestoPlatitelja: `${contact.postalCode} ${contact.city}`,
          opisPlacanja: contact.paymentDescription,
        }).toString();

        const dynamicLink = `${baseUrl}/?${queryParams}`;

        // Define the email parameters
        const templateParams = {
          subject: this.postavkeStore.emailSettings.subject,  // ✅ Changed from hardcoded
          message_to_receiver: this.postavkeStore.emailSettings.message,  // ✅ Changed from hardcoded
          from_name: this.organizationStore.organization.naziv,
          imePrimatelja: this.organizationStore.organization.naziv,
          adresaPrimatelja: this.organizationStore.organization.ulica,
          postanskiBrojIMjestoPrimatelja: this.organizationStore.organization.grad,
          ibanPrimatelja: this.organizationStore.organization.IBAN,
          imePlatitelja: contact.name,
          adresaPlatitelja: contact.address,
          postanskiBrojIMjestoPlatitelja: `${contact.postalCode} ${contact.city}`,
          sifraNamjene: "Uplata",
          modelPlacanja: contact.paymentModel,
          pozivNaBroj: contact.recipientReference,
          opisPlacanja: contact.paymentDescription,
          iznosTransakcije: contact.amount,
          link_to_slip: dynamicLink,
          to_email: contact.email,
        };

        // Send the email
        await emailjs.send(serviceID, templateID, templateParams, publicKey);
      }

      alert("Uplatnice su uspješno poslane!");
    } catch (error) {
      console.error("Greška pri slanju e-mailova:", error);
      alert("Došlo je do greške. Pokušajte ponovno.");
    } finally {
      this.sending = false;
    }
  }
},

    goToPaymentSlip(contact) {
      // "Generator Uplatnice" is the itemName you use in the parent’s switch
      this.$emit("navigate", "Generator Uplatnice", contact);
    },

    generateBarcode(contact) {
      const slipStore = usePaymentSlipStore();
      slipStore.setSelectedContact(contact);
      this.goToPaymentSlip();
    },

    editContact(contact) {
      console.log("Editing contact:", contact);

      this.form = {
        id: contact.id,
        name: contact.name,
        address: contact.address,
        postalCode: contact.postalCode,
        city: contact.city,
        email: contact.email,
        amount: contact.amount,
        paymentModel: contact.paymentModel,
        paymentDescription: contact.paymentDescription,
        recipientReference: contact.recipientReference,
        radionica: contact.radionica ?? "", // ✅ Directly use contact.id_radionica
      };

      this.showModal = true;
    },

    async deleteContact(contact) {
      if (confirm("Are you sure you want to delete this contact?")) {
        await this.primateljiStore.deletePrimatelj(contact.id);
        this.selectedContacts = this.selectedContacts.filter(
          (id) => id !== contact.id
        );
      }
    },

    async parseCSV() {
      if (!this.uploadedFile) {
        alert("Molimo contactte CSV datoteku.");
        return;
      }

      const orgId = this.organizationStore.organization?.id;
      if (!orgId) {
        alert("Organizacija nije učitana.");
        return;
      }

      this.isLoading = true;

      const reader = new FileReader();

      reader.onload = async (event) => {
        // Convert FileReader result to UTF-8
        const textDecoder = new TextDecoder("utf-8");
        const csvText = textDecoder.decode(event.target.result);

        // Split lines, trim whitespace, and remove empty lines
        const rows = csvText
          .split("\n")
          .map((row) => row.trim())
          .filter((row) => row !== "");

        let parsedContacts = [];
        let skipped = [];

        // Extract header row & normalize field names
        const headers = rows[0].split(";").map((h) => h.trim().toLowerCase());

        // Required fields
        const requiredFields = [
          "platiteljnaziv",
          "platiteljadresa",
          "platiteljmjesto",
          "iznos",
          "emailadresa",
        ];

        // Check for missing columns
        const missingFields = requiredFields.filter(
          (field) => !headers.includes(field)
        );
        if (missingFields.length) {
          alert(
            `Nedostaju obavezni stupci u CSV-u: ${missingFields.join(", ")}`
          );
          this.isLoading = false;
          return;
        }

        // Process each row
        rows.slice(1).forEach((row) => {
          const values = row.split(";").map((v) => v.trim());

          const contact = {
            ime_prezime: values[headers.indexOf("platiteljnaziv")] || "",
            ulica: values[headers.indexOf("platiteljadresa")] || "",
            postanski_broj:
              values[headers.indexOf("platiteljmjesto")].split(" ")[0] ||
              "00000",
            grad:
              values[headers.indexOf("platiteljmjesto")]
                .split(" ")
                .slice(1)
                .join(" ") || "",
            e_mail: values[headers.indexOf("emailadresa")] || "",
            iznos: parseFloat(
              values[headers.indexOf("iznos")].replace(",", ".") || 0
            ),
            poziv_na_primatelja:
              values[headers.indexOf("pozivnabrojprimatelja")] || "",
            opis_placanja: values[headers.indexOf("opisplacanja")] || "",
            id_organizacija: orgId,
          };

          // Validate required fields
          if (
            !contact.ime_prezime ||
            !contact.ulica ||
            !contact.grad ||
            !contact.e_mail
          ) {
            skipped.push({ reason: "Nedostaju obavezna polja", data: contact });
          } else {
            parsedContacts.push(contact);
          }
        });

        this.csvContacts = parsedContacts;
        this.skippedContacts = skipped;

        this.isLoading = false;
      };

      reader.readAsArrayBuffer(this.uploadedFile); // ✅ Fix: Read as ArrayBuffer for proper encoding
    },
    async saveCSVContacts() {
      this.isLoading = true;
      let addedContacts = [];
      let skippedContacts = [];

      for (const contact of this.csvContacts) {
        try {
          await this.primateljiStore.createPrimatelj(contact);
          addedContacts.push(contact);
        } catch (error) {
          skippedContacts.push({
            reason: "Greška u bazi podataka",
            data: contact,
          });
        }
      }

      this.isLoading = false;
      alert(
        `✅ Uspješno spremljeno: ${addedContacts.length}, ❌ preskočeno: ${skippedContacts.length}`
      );

      // Update displayed contacts
      this.csvContacts = addedContacts;
      this.skippedContacts = skippedContacts;
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Your existing styles or overrides can go here. */
</style>
