<template>
    <div class="space-y-6">

        <!-- ===================================================== -->
        <!-- HEADER -->
        <!-- ===================================================== -->

        <div
            class="flex flex-col gap-4
                   md:flex-row md:items-center md:justify-between"
        >

            <div>
                <h1 class="text-3xl font-bold text-slate-900">
                    Products
                </h1>

                <p class="text-slate-500 mt-1">
                    Manage products, pricing and stock
                </p>
            </div>

            <div class="flex flex-wrap gap-3">

                <!-- Categories -->
                <button
                    type="button"
                    @click="showCategoriesModal = true"
                    class="inline-flex items-center gap-2
                           px-4 py-2.5
                           bg-white
                           border border-slate-300
                           text-slate-700
                           text-sm font-medium
                           rounded-xl
                           hover:bg-slate-50
                           transition-colors
                           cursor-pointer"
                >
                    <!-- Category icon -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>

                    Manage Categories
                </button>

                <!-- Add Product -->
                <button
                    type="button"
                    @click="showCreateModal = true"
                    class="inline-flex items-center gap-2
                           px-4 py-2.5
                           bg-slate-900
                           text-white
                           text-sm font-medium
                           rounded-xl
                           hover:bg-slate-800
                           transition-colors
                           cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>

                    Add Product
                </button>

            </div>

        </div>


        <!-- ===================================================== -->
        <!-- FILTERS -->
        <!-- ===================================================== -->

        <div
            class="bg-white
                   border border-slate-200
                   rounded-2xl
                   p-5"
        >

            <div
                class="flex flex-col
                       lg:flex-row
                       gap-3"
            >

                <!-- Search -->
                <div class="relative flex-1">

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="absolute left-3.5 top-1/2
                               -translate-y-1/2
                               w-5 h-5
                               text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                        />
                    </svg>

                    <input
                        v-model="search"
                        type="text"
                        placeholder="Search by product name or SKU..."
                        class="w-full
                               pl-11 pr-4 py-2.5
                               border border-slate-300
                               rounded-xl
                               text-sm
                               text-slate-900
                               placeholder:text-slate-400
                               outline-none
                               transition
                               focus:border-blue-500
                               focus:ring-2
                               focus:ring-blue-500/20"
                        @keyup.enter="handleFilter"
                    />

                </div>


                <!-- Category -->
                <select
                    v-model="selectedCategory"
                    class="lg:w-56
                           px-4 py-2.5
                           border border-slate-300
                           rounded-xl
                           text-sm
                           text-slate-700
                           bg-white
                           outline-none
                           transition
                           focus:border-blue-500
                           focus:ring-2
                           focus:ring-blue-500/20
                           cursor-pointer"
                >

                    <option value="">
                        All Categories
                    </option>

                    <option
                        v-for="category in categories"
                        :key="category.name"
                        :value="category.name"
                    >
                        {{ category.name }}
                    </option>

                </select>


                <!-- Apply -->
                <button
                    type="button"
                    @click="handleFilter"
                    class="px-5 py-2.5
                           bg-blue-600
                           text-white
                           text-sm font-medium
                           rounded-xl
                           hover:bg-blue-700
                           transition-colors
                           cursor-pointer"
                >
                    Apply
                </button>


                <!-- Reset -->
                <button
                    type="button"
                    @click="resetFilters"
                    class="px-5 py-2.5
                           bg-white
                           border border-slate-300
                           text-slate-700
                           text-sm font-medium
                           rounded-xl
                           hover:bg-slate-50
                           transition-colors
                           cursor-pointer"
                >
                    Reset
                </button>

            </div>

        </div>


        <!-- ===================================================== -->
        <!-- ERROR -->
        <!-- ===================================================== -->

        <div
            v-if="error"
            class="bg-red-50
                   border border-red-200
                   text-red-700
                   rounded-xl
                   px-4 py-3
                   text-sm"
        >
            {{ error }}
        </div>


        <!-- ===================================================== -->
        <!-- PRODUCTS TABLE -->
        <!-- ===================================================== -->

        <div
            class="bg-white
                   border border-slate-200
                   rounded-2xl
                   overflow-hidden"
        >

            <div class="overflow-x-auto">

                <table class="w-full min-w-[900px]">

                    <!-- Table Header -->
                    <thead class="bg-slate-50">

                        <tr>

                            <th
                                class="px-5 py-3.5
                                       text-left
                                       text-xs
                                       font-semibold
                                       text-slate-500
                                       uppercase
                                       tracking-wide"
                            >
                                Product
                            </th>

                            <th
                                class="px-5 py-3.5
                                       text-left
                                       text-xs
                                       font-semibold
                                       text-slate-500
                                       uppercase
                                       tracking-wide"
                            >
                                SKU
                            </th>

                            <th
                                class="px-5 py-3.5
                                       text-left
                                       text-xs
                                       font-semibold
                                       text-slate-500
                                       uppercase
                                       tracking-wide"
                            >
                                Category
                            </th>

                            <th
                                class="px-5 py-3.5
                                       text-left
                                       text-xs
                                       font-semibold
                                       text-slate-500
                                       uppercase
                                       tracking-wide"
                            >
                                Price
                            </th>

                            <th
                                class="px-5 py-3.5
                                       text-left
                                       text-xs
                                       font-semibold
                                       text-slate-500
                                       uppercase
                                       tracking-wide"
                            >
                                Stock
                            </th>

                            <th
                                class="px-5 py-3.5
                                       text-right
                                       text-xs
                                       font-semibold
                                       text-slate-500
                                       uppercase
                                       tracking-wide"
                            >
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <!-- Table Body -->
                    <tbody class="divide-y divide-slate-100">

                        <!-- Loading -->
                        <tr v-if="loading">

                            <td
                                colspan="6"
                                class="px-5 py-12"
                            >

                                <div
                                    class="flex flex-col
                                           items-center
                                           justify-center
                                           gap-3"
                                >

                                    <svg
                                        class="w-7 h-7
                                               animate-spin
                                               text-blue-600"
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
                                        />

                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                    </svg>

                                    <p class="text-sm text-slate-500">
                                        Loading products...
                                    </p>

                                </div>

                            </td>

                        </tr>


                        <!-- Products -->
                        <tr
                            v-for="product in products"
                            v-else
                            :key="product.id"
                            class="hover:bg-slate-50/70
                                   transition-colors"
                        >

                            <!-- Product -->
                            <td class="px-5 py-4">

                                <div class="flex items-center gap-3">

                                    <!-- Image -->
                                    <div
                                        class="w-11 h-11
                                               rounded-xl
                                               overflow-hidden
                                               border border-slate-200
                                               bg-slate-100
                                               flex-shrink-0"
                                    >

                                        <img
                                            v-if="getPrimaryImage(product)"
                                            :src="getPrimaryImage(product)"
                                            :alt="product.name"
                                            class="w-full h-full object-cover"
                                        />

                                        <div
                                            v-else
                                            class="w-full h-full
                                                   flex items-center
                                                   justify-center
                                                   text-slate-400"
                                        >

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="w-5 h-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M3 16l5-5 4 4 3-3 6 6"
                                                />

                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z"
                                                />
                                            </svg>

                                        </div>

                                    </div>


                                    <!-- Name -->
                                    <div class="min-w-0">

                                        <router-link
                                            :to="`/products/${product.id}`"
                                            class="font-semibold
                                                   text-slate-900
                                                   hover:text-blue-600
                                                   transition-colors
                                                   truncate
                                                   block"
                                        >
                                            {{ product.name }}
                                        </router-link>

                                        <p
                                            class="text-xs
                                                   text-slate-400
                                                   mt-0.5"
                                        >
                                            ID: {{ product.id }}
                                        </p>

                                    </div>

                                </div>

                            </td>


                            <!-- SKU -->
                            <td
                                class="px-5 py-4
                                       text-sm
                                       text-slate-600"
                            >
                                <span
                                    class="font-mono
                                           text-xs
                                           bg-slate-100
                                           px-2 py-1
                                           rounded-md"
                                >
                                    {{ product.sku }}
                                </span>
                            </td>


                            <!-- Category -->
                            <td
                                class="px-5 py-4
                                       text-sm
                                       text-slate-600"
                            >
                                {{ product.category?.name || '—' }}
                            </td>


                            <!-- Price -->
                            <td
                                class="px-5 py-4
                                       text-sm
                                       font-semibold
                                       text-slate-900"
                            >
                                ${{ product.price }}
                            </td>


                            <!-- Stock -->
                            <td class="px-5 py-4">

                                <div class="flex flex-col gap-1">

                                    <span
                                        class="text-sm
                                               font-semibold
                                               text-slate-900"
                                    >
                                        {{ product.quantity }}
                                    </span>

                                    <span
                                        :class="stockClass(product.quantity)"
                                        class="w-fit
                                               px-2 py-0.5
                                               rounded-full
                                               text-xs
                                               font-medium"
                                    >
                                        {{ stockText(product.quantity) }}
                                    </span>

                                </div>

                            </td>


                            <!-- Actions -->
                            <td class="px-5 py-4">

                                <div
                                    class="flex justify-end
                                           items-center
                                           gap-2"
                                >

                                    <!-- View -->
                                    <router-link
                                        :to="`/products/${product.id}`"
                                        title="View product"
                                        class="w-9 h-9
                                               flex items-center
                                               justify-center
                                               rounded-lg
                                               border border-slate-200
                                               text-slate-500
                                               hover:bg-slate-100
                                               hover:text-slate-700
                                               transition-colors"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />

                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </router-link>


                                    <!-- Edit -->
                                    <button
                                        type="button"
                                        @click="openEditModal(product)"
                                        title="Edit product"
                                        class="w-9 h-9
                                               flex items-center
                                               justify-center
                                               rounded-lg
                                               border border-slate-200
                                               text-slate-500
                                               hover:bg-blue-50
                                               hover:text-blue-600
                                               hover:border-blue-200
                                               transition-colors
                                               cursor-pointer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                                            />
                                        </svg>
                                    </button>


                                    <!-- Delete -->
                                    <button
                                        type="button"
                                        @click="deleteProduct(product)"
                                        title="Delete product"
                                        class="w-9 h-9
                                               flex items-center
                                               justify-center
                                               rounded-lg
                                               border border-slate-200
                                               text-slate-500
                                               hover:bg-red-50
                                               hover:text-red-600
                                               hover:border-red-200
                                               transition-colors
                                               cursor-pointer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-9 0h14"
                                            />
                                        </svg>
                                    </button>

                                </div>

                            </td>

                        </tr>


                        <!-- Empty -->
                        <tr
                            v-if="!loading && products.length === 0"
                        >

                            <td
                                colspan="6"
                                class="px-5 py-14"
                            >

                                <div
                                    class="flex flex-col
                                           items-center
                                           justify-center
                                           text-center"
                                >

                                    <div
                                        class="w-14 h-14
                                               rounded-2xl
                                               bg-slate-100
                                               text-slate-400
                                               flex items-center
                                               justify-center
                                               mb-4"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-7 h-7"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                            />
                                        </svg>
                                    </div>

                                    <h3
                                        class="text-base
                                               font-semibold
                                               text-slate-800"
                                    >
                                        No products found
                                    </h3>

                                    <p
                                        class="text-sm
                                               text-slate-500
                                               mt-1"
                                    >
                                        Try changing your search or filters.
                                    </p>

                                </div>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>


        <!-- ===================================================== -->
        <!-- PAGINATION -->
        <!-- ===================================================== -->

        <div
            v-if="pagination.last_page > 0"
            class="bg-white
                   border border-slate-200
                   rounded-2xl
                   px-5 py-4
                   flex flex-col
                   sm:flex-row
                   sm:items-center
                   sm:justify-between
                   gap-4"
        >

            <!-- Info -->
            <p
                class="text-sm
                       text-slate-500"
            >
                Showing
                <span class="font-medium text-slate-700">
                    {{ pagination.from || 0 }}
                </span>
                -
                <span class="font-medium text-slate-700">
                    {{ pagination.to || 0 }}
                </span>
                of
                <span class="font-medium text-slate-700">
                    {{ pagination.total || 0 }}
                </span>
            </p>


            <!-- Controls -->
            <div class="flex items-center gap-1.5">

                <!-- Previous -->
                <button
                    type="button"
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="w-9 h-9
                           flex items-center
                           justify-center
                           rounded-lg
                           border border-slate-200
                           text-slate-600
                           hover:bg-slate-50
                           disabled:opacity-40
                           disabled:cursor-not-allowed
                           transition-colors
                           cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>


                <!-- Pages -->
                <button
                    v-for="page in visiblePages"
                    :key="page"
                    type="button"
                    @click="changePage(page)"
                    :class="
                        page === currentPage
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    "
                    class="min-w-9 h-9 px-2
                           flex items-center
                           justify-center
                           rounded-lg
                           border
                           text-sm
                           font-medium
                           transition-colors
                           cursor-pointer"
                >
                    {{ page }}
                </button>


                <!-- Next -->
                <button
                    type="button"
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === pagination.last_page"
                    class="w-9 h-9
                           flex items-center
                           justify-center
                           rounded-lg
                           border border-slate-200
                           text-slate-600
                           hover:bg-slate-50
                           disabled:opacity-40
                           disabled:cursor-not-allowed
                           transition-colors
                           cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>

            </div>

        </div>

    </div>


    <!-- ========================================================= -->
    <!-- MODALS -->
    <!-- ========================================================= -->

    <ManageCategoriesModal
        v-if="showCategoriesModal"
        @close="showCategoriesModal = false"
        @updated="getProducts"
    />

    <CreateProductModal
        v-if="showCreateModal"
        @close="showCreateModal = false"
        @created="getProducts"
    />

    <EditProductModal
        v-if="showEditModal"
        :product="selectedProduct"
        @close="closeEditModal"
        @updated="getProducts"
    />

