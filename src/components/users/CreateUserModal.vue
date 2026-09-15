<template>
    <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click.self="close"
    >
        <div class="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">

            <!-- Header -->
            <div class="flex justify-between items-center mb-6">

                <div>
                    <h2 class="text-2xl font-bold">
                        Create User
                    </h2>

                    <p class="text-slate-500 text-sm">
                        Add a new system user
                    </p>
                </div>

                <button
                    @click="close"
                    class="text-slate-400 hover:text-slate-700 text-2xl"
                >
                    ×
                </button>

            </div>

            <!-- Form -->
            <form
                @submit.prevent="submit"
                class="space-y-4"
            >

                <!-- Name -->
                <div>
                    <label class="block text-sm font-medium mb-1">
                        Name
                    </label>

                    <input
                        v-model="form.name"
                        type="text"
                        class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                    >

                    <p
                        v-if="errors.name"
                        class="text-red-500 text-sm mt-1"
                    >
                        {{ errors.name[0] }}
                    </p>
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-sm font-medium mb-1">
                        Email
                    </label>

                    <input
                        v-model="form.email"
                        type="email"
                        class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email"
                    >

                    <p
                        v-if="errors.email"
                        class="text-red-500 text-sm mt-1"
                    >
                        {{ errors.email[0] }}
                    </p>
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-sm font-medium mb-1">
                        Password
                    </label>

                    <input
                        v-model="form.password"
                        type="password"
                        class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Minimum 8 characters"
                    >

                    <p
                        v-if="errors.password"
                        class="text-red-500 text-sm mt-1"
                    >
                        {{ errors.password[0] }}
                    </p>
                </div>

                <!-- Role -->
                <div>
                    <label class="block text-sm font-medium mb-1">
                        Role
                    </label>

                    <select
                        v-model="form.role"
                        class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>
                            Select role
                        </option>

                        <option
                            v-for="role in roles"
                            :key="role.id"
                            :value="role.name"
                        >
                            {{ role.name }}
                        </option>

                    </select>

                    <p
                        v-if="errors.role"
                        class="text-red-500 text-sm mt-1"
                    >
                        {{ errors.role[0] }}
                    </p>
                </div>

                <!-- Actions -->
                <div class="flex justify-end gap-3 pt-4">

                    <button
                        type="button"
                        @click="close"
                        class="px-4 py-2 border rounded-xl hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        :disabled="loading"
                        class="px-5 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50"
                    >
                        {{ loading ? 'Creating...' : 'Create User' }}
                    </button>

                </div>

            </form>

        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import api from '../../services/api'

const emit = defineEmits([
    'close',
    'created'
])

const props = defineProps({
    roles: {
        type: Array,
        default: () => []
    }
})

const form = ref({
    name: '',
    email: '',
    password: '',
    role: ''
})

const errors = ref({})
const loading = ref(false)

const close = () => {

    if (loading.value) {
        return
    }

    emit('close')
}

const submit = async () => {

    try {

        loading.value = true
        errors.value = {}

        const response = await api.post(
            '/users',
            form.value
        )

        emit('created', response.data)

        emit('close')

    } catch (error) {

        if (error.response?.status === 422) {

            errors.value = error.response.data.errors

        } else {

            console.error(error)

        }

    } finally {

        loading.value = false

    }
}

</script>