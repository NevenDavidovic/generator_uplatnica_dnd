<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div
      class="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4"
    >
      <div class="flex items-center gap-2 mb-8">
        <div class="text-purple-600 text-2xl">✧</div>
        <h1 class="text-purple-600 text-xl font-semibold">Sparkle</h1>
      </div>

      <nav class="space-y-1">
        <a
          href="#"
          class="flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg group"
          :class="{
            'bg-purple-50 text-purple-600': currentPage === 'dashboard',
          }"
        >
          <i class="fas fa-chart-line w-5 h-5 mr-3"></i>
          Dashboard
        </a>

        <a
          href="#"
          class="flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg group"
          :class="{
            'bg-purple-50 text-purple-600': currentPage === 'contacts',
          }"
        >
          <i class="fas fa-address-book w-5 h-5 mr-3"></i>
          Contacts
        </a>

        <a
          href="#"
          class="flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg group"
          :class="{ 'bg-purple-50 text-purple-600': currentPage === 'email' }"
        >
          <i class="fas fa-envelope w-5 h-5 mr-3"></i>
          Email Campaigns
        </a>

        <a
          href="#"
          class="flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg group"
          :class="{ 'bg-purple-50 text-purple-600': currentPage === 'landing' }"
        >
          <i class="fas fa-laptop w-5 h-5 mr-3"></i>
          Landing Pages
        </a>

        <a
          href="#"
          class="flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg group"
          :class="{
            'bg-purple-50 text-purple-600': currentPage === 'payments',
          }"
        >
          <i class="fas fa-credit-card w-5 h-5 mr-3"></i>
          Payments
        </a>

        <a
          href="#"
          class="flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg group"
          :class="{
            'bg-purple-50 text-purple-600': currentPage === 'documents',
          }"
        >
          <i class="fas fa-file-alt w-5 h-5 mr-3"></i>
          Documents
        </a>

        <a
          href="#"
          class="flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg group"
          :class="{
            'bg-purple-50 text-purple-600': currentPage === 'analytics',
          }"
        >
          <i class="fas fa-chart-bar w-5 h-5 mr-3"></i>
          Analytics
        </a>

        <a
          href="#"
          class="flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg group"
          :class="{
            'bg-purple-50 text-purple-600': currentPage === 'settings',
          }"
        >
          <i class="fas fa-cog w-5 h-5 mr-3"></i>
          Settings
        </a>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="ml-64 p-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-2xl font-semibold text-gray-700">
            Hi {{ username }},
          </h2>
          <p class="text-gray-500">Welcome to your dashboard</p>
        </div>

        <!-- User Menu -->
        <div class="flex items-center gap-4">
          <button class="p-2 hover:bg-gray-100 rounded-lg">
            <i class="fas fa-bell text-gray-600"></i>
          </button>
          <div class="relative">
            <img
              src="/api/placeholder/40/40"
              class="rounded-full cursor-pointer"
              alt="User avatar"
            />
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <div class="text-gray-500">Total Contacts</div>
            <div class="p-2 bg-purple-50 rounded-lg">
              <i class="fas fa-users text-purple-600"></i>
            </div>
          </div>
          <div class="text-2xl font-bold">3,250</div>
          <div class="text-green-500 text-sm">+12% from last month</div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <div class="text-gray-500">Active Campaigns</div>
            <div class="p-2 bg-blue-50 rounded-lg">
              <i class="fas fa-envelope text-blue-600"></i>
            </div>
          </div>
          <div class="text-2xl font-bold">12</div>
          <div class="text-green-500 text-sm">+2 this week</div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <div class="text-gray-500">Revenue</div>
            <div class="p-2 bg-green-50 rounded-lg">
              <i class="fas fa-dollar-sign text-green-600"></i>
            </div>
          </div>
          <div class="text-2xl font-bold">$24,500</div>
          <div class="text-green-500 text-sm">+8% from last month</div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <div class="text-gray-500">Landing Pages</div>
            <div class="p-2 bg-orange-50 rounded-lg">
              <i class="fas fa-laptop text-orange-600"></i>
            </div>
          </div>
          <div class="text-2xl font-bold">8</div>
          <div class="text-green-500 text-sm">+1 this week</div>
        </div>
      </div>

      <!-- Chart Section -->
      <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">Performance Overview</h3>
          <select class="border rounded-lg px-3 py-1.5 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
        <LineChart
          :chart-data="chartData"
          :options="chartOptions"
          class="h-64"
        />
      </div>

      <!-- Recent Activity & Campaign Performance -->
      <div class="grid grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-semibold mb-4">Recent Activity</h3>
          <div class="space-y-4">
            <div
              v-for="activity in recentActivity"
              :key="activity.id"
              class="flex items-start gap-3"
            >
              <div class="p-2 rounded-full" :class="activity.iconBg">
                <i :class="['fas', activity.icon, activity.iconColor]"></i>
              </div>
              <div>
                <div class="font-medium">{{ activity.title }}</div>
                <div class="text-sm text-gray-500">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-semibold mb-4">Campaign Performance</h3>
          <div class="space-y-4">
            <div
              v-for="campaign in campaigns"
              :key="campaign.id"
              class="flex items-center justify-between"
            >
              <div>
                <div class="font-medium">{{ campaign.name }}</div>
                <div class="text-sm text-gray-500">{{ campaign.stats }}</div>
              </div>
              <div class="text-sm font-semibold" :class="campaign.statusColor">
                {{ campaign.status }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { LineChart } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const username = ref("Nimi");
const currentPage = ref("dashboard");

const chartData = ref({
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Page Views",
      data: [1200, 1900, 1500, 2100, 1800, 2500, 2200],
      borderColor: "#8b5cf6",
      tension: 0.4,
    },
    {
      label: "Conversions",
      data: [400, 650, 500, 750, 600, 850, 780],
      borderColor: "#c4b5fd",
      tension: 0.4,
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const recentActivity = ref([
  {
    id: 1,
    title: "New campaign created",
    time: "2 hours ago",
    icon: "fa-envelope",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: 2,
    title: "Payment received",
    time: "4 hours ago",
    icon: "fa-dollar-sign",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    title: "New landing page published",
    time: "6 hours ago",
    icon: "fa-laptop",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
]);

const campaigns = ref([
  {
    id: 1,
    name: "Summer Sale",
    stats: "24.5k emails sent",
    status: "Active",
    statusColor: "text-green-600",
  },
  {
    id: 2,
    name: "Product Launch",
    stats: "12.8k emails sent",
    status: "Draft",
    statusColor: "text-gray-600",
  },
  {
    id: 3,
    name: "Newsletter",
    stats: "8.2k emails sent",
    status: "Scheduled",
    statusColor: "text-blue-600",
  },
]);
</script>
