<template>
  <div class="min-h-screen bg-gray-50">
    <NavbarComponent msg="Welcome to Your Vue.js App" />
    <!-- Hero Section -->
    <div class="relative bg-blue-600 text-white py-24">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-indigo-600 opacity-90"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          Transforming Business Relationships
        </h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
          We're on a mission to help businesses build stronger connections with
          their customers through innovative CRM solutions.
        </p>
      </div>
    </div>

    <!-- Our Story Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Our Story</h2>
          <p class="text-lg text-gray-600">
            Founded in 2020, YourCRM emerged from a simple observation:
            businesses needed a better way to manage their customer
            relationships. We saw the struggles of companies trying to piece
            together various tools and decided to create a unified solution.
          </p>
          <p class="text-lg text-gray-600">
            Today, we're proud to serve thousands of businesses worldwide,
            helping them streamline their operations and build lasting customer
            relationships.
          </p>
        </div>
        <div class="relative h-96 rounded-lg overflow-hidden shadow-xl">
          <img
            src="/api/placeholder/800/600"
            alt="Team collaboration"
            class="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Values
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(value, index) in values"
            :key="index"
            class="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div
              class="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-blue-100 rounded-full"
            >
              <component :is="value.icon" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-4">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
        Meet Our Team
      </h2>
      <div class="grid md:grid-cols-4 gap-8">
        <div v-for="(member, index) in team" :key="index" class="text-center">
          <div class="relative w-48 h-48 mx-auto mb-4">
            <img
              :src="`/api/placeholder/200/200`"
              :alt="member.name"
              class="rounded-full object-cover shadow-lg"
            />
          </div>
          <h3 class="text-lg font-semibold">{{ member.name }}</h3>
          <p class="text-gray-600">{{ member.role }}</p>
          <div class="flex justify-center space-x-3 mt-3">
            <a
              v-for="(link, linkIndex) in member.social"
              :key="linkIndex"
              :href="link.url"
              class="text-gray-400 hover:text-gray-600"
            >
              <component :is="link.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-blue-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div v-for="(stat, index) in stats" :key="index" class="space-y-2">
            <div class="text-4xl font-bold">{{ stat.value }}</div>
            <div class="text-lg opacity-90">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Join Us Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 class="text-3xl font-bold mb-6">Join Our Journey</h2>
      <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        We're always looking for talented individuals to join our team. Check
        out our open positions and become part of our story.
      </p>
      <button
        class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        View Open Positions
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Users, Heart, Zap, Linkedin, Twitter, GitHub } from "lucide-vue-next";
import NavbarComponent from "@/components/NavbarComponent.vue";

export default defineComponent({
  components: {
    Users,
    Heart,
    Zap,
    Linkedin,
    Twitter,
    GitHub,
    NavbarComponent,
  },
  data() {
    return {
      values: [
        {
          icon: "Heart",
          title: "Customer First",
          description:
            "We believe in putting our customersneeds at the heart of everything we do.",
        },
        {
          icon: "Zap",
          title: "Innovation",
          description:
            "We constantly push boundaries to deliver cutting-edge solutions.",
        },
        {
          icon: "Users",
          title: "Collaboration",
          description:
            "We work together as a team to achieve exceptional results.",
        },
      ],
      team: [
        {
          name: "Sarah Johnson",
          role: "CEO & Founder",
          social: [
            { icon: "Linkedin", url: "#" },
            { icon: "Twitter", url: "#" },
          ],
        },
        {
          name: "Michael Chen",
          role: "CTO",
          social: [
            { icon: "Linkedin", url: "#" },
            { icon: "GitHub", url: "#" },
          ],
        },
        {
          name: "Emma Wilson",
          role: "Head of Design",
          social: [
            { icon: "Linkedin", url: "#" },
            { icon: "Twitter", url: "#" },
          ],
        },
        {
          name: "David Smith",
          role: "Head of Sales",
          social: [
            { icon: "Linkedin", url: "#" },
            { icon: "Twitter", url: "#" },
          ],
        },
      ],
      stats: [
        { value: "10K+", label: "Customers" },
        { value: "50M+", label: "Emails Sent" },
        { value: "99.9%", label: "Uptime" },
        { value: "24/7", label: "Support" },
      ],
    };
  },
});
</script>
