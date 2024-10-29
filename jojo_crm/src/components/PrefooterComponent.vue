<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        <!-- Left Content -->
        <div class="max-w-xl">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Grow your business
          </h1>
          <p class="text-lg text-gray-600 mb-6">
            Use built-in automation tools to turn website traffic into new
            customers.
          </p>
          <button
            class="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Contact Sales
          </button>
        </div>

        <!-- Right Image -->
        <div class="w-full md:w-1/2">
          <img
            src="/api/placeholder/500/400"
            alt="Business Professional"
            class="w-full h-auto"
          />
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="bg-purple-50 py-12 md:py-20">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature Card 1 -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div
              class="bg-gray-100 w-16 h-16 rounded-lg mb-4 flex items-center justify-center"
            >
              <div class="w-8 h-8 bg-indigo-600 rounded"></div>
            </div>
            <h3 class="text-lg font-semibold mb-2">Lead Generation Form</h3>
            <p class="text-gray-600 text-sm">
              Every website includes a lead generation form with easy to AI
              response.
            </p>
          </div>

          <!-- Feature Card 2 -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div
              class="bg-gray-100 w-16 h-16 rounded-lg mb-4 flex items-center justify-center"
            >
              <div class="w-8 h-8 bg-green-500 rounded"></div>
            </div>
            <h3 class="text-lg font-semibold mb-2">Contact Organization</h3>
            <p class="text-gray-600 text-sm">
              Organize your growing list of contacts with custom fields.
            </p>
          </div>

          <!-- Feature Card 3 -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div
              class="bg-gray-100 w-16 h-16 rounded-lg mb-4 flex items-center justify-center"
            >
              <div class="w-8 h-8 bg-blue-500 rounded"></div>
            </div>
            <h3 class="text-lg font-semibold mb-2">Email Sync Up</h3>
            <p class="text-gray-600 text-sm">
              Send AI generated or manually created emails right from the
              interface app.
            </p>
          </div>

          <!-- Feature Card 4 -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div
              class="bg-gray-100 w-16 h-16 rounded-lg mb-4 flex items-center justify-center"
            >
              <div class="w-8 h-8 bg-orange-500 rounded"></div>
            </div>
            <h3 class="text-lg font-semibold mb-2">Automated Reviews</h3>
            <p class="text-gray-600 text-sm">
              Send review requests to boost your Google reviews rating and
              reputation.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-indigo-600 py-16">
      <div class="max-w-3xl mx-auto px-4 md:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Try Powerpro free today
        </h2>
        <p class="text-white/90 mb-8">
          Build your website in 30 seconds and get access to the only AI app
          made for small business. Free for 90 days.
        </p>
        <button
          class="bg-white text-indigo-600 px-8 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
        >
          Start for Free
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "BusinessGrowthLanding",
};
</script>
