<template>
  <div class="">
    <div class="uplatnica-form-img" id="izvoz-uplatnice">
      <div class="platitelj">
        <input
          type="text"
          required
          id="imePlatitelja"
          maxlength="30"
          class="input-field w-[150px]"
          v-model="paymentParams.imePlatitelja"
        />
        <input
          type="text"
          id="adresaPlatitelja"
          maxlength="27"
          class="input-field"
          required
          v-model="paymentParams.adresaPlatitelja"
        />
        <input
          type="text"
          id="postanskiBrojIMjestoPlatitelja"
          maxlength="27"
          class="input-field"
          required
          v-model="paymentParams.postanskiBrojIMjestoPlatitelja"
        />
      </div>

      <input
        class="valuta"
        type="text"
        value=" EUR"
        disabled
        style="width: 50px; height: 27px"
      />

      <input
        type="text"
        class="iznos"
        id="iznos"
        pattern="^[0-9]+,[0-9]{2}$"
        placeholder="0,00"
        maxlength="16"
        required
        v-model="paymentParams.iznosTransakcije"
        style="height: 27px; padding-top: 5px"
      />
      <input
        class="iban-primatelja"
        type="text"
        id="brRacuna"
        maxlength="21"
        name=""
        required
        v-model="paymentParams.ibanPrimatelja"
        style="
          position: absolute;
          top: 115px;
          left: 335px;
          border: 0 solid transparent;
          background-color: transparent;
          font-size: 12px;
          letter-spacing: 8px;
          max-width: 312px;
          width: 100%;
          height: 27px;
        "
      />
      <div class="primatelj">
        <input
          type="text"
          id="primatelj"
          maxlength="25"
          class="input-field w-[170px] h-[20px]"
          v-model="paymentParams.imePrimatelja"
          style="height: 27px"
        />
        <input
          type="text"
          id="adresaPrimatelja"
          maxlength="25"
          class="input-field"
          v-model="paymentParams.adresaPrimatelja"
        />
        <input
          type="text"
          id="postanskiBrojIMjestoPrimatelja"
          maxlength="27"
          class="input-field"
          v-model="paymentParams.postanskiBrojIMjestoPrimatelja"
        />
      </div>

      <select
        class="model-placanja"
        id="modelPlacanja"
        v-model="paymentParams.modelPlacanja"
      >
        <option value="" disabled>-</option>
        <option value="HR01">HR01</option>
        <option value="HR02">HR02</option>
        <option value="HR03">HR03</option>
        <option value="HR04">HR04</option>
        <option value="HR05">HR05</option>
        <option value="HR06">HR06</option>
        <option value="HR07">HR07</option>
        <option value="HR08">HR08</option>
        <option value="HR09">HR09</option>
        <option value="HR10">HR10</option>
        <option value="HR11">HR11</option>
        <option value="HR12">HR12</option>
        <option value="HR13">HR13</option>
        <option value="HR14">HR14</option>
        <option value="HR15">HR15</option>
        <option value="HR16">HR16</option>
        <option value="HR17">HR17</option>
        <option value="HR18">HR18</option>
        <option value="HR23">HR23</option>
        <option value="HR24">HR24</option>
        <option value="HR26">HR26</option>
        <option value="HR27">HR27</option>
        <option value="HR28">HR28</option>
        <option value="HR29">HR29</option>
        <option value="HR30">HR30</option>
        <option value="HR31">HR31</option>
        <option value="HR33">HR33</option>
        <option value="HR34">HR34</option>
        <option value="HR40">HR40</option>
        <option value="HR41">HR41</option>
        <option value="HR42">HR42</option>
        <option value="HR43">HR43</option>
        <option value="HR55">HR55</option>
        <option value="HR62">HR62</option>
        <option value="HR63">HR63</option>
        <option value="HR64">HR64</option>
        <option value="HR65">HR65</option>
        <option value="HR67">HR67</option>
        <option value="HR68">HR68</option>
        <option value="HR69">HR69</option>
        <option value="HR99">HR99</option>
        <option value="HR25">HR25</option>
        <option value="HR83">HR83</option>
        <option value="HR84">HR84</option>
        <option value="HR50">HR50</option>
      </select>

      <input
        class="poziv-na-broj-primatelja"
        type="text"
        id="pozivNaBroj"
        maxlength="22"
        v-model="paymentParams.pozivNaBroj"
        style="
          padding-top: 5px;
          height: 30px;
          width: 200px;
          position: absolute;
          top: 148px;
          left: 323px;
          border: 0 solid;
          background: transparent;
        "
      />
      <select
        class="sifra-namjene"
        id="sifraNamjene"
        v-model="paymentParams.sifraNamjene"
        style="width: 57px; height: 27px"
      >
        <option value="" selected="selected" disabled>-</option>
        <option value="ADMG">Administracija</option>
        <option value="GVEA">
          Austrijski državni zaposlenici, Kategorija A
        </option>
        <option value="GVEB">
          Austrijski državni zaposlenici, Kategorija B
        </option>
        <option value="GVEC">
          Austrijski državni zaposlenici, Kategorija C
        </option>
        <option value="GVED">
          Austrijski državni zaposlenici, Kategorija D
        </option>
        <option value="BUSB">Autobusni</option>
        <option value="CPYR">Autorsko pravo</option>
        <option value="HSPC">Bolnička njega</option>
        <option value="RDTX">Cestarina</option>
        <option value="DEPT">Depozit</option>
        <option value="DERI">Derivati (izvedenice)</option>
        <option value="FREX">Devizno tržište</option>
        <option value="CGDD">
          Direktno terećenje nastalo kao rezultat kartične transakcije
        </option>
        <option value="DIVD">Dividenda</option>
        <option value="BECH">Dječji doplatak</option>
        <option value="CHAR">Dobrotvorno plaćanje</option>
        <option value="ETUP">Doplata e-novca</option>
        <option value="MTUP">Doplata mobilnog uređaja (bon)</option>
        <option value="GOVI">Državno osiguranje</option>
        <option value="ENRG">Energenti</option>
        <option value="CDCD">Gotovinska isplata</option>
        <option value="CSDB">Gotovinska isplata</option>
        <option value="TCSC">Gradske naknade</option>
        <option value="CDCS">Isplata gotovine s naknadom</option>
        <option value="FAND">Isplata naknade za elementarne nepogode</option>
        <option value="CSLP">Isplata socijalnih zajmova društava banci</option>
        <option value="RHBS">
          Isplata za vrijeme profesionalne rehabilitacije
        </option>
        <option value="GWLT">Isplata žrtvama rata i invalidima</option>
        <option value="ADCS">
          Isplate za donacije, sponzorstva, savjetodavne, intelektualne i druge
          usluge
        </option>
        <option value="PADD">Izravno terećenje</option>
        <option value="INTE">Kamata</option>
        <option value="CDDP">Kartično plaćanje s odgodom</option>
        <option value="CDCB">
          Kartično plaćanje uz gotovinski povrat (Cashback)
        </option>
        <option value="BOCE">Knjiženje konverzije u Back Office-u</option>
        <option value="POPE">Knjiženje mjesta kupnje</option>
        <option value="RCKE">Knjiženje ponovne prezentacije čeka</option>
        <option value="AREN">Knjiženje računa potraživanja</option>
        <option value="COMC">Komercijalno plaćanje</option>
        <option value="UBIL">Komunalne usluge</option>
        <option value="COMT">
          Konsolidirano plaćanje treće strane za račun potrošača.
        </option>
        <option value="SEPI">Kupnja vrijednosnica (interna)</option>
        <option value="GDDS">Kupovina-prodaja roba</option>
        <option value="GSCB">
          Kupovina-prodaja roba i usluga uz gotovinski povrat
        </option>
        <option value="GDSV">Kupovina/prodaja roba i usluga</option>
        <option value="SCVE">Kupovina/prodaja usluga</option>
        <option value="HLTC">Kućna njega bolesnika</option>
        <option value="CBLK">Masovni kliring kartica</option>
        <option value="MDCS">Medicinske usluge</option>
        <option value="NWCM">Mrežna komunikacija</option>
        <option value="RENT">Najam</option>
        <option value="ALLW">Naknada</option>
        <option value="SSBE">Naknada socijalnog osiguranja</option>
        <option value="LICF">Naknada za licencu</option>
        <option value="GFRP">Naknada za nezaposlene u toku stečaja</option>
        <option value="BENE">Naknada za nezaposlenost/invaliditet</option>
        <option value="CFEE">Naknada za poništenje</option>
        <option value="AEMP">Naknada za zapošljavanje</option>
        <option value="COLL">Naplata</option>
        <option value="FCOL">Naplata naknade po kartičnoj transakciji</option>
        <option value="DBTC">Naplata putem terećenja</option>
        <option value="NOWS">Nenavedeno</option>
        <option value="IDCP">
          Neopozivo plaćanje sa računa debitne kartice
        </option>
        <option value="ICCP">
          Neopozivo plaćanje sa računa kreditne kartice
        </option>
        <option value="BONU">Novčana nagrada (bonus).</option>
        <option value="PAYR">Obračun plaća</option>
        <option value="BLDM">Održavanje zgrada</option>
        <option value="HEDG">Omeđivanje rizika (Hedging)</option>
        <option value="CDOC">Originalno odobrenje</option>
        <option value="PPTI">Osiguranje imovine</option>
        <option value="LBRI">Osiguranje iz rada</option>
        <option value="OTHR">Ostalo</option>
        <option value="CLPR">Otplata glavnice kredita za automobil</option>
        <option value="HLRP">Otplata stambenog kredita</option>
        <option value="LOAR">Otplata zajma</option>
        <option value="ALMY">Plaćanje alimentacije</option>
        <option value="RCPT">
          Plaćanje blagajničke potvrde. (ReceiptPayment)
        </option>
        <option value="PRCP">Plaćanje cijene</option>
        <option value="SUPP">Plaćanje dobavljača</option>
        <option value="CFDI">Plaćanje dospjele glavnice</option>
        <option value="GOVT">Plaćanje države</option>
        <option value="PENS">Plaćanje mirovine</option>
        <option value="DCRD">Plaćanje na račun debitne kartice.</option>
        <option value="CCRD">Plaćanje na račun kreditne kartice</option>
        <option value="SALA">Plaćanje plaće</option>
        <option value="REBT">Plaćanje popusta/rabata</option>
        <option value="TAXS">Plaćanje poreza</option>
        <option value="VATX">Plaćanje poreza na dodatnu vrijednost</option>
        <option value="RINP">Plaćanje rata koje se ponavljaju</option>
        <option value="IHRP">Plaćanje rate pri kupnji na otplatu</option>
        <option value="IVPT">Plaćanje računa</option>
        <option value="CDBL">Plaćanje računa za kreditnu karticu</option>
        <option value="TREA">Plaćanje riznice</option>
        <option value="CMDT">Plaćanje roba</option>
        <option value="INTC">Plaćanje unutar društva</option>
        <option value="INVS">Plaćanje za fondove i vrijednosnice</option>
        <option value="PRME">Plemeniti metali</option>
        <option value="AGRT">Poljoprivredni transfer</option>
        <option value="INTX">Porez na dohodak</option>
        <option value="PTXP">Porez na imovinu</option>
        <option value="NITX">Porez na neto dohodak</option>
        <option value="ESTX">Porez na ostavštinu</option>
        <option value="GSTX">Porez na robu i usluge</option>
        <option value="HSTX">Porez na stambeni prostor</option>
        <option value="FWLV">Porez na strane radnike</option>
        <option value="WHLD">Porez po odbitku</option>
        <option value="BEXP">Poslovni troškovi</option>
        <option value="REFU">Povrat</option>
        <option value="TAXR">Povrat poreza</option>
        <option value="RIMB">Povrat prethodne pogrešne transakcije</option>
        <option value="OFEE">Početna naknada (Opening Fee)</option>
        <option value="ADVA">Predujam</option>
        <option value="INSU">Premija osiguranja</option>
        <option value="INPC">Premija osiguranja za vozilo</option>
        <option value="TRPT">Prepaid cestarina (ENC)</option>
        <option value="SUBS">Pretplata</option>
        <option value="CASH">Prijenos gotovine</option>
        <option value="PENO">Prisilna naplata</option>
        <option value="COMM">Provizija</option>
        <option value="INSM">Rata</option>
        <option value="ELEC">Račun za električnu energiju</option>
        <option value="CBTV">Račun za kabelsku TV</option>
        <option value="OTLC">Račun za ostale telekom usluge</option>
        <option value="GASB">Račun za plin</option>
        <option value="WTER">Račun za vodu</option>
        <option value="ANNI">Renta</option>
        <option value="BBSC">Rodiljna naknada</option>
        <option value="NETT">Saldiranje (netiranje)</option>
        <option value="CAFI">Skrbničke naknade (interne)</option>
        <option value="STDY">Studiranje</option>
        <option value="ROYA">Tantijeme</option>
        <option value="PHON">Telefonski račun</option>
        <option value="FERB">Trajektni</option>
        <option value="DMEQ">Trajna medicinska pomagala</option>
        <option value="WEBI">Transakcija inicirana internetom</option>
        <option value="TELI">Transakcija inicirana telefonom</option>
        <option value="HREC">
          Transakcija se odnosi na doprinos poslodavca za troškove stanovanja
        </option>
        <option value="CBFR">
          Transakcija se odnosi na kapitalnu štednju za mirovinu
        </option>
        <option value="CBFF">
          Transakcija se odnosi na kapitalnu štednju, općenito
        </option>
        <option value="TRAD">Trgovinske usluge</option>
        <option value="COST">Troškovi</option>
        <option value="CPKC">Troškovi parkiranja</option>
        <option value="TBIL">Troškovi telekomunikacija</option>
        <option value="NWCH">Troškovi za mrežu</option>
        <option value="EDUC">Troškovi školovanja</option>
        <option value="LIMA">Upravljanje likvidnošću</option>
        <option value="ACCT">Upravljanje računom</option>
        <option value="ANTS">Usluge anestezije</option>
        <option value="VIEW">Usluge oftalmološke skrbi</option>
        <option value="LTCF">Ustanova dugoročne zdravstvene skrbi</option>
        <option value="ICRF">Ustanova socijalne skrbi</option>
        <option value="CVCF">
          Ustanova za usluge skrbi za rekonvalescente
        </option>
        <option value="PTSP">Uvjeti plaćanja</option>
        <option value="MSVC">Višestruke vrste usluga</option>
        <option value="SECU">Vrijednosni papiri</option>
        <option value="LOAN">Zajam</option>
        <option value="FCPM">Zakašnjele naknade</option>
        <option value="TRFD">Zaklada</option>
        <option value="CDQC">Zamjenska gotovina</option>
        <option value="HLTI">Zdravstveno osiguranje</option>
        <option value="AIRB">Zračni</option>
        <option value="DNTS">Zubarske usluge</option>
        <option value="SAVG">Štednja</option>
        <option value="RLWY">Željeznički</option>
        <option value="LIFI">Životno osiguranje</option>
      </select>

      <textarea
        class="opis-placanja"
        type="text"
        name=""
        id=""
        v-model="paymentParams.opisPlacanja"
      ></textarea>
      <div class="last-item generated-barcode" id="barcode">
        <div v-if="barcodeImage">
          <img :src="barcodeImage" alt="Generated Barcode" />
        </div>
      </div>

      <input
        type="text"
        class="iznos-desno h-[20px]"
        id="iznos"
        pattern="^[0-9]+,[0-9]{2}$"
        placeholder="0,00"
        maxlength="16"
        required
        v-model="paymentParams.iznosTransakcije"
        style="height: 27px; padding-top: 5px"
      />

      <input
        class="iban-primatelja-desno"
        type="text"
        id="brRacuna"
        maxlength="21"
        name=""
        required
        v-model="paymentParams.ibanPrimatelja"
        style=""
      />
      <select
        class="model-placanja-desno"
        id="modelPlacanja"
        v-model="paymentParams.modelPlacanja"
      >
        <option value="" disabled>-</option>
        <option value="HR01">HR01</option>
        <option value="HR02">HR02</option>
        <option value="HR03">HR03</option>
        <option value="HR04">HR04</option>
        <option value="HR05">HR05</option>
        <option value="HR06">HR06</option>
        <option value="HR07">HR07</option>
        <option value="HR08">HR08</option>
        <option value="HR09">HR09</option>
        <option value="HR10">HR10</option>
        <option value="HR11">HR11</option>
        <option value="HR12">HR12</option>
        <option value="HR13">HR13</option>
        <option value="HR14">HR14</option>
        <option value="HR15">HR15</option>
        <option value="HR16">HR16</option>
        <option value="HR17">HR17</option>
        <option value="HR18">HR18</option>
        <option value="HR23">HR23</option>
        <option value="HR24">HR24</option>
        <option value="HR26">HR26</option>
        <option value="HR27">HR27</option>
        <option value="HR28">HR28</option>
        <option value="HR29">HR29</option>
        <option value="HR30">HR30</option>
        <option value="HR31">HR31</option>
        <option value="HR33">HR33</option>
        <option value="HR34">HR34</option>
        <option value="HR40">HR40</option>
        <option value="HR41">HR41</option>
        <option value="HR42">HR42</option>
        <option value="HR43">HR43</option>
        <option value="HR55">HR55</option>
        <option value="HR62">HR62</option>
        <option value="HR63">HR63</option>
        <option value="HR64">HR64</option>
        <option value="HR65">HR65</option>
        <option value="HR67">HR67</option>
        <option value="HR68">HR68</option>
        <option value="HR69">HR69</option>
        <option value="HR99">HR99</option>
        <option value="HR25">HR25</option>
        <option value="HR83">HR83</option>
        <option value="HR84">HR84</option>
        <option value="HR50">HR50</option>
      </select>

      <input
        class="poziv-na-broj-primatelja-desno"
        type="text"
        id="pozivNaBroj"
        maxlength="22"
        v-model="paymentParams.pozivNaBroj"
        style="padding-bottom: 10px; height: 33px"
      />

      <textarea
        class="opis-placanja-desno"
        type="text"
        name=""
        id=""
        v-model="paymentParams.opisPlacanja"
      ></textarea>
    </div>

    <div
      class="func-buttons flex flex-wrap gap-3 w-full items-center py-[25px]"
    >
      <button
        @click="generateBarcode"
        class="no-print flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md active:transform active:scale-95"
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
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 10v4" />
          <path d="M10 10v4" />
          <path d="M14 10v4" />
          <path d="M18 10v4" />
        </svg>
        <span>Generiraj Barkod</span>
      </button>

      <button
        v-if="barcodeImage"
        @click="generatePDFAndSendEmail(receiverEmail)"
        class="no-print flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-sm hover:shadow-md active:transform active:scale-95"
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
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <span>Pošalji uplatnicu</span>
      </button>

      <button
        v-if="barcodeImage"
        @click="generatePDF"
        class="no-print flex items-center justify-center gap-2 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors duration-200 shadow-sm hover:shadow-md active:transform active:scale-95"
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
        <span>Preuzmi PDF</span>
      </button>
    </div>
  </div>
