<template>
  <aside class="w-64 h-screen bg-slate-950 text-slate-300 fixed border-r border-slate-800">

    <div class="h-16 flex items-center px-6 border-b border-slate-800">
      <h1 class="text-xl font-bold text-white">
        ERP System
      </h1>
    </div>

    <nav class="p-4 space-y-2">

      <router-link
        to="/dashboard"
        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900 transition"
        active-class="bg-blue-600 text-white">

        Dashboard
      </router-link>

      <router-link
        to="/users"
        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900 transition"
        active-class="bg-blue-600 text-white">

        Users
      </router-link>

      <router-link
        to="/products"
        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900 transition"
        active-class="bg-blue-600 text-white">

        Products
      </router-link>

      <router-link
        to="/orders"
        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900 transition"
        active-class="bg-blue-600 text-white">

        Orders
      </router-link>
       <router-link
        to="/inventories"
        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900 transition"
        active-class="bg-blue-600 text-white">

        Inventories
      </router-link>

    </nav>

  </aside>
</template>