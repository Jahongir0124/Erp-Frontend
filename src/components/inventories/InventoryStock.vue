<template>
    <div class="space-y-6">

        <!-- Search & Filters -->
        <div class="flex gap-4">

            <!-- Search -->
            <input
                v-model="search"
                @input="handleSearch"
                type="text"
                placeholder="Search product or SKU..."
                class="border border-slate-300 rounded-lg px-4 py-2 w-80
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <!-- Category -->
            <select
                v-model="categoryId"
                @change="handleFilter"
                class="border border-slate-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">
                    All Categories
                </option>

                <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                >
                    {{ category.name }}
                </option>
            </select>

            <!-- Stock Status -->
            <select
                v-model="stockStatus"
                @change="handleFilter"
                class="border border-slate-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">
                    All Stock
                </option>

                <option value="in_stock">
                    In Stock
                </option>

                <option value="low_stock">
                    Low Stock
                </option>

                <option value="out_of_stock">
                    Out of Stock
                </option>
            </select>

        </div>


        <!-- Loading -->
        <div
            v-if="loading"
            class="text-center py-10 text-slate-500"
        >
            Loading inventory...
        </div>


        <!-- Error -->
        <div
            v-else-if="error"
            class="bg-red-50 border border-red-200
                   text-red-600 rounded-lg px-4 py-3"
        >
            {{ error }}
        </div>


        <!-- Table -->
        <div
            v-else
            class="bg-white rounded-xl shadow-sm
                   border border-slate-200 overflow-hidden"
        >

            <table class="w-full">

                <thead class="bg-slate-50 border-b border-slate-200">

                    <tr>

                        <th
                            class="text-left px-6 py-4
                                   text-sm font-semibold text-slate-700"
                        >
                            Product
                        </th>

                        <th
                            class="text-left px-6 py-4
                                   text-sm font-semibold text-slate-700"
                        >
                            SKU
                        </th>

                        <th
                            class="text-left px-6 py-4
                                   text-sm font-semibold text-slate-700"
                        >
                            Category
                        </th>

                        <th
                            class="text-left px-6 py-4
                                   text-sm font-semibold text-slate-700"
                        >
                            Stock
                        </th>

                        <th
                            class="text-left px-6 py-4
                                   text-sm font-semibold text-slate-700"
                        >
                            Status
                        </th>

                    </tr>

                </thead>


                <tbody class="divide-y divide-slate-100">

                    <tr
                        v-for="product in inventories"
                        :key="product.id"
                        class="hover:bg-slate-50 transition-colors"
                    >

                        <!-- Product -->
                        <td class="px-6 py-4">

                            <span class="font-medium text-slate-900">
                                {{ product.name }}
                            </span>

                        </td>


                        <!-- SKU -->
                        <td class="px-6 py-4 text-slate-600">
                            {{ product.sku }}
                        </td>


                        <!-- Category -->
                        <td class="px-6 py-4 text-slate-600">
                            {{ product.category?.name || '-' }}
                        </td>


                        <!-- Stock -->
                        <td class="px-6 py-4">

                            <span class="font-semibold text-slate-900">
                                {{ product.stock }}
                            </span>

                        </td>


                        <!-- Status -->
                        <td class="px-6 py-4">

                            <span
                                class="px-3 py-1 rounded-full
                                       text-xs font-medium"
                                :class="statusClass(product.stock_status)"
                            >
                                {{ formatStatus(product.stock_status) }}
                            </span>

                        </td>

                    </tr>


                    <!-- Empty -->
                    <tr v-if="inventories.length === 0">

                        <td
                            colspan="5"
                            class="text-center py-10
                                   text-slate-500"
                        >
                            No inventory found.
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

            <!-- Info -->
            <p class="text-sm text-slate-500">
                Showing
                {{ pagination.from }}
                -
                {{ pagination.to }}
                of
                {{ pagination.total }}
            </p>


            <!-- Pages -->
            <div class="flex items-center gap-2">

                <!-- Previous -->
                <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="px-3 py-2 rounded-lg
                           border border-slate-300
                           text-sm
                           hover:bg-slate-100
                           transition
                           disabled:opacity-40
                           disabled:cursor-not-allowed
                           cursor-pointer"
                >
                    Previous
                </button>


                <!-- Page numbers -->
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
                        class="min-w-9 px-3 py-2
                               rounded-lg border
                               text-sm transition
                               cursor-pointer"
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
                    :disabled="
                        currentPage === pagination.last_page
                    "
                    class="px-3 py-2 rounded-lg
                           border border-slate-300
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

const categories = ref([])

const search = ref('')

const categoryId = ref('')

const stockStatus = ref('')

const loading = ref(false)

const error = ref('')

const pagination = ref({})

const currentPage = ref(1)



/*
|--------------------------------------------------------------------------
| Get inventory
|--------------------------------------------------------------------------
*/

const getInventories = async () => {

    try {

        loading.value = true

        error.value = ''

        const response = await api.get('/inventory', {
            params: {
                page: currentPage.value,
                search: search.value,
                category_id: categoryId.value,
                stock_status: stockStatus.value
            }
        })

        inventories.value = response.data.data

        pagination.value = response.data.meta

    } catch (err) {

        console.error(err)

        error.value =
            err.response?.data?.message ||
            'Failed to load inventory'

    } finally {

        loading.value = false

    }

}



/*
|--------------------------------------------------------------------------
| Get categories
|--------------------------------------------------------------------------
*/

const getCategories = async () => {

    try {

        const response = await api.get('/category')

        categories.value = response.data.data

    } catch (err) {

        console.error(err)

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

    const lastPage =
        pagination.value.last_page || 1

    const current =
        currentPage.value


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
| Status text
|--------------------------------------------------------------------------
*/

const formatStatus = (status) => {

    const statuses = {

        in_stock: 'In Stock',

        low_stock: 'Low Stock',

        out_of_stock: 'Out of Stock'

    }

    return statuses[status] || status

}



/*
|--------------------------------------------------------------------------
| Status badge
|--------------------------------------------------------------------------
*/

const statusClass = (status) => {

    switch (status) {

        case 'in_stock':
            return 'bg-green-100 text-green-700'

        case 'low_stock':
            return 'bg-yellow-100 text-yellow-700'

        case 'out_of_stock':
            return 'bg-red-100 text-red-700'

        default:
            return 'bg-slate-100 text-slate-700'

    }

}



/*
|--------------------------------------------------------------------------
| Initial load
|--------------------------------------------------------------------------
*/

onMounted(() => {

    getInventories()

    getCategories()

})

</script>