</template>

<script>
import generateBarcode from "pdf417";
import html2pdf from "html2pdf.js";
import { useOrganizationStore } from "@/store/organizationStore";

export default {
  name: "PaymentSlip",
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      // Payment parameters for concatenation/barcode
      paymentParams: {
        bazniKod: "HRVHUB30\nEUR",
        iznosTransakcije: "",
        imePlatitelja: "",
        adresaPlatitelja: "",
        postanskiBrojIMjestoPlatitelja: "",
        imePrimatelja: "",
        adresaPrimatelja: "",
        postanskiBrojIMjestoPrimatelja: "",
        ibanPrimatelja: "",
        modelPlacanja: "",
        pozivNaBroj: "",
        sifraNamjene: "",
        opisPlacanja: "_",
      },

      // For barcode generation
      text: "",
      blockWidth: 2,
      blockHeight: 1,
      barcodeImage: null,
      concatenatedString: "",

      receiverEmail: null,
    };
  },

  computed: {
    organizationStore() {
      return useOrganizationStore();
    },
  },

  mounted() {
    if (this.organizationStore.organization) {
      this.initializeOrganizationData();
    }
    this.setPaymentData(); // Initialize payment data from props
    this.generateBarcode();
  },

  watch: {
    contact: {
      immediate: true,
      deep: true,
      handler(newContact) {
        if (newContact) {
          this.setPaymentData();
          this.generateBarcode();
        }
      },
    },
  },

  methods: {
    setPaymentData() {
      if (!this.contact) return;

      this.paymentParams.imePlatitelja = this.contact.ime_prezime || "";
      this.paymentParams.adresaPlatitelja = this.contact.ulica || "";
      this.paymentParams.postanskiBrojIMjestoPlatitelja = `${this.contact.postanski_broj} ${this.contact.grad}`;
      this.paymentParams.iznosTransakcije = this.contact.iznos || "";
      this.paymentParams.opisPlacanja = this.contact.opis_placanja || "";
      this.paymentParams.modelPlacanja = this.contact.model_placanja || "";
    },

    initializeOrganizationData() {
      const org = this.organizationStore.organization;

      if (!org) return;

      this.paymentParams.imePrimatelja = org.naziv || "";
      this.paymentParams.adresaPrimatelja = org.ulica || "";
      this.paymentParams.postanskiBrojIMjestoPrimatelja = org.grad || "";
      this.paymentParams.ibanPrimatelja = org.IBAN || "";
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

    windowPrint() {
      window.print();
    },
  },
};
</script>

