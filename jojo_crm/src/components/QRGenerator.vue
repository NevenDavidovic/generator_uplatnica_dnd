<template>
  <div class="bg-primary min-h-screen p-6 rounded-xl">
    <div class="max-w-4xl mx-auto p-6">

      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold text-white tracking-wide">Generator QR Koda</h1>
        <p class="text-blue-200 text-sm mt-1">Unesite podatke za generiranje QR koda</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Left: Form -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Sadržaj QR koda</label>
              <textarea
                v-model="qrContent"
                rows="3"
                placeholder="Unesite tekst, URL, email..."
                class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Veličina (px)</label>
                <select
                  v-model="qrSize"
                  class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="128">128</option>
                  <option value="256">256</option>
                  <option value="512">512</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Korekcija greške</label>
                <select
                  v-model="errorCorrection"
                  class="block w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="L">L - Niska</option>
                  <option value="M">M - Srednja</option>
                  <option value="Q">Q - Visoka</option>
                  <option value="H">H - Najveća</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Boja QR koda</label>
                <div class="flex items-center gap-2">
                  <input
                    v-model="darkColor"
                    type="color"
                    class="h-10 w-14 rounded border border-gray-300 cursor-pointer p-1"
                  />
                  <span class="text-sm text-gray-500">{{ darkColor }}</span>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Boja pozadine</label>
                <div class="flex items-center gap-2">
                  <input
                    v-model="lightColor"
                    type="color"
                    class="h-10 w-14 rounded border border-gray-300 cursor-pointer p-1"
                  />
                  <span class="text-sm text-gray-500">{{ lightColor }}</span>
                </div>
              </div>
            </div>

            <div class="flex gap-3 pt-2">
              <button
                @click="generateQR"
                :disabled="!qrContent.trim()"
                class="flex-1 bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
              >
                <i class="fas fa-qrcode mr-2"></i>Generiraj QR
              </button>
              <button
                @click="resetForm"
                class="px-4 py-3 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
              >
                <i class="fas fa-redo"></i>
              </button>
            </div>
          </div>

          <!-- Right: QR Preview -->
          <div class="flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200 p-6 min-h-[300px]">
            <div v-if="qrImageUrl" class="flex flex-col items-center gap-4">
              <img
                :src="qrImageUrl"
                alt="QR kod"
                class="rounded shadow"
                :style="{ width: previewSize + 'px', height: previewSize + 'px' }"
              />
              <p class="text-xs text-gray-400 text-center break-all max-w-[200px]">{{ qrContent }}</p>
              <button
                @click="downloadQR"
                class="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm transition"
              >
                <i class="fas fa-download mr-2"></i>Preuzmi QR
              </button>
            </div>
            <div v-else class="flex flex-col items-center text-gray-300">
              <i class="fas fa-qrcode text-6xl mb-3"></i>
              <p class="text-sm">QR kod će se prikazati ovdje</p>
            </div>
          </div>

        </div>
      </div>

      <!-- History -->
      <div v-if="history.length" class="bg-white rounded-lg shadow mt-6 overflow-x-auto">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Povijest generiranja</h2>
          <button @click="clearHistory" class="text-xs text-red-500 hover:text-red-700">Obriši sve</button>
        </div>
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sadržaj</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Veličina</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Datum</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Akcija</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in history" :key="index">
              <td class="px-6 py-4 text-sm text-gray-700 max-w-[200px] truncate">{{ item.content }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ item.size }}px</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ item.date }}</td>
              <td class="px-6 py-4 text-center">
                <button @click="loadFromHistory(item)" class="text-blue-600 hover:text-blue-900 mx-2">
                  <i class="fas fa-redo"></i>
                </button>
                <a :href="item.url" :download="'qr-' + index + '.png'" class="text-green-600 hover:text-green-900 mx-2">
                  <i class="fas fa-download"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "QRGenerator",
  data() {
    return {
      qrContent: "",
      qrSize: "256",
      errorCorrection: "M",
      darkColor: "#000000",
      lightColor: "#ffffff",
      qrImageUrl: null,
      history: [],
    };
  },
  computed: {
    previewSize() {
      return Math.min(parseInt(this.qrSize), 256);
    },
  },
  mounted() {
    const saved = localStorage.getItem("qr-history");
    if (saved) {
      this.history = JSON.parse(saved);
    }
  },
  methods: {
    generateQR() {
      if (!this.qrContent.trim()) return;

      const dark = this.darkColor.replace("#", "");
      const light = this.lightColor.replace("#", "");
      const encoded = encodeURIComponent(this.qrContent);

      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${this.qrSize}x${this.qrSize}&data=${encoded}&ecc=${this.errorCorrection}&color=${dark}&bgcolor=${light}`;

      this.qrImageUrl = url;

      this.history.unshift({
        content: this.qrContent,
        size: this.qrSize,
        url,
        date: new Date().toLocaleString("hr-HR"),
      });

      localStorage.setItem("qr-history", JSON.stringify(this.history));
    },

    downloadQR() {
      if (!this.qrImageUrl) return;
      const a = document.createElement("a");
      a.href = this.qrImageUrl;
      a.download = "qr-kod.png";
      a.click();
    },

    loadFromHistory(item) {
      this.qrContent = item.content;
      this.qrSize = item.size;
      this.qrImageUrl = item.url;
    },

    clearHistory() {
      this.history = [];
      localStorage.removeItem("qr-history");
    },

    resetForm() {
      this.qrContent = "";
      this.qrSize = "256";
      this.errorCorrection = "M";
      this.darkColor = "#000000";
      this.lightColor = "#ffffff";
      this.qrImageUrl = null;
    },
  },
};
</script>