<template>
  <div class="sign-in">
    <NavbarComponent msg="Welcome to Your Vue.js App" />

    <div
      class="min-h-screen bg-primary from-purple-50 to-indigo-100 flex items-center justify-center p-4"
    >
      <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <!-- Logo/Brand -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">Dobrodošli nazad</h2>
          <p class="mt-2 text-gray-600">Prijavi se na račun</p>
        </div>

        <!-- Auth Methods Container -->
        <div class="space-y-4">
          <!-- Google Sign In Button -->
          <button
            @click="signInWithGoogle"
            class="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 border border-gray-300 rounded-lg transition duration-150 ease-in-out"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Nastavi uz Google
          </button>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
          </div>
        </div>

        <p class="text-center text-xs text-gray-600">
          Prijavljujući se pristajete na naše
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
            >Uvjete korištenja</a
          >
          i
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
            >Politike privatnosti</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import { useAuthStore } from "@/store/auth";

export default {
  name: "AuthView",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      email: "",
    };
  },
  setup() {
    const authStore = useAuthStore();

    return { authStore };
  },
  mounted() {
    this.$firebase.auth.onAuthStateChanged((user) => {
      this.user = user;
    });

    this.checkSignInLink();
  },
  methods: {
    async signInWithGoogle() {
      if (this.isLoading) return;

      try {
        this.isLoading = true;

        const user = await this.$firebase.auth.signInWithGoogle();
        const email = user.email;

        const allowedEmails = process.env.VUE_APP_ALLOWED_GOOGLE_EMAILS
          ? process.env.VUE_APP_ALLOWED_GOOGLE_EMAILS.split(",")
          : [];

        if (!allowedEmails.includes(email)) {
          await this.$firebase.auth.signOut(); // Logout immediately

          this.$swal.fire({
            icon: "error",
            title: "Pristup odbijen",
            text: "Vaš Google račun nije autoriziran za prijavu.",
          });

          return; // Stop execution
        }

        // ✅ Proceed if email is authorized
        this.authStore.setUser(user);

        this.$swal.fire({
          icon: "success",
          title: "Prijavljeni ste uspješno",
          text: `Dobrodošli, ${user.displayName}!`,
          timer: 2000,
          timerProgressBar: true,
        });

        setTimeout(() => {
          this.$router.replace("/dashboard");
        }, 2000);
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Prijava je neuspješna",
          text: error.message || "Trenutno se nije moguće prijaviti uz Google",
        });
      } finally {
        this.isLoading = false; // Reset loading state
      }
    },
    async checkSignInLink() {
      try {
        const result = await this.$firebase.auth.completeSignIn(window);

        this.$swal
          .fire({
            icon: "success",
            title: "Prijava je uspješna!",
            text: `Dobrodošli, ${result.user.email}`,
            timer: 2000,
            timerProgressBar: true,
          })
          .then(() => {
            this.$router.push("/dashboard");
          });
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Prijava neuspješna",
          text:
            error.message || "Nismo mogli dovršiti prijavu. Pokušajte ponovno.",
        });
      }
    },
    async handleSignOut() {
      try {
        await this.$firebase.auth.signOut();
        sessionStorage.removeItem("isSignInComplete");
        this.$router.push("/signin");
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Greška pri odjavi",
          text: error.message,
        });
      }
    },
  },
};
</script>
