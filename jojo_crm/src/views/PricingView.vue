<template>
  <div>
    <NavbarComponent msg="Welcome to Your Vue.js App" />

    <div class="min-h-screen bg-gray-50 py-16">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your business. All plans include 14-day
          free trial.
        </p>

        <!-- Billing Toggle -->
        <div class="mt-8 flex justify-center items-center gap-3">
          <span
            :class="{ 'text-gray-900': !isAnnual, 'text-gray-500': isAnnual }"
            >Monthly</span
          >
          <button
            @click="isAnnual = !isAnnual"
            class="relative inline-flex h-6 w-11 items-center rounded-full"
            :class="isAnnual ? 'bg-purple-600' : 'bg-gray-200'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              :class="isAnnual ? 'translate-x-6' : 'translate-x-1'"
            />
          </button>
          <span
            :class="{ 'text-gray-900': isAnnual, 'text-gray-500': !isAnnual }"
          >
            Annual
            <span class="text-sm text-green-500 ml-1">(Save 20%)</span>
          </span>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <!-- Starter Plan -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Starter</h3>
            <p class="mt-2 text-sm text-gray-500">
              Perfect for getting started
            </p>
          </div>

          <div class="flex items-baseline mb-8">
            <span class="text-4xl font-bold text-gray-900"
              >${{ isAnnual ? "29" : "39" }}</span
            >
            <span class="text-gray-500 ml-1">/month</span>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              Up to 1,000 subscribers
            </li>
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              Basic analytics
            </li>
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              Email support
            </li>
          </ul>

          <button
            class="w-full py-3 px-4 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 transition"
          >
            Start free trial
          </button>
        </div>

        <!-- Professional Plan -->
        <div
          class="bg-white rounded-2xl shadow-lg border-2 border-purple-600 p-8 relative"
        >
          <div class="absolute top-0 right-6 transform -translate-y-1/2">
            <span
              class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm"
            >
              Popular
            </span>
          </div>

          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Professional</h3>
            <p class="mt-2 text-sm text-gray-500">For growing businesses</p>
          </div>

          <div class="flex items-baseline mb-8">
            <span class="text-4xl font-bold text-gray-900"
              >${{ isAnnual ? "79" : "99" }}</span
            >
            <span class="text-gray-500 ml-1">/month</span>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              Up to 10,000 subscribers
            </li>
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              Advanced analytics
            </li>
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              Priority email support
            </li>
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              Custom branding
            </li>
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              API access
            </li>
          </ul>

          <button
            class="w-full py-3 px-4 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Start free trial
          </button>
        </div>

        <!-- Enterprise Plan -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Enterprise</h3>
            <p class="mt-2 text-sm text-gray-500">For large organizations</p>
          </div>

          <div class="flex items-baseline mb-8">
            <span class="text-4xl font-bold text-gray-900"
              >${{ isAnnual ? "199" : "249" }}</span
            >
            <span class="text-gray-500 ml-1">/month</span>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              Unlimited subscribers
            </li>
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              Advanced analytics & reporting
            </li>
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              24/7 phone & email support
            </li>
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              Custom branding
            </li>
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              API access
            </li>
            <li class="flex items-center gap-3 text-gray-600">
              <i class="fas fa-check text-green-500"></i>
              SAML SSO
            </li>
          </ul>

          <button
            class="w-full py-3 px-4 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 transition"
          >
            Contact sales
          </button>
        </div>
      </div>

      <!-- FAQs -->
      <div class="max-w-3xl mx-auto mt-20 px-4">
        <h3 class="text-2xl font-bold text-gray-900 text-center mb-8">
          Frequently asked questions
        </h3>

        <div class="space-y-6">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="border-b border-gray-200 pb-6"
          >
            <button
              @click="toggleFaq(index)"
              class="flex justify-between items-center w-full text-left"
            >
              <span class="text-lg font-medium text-gray-900">{{
                faq.question
              }}</span>
              <i
                class="fas"
                :class="faq.isOpen ? 'fa-chevron-up' : 'fa-chevron-down'"
              ></i>
            </button>
            <div v-show="faq.isOpen" class="mt-3 text-gray-600">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavbarComponent from "@/components/NavbarComponent.vue";

const isAnnual = ref(false);

const faqs = ref([
  {
    question: "How does the free trial work?",
    answer:
      "You can try any plan free for 14 days. No credit card required. Cancel anytime.",
    isOpen: false,
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    isOpen: false,
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and wire transfers for enterprise customers.",
    isOpen: false,
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "No, all plans are month-to-month or annual. You can cancel at any time.",
    isOpen: false,
  },
]);

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen;
};
</script>
