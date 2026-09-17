<template>
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">

        <div v-if="true" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="close">

            <!-- Overlay -->
            <div class="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"></div>


            <!-- Modal -->
            <Transition appear enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 translate-y-3" enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 translate-y-3">

                <div class="relative w-full max-w-lg
                           bg-white
                           rounded-2xl
                           shadow-2xl
                           border border-slate-200
                           overflow-hidden" @click.stop>

                    <!-- Header -->
                    <div class="flex items-start justify-between
                               px-6 py-5
                               border-b border-slate-200">

                        <div class="flex items-center gap-3">

                            <!-- Icon -->
                            <div class="w-10 h-10 rounded-xl
                                       bg-blue-50
                                       text-blue-600
                                       flex items-center justify-center">

                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM5 20a7 7 0 0114 0" />
                                </svg>

                            </div>


                            <div>

                                <h2 class="text-lg font-semibold text-slate-900">
                                    Create User
                                </h2>

                                <p class="text-sm text-slate-500 mt-0.5">
                                    Add a new system user
                                </p>

                            </div>

                        </div>


                        <!-- Close -->
                        <button type="button" @click="close" :disabled="loading" class="w-9 h-9
                                   flex items-center justify-center
                                   rounded-lg
                                   text-slate-400
                                   hover:text-slate-700
                                   hover:bg-slate-100
                                   transition
                                   cursor-pointer
                                   disabled:opacity-40
                                   disabled:cursor-not-allowed">

                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>

                        </button>

                    </div>


                    <!-- Form -->
                    <form @submit.prevent="submit" class="px-6 py-6">

                        <div class="space-y-5">


                            <!-- Name -->
                            <div>

                                <label class="block text-sm
                                           font-medium
                                           text-slate-700
                                           mb-2">
                                    Name
                                </label>

                                <input v-model="form.name" type="text" placeholder="Enter user name" class="w-full px-3.5 py-2.5
                                           border border-slate-300
                                           rounded-xl
                                           text-sm
                                           text-slate-900
                                           placeholder:text-slate-400
                                           focus:outline-none
                                           focus:ring-2
                                           focus:ring-blue-500/20
                                           focus:border-blue-500
                                           transition">

                                <p v-if="errors.name" class="flex items-center gap-1
                                           text-red-600
                                           text-xs
                                           mt-1.5">
                                    {{ errors.name[0] }}
                                </p>

                            </div>


                            <!-- Email -->
                            <div>

                                <label class="block text-sm
                                           font-medium
                                           text-slate-700
                                           mb-2">
                                    Email
                                </label>

                                <input v-model="form.email" type="email" placeholder="user@example.com" class="w-full px-3.5 py-2.5
                                           border border-slate-300
                                           rounded-xl
                                           text-sm
                                           text-slate-900
                                           placeholder:text-slate-400
                                           focus:outline-none
                                           focus:ring-2
                                           focus:ring-blue-500/20
                                           focus:border-blue-500
                                           transition">

                                <p v-if="errors.email" class="text-red-600 text-xs mt-1.5">
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


                            <!-- Role -->
                            <div>

                                <label class="block text-sm
                                           font-medium
                                           text-slate-700
                                           mb-2">
                                    Role
                                </label>

                                <select v-model="form.role" class="w-full px-3.5 py-2.5
                                           border border-slate-300
                                           rounded-xl
                                           text-sm
                                           text-slate-900
                                           bg-white
                                           focus:outline-none
                                           focus:ring-2
                                           focus:ring-blue-500/20
                                           focus:border-blue-500
                                           transition">

                                    <option value="" disabled>
                                        Select role
                                    </option>

                                    <option v-for="role in roles" :key="role.id" :value="role.name">
                                        {{ role.name }}
                                    </option>

                                </select>

                                <p v-if="errors.role" class="text-red-600 text-xs mt-1.5">
                                    {{ errors.role[0] }}
                                </p>

                            </div>

                        </div>


                        <!-- Footer -->
                        <div class="flex justify-end items-center
                                   gap-3
                                   pt-6 mt-6
                                   border-t border-slate-100">

                            <button type="button" @click="close" :disabled="loading" class="px-4 py-2.5
                                       rounded-xl
                                       border border-slate-300
                                       text-sm
                                       font-medium
                                       text-slate-700
                                       hover:bg-slate-50
                                       transition
                                       cursor-pointer
                                       disabled:opacity-50
                                       disabled:cursor-not-allowed">
                                Cancel
                            </button>


                            <button type="submit" :disabled="loading" class="inline-flex items-center
                                       justify-center
                                       gap-2
                                       min-w-32
                                       px-4 py-2.5
                                       rounded-xl
                                       bg-slate-900
                                       text-white
                                       text-sm
                                       font-medium
                                       hover:bg-slate-800
                                       active:bg-slate-950
                                       transition
                                       cursor-pointer
                                       disabled:opacity-60
                                       disabled:cursor-not-allowed">

                                <!-- Loading spinner -->
                                <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4" />

                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                </svg>


                                <span>
                                    {{ loading ? 'Creating...' : 'Create User' }}
                                </span>

                            </button>

                        </div>

                    </form>

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


defineProps({
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

const showPassword = ref(false)
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


        const response = await api.post(
            '/users',
            form.value
        )


        emit(
            'created',
            response.data
        )

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

    window.addEventListener(
        'keydown',
        handleEscape
    )

})


onUnmounted(() => {

    window.removeEventListener(
        'keydown',
        handleEscape
    )

})

</script>