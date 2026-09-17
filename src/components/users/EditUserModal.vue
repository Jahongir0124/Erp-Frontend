<template>
    <Transition appear enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="close">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"></div>

            <!-- Modal -->
            <Transition appear enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 translate-y-3" enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 translate-y-3">
                <div class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
                    @click.stop>

                    <!-- Header -->
                    <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                        <div class="flex items-center gap-3">

                            <!-- Icon -->
                            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 7.125L16.875 4.5" />
                                </svg>
                            </div>

                            <div>
                                <h2 class="text-lg font-semibold text-slate-900">
                                    Edit User
                                </h2>

                                <p class="text-sm text-slate-500">
                                    Update user information
                                </p>
                            </div>

                        </div>

                        <!-- Close -->
                        <button type="button" @click="close" :disabled="loading" class="w-9 h-9 rounded-lg flex items-center justify-center
                                   text-slate-400
                                   hover:text-slate-700
                                   hover:bg-slate-100
                                   transition-colors
                                   cursor-pointer
                                   disabled:opacity-50
                                   disabled:cursor-not-allowed">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- User Info -->
                    <div class="px-6 pt-5">
                        <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div
                                class="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                                {{ props.user.name?.charAt(0)?.toUpperCase() }}
                            </div>

                            <div class="min-w-0">
                                <p class="font-medium text-slate-900 truncate">
                                    {{ props.user.name }}
                                </p>

                                <p class="text-sm text-slate-500 truncate">
                                    {{ props.user.email }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Form -->
                    <form @submit.prevent="submit" class="p-6 space-y-5">

                        <!-- Name -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1.5">
                                Name
                            </label>

                            <input v-model="form.name" type="text" placeholder="Enter name" class="w-full px-3.5 py-2.5
                                       border border-slate-300
                                       rounded-xl
                                       text-sm
                                       text-slate-900
                                       placeholder:text-slate-400
                                       outline-none
                                       transition
                                       focus:border-blue-500
                                       focus:ring-2
                                       focus:ring-blue-500/20">

                            <p v-if="errors.name" class="text-red-500 text-sm mt-1.5">
                                {{ errors.name[0] }}
                            </p>
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1.5">
                                Email
                            </label>

                            <input v-model="form.email" type="email" placeholder="Enter email" class="w-full px-3.5 py-2.5
                                       border border-slate-300
                                       rounded-xl
                                       text-sm
                                       text-slate-900
                                       placeholder:text-slate-400
                                       outline-none
                                       transition
                                       focus:border-blue-500
                                       focus:ring-2
                                       focus:ring-blue-500/20">

                            <p v-if="errors.email" class="text-red-500 text-sm mt-1.5">
                                {{ errors.email[0] }}
                            </p>
                        </div>

                        <!-- Password -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1.5">
                                Password
                            </label>

                            <div class="relative">
                                <input v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                    placeholder="Minimum 8 characters" class="w-full px-3.5 py-2.5 pr-11
                   border border-slate-300
                   rounded-xl
                   text-sm
                   text-slate-900
                   placeholder:text-slate-400
                   outline-none
                   transition
                   focus:border-blue-500
                   focus:ring-2
                   focus:ring-blue-500/20">

                                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2
                   text-slate-400
                   hover:text-slate-600
                   transition-colors
                   cursor-pointer">
                                    <!-- Show -->
                                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                    <!-- Hide -->
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M10.584 10.587a2 2 0 002.829 2.829" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M9.88 5.09A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.01 10.01 0 01-4.132 5.411" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M6.228 6.228A10.05 10.05 0 002.458 12a10.05 10.05 0 003.77 5.772A9.953 9.953 0 0012 19c1.61 0 3.13-.38 4.47-1.054" />
                                    </svg>
                                </button>
                            </div>

                            <p v-if="errors.password" class="text-red-500 text-sm mt-1.5">
                                {{ errors.password[0] }}
                            </p>
                        </div>

                    </form>

                    <!-- Footer -->
                    <div class="flex items-center justify-end gap-3 px-6 py-4
                               border-t border-slate-100 bg-slate-50/50">
                        <button type="button" @click="close" :disabled="loading" class="px-4 py-2.5
                                   text-sm font-medium
                                   text-slate-700
                                   border border-slate-300
                                   rounded-xl
                                   hover:bg-white
                                   transition-colors
                                   cursor-pointer
                                   disabled:opacity-50
                                   disabled:cursor-not-allowed">
                            Cancel
                        </button>

                        <button type="button" @click="submit" :disabled="loading" class="px-5 py-2.5
                                   text-sm font-medium
                                   bg-blue-600
                                   text-white
                                   rounded-xl
                                   hover:bg-blue-700
                                   transition-colors
                                   cursor-pointer
                                   disabled:opacity-50
                                   disabled:cursor-not-allowed
                                   flex items-center gap-2">
                            <svg v-if="loading" class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>

                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                                </path>
                            </svg>

                            {{ loading ? 'Updating...' : 'Update User' }}
                        </button>
                    </div>

                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue'
import api from '../../services/api'

const emit = defineEmits([
    'close',
    'created'
])

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})
const showPassword = ref(false)
const form = ref({
    name: props.user.name,
    email: props.user.email,
    password: ''
})

const errors = ref({})
const loading = ref(false)

const close = () => {

    if (loading.value) {
        return
    }

    emit('close')
}

const handleEscape = (event) => {

    if (event.key === 'Escape') {
        close()
    }

}

const submit = async () => {

    try {

        loading.value = true
        errors.value = {}

        const payload = {
            name: form.value.name,
            email: form.value.email
        }

        if (form.value.password) {
            payload.password = form.value.password
        }

        const response = await api.put(
            `/users/${props.user.id}`,
            payload
        )

        emit('created', response.data)

        emit('close')

    } catch (error) {

        if (error.response?.status === 422) {

            errors.value =
                error.response.data.errors || {}

        } else {

            console.error(error)

        }

    } finally {

        loading.value = false

    }

}

onMounted(() => {
    window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
})

</script>