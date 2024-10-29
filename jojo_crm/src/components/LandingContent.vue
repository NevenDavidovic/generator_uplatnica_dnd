<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-12">
      Features That Make Selling Easier
    </h1>

    <!-- Grid layout for features -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- AI CRM Feature -->
      <div class="bg-indigo-600 rounded-lg p-8 text-white">
        <h3 class="text-sm font-semibold mb-2">AI CRM</h3>
        <h2 class="text-2xl font-bold mb-3">
          Book jobs faster with artificial intelligence
        </h2>
        <p class="text-indigo-100 mb-4">
          Secure more jobs with AI-powered customer relationship management
          tools designed to help you grow.
        </p>

        <!-- Messages Preview -->
        <div class="bg-white/10 rounded-lg p-4">
          <div class="space-y-3">
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="bg-white/10 rounded p-2 text-sm"
            >
              <div class="text-xs opacity-70 mb-1">{{ message.time }}</div>
              <div class="truncate">{{ message.text }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Automated Replies Feature -->
      <div class="bg-indigo-600 rounded-lg p-8 text-white">
        <h2 class="text-2xl font-bold mb-3">
          Instantly follow up with new customers
        </h2>
        <p class="text-indigo-100 mb-4">
          Create an automatic response to pre-contact form requests submitted to
          your business website.
        </p>

        <!-- Auto Reply Preview -->
        <div class="bg-white rounded-lg p-4 text-gray-800">
          <div class="flex justify-between items-center mb-4">
            <div class="text-sm">Auto-reply</div>
            <div class="w-10 h-6 bg-indigo-600 rounded-full relative">
              <div
                class="w-4 h-4 bg-white rounded-full absolute right-1 top-1"
              ></div>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <div class="text-sm font-semibold">Subject</div>
              <div class="text-sm text-gray-600">
                Thanks for your interest in Hair Haven
              </div>
            </div>
            <div>
              <div class="text-sm font-semibold">Message</div>
              <div class="text-sm text-gray-600">Dear [Name],</div>
              <div class="text-sm text-gray-600">
                Thank you for reaching out to Hair Haven...
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Generated Responses Feature -->
      <div class="bg-indigo-600 rounded-lg p-8 text-white">
        <h2 class="text-2xl font-bold mb-3">
          Send personalized responses in one click
        </h2>
        <p class="text-indigo-100 mb-4">
          Sync your emails to Messenger and instantly generate unique customer
          responses based on past messages.
        </p>

        <!-- Integration Preview -->
        <div class="bg-white rounded-lg p-4">
          <div class="flex items-center gap-4 mb-4">
            <img
              src="/api/placeholder/32/32"
              alt="Gmail"
              class="w-8 h-8 rounded-full"
            />
            <div class="flex-1">
              <div class="text-gray-800 font-medium">Connect Email</div>
              <div class="text-sm text-gray-500">
                Sync your email communication within Minutes.
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
            <div class="w-8 h-8 bg-indigo-500 rounded-full"></div>
            <div class="w-8 h-8 bg-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SalesFeatures",
  data() {
    return {
      messages: [
        {
          time: "8:20 am",
          text: "Welcome to Hair Haven - Your First Haircu...",
        },
        {
          time: "7:35 am",
          text: "Thank you for your positive feedback! We are thrilled to hear...",
        },
        {
          time: "6:45 am",
          text: "We hope this email finds you well. We wanted to remind you...",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
