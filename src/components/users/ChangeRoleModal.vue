<template>
    <Transition
        appear
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            class="fixed inset-0 z-50 flex items-center justify-center p-4"
            @click.self="close"
        >

            <!-- Overlay -->
            <div
                class="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            ></div>


            <!-- Modal -->
            <Transition
                appear
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 translate-y-3"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 translate-y-3"
            >

                <div
                    class="relative w-full max-w-md
                           bg-white
                           rounded-2xl
                           shadow-2xl
                           border border-slate-200
                           overflow-hidden"
                    @click.stop
                >

                    <!-- Header -->
                    <div
                        class="flex items-start justify-between
                               px-6 py-5
                               border-b border-slate-200"
                    >

                        <div class="flex items-center gap-3">

                            <!-- Icon -->
                            <div
                                class="w-10 h-10 rounded-xl
                                       bg-purple-50
                                       text-purple-600
                                       flex items-center justify-center"
                            >
                                <svg
                                    class="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>


                            <div>

                                <h2 class="text-lg font-semibold text-slate-900">
                                    Change Role
                                </h2>

                                <p class="text-sm text-slate-500 mt-0.5">
                                    Update user role
                                </p>

                            </div>

                        </div>


                        <!-- Close -->
                        <button
                            type="button"
                            @click="close"
                            :disabled="loading"
                            class="w-9 h-9
                                   flex items-center justify-center
                                   rounded-lg
                                   text-slate-400
                                   hover:text-slate-700
                                   hover:bg-slate-100
                                   transition
                                   cursor-pointer
                                   disabled:opacity-40
                                   disabled:cursor-not-allowed"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                    </div>


                    <!-- Form -->
                    <form
                        @submit.prevent="submit"
                        class="px-6 py-6"
                    >

                        <div class="space-y-5">

                            <!-- User -->
                            <div
                                class="flex items-center gap-3
                                       p-3
                                       rounded-xl
                                       bg-slate-50
                                       border border-slate-100"
                            >

                                <div
                                    class="w-10 h-10
                                           rounded-full
                                           bg-slate-900
                                           text-white
                                           flex items-center justify-center
                                           font-semibold
                                           text-sm"
                                >
                                    {{ user.name?.charAt(0)?.toUpperCase() }}
                                </div>

                                <div>

                                    <p class="text-sm font-semibold text-slate-900">
                                        {{ user.name }}
                                    </p>

                                    <p class="text-xs text-slate-500">
                                        {{ user.email }}
                                    </p>

                                </div>

                            </div>


                            <!-- Role -->
                            <div>

                                <label
                                    class="block text-sm
                                           font-medium
                                           text-slate-700
                                           mb-2"
                                >
                                    Role
                                </label>

                                <select
                                    v-model="role"
                                    class="w-full px-3.5 py-2.5
                                           border border-slate-300
                                           rounded-xl
                                           text-sm
                                           text-slate-900
                                           bg-white
                                           focus:outline-none
                                           focus:ring-2
                                           focus:ring-purple-500/20
                                           focus:border-purple-500
                                           transition"
                                >

                                    <option
                                        v-for="item in roles"
                                        :key="item.id"
                                        :value="item.name"
                                    >
                                        {{ item.name }}
                                    </option>

                                </select>


                                <!-- Error -->
                                <p
                                    v-if="error"
                                    class="text-red-600
                                           text-xs
                                           mt-1.5"
                                >
                                    {{ error }}
                                </p>

                            </div>

                        </div>


                        <!-- Footer -->
                        <div
                            class="flex justify-end items-center
                                   gap-3
                                   pt-6 mt-6
                                   border-t border-slate-100"
                        >

                            <button
                                type="button"
                                @click="close"
                                :disabled="loading"
                                class="px-4 py-2.5
                                       rounded-xl
                                       border border-slate-300
                                       text-sm
                                       font-medium
                                       text-slate-700
                                       hover:bg-slate-50
                                       transition
                                       cursor-pointer
                                       disabled:opacity-50
                                       disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                :disabled="loading || !role"
                                class="inline-flex items-center
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
                                       disabled:cursor-not-allowed"
                            >

                                <svg
                                    v-if="loading"
                                    class="w-4 h-4 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    />

                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>

                                <span>
                                    {{ loading ? 'Updating...' : 'Change Role' }}
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


const props = defineProps({
    user: {
        type: Object,
        required: true
    },

    roles: {
        type: Array,
        default: () => []
    }
})


const emit = defineEmits([
    'close',
    'updated'
])


const role = ref(
    props.user.roles?.[0] || ''
)

const loading = ref(false)

const error = ref('')


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

        error.value = ''


        await api.patch(
            `/users/${props.user.id}/role`,
            {
                role: role.value
            }
        )


        emit('updated')

        emit('close')


    } catch (err) {

        if (err.response?.status === 422) {

            error.value =
                err.response.data.errors?.role?.[0]
                || 'Invalid role'

        } else {

            console.error(err)

            error.value =
                'Something went wrong'

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