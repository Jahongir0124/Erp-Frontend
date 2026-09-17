<template>
    <div class="space-y-6">

        <!-- Header -->
        <div>
            <h1 class="text-3xl font-bold text-slate-900">
                Inventories
            </h1>

            <p class="text-slate-500 mt-1">
                Track inventory stock movements
            </p>
        </div>


        <!-- Search & Filter -->
        <div class="flex gap-4">

            <input
                v-model="search"
                @input="handleSearch"
                type="text"
                placeholder="Search product or quantity..."
                class="border border-slate-300 rounded-lg px-4 py-2 w-80
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
                v-model="type"
                @change="handleFilter"
                class="border border-slate-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">
                    All Types
                </option>

                <option value="order_confirmed">
                    Order Confirmed
                </option>

                <option value="order_cancelled">
                    Order Cancelled
                </option>

                <option value="order_completed">
                    Order Completed
                </option>
            </select>

        </div>


        <!-- Loading -->
        <div
            v-if="loading"
            class="text-center py-10 text-slate-500"
        >
            Loading inventories...
        </div>


        <!-- Error -->
        <div
            v-else-if="error"
            class="bg-red-50 border border-red-200 text-red-600
                   rounded-lg px-4 py-3"
        >
            {{ error }}
        </div>


        <!-- Table -->
        <div
            v-else
            class="bg-white rounded-xl shadow-sm border border-slate-200
                   overflow-hidden"
        >

            <table class="w-full">

                <thead class="bg-slate-50 border-b border-slate-200">
                    <tr>
                         <th class="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                            №
                        </th>
                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                            Product
                        </th>

                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                            Type
                        </th>

                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                            Before
                        </th>

                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                            Change
                        </th>

                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                            After
                        </th>

                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                            Created By
                        </th>

                        <th class="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                            Date
                        </th>

                    </tr>
                </thead>


                <tbody class="divide-y divide-slate-100">

                    <tr
                        v-for="(inventory, index) in inventories"
                        :key="inventory.id"
                        class="hover:bg-slate-50 transition-colors"
                    >

                        <!-- Product -->
                          <td class="px-6 py-4">

                            <div class="font-medium text-slate-900">
                               {{ index + 1 }}
                            </div>

                        </td>
                        <td class="px-6 py-4">

                            <div class="font-medium text-slate-900">
                                {{ inventory.product?.name || '-' }}
                            </div>

                        </td>


                        <!-- Type -->
                        <td class="px-6 py-4">

                            <span
                                class="px-3 py-1 rounded-full text-xs font-medium"
                                :class="typeClass(inventory.type)"
                            >
                                {{ formatType(inventory.type) }}
                            </span>

                        </td>


                        <!-- Before -->
                        <td class="px-6 py-4 text-slate-700">
                            {{ inventory.quantity_before }}
                        </td>


                        <!-- Change -->
                        <td class="px-6 py-4">

                            <span
                                class="font-semibold"
                                :class="quantityChangeClass(inventory.quantity_change)"
                            >
                                {{ formatQuantityChange(inventory.quantity_change) }}
                            </span>

                        </td>


                        <!-- After -->
                        <td class="px-6 py-4 font-medium text-slate-900">
                            {{ inventory.quantity_after }}
                        </td>


                        <!-- Created By -->
                        <td class="px-6 py-4 text-slate-700">
                            {{ inventory.created_by?.name || '-' }}
                        </td>


                        <!-- Date -->
                        <td class="px-6 py-4 text-slate-500 text-sm">
                            {{ inventory.created_at }}
                        </td>

                    </tr>


                    <!-- Empty -->
                    <tr v-if="inventories.length === 0">

                        <td
                            colspan="7"
                            class="text-center py-10 text-slate-500"
                        >
                            No inventory history found.
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>


        <!-- Pagination -->
        <div
            v-if="pagination.total > 0"
            class="flex items-center justify-between"
        >

            <p class="text-sm text-slate-500">
                Showing
                {{ pagination.from }}
                -
                {{ pagination.to }}
                of
                {{ pagination.total }}
            </p>


            <div class="flex items-center gap-2">

                <!-- Previous -->
                <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="px-3 py-2 rounded-lg border border-slate-300
                           text-sm
                           hover:bg-slate-100
                           transition
                           disabled:opacity-40
                           disabled:cursor-not-allowed
                           cursor-pointer"
                >
                    Previous
                </button>


                <!-- Pages -->
                <template
                    v-for="page in visiblePages"
                    :key="page"
                >

                    <span
                        v-if="page === '...'"
                        class="px-2 text-slate-400"
                    >
                        ...
                    </span>

                    <button
                        v-else
                        @click="changePage(page)"
                        class="min-w-9 px-3 py-2 rounded-lg border
                               text-sm transition cursor-pointer"
                        :class="
                            page === currentPage
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                        "
                    >
                        {{ page }}
                    </button>

                </template>


                <!-- Next -->
                <button
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === pagination.last_page"
                    class="px-3 py-2 rounded-lg border border-slate-300
                           text-sm
                           hover:bg-slate-100
                           transition
                           disabled:opacity-40
                           disabled:cursor-not-allowed
                           cursor-pointer"
                >
                    Next
                </button>

            </div>

        </div>

    </div>
