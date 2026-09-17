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
        <div class="flex gap-4 mb-6">

            <!-- Search -->
            <input v-model="search" @input="handleSearch" type="text" placeholder="Search order..."
                class="border border-slate-300 rounded-lg px-4 py-2 w-80">

            <!-- Status -->
            <select v-model="status" @change="handleFilter" class="border border-slate-300 rounded-lg px-4 py-2">

                <option value="">
                    All Status
                </option>

                <option value="pending">
                    Pending
                </option>

                <option value="confirmed">
                    Confirmed
                </option>

                <option value="completed">
                    Completed
                </option>

                <option value="cancelled">
                    Cancelled
                </option>

            </select>

        </div>

        <!-- Orders Table -->
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">

            <table class="w-full">

                <thead class="bg-slate-50 border-b border-slate-200">

                    <tr>
                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                            №
                        </th>

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
                    <tr v-else v-for="(order, index) in orders" :key="order.id"
                        class="border-b border-slate-100 hover:bg-slate-50">

                        <!-- Order number -->
                        <td class="px-6 py-4">

                            <span class="font-medium text-slate-900">
                                {{ index + 1 }}
                            </span>

                        </td>
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

                            <span class="px-3 py-1 rounded-full text-xs font-medium" :class="statusClass(order.status)">
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
                            <div class="flex gap-2">

                                <!-- View -->
                                <button @click="$router.push(`/orders/${order.id}`)"
                                    class="px-3 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50 cursor-pointer">
                                    View
                                </button>

                                <!-- Edit -->
                                <button v-if="order.status === 'pending'" @click="editOrderId = order.id"
                                    class="px-3 py-2 text-sm rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50 cursor-pointer">
                                    Edit
                                </button>

                                <!-- Confirm -->
                                <button v-if="
                                    order.status === 'pending' &&
                                    auth.hasPermission('confirm-order')
                                " @click="confirmOrder(order.id)"
                                    class="px-3 py-2 text-sm rounded-lg border border-green-300 text-green-600 hover:bg-green-50 cursor-pointer">
                                    Confirm
                                </button>

                                <!-- Cancel -->
                                <button v-if="
                                    order.status === 'pending' &&
                                    auth.hasPermission('cancel-order-pending')
                                " @click="cancelPendingOrder(order.id)"
                                    class="px-3 py-2 text-sm rounded-lg border border-red-300 text-red-600 hover:bg-red-50 cursor-pointer">
                                    Cancel
                                </button>

                                <!-- Cancel confirmed -->
                                <button v-if="
                                    order.status === 'confirmed' &&
                                    auth.hasPermission('cancel-order-confirmed')
                                " @click="cancelOrderId = order.id" class="px-3 py-2 text-sm rounded-lg
                                    border border-red-300
                                    text-red-600
                                    hover:bg-red-50
                                    hover:border-red-400
                                    hover:text-red-700
                                    transition-colors duration-200
                                    cursor-pointer">
                                    Cancel
                                </button>

                                <!-- Complete -->
                                <button v-if="
                                    order.status === 'confirmed' &&
                                    auth.hasPermission('complete-order')
                                " @click="completeOrder(order.id)"
                                    class="px-3 py-2 text-sm rounded-lg border border-purple-300 text-purple-600 hover:bg-purple-50 cursor-pointer">
                                    Complete
                                </button>

                            </div>
                        </td>

                    </tr>

                </tbody>

            </table>


        </div>

    </div>
    <div v-if="pagination.last_page > 1" class="flex items-center justify-between mt-6">

        <!-- Info -->
        <p class="text-sm text-slate-500">
            Showing
            <span class="font-medium text-slate-700">
                {{ pagination.from }}
            </span>
            -
            <span class="font-medium text-slate-700">
                {{ pagination.to }}
            </span>
            of
            <span class="font-medium text-slate-700">
                {{ pagination.total }}
            </span>
        </p>

        <!-- Pagination -->
        <div class="flex items-center gap-1">

            <!-- Previous -->
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-2 text-sm border rounded-lg
                   hover:bg-slate-50
                   disabled:opacity-40
                   disabled:cursor-not-allowed">
                ←
            </button>

            <!-- Pages -->
            <button v-for="page in visiblePages" :key="page" @click="typeof page === 'number' && changePage(page)"
                :disabled="page === '...'" class="min-w-9 px-3 py-2 text-sm rounded-lg border" :class="{
                    'bg-blue-600 text-white border-blue-600':
                        page === currentPage,

                    'hover:bg-slate-50':
                        page !== currentPage && page !== '...',

                    'cursor-default':
                        page === '...'
                }">
                {{ page }}
            </button>

            <!-- Next -->
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === pagination.last_page" class="px-3 py-2 text-sm border rounded-lg
                   hover:bg-slate-50
                   disabled:opacity-40
                   disabled:cursor-not-allowed">
                →
            </button>

        </div>

    </div>

    <CreateOrderModal v-if="showCreateModal" @close="showCreateModal = false" @created="getOrders" />
    <EditOrderModal v-if="editOrderId" :order-id="editOrderId" @close="editOrderId = null"
        @updated="handleOrderUpdated" />
    <CancelOrderModal v-if="cancelOrderId" :order-id="cancelOrderId" @close="cancelOrderId = null"
        @success="handleCancelSuccess" />
