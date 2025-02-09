<template>
  <div
    class="font-sans flex flex-col gap-[20px] bg-blue-700 min-h-screen text-white flex justify-center items-center p-[30px]"
    :style="{
      backgroundImage: `url(${require('@/assets/images/hero-section-image.png')})`,
    }"
  >
    <button
      v-if="barcodeImage"
      @click="generatePDF"
      class="no-print flex border-white items-center justify-center gap-2 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors duration-200 shadow-sm hover:shadow-md active:transform active:scale-95"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 6 2 18 2 18 9" />
        <path
          d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
        />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
      <span>Preuzmi</span>
    </button>

    <div
      id="izvoz-uplatnice"
      class="bg-white rounded-lg shadow-lg p-8 max-w-md text-gray-800"
    >
      <!-- Logo and Recipient Information -->
      <div class="text-center mb-6">
        <img
          src="../assets/images/logoDNDPorec.png"
          alt="Logo"
          class="w-24 mx-auto mb-4"
        />
        <h3 class="font-bold text-lg">Društvo "Naša djeca" Poreč</h3>
        <p>Trg kneza Branimira 2, 52440 Poreč</p>
        <p>IBAN: HR5823800061110007659</p>
      </div>
      <div
        class="last-item generated-barcode flex items-start justify-center"
        id="barcode"
      >
        <div v-if="barcodeImage">
          <img :src="barcodeImage" alt="Generated Barcode" />
        </div>
      </div>
      <!-- Payment Details -->
      <div>
        <h4 class="font-bold text-blue-700 text-lg mb-4">Detalji plaćanja</h4>

        <!-- Payer Details -->
        <div class="mb-6">
          <h5 class="font-semibold text-gray-600 mb-2">Platitelj:</h5>
          <p>
            <span class="font-bold">Ime i Prezime:</span>
            {{ paymentParams.imePlatitelja }}
          </p>
          <p>
            <span class="font-bold">Adresa:</span>
            {{ paymentParams.adresaPlatitelja }},
            {{ paymentParams.postanskiBrojIMjestoPlatitelja }}
          </p>
        </div>

        <!-- Payment Information -->
        <div class="mb-6">
          <p>
            <span class="font-bold">Opis Plaćanja:</span>
            {{ paymentParams.opisPlacanja }}
          </p>
          <p>
            <span class="font-bold">Iznos za Platiti:</span>
            {{ paymentParams.iznosTransakcije }}
          </p>
        </div>

        <!-- Footer Note -->
        <div class="text-sm text-gray-500 border-t pt-4">
          Ovo je automatski generirana uplatnica! Molimo Vas provjerite sve
          podatke.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import generateBarcode from "pdf417";

export default {
  name: "SlipPreview",
  data() {
    return {
      paymentParams: {
        iznosTransakcije: "",
        imePlatitelja: "",
        adresaPlatitelja: "",
        postanskiBrojIMjestoPlatitelja: "",
        opisPlacanja: "",
        imePrimatelja: `Društvo "Naša djeca" Poreč`,
        adresaPrimatelja: "Trg kneza Branimira 2",
        postanskiBrojIMjestoPrimatelja: "52440 Poreč",
        ibanPrimatelja: "HR5823800061110007659",
        modelPlacanja: "HR",
        pozivNaBroj: "",
        sifraNamjene: "",
      },
      text: "",
      blockWidth: 2,
      blockHeight: 1,
      barcodeImage: null,
      concatenatedString: "",
      receiverEmail: null,
    };
  },
  mounted() {
    // Get URL parameters and set them in paymentParams
    const urlParams = new URLSearchParams(window.location.search);

    // Map parameters to paymentParams
    for (const [key, value] of urlParams.entries()) {
      if (Object.prototype.hasOwnProperty.call(this.paymentParams, key)) {
        this.paymentParams[key] = decodeURIComponent(value);
      }
    }

    this.generateBarcode();
  },
  methods: {
    concatenateStrings() {
      const concatenatedValues = Object.values(this.paymentParams)
        .map((value) => `${value}\n`)
        .join("");
      this.concatenatedString = concatenatedValues;
    },

    generateBarcode() {
      this.concatenateStrings();
      this.text = this.concatenatedString;
      if (this.text) {
        this.barcodeImage = generateBarcode(
          this.text,
          this.blockWidth,
          this.blockHeight
        );
      } else {
        alert("ERROR: No text to generate a barcode.");
      }
    },
    generatePDF() {
      const element = document.getElementById("izvoz-uplatnice");
      if (!element) return;

      const options = {
        filename: this.paymentParams.imePlatitelja + ".pdf",
        image: { type: "png", quality: 1.0 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      };

      html2pdf().from(element).set(options).save();
    },
  },
};

//example link http://localhost:8080/preview?iznosTransakcije=12+EUR&imePlatitelja=Katarina+Kadum&adresaPlatitelja=Anke+Butorac+2&postanskiBrojIMjestoPlatitelja=52440+Pore%C4%8D&opisPlacanja=pla%C4%87anje+%C4%8Dlanarine
</script>
