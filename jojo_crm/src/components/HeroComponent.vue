<template>
  <div class="bg-indigo-600 min-h-screen px-4 md:px-8">
    <!-- Hero Section -->
    <div
      class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-8 md:py-16 gap-8"
    >
      <!-- Hero Content -->
      <div
        class="max-w-2xl md:max-w-xl w-full md:w-1/2 text-center md:text-left"
      >
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          The only AI CRM for small businesses
        </h1>
        <p class="text-xl text-white/90 mb-8">
          Respond to leads, organize contacts, and instantly generate client
          communications with AI CRM
        </p>
        <button
          class="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium text-lg hover:bg-white/90 transition-colors duration-200"
        >
          Start For Free
        </button>
      </div>

      <!-- Hero Image -->
      <div class="w-full md:w-1/2 flex justify-center items-center">
        <img
          src="../assets/images/hero-section-image.png"
          alt="App Preview"
          class="w-full max-w-xl h-auto rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>
