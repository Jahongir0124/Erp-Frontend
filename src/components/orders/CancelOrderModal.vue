```vue
<template>

    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >

        <div
            class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >

            <!-- Header -->
            <div
                class="flex items-center justify-between px-6 py-4 border-b border-slate-200"
            >

                <div>
                    <h2 class="text-xl font-bold text-slate-900">
                        Cancel Confirmed Order
                    </h2>

                    <p class="text-sm text-slate-500 mt-1">
                        Please provide a reason for cancelling this order.
                    </p>
                </div>

                <button
                    @click="$emit('close')"
                    class="w-10 h-10 rounded-lg hover:bg-slate-100 transition flex items-center justify-center"
                >
                    ✕
                </button>

            </div>

            <!-- Body -->
            <div class="p-6">

                <div class="space-y-2">

                    <label
                        class="block text-sm font-medium text-slate-700"
                    >
                        Cancellation Reason
                    </label>

                    <textarea
                        v-model="reason"
                        rows="6"
                        placeholder="Write detailed cancellation reason..."
                        class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                    ></textarea>

                    <div class="flex justify-between">

                        <p
                            v-if="error"
                            class="text-sm text-red-600"
                        >
                            {{ error }}
                        </p>

                        <p
                            class="text-xs text-slate-400 ml-auto"
                        >
                            {{ reason.length }}/1000
                        </p>

                    </div>

                </div>

            </div>

            <!-- Footer -->
            <div
                class="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50"
            >

                <button
                    @click="$emit('close')"
                    :disabled="loading"
                    class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition disabled:opacity-50 cursor-pointer"
                >
                    Close
                </button>

                <button
                    @click="submit"
                    :disabled="loading"
                    class="px-5 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow-sm disabled:opacity-50 cursor-pointer"
                >
                    <span v-if="loading">
                        Processing...
                    </span>

                    <span v-else>
                        Cancel Order
                    </span>
                </button>

            </div>

        </div>

    </div>

</template>

<script setup>

import { ref } from 'vue'
import api from '../../services/api'

const props = defineProps({
    orderId: {
        type: Number,
        required: true
    }
})

const emit = defineEmits([
    'close',
    'success'
])

const reason = ref('')
const error = ref('')
const loading = ref(false)

const submit = async () => {

    error.value = ''

    if (!reason.value.trim()) {

        error.value =
            'Cancellation reason is required'

        return
    }

    try {

        loading.value = true

        await api.patch(
            `/orders/${props.orderId}/confirmed/cancel`,
            {
                reason: reason.value
            }
        )

        emit('success')

    } catch (err) {

        error.value =
            err.response?.data?.message ||
            'Failed to cancel order'

    } finally {

        loading.value = false

    }
}

</script>
```
