<template>
  <div :class="[bgColor, 'p-4 rounded-lg text-center shadow']">
    <h3 class="text-lg font-semibold">{{ title }}</h3>
    <p :class="['text-2xl font-bold', textColor]">{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: ["title", "value", "bgColor", "textColor"],
};
</script>
