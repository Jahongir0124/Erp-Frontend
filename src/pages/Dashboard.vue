<template>
  <div class="space-y-8">

    <!-- Welcome -->

    <div
      class="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white">

      <h1 class="text-3xl font-bold">
        Welcome back, {{ auth.user.name }} 👋
      </h1>

      <p class="text-slate-300 mt-2">
        Here's what's happening with your ERP today.
      </p>

    </div>

    <!-- Stats -->

    <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      <StatCard
        title="Users"
        value="125"
      />

      <StatCard
        title="Products"
        value="854"
      />

      <StatCard
        title="Categories"
        value="24"
      />

      <StatCard
        title="Revenue"
        value="$12,450"
      />

    </div>

    <!-- Analytics -->

    <div class="grid lg:grid-cols-3 gap-6">

      <div
        class="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6">

        <div class="flex justify-between items-center mb-6">

          <h3 class="text-lg font-semibold">
            Sales Analytics
          </h3>

          <button
            class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200">
            This Month
          </button>

        </div>

        <div
          class="h-80 flex items-center justify-center text-slate-400">

          Chart Coming Soon

        </div>

      </div>

      <!-- Activity -->

      <div
        class="bg-white rounded-3xl border border-slate-200 p-6">

        <h3 class="text-lg font-semibold mb-6">
          Recent Activity
        </h3>

        <div class="space-y-5">

          <div class="flex gap-3">

            <div
              class="w-3 h-3 rounded-full bg-green-500 mt-2">
            </div>

            <div>
              <p class="font-medium">
                User created
              </p>

              <p class="text-sm text-slate-500">
                2 minutes ago
              </p>
            </div>

          </div>

          <div class="flex gap-3">

            <div
              class="w-3 h-3 rounded-full bg-yellow-500 mt-2">
            </div>

            <div>
              <p class="font-medium">
                Product updated
              </p>

              <p class="text-sm text-slate-500">
                15 minutes ago
              </p>
            </div>

          </div>

          <div class="flex gap-3">

            <div
              class="w-3 h-3 rounded-full bg-blue-500 mt-2">
            </div>

            <div>
              <p class="font-medium">
                Category added
              </p>

              <p class="text-sm text-slate-500">
                1 hour ago
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import StatCard from '../components/StatCard.vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
</script>