</template>


<script setup>

import { ref, onMounted, computed } from 'vue'
import api from '../../services/api'
import CreateOrderModal from './CreateOrderModal.vue'
import EditOrderModal from '../../components/orders/EditOrderModal.vue'
import { useAuthStore } from '../../stores/auth'
import { useRoute, useRouter } from 'vue-router'
import CancelOrderModal from '../../components/orders/CancelOrderModal.vue'



const orders = ref([])
const editOrderId = ref(null)
const loading = ref(false)
const auth = useAuthStore()
const error = ref('')
const showCreateModal = ref(false)
const search = ref('')
const status = ref('')
const route = useRoute()
const router = useRouter()
const cancelOrderId = ref(null)
const pagination = ref({

    current_page: 1,
    last_page: 1,
    total: 0
})
const currentPage = ref(
    Number(route.query.page) || 1
)
const handleOrderUpdated = () => {

    editOrderId.value = null

    getOrders()

}
const getOrders = async () => {

    try {

        loading.value = true

        error.value = ''

        const response = await api.get('/orders', {
            params: {
                page: currentPage.value,
                search: search.value,
                status: status.value
            }
        })

        orders.value = response.data.data
        pagination.value = response.data.meta

    } catch (err) {

        console.error(err)

        error.value =
            err.response?.data?.message ||
            'Failed to load orders'

    } finally {

        loading.value = false

    }

}
const handleCancelSuccess = () => {
    cancelOrderId.value = null
    getOrders()
}
const handleSearch = () => {

    currentPage.value = 1

    getOrders()

}

const handleFilter = () => {

    currentPage.value = 1

    getOrders()

}
const changePage = (page) => {

    if (
        page < 1 ||
        page > pagination.value.last_page
    ) {
        return
    }

    currentPage.value = page

    router.replace({
        query: {
            ...route.query,
            page: page
        }
    })

    getOrders()
}

const visiblePages = computed(() => {

    const lastPage = pagination.value.last_page
    const current = currentPage.value

    if (lastPage <= 7) {
        return Array.from(
            { length: lastPage },
            (_, index) => index + 1
        )
    }

    if (current <= 4) {
        return [
            1,
            2,
            3,
            4,
            5,
            '...',
            lastPage
        ]
    }

    if (current >= lastPage - 3) {
        return [
            1,
            '...',
            lastPage - 4,
            lastPage - 3,
            lastPage - 2,
            lastPage - 1,
            lastPage
        ]
    }

    return [
        1,
        '...',
        current - 1,
        current,
        current + 1,
        '...',
        lastPage
    ]
})
const confirmOrder = async (id) => {
    if (!confirm('Confirm this order?')) {
        return
    }

    try {
        await api.patch(`/orders/${id}/confirm`)
        await getOrders()
    } catch (error) {
        console.error(error)
        alert(
            error.response?.data?.message ||
            'Failed to confirm order'
        )
    }
}
const cancelPendingOrder = async (id) => {
    if (!confirm('Bu buyurtmani berkor qilmoqchiqmisiz?')) {
        return
    }

    try {
        await api.patch(`/orders/${id}/pending/cancel`)
        await getOrders()
    } catch (error) {
        alert(error)
    }

}

const cancelConfirmedOrder = async (id) => {

    if (!confirm('Bu buyurtma manager tomonidan tasdiqlangan bekor qilinsinmi?')) {
        return
    }

    try {
        await api.patch(`/orders/${id}/confirmed/cancel`)
        await getOrders()
    }
    catch (error) {
        alert(error)
    }
}

const completeOrder = async (id) => {
    if (!confirm('Bu buyurtma mijozga yetkazildimi?')) {
        return
    }

    try {
        await api.patch(`/orders/${id}/complete`)
        await getOrders()
    }

    catch (error) {
        alert(error)
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

    getOrders()

})

</script>
