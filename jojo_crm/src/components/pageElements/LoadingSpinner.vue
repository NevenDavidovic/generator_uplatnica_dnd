<!-- LoadingSpinner.vue -->
<template>
  <div class="flex items-center justify-center p-4">
    <div class="relative w-12 h-12">
      <div
        class="absolute w-12 h-12 border-4 border-gray-200 rounded-full"
      ></div>
      <div
        class="absolute w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"
      ></div>
    </div>
    <span class="ml-3 text-gray-600">Loading...</span>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
