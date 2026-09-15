<template>

    <div class="space-y-6">

        <!-- Header -->
        <div class="flex justify-between items-center">

            <div>
                <h1 class="text-3xl font-bold text-slate-900">
                    Orders
                </h1>

                <p class="text-slate-500 mt-1">
                    Manage customer orders
                </p>
            </div>
            <button @click="showCreateModal = true"
                class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                Create Order
            </button>

        </div>


        <!-- Orders Table -->
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">

            <table class="w-full">

                <thead class="bg-slate-50 border-b border-slate-200">

                    <tr>

                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                            Order
                        </th>

                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                            Customer
                        </th>

                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                            Seller
                        </th>

                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                            Status
                        </th>

                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                            Total
                        </th>

                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                            Date
                        </th>
                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody>

                    <!-- Loading -->
                    <tr v-if="loading">

                        <td colspan="7" class="px-6 py-12 text-center text-slate-500">
                            Loading orders...
                        </td>

                    </tr>


                    <!-- Error -->
                    <tr v-else-if="error">

                        <td colspan="7" class="px-6 py-12 text-center text-red-500">
                            {{ error }}
                        </td>

                    </tr>


                    <!-- Empty -->
                    <tr v-else-if="orders.length === 0">

                        <td colspan="7" class="px-6 py-12 text-center text-slate-500">
                            No orders yet
                        </td>

                    </tr>


                    <!-- Orders -->
                    <tr v-else v-for="order in orders" :key="order.id"
                        class="border-b border-slate-100 hover:bg-slate-50">

                        <!-- Order number -->
                        <td class="px-6 py-4">

                            <span class="font-medium text-slate-900">
                                {{ order.order_number }}
                            </span>

                        </td>


                        <!-- Customer -->
                        <td class="px-6 py-4 text-slate-700">

                            {{ order.customer?.name || '-' }}

                        </td>


                        <!-- Seller -->
                        <td class="px-6 py-4 text-slate-700">

                            {{ order.created_by?.name || '-' }}

                        </td>


                        <!-- Status -->
                        <td class="px-6 py-4">

                            <span class="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                {{ order.status }}
                            </span>

                        </td>


                        <!-- Total -->
                        <td class="px-6 py-4 font-medium text-slate-900">

                            {{ order.total_amount }}

                        </td>


                        <!-- Date -->
                        <td class="px-6 py-4 text-slate-500">

                            {{ order.created_at }}

                        </td>
                        <td class="px-6 py-4">

                            <button @click="$router.push(`/orders/${order.id}`)"
                                class="px-3 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50 cursor-pointer">
                                View
                            </button>

                            <button v-if="order.status === 'pending'" @click="editOrderId = order.id"
                                class="px-3 py-2 text-sm rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50 cursor-pointer">
                                Edit
                            </button>

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

    <CreateOrderModal v-if="showCreateModal" @close="showCreateModal = false" @created="getOrders" />
    <EditOrderModal
        v-if="editOrderId"
        :order-id="editOrderId"
        @close="editOrderId = null"
        @updated="handleOrderUpdated"
    />
</template>


<script setup>

import { ref, onMounted } from 'vue'
import api from '../../services/api'
import CreateOrderModal from './CreateOrderModal.vue'
import EditOrderModal from '../../components/orders/EditOrderModal.vue'




const orders = ref([])
const editOrderId = ref(null)
const loading = ref(false)

const error = ref('')
const showCreateModal = ref(false)
const handleOrderUpdated = () => {

    editOrderId.value = null

    getOrders()

}
const getOrders = async () => {

    try {

        loading.value = true

        error.value = ''

        const response = await api.get('/orders')

        orders.value = response.data.data

    } catch (err) {

        console.error(err)

        error.value =
            err.response?.data?.message ||
            'Failed to load orders'

    } finally {

        loading.value = false

    }

}


onMounted(() => {

    getOrders()

})

</script>
