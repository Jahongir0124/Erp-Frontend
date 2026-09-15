

<template>
  <AdminLayout />
</template>

<script setup>
import AdminLayout from './layouts/AdminLayout.vue'

import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()

onMounted(async () => {
    if (auth.token) {
        try {
            await auth.me()
        } catch (e) {
            console.error(e)
        }
    }
})
</script>