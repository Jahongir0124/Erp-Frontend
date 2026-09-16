<template>

    <div class="space-y-6">

        <!-- Header -->
        <div class="flex items-center justify-between">

            <div>

                <div class="flex items-center gap-3">

                    <button @click="$router.back()"
                        class="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 cursor-pointer">
                        ← Back
                    </button>

                    <h1 class="text-3xl font-bold text-slate-900">
                        Order Details
                    </h1>

                </div>

                <p class="text-slate-500 mt-2">
                    View order information and products
                </p>

            </div>

        </div>


        <!-- Loading -->
        <div v-if="loading" class="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            Loading order...
        </div>


        <!-- Error -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-red-600">
            {{ error }}
        </div>


        <!-- Order -->
        <div v-else-if="order" class="space-y-6">

            <!-- Order information -->
            <div class="bg-white rounded-xl border border-slate-200 p-6">

                <div class="flex justify-between items-start mb-6">

                    <div>

                        <p class="text-sm text-slate-500">
                            Order Number
                        </p>

                        <h2 class="text-2xl font-bold text-slate-900 mt-1">
                            {{ order.order_number }}
                        </h2>

                    </div>


                    <!-- Status -->
                    <span :class="statusClass(order.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                        {{ order.status }}
                    </span>

                </div>


                <div class="grid grid-cols-1 md:grid-cols-5 gap-6">

                    <!-- Customer -->
                    <div>

                        <p class="font-medium text-slate-900 mt-1">
                            Customer
                        </p>

                        <p class="text-sm text-slate-500">
                            {{ order.customer?.name || '-' }}
                        </p>

                    </div>


                    <!-- Seller -->
                    <div>

                        <p class="font-medium text-slate-900 mt-1 ">
                            Created
                        </p>

                        <p class="text-sm text-slate-500">
                            {{ order.created_by?.name || '-' }}
                        </p>
                         <p class="text-sm text-slate-500">
                            {{ order.created_at || '-' }}
                        </p>

                    </div>


                    <!-- Date -->
              

                    <div v-if="order.confirmed_at">
                        <p class="font-medium text-slate-900 mt-1 ">
                            Confirmed
                        </p>

                        <p class="text-sm text-slate-500">
                            {{ order.confirmed_by || '-' }}
                        </p>
                        <p class="text-sm text-slate-500">
                            {{ order.confirmed_at }}
                        </p>
                       

                         
                    </div>

                    <div v-if="order.completed_at">
                        <p class="font-medium text-slate-900 mt-1 ">
                            Completed
                        </p>
                         <p class="text-sm text-slate-500">
                            {{ order.completed_by }}
                        </p>
                        <p class="text-sm text-slate-500">
                            {{ order.completed_at }}
                        </p>
                    </div>

                    <div v-if="order.cancelled_at">
                        <p class="font-medium text-slate-900 mt-1">
                            Cancelled
                        </p>
                         <p class="text-sm text-slate-500">
                            {{ order.cancelled_by }}
                        </p>
                        <p class="text-sm text-slate-500">
                            {{ order.cancelled_at }}
                        </p>
                    </div>
                </div>

            </div>


            <!-- Order Items -->
            <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">

                <div class="px-6 py-5 border-b border-slate-200">

                    <h2 class="text-lg font-semibold text-slate-900">
                        Order Items
                    </h2>

                </div>


                <table class="w-full">

                    <thead class="bg-slate-50 border-b border-slate-200">

                        <tr>

                            <th class="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                Product
                            </th>

                            <th class="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                SKU
                            </th>

                            <th class="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                Quantity
                            </th>

                            <th class="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                                Price
                            </th>

                            <th class="text-right px-6 py-4 text-sm font-semibold text-slate-600">
                                Subtotal
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        <tr v-for="item in order.items" :key="item.id" class="border-b border-slate-100">

                            <!-- Product -->
                            <td class="px-6 py-4">

                                <p class="font-medium text-slate-900">
                                    {{ item.product?.name || '-' }}
                                </p>

                            </td>


                            <!-- SKU -->
                            <td class="px-6 py-4 text-slate-600">

                                {{ item.product?.sku || '-' }}

                            </td>


                            <!-- Quantity -->
                            <td class="px-6 py-4 text-slate-700">

                                {{ item.quantity }}

                            </td>


                            <!-- Price -->
                            <td class="px-6 py-4 text-slate-700">

                                {{ item.price }}

                            </td>


                            <!-- Subtotal -->
                            <td class="px-6 py-4 text-right font-medium text-slate-900">

                                {{ item.subtotal }}

                            </td>

                        </tr>


                        <!-- Empty items -->
                        <tr v-if="!order.items || order.items.length === 0">

                            <td colspan="5" class="px-6 py-10 text-center text-slate-500">
                                No items in this order
                            </td>

                        </tr>

                    </tbody>

                </table>


                <!-- Total -->
                <div class="flex justify-end px-6 py-5 border-t border-slate-200">

                    <div class="text-right">

                        <p class="text-sm text-slate-500">
                            Total Amount
                        </p>

                        <p class="text-2xl font-bold text-slate-900 mt-1">
                            {{ order.total_amount }}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>


<script setup>

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../../services/api'


const route = useRoute()


const order = ref(null)

const loading = ref(false)

const error = ref('')


const getOrder = async () => {

    try {

        loading.value = true

        error.value = ''

        const response = await api.get(
            `/orders/${route.params.id}`
        )

        order.value = response.data.data

    } catch (err) {

        console.error(err)

        error.value =
            err.response?.data?.message ||
            'Failed to load order'

    } finally {

        loading.value = false

    }

}


const statusClass = (status) => {

    switch (status) {

        case 'pending':
            return 'bg-yellow-100 text-yellow-700'

        case 'confirmed':
            return 'bg-blue-100 text-blue-700'

        case 'completed':
            return 'bg-green-100 text-green-700'

        case 'cancelled':
            return 'bg-red-100 text-red-700'

        default:
            return 'bg-slate-100 text-slate-700'

    }

}


onMounted(() => {

    getOrder()

})

</script>