</template>

<script setup>

import {
    onMounted,
    ref,
    computed,
    watch
} from 'vue'

import api from '../../services/api'

import ManageCategoriesModal
    from '../../components/products/ManageCategoriesModal.vue'

import CreateProductModal
    from '../../components/products/CreateProductModal.vue'

import EditProductModal
    from '../../components/products/EditProductModal.vue'

import {
    useRoute,
    useRouter
} from 'vue-router'


/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
*/

const route = useRoute()
const router = useRouter()


/*
|--------------------------------------------------------------------------
| Products
|--------------------------------------------------------------------------
*/

const products = ref([])

const categories = ref([])


/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/

const search = ref('')

const selectedCategory = ref('')


/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

const currentPage = ref(1)

const pagination = ref({})


/*
|--------------------------------------------------------------------------
| UI State
|--------------------------------------------------------------------------
*/

const loading = ref(false)

const error = ref('')

const showCategoriesModal = ref(false)

const showCreateModal = ref(false)

const showEditModal = ref(false)

const selectedProduct = ref(null)


/*
|--------------------------------------------------------------------------
| Get Products
|--------------------------------------------------------------------------
*/

const getProducts = async () => {

    try {

        loading.value = true

        error.value = ''

        const response = await api.get('/product', {

            params: {

                page: currentPage.value,

                search:
                    search.value || undefined,

                category:
                    selectedCategory.value || undefined

            }

        })


        products.value =
            response.data.data

        pagination.value =
            response.data.meta


        openEditFromQuery()

    }

    catch (err) {

        console.error(err)

        error.value =
            err.response?.data?.message ||
            'Failed to load products'

    }

    finally {

        loading.value = false

    }

}


