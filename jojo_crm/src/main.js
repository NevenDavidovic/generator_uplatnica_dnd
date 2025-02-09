import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { createPinia } from "pinia";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  db as firebaseDb,
  auth as firebaseAuth,
  storage as firebaseStorage,
  firebaseAuth as firebaseAuthMethods,
} from "./services/firebase";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VueSweetalert2);

app.config.globalProperties.$firebase = {
  db: firebaseDb,
  auth: {
    ...firebaseAuth,
    ...firebaseAuthMethods,
  },
  storage: firebaseStorage,
};

app.mount("#app");
