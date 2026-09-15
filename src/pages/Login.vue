
<template>

    <div class="min-h-screen flex items-center justify-center bg-slate-100">

        <div class="bg-white w-full max-w-md rounded-3xl p-8 shadow-lg">

            <h1 class="text-3xl font-bold mb-2">
                ERP Login
            </h1>

            <p class="text-slate-500 mb-8">
                Sign in to continue
            </p>


            <!-- General Error -->

            <div
                v-if="errorMessage"
                class="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
            >
                {{ errorMessage }}
            </div>


            <form @submit.prevent="submit">

                <!-- Email -->

                <div class="mb-4">

                    <label class="block">
                        Email
                    </label>

                    <input
                        v-model="form.email"
                        type="email"
                        class="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="{
                            'border-red-500': errors.email
                        }"
                    >

                    <p
                        v-if="errors.email"
                        class="text-red-500 text-sm mt-1"
                    >
                        {{ errors.email }}
                    </p>

                </div>


                <!-- Password -->

                <div class="mb-6">

                    <label class="block">
                        Password
                    </label>

                    <input
                        v-model="form.password"
                        type="password"
                        class="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="{
                            'border-red-500': errors.password
                        }"
                    >

                    <p
                        v-if="errors.password"
                        class="text-red-500 text-sm mt-1"
                    >
                        {{ errors.password }}
                    </p>

                </div>


                <!-- Login Button -->

                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
                >
                    {{ loading ? 'Signing in...' : 'Login' }}
                </button>

            </form>

        </div>

    </div>

</template>


<script setup>

import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()


const form = reactive({
    email: '',
    password: ''
})


const errors = reactive({
    email: '',
    password: ''
})


const errorMessage = ref('')
const loading = ref(false)


const submit = async () => {

    errors.email = ''
    errors.password = ''
    errorMessage.value = ''

    try {

        loading.value = true

        await auth.login(form)

        router.push('/dashboard')

    } catch (error) {

        console.error(error)

        if (error.response?.status === 422) {

            const validationErrors = error.response.data.errors

            errors.email =
                validationErrors?.email?.[0] || ''

            errors.password =
                validationErrors?.password?.[0] || ''

        } else if (error.response?.status === 401) {

            errorMessage.value =
                error.response.data.message || 'Email yoki parol noto‘g‘ri'

        } else {

            errorMessage.value =
                'Server bilan bog‘lanishda xatolik yuz berdi'

        }

    } finally {

        loading.value = false

    }

}

</script>