/*
|--------------------------------------------------------------------------
| Get Categories
|--------------------------------------------------------------------------
*/

const getCategories = async () => {

    try {

        const response =
            await api.get('/category')

        categories.value =
            response.data.data

    }

    catch (err) {

        console.error(err)

    }

}


/*
|--------------------------------------------------------------------------
| Apply Filters
|--------------------------------------------------------------------------
*/

const handleFilter = () => {

    currentPage.value = 1

    getProducts()

}


/*
|--------------------------------------------------------------------------
| Reset Filters
|--------------------------------------------------------------------------
*/

const resetFilters = () => {

    search.value = ''

    selectedCategory.value = ''

    currentPage.value = 1

    getProducts()

}


/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

const changePage = (page) => {

    if (page < 1) {
        return
    }

    if (
        pagination.value.last_page &&
        page > pagination.value.last_page
    ) {
        return
    }

    currentPage.value = page

    getProducts()

}


/*
|--------------------------------------------------------------------------
| Visible Pages
|--------------------------------------------------------------------------
|
| Example:
|
| 1 2 3 4 5 ... 20
|
|--------------------------------------------------------------------------
*/

const visiblePages = computed(() => {

    const lastPage =
        pagination.value.last_page || 1

    const current =
        currentPage.value

    const pages = []


    if (lastPage <= 7) {

        for (
            let i = 1;
            i <= lastPage;
            i++
        ) {

            pages.push(i)

        }

        return pages
    }


    pages.push(1)


    if (current > 4) {

        pages.push('...')

    }


    const start =
        Math.max(2, current - 1)

    const end =
        Math.min(lastPage - 1, current + 1)


    for (
        let i = start;
        i <= end;
        i++
    ) {

        pages.push(i)

    }


    if (current < lastPage - 3) {

        pages.push('...')

    }


    pages.push(lastPage)


    return pages

})


