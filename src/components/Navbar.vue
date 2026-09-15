<script setup>
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()


</script>
<template>
 <header
  class="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

  <div>
    <h1 class="text-2xl font-bold text-slate-800">
      ERP Dashboard
    </h1>

    <p class="text-sm text-slate-500">
      Welcome back,
      <span class="font-semibold text-slate-700">
        {{ auth.user?.name }}
      </span>
    </p>
  </div>

  <div class="flex items-center gap-4">

    <button
      class="relative p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer">

      🔔

      <span
        class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
        3
      </span>

    </button>

    <div class="text-right">

      <div class="font-medium">
        {{ auth.user?.name }}
      </div>

      <div
        class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 inline-block">

        {{ auth.roles?.[0] }}

      </div>

    </div>

    <div
      class="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold">

      {{ auth.user?.name?.charAt(0).toUpperCase() }}

    </div>

  </div>

</header>
</template>