<style>
.uplatnica-form-img {
  border: 2px solid #ffffff;
  width: 931px;
  height: 380px;
  background-size: cover;
  background-image: url("../assets/images/uplatnica.png");
  margin: 0 auto;
  position: relative;
}
.uplatnica-form-img .platitelj {
  position: absolute;
  display: flex;
  flex-direction: column;
  max-width: 200px;
  left: 31px;
  top: 44px;
}
.uplatnica-form-img .platitelj input {
  height: 20px;
  border: 0px solid #a26b6b;
  font-size: 12px;
}
.uplatnica-form-img .iban-primatelja {
  position: absolute;
  top: 121px;
  left: 335px;
  border: 0 solid transparent;
  background-color: transparent;
  font-size: 12px;
  letter-spacing: 8px;
  max-width: 312px;
  width: 100%;
}
.uplatnica-form-img .iznos {
  left: 485px;
  position: absolute;
  top: 24px;
  background: transparent;
  font-size: 12px;
  letter-spacing: 0px;
  border: 0 solid;
  max-width: 200px;
  text-align: end;
  letter-spacing: 3px;
}
.uplatnica-form-img .valuta {
  width: 50px;
  height: 27px;
  top: 26px;
  position: absolute;
  left: 334px;
  border: 0 solid;
  background: transparent;
  font-size: 12px;
}
.uplatnica-form-img .primatelj {
  position: absolute;
  display: flex;
  flex-direction: column;
  max-width: 200px;
  left: 31px;
  top: 170px;
}
.uplatnica-form-img .primatelj input {
  height: 20px;
  border: 0px solid #a26b6b;
  font-size: 12px;
}
.uplatnica-form-img .model-placanja {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  position: absolute;
  top: 150px;
  background: transparent;
  left: 232px;
  letter-spacing: 7px;
  width: 57px;
  height: 27px;
  border: 0 solid;
  font-size: 12px;
}
.uplatnica-form-img .opis-placanja {
  width: 249px;
  position: absolute;
  background: transparent;
  top: 178px;
  left: 384px;
  height: 50px;
  border: 0 solid;
  font-size: 12px;
}
.uplatnica-form-img .poziv-na-broj-primatelja {
  height: 27px;
  width: 200px;
  position: absolute;
  top: 148px;
  left: 323px;
  border: 0 solid;
  background: transparent;
  font-size: 12px;
}
.uplatnica-form-img .sifra-namjene {
  height: 27px;
  position: absolute;
  top: 187px;
  left: 232px;
  border: 0 solid;
  background: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  font-size: 12px;
}
.uplatnica-form-img .generated-barcode {
  position: absolute;
  width: 250px;
  left: 30px;
  bottom: 33px;
}
.uplatnica-form-img .generated-barcode img {
  width: 100%;
}
.uplatnica-form-img .generated-barcode .iznos-desno {
  height: 27px;
  padding-top: 5px;
  position: absolute;
  right: 19px;
  top: 26px;
  background: transparent;
  border: 0 solid;
  font-size: 12px;
}
.uplatnica-form-img .iznos-desno {
  height: 27px;
  padding-top: 5px;
  position: absolute;
  right: 19px;
  top: 26px;
  background: transparent;
  border: 0 solid;
  font-size: 12px;
}
.uplatnica-form-img .model-placanja-desno {
  position: absolute;
  right: 194px;
  top: 123px;
  background: transparent;
  border: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  font-size: 12px;
}
.uplatnica-form-img .iban-primatelja-desno {
  position: absolute;
  right: 30px;
  top: 113px;
  border: transparent;
  background: transparent;
  padding-top: 3px;
  font-size: 12px;
  height: 33px;
}
.uplatnica-form-img .poziv-na-broj-primatelja-desno {
  position: absolute;
  right: 30px;
  top: 156px;
  border: 0 solid;
  background: transparent;
  padding-top: 3px;
  padding-bottom: 5px;
}
.uplatnica-form-img .opis-placanja-desno {
  position: absolute;
  bottom: 149px;
  right: 12px;
  width: 238px;
  display: flex;
  flex-wrap: wrap;
  border: 0 transparent;
  background: transparent;
  height: 45px;
  font-size: 12px;
  padding-top: 5px;
  word-wrap: break-word;
  word-break: break-all;
}
.func-buttons {
  display: flex;
  justify-content: center;
}
</style>