/*
|--------------------------------------------------------------------------
| Open Edit Modal
|--------------------------------------------------------------------------
*/

const openEditModal = (product) => {

    selectedProduct.value = product

    showEditModal.value = true

}


/*
|--------------------------------------------------------------------------
| Open Edit From Query
|--------------------------------------------------------------------------
|
| /products?edit=5
|
|--------------------------------------------------------------------------
*/

const openEditFromQuery = () => {

    const editId =
        route.query.edit

    if (!editId) {

        return

    }


    const product =
        products.value.find(
            product =>
                String(product.id) ===
                String(editId)
        )


    if (!product) {

        return

    }


    selectedProduct.value =
        product

    showEditModal.value =
        true

}


/*
|--------------------------------------------------------------------------
| Close Edit Modal
|--------------------------------------------------------------------------
*/

const closeEditModal = () => {

    showEditModal.value = false

    selectedProduct.value = null

    router.replace('/products')

}


/*
|--------------------------------------------------------------------------
| Primary Image
|--------------------------------------------------------------------------
*/

const getPrimaryImage = (product) => {

    const image =
        product.images?.find(
            image =>
                image.is_primary === 1
        )

    return image?.url || null

}


/*
|--------------------------------------------------------------------------
| Stock Status
|--------------------------------------------------------------------------
*/

