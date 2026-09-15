<template>
  <div
    class="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg transition duration-300">

    <div class="flex justify-between items-start">

      <div>

        <p class="text-sm text-slate-500 font-medium">
          {{ title }}
        </p>

        <h2 class="text-3xl font-bold text-slate-900 mt-3">
          {{ value }}
        </h2>

        <div class="flex items-center gap-2 mt-4">

          <span
            class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
            +12%
          </span>

          <span class="text-xs text-slate-400">
            vs last month
          </span>

        </div>

      </div>

      <div
        v-if="icon"
        class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">

        {{ icon }}

      </div>

    </div>

  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: String
})
</script>