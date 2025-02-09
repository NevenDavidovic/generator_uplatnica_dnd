<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <h3 class="text-xl font-semibold mb-4">{{ title }}</h3>
    <div v-if="loading" class="text-center">Učitavanje podataka...</div>
    <table v-else class="w-full border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th
            v-for="col in columns"
            :key="col"
            class="border border-gray-300 px-4 py-2"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id" class="border-t">
          <td
            v-for="field in fields"
            :key="field"
            class="border border-gray-300 px-4 py-2"
          >
            {{ item[field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["title", "data", "loading", "columns", "fields"],
};
</script>
