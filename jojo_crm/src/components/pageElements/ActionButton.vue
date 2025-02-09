<template>
  <button
    @click="$router.push(route)"
    :class="[
      color,
      hoverColor,
      'px-6 py-3 text-white rounded-lg shadow transition',
    ]"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  props: ["title", "route", "color", "hoverColor"],
};
</script>
