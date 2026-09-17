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
            <!-- Backdrop -->
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
                    class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
                    @click.stop
                >

                    <!-- Header -->
                    <div
                        class="flex items-center justify-between px-6 py-5 border-b border-slate-100"
                    >
                        <div class="flex items-center gap-3">

                            <!-- Icon -->
                            <div
                                class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h2
                                    class="text-lg font-semibold text-slate-900"
                                >
                                    Change Status
                                </h2>

                                <p class="text-sm text-slate-500">
                                    Update user account status
                                </p>
                            </div>

                        </div>

                        <!-- Close -->
                        <button
                            type="button"
                            @click="close"
                            :disabled="loading"
                            class="w-9 h-9 rounded-lg flex items-center justify-center
                                   text-slate-400
                                   hover:text-slate-700
                                   hover:bg-slate-100
                                   transition-colors
                                   cursor-pointer
                                   disabled:opacity-50
                                   disabled:cursor-not-allowed"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                    </div>

                    <!-- User Info -->
                    <div class="px-6 pt-5">

                        <div
                            class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                        >
                            <div
                                class="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold"
                            >
                                {{ props.user.name?.charAt(0)?.toUpperCase() }}
                            </div>

                            <div class="min-w-0">
                                <p
                                    class="font-medium text-slate-900 truncate"
                                >
                                    {{ props.user.name }}
                                </p>

                                <p
                                    class="text-sm text-slate-500 truncate"
                                >
                                    {{ props.user.email }}
                                </p>
                            </div>
                        </div>

                    </div>

                    <!-- Form -->
                    <form
                        @submit.prevent="submit"
                        class="p-6 space-y-5"
                    >

                        <!-- Status -->
                        <div>

                            <label
                                class="block text-sm font-medium text-slate-700 mb-1.5"
                            >
                                Status
                            </label>

                            <select
                                v-model="status"
                                class="w-full px-3.5 py-2.5
                                       border border-slate-300
                                       rounded-xl
                                       text-sm
                                       text-slate-900
                                       outline-none
                                       transition
                                       focus:border-blue-500
                                       focus:ring-2
                                       focus:ring-blue-500/20
                                       cursor-pointer"
                            >
                                <option value="active">
                                    Active
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>

                                <option value="blocked">
                                    Blocked
                                </option>
                            </select>

                            <p
                                v-if="error"
                                class="text-red-500 text-sm mt-1.5"
                            >
                                {{ error }}
                            </p>

                        </div>

                    </form>

                    <!-- Footer -->
                    <div
                        class="flex items-center justify-end gap-3 px-6 py-4
                               border-t border-slate-100 bg-slate-50/50"
                    >

                        <button
                            type="button"
                            @click="close"
                            :disabled="loading"
                            class="px-4 py-2.5
                                   text-sm font-medium
                                   text-slate-700
                                   border border-slate-300
                                   rounded-xl
                                   hover:bg-white
                                   transition-colors
                                   cursor-pointer
                                   disabled:opacity-50
                                   disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            @click="submit"
                            :disabled="loading"
                            class="px-5 py-2.5
                                   text-sm font-medium
                                   bg-blue-600
                                   text-white
                                   rounded-xl
                                   hover:bg-blue-700
                                   transition-colors
                                   cursor-pointer
                                   disabled:opacity-50
                                   disabled:cursor-not-allowed
                                   flex items-center gap-2"
                        >

                            <svg
                                v-if="loading"
                                class="w-4 h-4 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
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
                                ></circle>

                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>

                            {{ loading ? 'Updating...' : 'Change Status' }}

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

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const emit = defineEmits([
    'close',
    'updated'
])

const status = ref(
    props.user.status || 'active'
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
            `/users/${props.user.id}/status`,
            {
                status: status.value
            }
        )

        emit('updated')
        emit('close')

    } catch (err) {

        if (err.response?.status === 422) {

            error.value =
                err.response.data.errors?.status?.[0]
                || 'Invalid status'

        } else {

            console.error(err)

            error.value = 'Something went wrong'
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