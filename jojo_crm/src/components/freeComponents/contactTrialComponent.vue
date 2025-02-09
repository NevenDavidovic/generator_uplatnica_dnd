<template>
  <div
    class="bg-primary mx-auto max-w-[90%] min-h-screen p-6 rounded-xl border border-[3px]"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8 max-h-[400px]">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Postojeća organizacija</h2>
        <button @click="toggleOrgEdit" class="text-primary hover:opacity-80">
          <i
            :class="['fas', orgEditMode ? 'fa-save' : 'fa-edit', 'text-xl']"
          ></i>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Naziv organizacije
          </label>
          <input
            v-model="organization.naziv"
            :disabled="!orgEditMode"
            class="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Ulica</label
          >
          <input
            v-model="organization.ulica"
            :disabled="!orgEditMode"
            class="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Poštanski broj i Grad</label
          >
          <input
            v-model="organization.grad"
            :disabled="!orgEditMode"
            class="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >IBAN</label
          >
          <input
            v-model="organization.IBAN"
            :disabled="!orgEditMode"
            class="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>

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

              <td class="px-6 py-4 whitespace-nowrap">{{ contact.amount }}</td>
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
              <div></div>
            </div>
          </form>

          <!-- Bulk Entry Forms (CSV / XML) - Implementation is up to you -->
          <div v-else-if="entryType === 'csv'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Učitaj .csv datoteku
              </label>
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
                <li v-for="contact in csvContacts" :key="contact.email">
                  {{ contact.name }} - {{ contact.email }}
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
                  {{ contact.data.name || "Nepoznato ime" }} -
                  {{ contact.reason }}
                </li>
              </ul>
            </div>

            <!-- Column Mapping Modal -->
            <div
              v-if="showMappingModal"
              class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
            >
              <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 class="text-lg font-bold mb-4">
                  Mapirajte CSV stupce na polja kontakta
                </h2>

                <div
                  v-for="(value, key) in fieldMapping"
                  :key="key"
                  class="mb-3"
                >
                  <label class="block text-sm font-medium text-gray-700">{{
                    key
                  }}</label>
                  <select
                    v-model="fieldMapping[key]"
                    class="border rounded px-3 py-2 w-full"
                  >
                    <option
                      v-for="header in csvHeaders"
                      :key="header"
                      :value="header"
                    >
                      {{ header }}
                    </option>
                  </select>
                </div>

                <div class="mt-4 flex justify-end">
                  <button
                    @click="showMappingModal = false"
                    class="px-4 py-2 bg-gray-300 rounded mr-2"
                  >
                    Odustani
                  </button>
                  <button
                    @click="saveMappedContacts"
                    class="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Spremi kontakte
                  </button>
                </div>
              </div>
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

    <!-- Barcode Modal -->
    <div
      v-if="showBarcodeModal"
      class="fixed inset-0 my-[50px] bg-white bg-opacity-100 flex items-center justify-center z-[1050]"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-2/3">
        <h2 class="text-lg font-bold mb-4">Generirani Barkod</h2>

        <MultipleTrialComponent
          :contact="selectedContact"
          :organization="organization"
        />

        <div class="mt-4 flex justify-end">
          <button
            @click="showBarcodeModal = false"
            class="px-4 py-2 bg-gray-300 rounded"
          >
            Zatvori
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultipleTrialComponent from "@/components/freeComponents/MultipleTrialComponent.vue";
export default {
  components: {
    MultipleTrialComponent,
  },
  data() {
    return {
      contacts: [
        {
          id: 1,
          name: "Marko Horvat",
          address: "Ulica 1",
          postalCode: "10000",
          city: "Zagreb",
          amount: 150,
          paymentModel: "HR99",
          paymentDescription: "Članarina",
          recipientReference: "123-456",
        },
        {
          id: 2,
          name: "Ivana Kovačić",
          address: "Ulica 2",
          postalCode: "21000",
          city: "Split",
          amount: 200,
          paymentModel: "HR55",
          paymentDescription: "Donacija",
          recipientReference: "789-012",
        },
        {
          id: 3,
          name: "Petar Novak",
          address: "Ulica 3",
          postalCode: "31000",
          city: "Osijek",
          amount: 120,
          paymentModel: "HR22",
          paymentDescription: "Pretplata",
          recipientReference: "345-678",
        },
      ],
      orgEditMode: false,
      organization: {
        naziv: "Moja Organizacija",
        ulica: "Glavna Ulica 123",
        grad: "1000 Zagreb",

        IBAN: "HR1234567890123456789",
      },
      selectedContact: null,
      showBarcodeModal: false,
      selectedContacts: [],
      searchQuery: "",
      showModal: false,
      entryType: "single",
      uploadedFile: null,
      isLoading: false,
      xmlContacts: [],
      csvContacts: [],
      skippedContacts: [],
      sortKey: "",
      sortOrder: "asc",
      csvHeaders: [],
      csvData: [],
      showMappingModal: false,
      fieldMapping: {
        ime_i_prezime: null,
        adresa: null,
        postanski_broj: null,
        grad: null,
        iznos_uplate: null,
        model_placanja: null,
        opis_placanja: null,
        poziv_na_broj: null,
      },

      // Contact Form
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
      },
    };
  },

  computed: {
    filteredContacts() {
      if (!this.searchQuery) return this.contacts;

      const query = this.searchQuery.toLowerCase();
      return this.contacts.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(query) ||
          contact.address.toLowerCase().includes(query) ||
          contact.postalCode.toLowerCase().includes(query) ||
          contact.city.toLowerCase().includes(query) ||
          contact.email?.toLowerCase().includes(query) ||
          contact.amount.toString().toLowerCase().includes(query)
        );
      });
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
  },

  methods: {
    generateBarcode(contact) {
      this.selectedContact = contact;
      this.showBarcodeModal = true;
    },

    uploadCSV(event) {
      this.uploadedFile = event.target.files[0];
      this.extractCSVHeaders();
    },
    parseCSV() {
      if (!this.uploadedFile) {
        alert("Please upload a CSV file.");
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const csvText = event.target.result;
        const rows = csvText.split("\n").map((row) => row.trim());
        let parsedContacts = [];
        let skipped = [];

        if (rows.length < 2) {
          alert("The CSV file is empty or does not have enough data.");
          return;
        }

        // **Column Mapping**
        const headers = rows[0].split(";").map((h) => h.trim().toLowerCase());
        const columnMap = {
          name: headers.indexOf("platiteljnaziv"),
          address: headers.indexOf("platiteljadresa"),
          postalCode: headers.indexOf("platiteljmjesto"),
          amount: headers.indexOf("iznos"),
          recipientReference: headers.indexOf("pozivnabrojprimatelja"),
          paymentDescription: headers.indexOf("opisplacanja"),
          email: headers.indexOf("emailadresa"),
        };

        // Check for missing columns
        const requiredColumns = ["name", "address", "postalCode", "email"];
        const missingFields = requiredColumns.filter(
          (field) => columnMap[field] === -1
        );
        if (missingFields.length) {
          alert(`Missing required columns: ${missingFields.join(", ")}`);
          return;
        }

        rows.slice(1).forEach((row, index) => {
          const values = row.split(";").map((v) => v.trim());

          if (values.length < headers.length) {
            skipped.push({ reason: "Incomplete row", data: values });
            return;
          }

          const platiteljMjesto =
            columnMap.postalCode !== -1 ? values[columnMap.postalCode] : "";
          const postalCode = platiteljMjesto
            ? platiteljMjesto.split(" ")[0]
            : "00000";
          const city = platiteljMjesto.includes(" ")
            ? platiteljMjesto.split(" ").slice(1).join(" ")
            : "";

          const contact = {
            id: Date.now() + index,
            name: columnMap.name !== -1 ? values[columnMap.name] : "",
            address: columnMap.address !== -1 ? values[columnMap.address] : "",
            postalCode,
            city,
            email: columnMap.email !== -1 ? values[columnMap.email] : "",
            amount:
              columnMap.amount !== -1
                ? parseFloat(values[columnMap.amount]?.replace(",", ".")) || 0
                : 0,
            recipientReference:
              columnMap.recipientReference !== -1
                ? values[columnMap.recipientReference]
                : "",
            paymentDescription:
              columnMap.paymentDescription !== -1
                ? values[columnMap.paymentDescription]
                : "",
          };

          if (
            !contact.name ||
            !contact.address ||
            !contact.city ||
            !contact.email
          ) {
            skipped.push({ reason: "Missing required fields", data: contact });
          } else {
            parsedContacts.push(contact);
          }
        });

        this.csvContacts = parsedContacts;
        this.skippedContacts = skipped;
      };

      reader.readAsText(this.uploadedFile);
    },
    extractCSVHeaders() {
      if (!this.uploadedFile) {
        alert("Molimo učitajte CSV datoteku.");
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const csvText = event.target.result;
        const rows = csvText.split("\n").map((row) => row.trim());

        if (rows.length < 2) {
          alert("CSV datoteka nema dovoljno podataka.");
          return;
        }

        this.csvHeaders = rows[0].split(";").map((h) => h.trim());
        this.csvData = rows
          .slice(1)
          .map((row) => row.split(";").map((v) => v.trim()));

        this.showMappingModal = true; // Open Mapping Modal
      };

      reader.readAsText(this.uploadedFile);
    },

    saveMappedContacts() {
      if (!this.csvData.length) {
        alert("Nema podataka za obradu.");
        return;
      }

      let mappedContacts = [];
      let skipped = [];

      this.csvData.forEach((row, index) => {
        const contact = {
          id: this.contacts.length + index + 1, // Incremental ID
          name:
            row[this.csvHeaders.indexOf(this.fieldMapping.ime_i_prezime)] || "",
          address: row[this.csvHeaders.indexOf(this.fieldMapping.adresa)] || "",
          postalCode:
            row[this.csvHeaders.indexOf(this.fieldMapping.postanski_broj)] ||
            "",
          city: row[this.csvHeaders.indexOf(this.fieldMapping.grad)] || "",
          amount: parseFloat(
            (
              row[this.csvHeaders.indexOf(this.fieldMapping.iznos_placanja)] ||
              "0"
            ).replace(",", ".")
          ),
          paymentModel:
            row[this.csvHeaders.indexOf(this.fieldMapping.model_placanja)] ||
            "",
          paymentDescription:
            row[this.csvHeaders.indexOf(this.fieldMapping.opis_placanja)] || "",
          recipientReference:
            row[this.csvHeaders.indexOf(this.fieldMapping.poziv_na_broj)] || "",
        };

        if (!contact.name || !contact.address || !contact.city) {
          skipped.push({ reason: "Nedostaju obavezna polja", data: contact });
        } else {
          mappedContacts.push(contact);
        }
      });

      this.csvContacts = mappedContacts;
      this.skippedContacts = skipped;
      this.contacts.push(...mappedContacts);
      this.showMappingModal = false;
    },

    openModal() {
      this.showModal = true;
      this.resetForm();
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

    saveContact() {
      if (this.form.id) {
        // Update existing contact
        const index = this.contacts.findIndex(
          (contact) => contact.id === this.form.id
        );
        if (index !== -1) {
          this.contacts[index] = { ...this.form };
        }
      } else {
        // Add new contact
        this.contacts.push({
          ...this.form,
          id: Date.now(), // Assign unique ID
        });
      }
      this.closeModal();
    },

    editContact(contact) {
      this.form = { ...contact };
      this.showModal = true;
    },

    deleteContact(contact) {
      if (confirm("Are you sure you want to delete this contact?")) {
        this.contacts = this.contacts.filter((c) => c.id !== contact.id);
      }
    },

    deleteSelectedContacts() {
      if (this.selectedContacts.length === 0) {
        alert("No contacts selected.");
        return;
      }

      if (
        confirm(
          `Are you sure you want to delete ${this.selectedContacts.length} selected contacts?`
        )
      ) {
        this.contacts = this.contacts.filter(
          (contact) => !this.selectedContacts.includes(contact.id)
        );
        this.selectedContacts = [];
      }
    },

    deleteAllContacts() {
      if (confirm("Are you sure you want to delete ALL contacts?")) {
        this.contacts = [];
        this.selectedContacts = [];
      }
    },

    toggleSelectAll(event) {
      if (event.target.checked) {
        this.selectedContacts = this.contacts.map((c) => c.id);
      } else {
        this.selectedContacts = [];
      }
    },
    toggleOrgEdit() {
      if (this.orgEditMode) {
        // Save changes
        alert("Organizacija je ažurirana!"); // You can replace this with actual save logic
      }
      this.orgEditMode = !this.orgEditMode;
    },

    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
      }
    },
  },

  created() {
    console.log("Component created, initializing data...");
  },

  mounted() {
    console.log("Component mounted, ready to use.");
  },
};
</script>

<style scoped>
/* Your existing styles or overrides can go here. */
</style>
