<template>

<div class="flex">

    <Sidebar/>

    <div class="ml-64 flex-1">

        <Navbar/>

        <main class="p-8">

            <router-view/>

        </main>

    </div>

</div>

</template>

<script setup>

import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'

</script>