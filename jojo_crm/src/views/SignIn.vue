<template>
  <div>
    <NavbarComponent msg="Welcome to Your Vue.js App" />
    <!-- Container for both forms -->
    <div class="min-h-screen bg-indigo-600 flex flex-col justify-center">
      <!-- Sign In Form -->
      <div
        v-if="currentView === 'signin'"
        class="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-white">Welcome back</h2>
          <p class="mt-2 text-white">Sign in to your account</p>
        </div>

        <div class="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form @submit.prevent="handleSignIn" class="space-y-6">
            <!-- Email Input -->
            <div>
              <label
                for="signin-email"
                class="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div class="mt-1">
                <input
                  id="signin-email"
                  v-model="signInForm.email"
                  type="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  :class="{ 'border-red-500': signInErrors.email }"
                />
                <p v-if="signInErrors.email" class="mt-1 text-sm text-red-600">
                  {{ signInErrors.email }}
                </p>
              </div>
            </div>

            <!-- Password Input -->
            <div>
              <label
                for="signin-password"
                class="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div class="mt-1 relative">
                <input
                  id="signin-password"
                  v-model="signInForm.password"
                  :type="showSignInPassword ? 'text' : 'password'"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  :class="{ 'border-red-500': signInErrors.password }"
                />
                <button
                  type="button"
                  @click="showSignInPassword = !showSignInPassword"
                  class="absolute inset-y-0 right-0 px-3 flex items-center"
                >
                  <Eye
                    v-if="!showSignInPassword"
                    class="h-5 w-5 text-gray-400"
                  />
                  <EyeOff v-else class="h-5 w-5 text-gray-400" />
                </button>
                <p
                  v-if="signInErrors.password"
                  class="mt-1 text-sm text-red-600"
                >
                  {{ signInErrors.password }}
                </p>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="signInForm.rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  for="remember-me"
                  class="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div class="text-sm">
                <a
                  href="#"
                  class="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <!-- Sign In Button -->
            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                :disabled="signInLoading"
              >
                <Loader2
                  v-if="signInLoading"
                  class="animate-spin -ml-1 mr-2 h-4 w-4"
                />
                Sign in
              </button>
            </div>
          </form>

          <!-- Social Sign In -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500"
                  >Or continue with</span
                >
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <Google class="h-5 w-5 text-gray-400" />
                <span class="ml-2">Google</span>
              </button>
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <Github class="h-5 w-5 text-gray-400" />
                <span class="ml-2">GitHub</span>
              </button>
            </div>
          </div>

          <!-- Switch to Sign Up -->
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?

              <router-link
                class="font-medium text-blue-600 hover:text-blue-500"
                to="/signup"
              >
                Sign Up</router-link
              >
            </p>
          </div>
        </div>
      </div>

      <!-- Sign Up Form -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Eye, EyeOff, Loader2, Github, Google } from "lucide-vue-next";
import NavbarComponent from "@/components/NavbarComponent.vue";

export default defineComponent({
  components: {
    Eye,
    EyeOff,
    Loader2,
    Github,
    Google,
    NavbarComponent,
  },
  data() {
    return {
      currentView: "signin",
      showSignInPassword: false,
      showSignUpPassword: false,
      signInLoading: false,
      signUpLoading: false,

      signInForm: {
        email: "",
        password: "",
        rememberMe: false,
      },
      signInErrors: {},

      signUpForm: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        acceptTerms: false,
      },
      signUpErrors: {},
    };
  },
  methods: {},
});
</script>