const stockClass = (quantity) => {

    if (quantity === 0) {

        return 'bg-red-50 text-red-700'

    }


    if (quantity <= 10) {

        return 'bg-yellow-50 text-yellow-700'

    }


    return 'bg-green-50 text-green-700'

}


const stockText = (quantity) => {

    if (quantity === 0) {

        return 'Out of Stock'

    }


    if (quantity <= 10) {

        return 'Low Stock'

    }


    return 'In Stock'

}


/*
|--------------------------------------------------------------------------
| Delete Product
|--------------------------------------------------------------------------
*/

const deleteProduct = async (product) => {

    if (
        !confirm(
            `Delete "${product.name}"?`
        )
    ) {

        return

    }


    try {

        loading.value = true

        error.value = ''


        await api.delete(
            `/product/${product.id}`
        )


        /*
        |--------------------------------------------------------------
        | Agar oxirgi product o'chirilsa,
        | oldingi page'ga qaytamiz.
        |--------------------------------------------------------------
        */

        if (
            products.value.length === 1 &&
            currentPage.value > 1
        ) {

            currentPage.value--

        }


        await getProducts()

    }

    catch (err) {

        console.error(err)

        error.value =
            err.response?.data?.message ||
            'Failed to delete product'

    }

    finally {

        loading.value = false

    }

}


/*
|--------------------------------------------------------------------------
| Initial Load
|--------------------------------------------------------------------------
*/

onMounted(() => {

    getProducts()

    getCategories()

})

</script>