</template>


<script setup>

import { ref, computed, onMounted } from 'vue'
import api from '../../services/api'


const inventories = ref([])

const search = ref('')

const type = ref('')

const loading = ref(false)

const error = ref('')

const pagination = ref({})

const currentPage = ref(1)



/*
|--------------------------------------------------------------------------
| Get inventories
|--------------------------------------------------------------------------
*/

const getInventories = async () => {

    try {

        loading.value = true

        error.value = ''

        const response = await api.get('/inventories', {
            params: {
                page: currentPage.value,
                search: search.value,
                type: type.value
            }
        })

        inventories.value = response.data.data

        pagination.value = response.data.meta

    } catch (err) {

        console.error(err)

        error.value =
            err.response?.data?.message ||
            'Failed to load inventories'

    } finally {

        loading.value = false

    }
}



/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/

const handleSearch = () => {

    currentPage.value = 1

    getInventories()

}



/*
|--------------------------------------------------------------------------
| Filter
|--------------------------------------------------------------------------
*/

const handleFilter = () => {

    currentPage.value = 1

    getInventories()

}



/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

const changePage = (page) => {

    if (
        page < 1 ||
        page > pagination.value.last_page
    ) {
        return
    }

    currentPage.value = page

    getInventories()

}



/*
|--------------------------------------------------------------------------
| Visible pages
|--------------------------------------------------------------------------
*/

const visiblePages = computed(() => {

    const lastPage = pagination.value.last_page || 1

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



/*
|--------------------------------------------------------------------------
| Type formatting
|--------------------------------------------------------------------------
*/

const formatType = (type) => {

    const types = {

        order_confirmed: 'Order Confirmed',

        order_cancelled: 'Order Cancelled',

        order_completed: 'Order Completed'

    }

    return types[type] || type

}



/*
|--------------------------------------------------------------------------
| Type badge
|--------------------------------------------------------------------------
*/

const typeClass = (type) => {

    switch (type) {

        case 'order_confirmed':
            return 'bg-blue-100 text-blue-700'

        case 'order_cancelled':
            return 'bg-red-100 text-red-700'

        case 'order_completed':
            return 'bg-green-100 text-green-700'

        default:
            return 'bg-slate-100 text-slate-700'

    }

}



/*
|--------------------------------------------------------------------------
| Quantity change color
|--------------------------------------------------------------------------
*/

const quantityChangeClass = (quantity) => {

    return quantity > 0
        ? 'text-green-600'
        : quantity < 0
            ? 'text-red-600'
            : 'text-slate-600'

}



/*
|--------------------------------------------------------------------------
| Quantity + / -
|--------------------------------------------------------------------------
*/

const formatQuantityChange = (quantity) => {

    return quantity > 0
        ? `+${quantity}`
        : quantity

}



/*
|--------------------------------------------------------------------------
| Initial load
|--------------------------------------------------------------------------
*/

onMounted(() => {

    getInventories()

})

</script>