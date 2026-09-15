<template>
    <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click.self="close"
    >
        <div class="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

            <!-- Header -->
            <div class="flex justify-between items-center mb-6">

                <div>
                    <h2 class="text-2xl font-bold">
                        Change Role
                    </h2>

                    <p class="text-slate-500 text-sm">
                        Change role for {{ user.name }}
                    </p>
                </div>

                <button
                    type="button"
                    @click="close"
                    class="text-slate-400 hover:text-slate-700 text-2xl cursor-pointer"
                >
                    ×
                </button>

            </div>

            <!-- Form -->
            <form
                @submit.prevent="submit"
                class="space-y-5"
            >

                <!-- Current role -->
                <div>
                    <label class="block text-sm font-medium mb-1">
                        Role
                    </label>

                    <select
                        v-model="role"
                        class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option
                            v-for="item in roles"
                            :key="item.id"
                            :value="item.name"
                        >
                            {{ item.name }}
                        </option>
                    </select>

                    <p
                        v-if="error"
                        class="text-red-500 text-sm mt-1"
                    >
                        {{ error }}
                    </p>
                </div>

                <!-- Actions -->
                <div class="flex justify-end gap-3 pt-2">

                    <button
                        type="button"
                        @click="close"
                        class="px-4 py-2 border rounded-xl hover:bg-slate-50 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        :disabled="loading"
                        class="px-5 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
                    >
                        {{ loading ? 'Updating...' : 'Change Role' }}
                    </button>

                </div>

            </form>

        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
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

            error.value = 'Something went wrong'

        }

    } finally {

        loading.value = false

    }
}

</script>