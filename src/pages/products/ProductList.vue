```vue
<template>
    <div class="space-y-6">

        <!-- Header -->
        <div class="flex justify-between items-center">

            <div>
                <h1 class="text-3xl font-bold">
                    Products
                </h1>

                <p class="text-slate-500">
                    Manage products
                </p>
            </div>

            <div class="flex gap-3">

                <button @click="showCategoriesModal = true"
                    class="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    Manage Categories
                </button>

                <button @click="showCreateModal = true"
                    class="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl cursor-pointer">
                    + Add Product
                </button>

            </div>

        </div>


        <!-- Filters -->
        <div class="bg-white border border-slate-200 rounded-2xl p-4">

            <div class="flex gap-3">

                <!-- Search -->
                <input v-model="search" type="text" placeholder="Search products..."
                    class="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">

                <!-- Category -->
                <select v-model="selectedCategory"
                    class="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">
                        All Categories
                    </option>

                    <option v-for="category in categories" :key="category" :value="category.id">
                        {{ category.name }}
                    </option>

                </select>

            </div>

        </div>


        <!-- Products Table -->
        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">

            <table class="w-full">

                <thead class="bg-slate-50">

                    <tr>

                        <th class="text-left p-4">
                            Image
                        </th>

                        <th class="text-left p-4">
                            Product
                        </th>

                        <th class="text-left p-4">
                            SKU
                        </th>

                        <th class="text-left p-4">
                            Category
                        </th>

                        <th class="text-left p-4">
                            Price
                        </th>

                        <th class="text-left p-4">
                            Quantity
                        </th>

                        <th class="text-left p-4">
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody>

                    <tr v-for="product in filteredProducts" :key="product.id" class="border-t hover:bg-slate-50">

                        <!-- Image -->
                        <td class="p-4">

                            <img v-if="getPrimaryImage(product)" :src="getPrimaryImage(product)" :alt="product.name"
                                class="w-12 h-12 object-cover rounded-lg border border-slate-200">

                            <div v-else
                                class="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                                No image
                            </div>

                        </td>


                        <!-- Product -->
                        <td class="p-4 font-medium">
                            <router-link :to="`/products/${product.id}`"
                                class="font-medium text-slate-900 hover:text-blue-600 transition">
                                {{ product.name }}
                            </router-link>
            
                        </td>


                        <!-- SKU -->
                        <td class="p-4 text-slate-600">
                            {{ product.sku }}
                        </td>


                        <!-- Category -->
                        <td class="p-4 text-slate-600">
                            {{ product.category.name }}
                        </td>


                        <!-- Price -->
                        <td class="p-4 font-medium">
                            ${{ product.price }}
                        </td>


                        <!-- Quantity -->
                        <td class="p-4">
                            {{ product.quantity }}
                        </td>


                        <!-- Actions -->
                        <td class="p-4">

                            <div class="flex gap-2">

                                <button @click="openEditModal(product)"
                                    class="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                                    Edit
                                </button>

                                <button @click="deleteProduct(product)"
                                    class="px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer">
                                    Delete
                                </button>

                            </div>

                        </td>

                    </tr>


                    <!-- Empty -->
                    <tr v-if="filteredProducts.length === 0">

                        <td colspan="7" class="text-center p-8 text-slate-500">
                            No products found
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

    <ManageCategoriesModal v-if="showCategoriesModal" @close="showCategoriesModal = false" @updated="getProducts" />
    <CreateProductModal v-if="showCreateModal" @close="showCreateModal = false" @created="getProducts" />

  <EditProductModal 
    v-if="showEditModal"
    :product="selectedProduct" 
    @close="closeEditModal"
    @updated="getProducts" 
/>
</template>


<script setup>

import { computed, onMounted, ref } from 'vue'
import api from '../../services/api'
import ManageCategoriesModal from '../../components/products/ManageCategoriesModal.vue'
import CreateProductModal from '../../components/products/CreateProductModal.vue'
import EditProductModal from '../../components/products/EditProductModal.vue'
import { useRoute, useRouter } from 'vue-router'
/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const products = ref([])

const search = ref('')

const selectedCategory = ref('')
const showCategoriesModal = ref(false)
const categories = ref([])
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedProduct = ref(null)
const route = useRoute()
const router = useRouter()
const openEditModal = (product) => {
    selectedProduct.value = product
    showEditModal.value = true
}
/*
|--------------------------------------------------------------------------
| Get Products
|--------------------------------------------------------------------------
*/
const openEditFromQuery = () => {

    const editId = route.query.edit

    if (!editId) {
        return
    }

    const product = products.value.find(
        product => String(product.id) === String(editId)
    )

    if (!product) {
        return
    }

    selectedProduct.value = product
    showEditModal.value = true
}
const getProducts = async () => {

    try {

        const response = await api.get('/product')

        products.value = response.data.data
        openEditFromQuery()

    } catch (error) {

        console.error(error)

    }

}


const getCategories = async () => {

    try {
        const response = await api.get('/category')

        categories.value = response.data.data
    }


    catch (error) {
        console.log(error)
    }
}


const closeEditModal = () => {

    showEditModal.value = false

    router.replace('/products')

}


/*
|--------------------------------------------------------------------------
| Get Primary Image
|--------------------------------------------------------------------------
|
| Product ichidagi images array'dan
| is_primary = 1 bo'lgan rasmni olamiz.
|
*/

const getPrimaryImage = (product) => {

    const image = product.images?.find(
        image => image.is_primary === 1
    )

    return image?.url || null

}


/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
|
*/



/*
|--------------------------------------------------------------------------
| Filter Products
|--------------------------------------------------------------------------
*/
const deleteProduct = async (product) => {

    if (!confirm(`Delete "${product.name}"?`)) {
        return
    }

    try {

        await api.delete(`/product/${product.id}`)

        await getProducts()

    } catch (error) {

        console.error(error)

        alert(
            error.response?.data?.message ||
            'Failed to delete product'
        )

    }
}
const filteredProducts = computed(() => {

    const searchValue = search.value.toLowerCase()

    return products.value.filter(product => {

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        const matchesSearch =
            !searchValue ||
            product.name?.toLowerCase().includes(searchValue) ||
            product.sku?.toLowerCase().includes(searchValue) ||
            product.category_id?.toLowerCase().includes(searchValue)


        /*
        |--------------------------------------------------------------------------
        | Category Filter
        |--------------------------------------------------------------------------
        */

        const matchesCategory =
            !selectedCategory.value ||
            product.category.id === selectedCategory.value


        return matchesSearch && matchesCategory

    })

})


/*
|--------------------------------------------------------------------------
| Load Products
|--------------------------------------------------------------------------
*/

onMounted(() => {

    getProducts()
    getCategories()

})

</script>
```
