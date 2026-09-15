
<script setup>

import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../services/api'

const route = useRoute()
const router = useRouter()

const product = ref(null)

const loading = ref(true)
const error = ref('')

const selectedImage = ref(null)


// =========================
// Load Product
// =========================

const getProduct = async () => {

    loading.value = true
    error.value = ''

    try {

        const response = await api.get(
            `/product/${route.params.id}`
        )

        product.value = response.data.data

        const primaryImage = product.value.images?.find(
            image => Number(image.is_primary) === 1
        )

        selectedImage.value =
            primaryImage ||
            product.value.images?.[0] ||
            null

    } catch (err) {

        console.error(err)

        error.value =
            err.response?.data?.message ||
            'Failed to load product'

    } finally {

        loading.value = false

    }

}


// =========================
// Formatted Price
// =========================

const formattedPrice = computed(() => {

    if (!product.value) {
        return ''
    }

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(Number(product.value.price))

})


// =========================
// Stock Status
// =========================

const stockStatus = computed(() => {

    if (!product.value) {
        return null
    }

    const quantity = Number(product.value.quantity)

    if (quantity === 0) {

        return {
            text: 'Out of stock',
            class: 'bg-red-50 text-red-700 border-red-200'
        }

    }

    if (quantity <= 10) {

        return {
            text: 'Low stock',
            class: 'bg-amber-50 text-amber-700 border-amber-200'
        }

    }

    return {
        text: 'In stock',
        class: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }

})


// =========================
// Image
// =========================

const selectImage = (image) => {

    selectedImage.value = image

}


// =========================
// Navigation
// =========================

const goBack = () => {

    router.push('/products')

}


const editProduct = () => {

    router.push({
        path: '/products',
        query: {
            edit: product.value.id
        }
    })

}


// =========================
// Lifecycle
// =========================

onMounted(() => {

    getProduct()

})

</script>


<template>

<div class="min-h-full bg-slate-50">

    <!-- Loading -->

    <div
        v-if="loading"
        class="flex items-center justify-center min-h-[500px]"
    >

        <div class="text-center">

            <div
                class="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto"
            ></div>

            <p class="mt-4 text-slate-500">
                Loading product...
            </p>

        </div>

    </div>


    <!-- Error -->

    <div
        v-else-if="error"
        class="max-w-6xl mx-auto px-6 py-8"
    >

        <div
            class="bg-white border border-red-200 rounded-2xl p-8 text-center"
        >

            <div
                class="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-xl"
            >
                !
            </div>

            <h2 class="mt-4 text-lg font-semibold text-slate-900">
                Unable to load product
            </h2>

            <p class="mt-2 text-slate-500">
                {{ error }}
            </p>

            <button
                @click="goBack"
                class="mt-6 px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
                Back to Products
            </button>

        </div>

    </div>


    <!-- Product -->

    <div
        v-else-if="product"
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >

        <!-- Header -->

        <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        >

            <div>

                <button
                    @click="goBack"
                    class="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 cursor-pointer"
                >

                    <span class="text-lg">
                        ←
                    </span>

                    Back to Products

                </button>

                <div class="mt-3">

                    <p class="text-sm text-slate-500">
                        Product Details
                    </p>

                    <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">
                        {{ product.name }}
                    </h1>

                </div>

            </div>


            <button
                @click="editProduct"
                class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >

                <span>
                    ✎
                </span>

                Edit Product

            </button>

        </div>


        <!-- Main Product Card -->

        <div
            class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
        >

            <div class="grid grid-cols-1 lg:grid-cols-2">


                <!-- Images -->

                <div
                    class="p-5 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200"
                >

                    <!-- Main Image -->

                    <div
                        class="aspect-square bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center overflow-hidden"
                    >

                        <img
                            v-if="selectedImage"
                            :src="selectedImage.url"
                            :alt="product.name"
                            class="w-full h-full object-contain p-6"
                        />

                        <div
                            v-else
                            class="text-center text-slate-400"
                        >

                            <div class="text-5xl mb-3">
                                🖼
                            </div>

                            <p>
                                No image available
                            </p>

                        </div>

                    </div>


                    <!-- Thumbnails -->

                    <div
                        v-if="product.images?.length"
                        class="mt-5 grid grid-cols-4 sm:grid-cols-5 gap-3"
                    >

                        <button
                            v-for="image in product.images"
                            :key="image.id"
                            @click="selectImage(image)"
                            class="relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition"
                            :class="
                                selectedImage?.id === image.id
                                    ? 'border-blue-600'
                                    : 'border-slate-200 hover:border-slate-400'
                            "
                        >

                            <img
                                :src="image.url"
                                :alt="product.name"
                                class="w-full h-full object-cover"
                            />

                            <span
                                v-if="Number(image.is_primary) === 1"
                                class="absolute bottom-1 left-1 right-1 text-[10px] font-medium bg-slate-900/80 text-white rounded px-1 py-0.5"
                            >
                                Primary
                            </span>

                        </button>

                    </div>

                </div>


                <!-- Product Info -->

                <div class="p-5 sm:p-8 flex flex-col">

                    <!-- Category + Stock -->

                    <div class="flex items-center justify-between gap-4">

                        <span
                            v-if="product.category"
                            class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                        >
                            {{ product.category.name }}
                        </span>

                        <span
                            v-if="stockStatus"
                            class="inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium"
                            :class="stockStatus.class"
                        >
                            {{ stockStatus.text }}
                        </span>

                    </div>


                    <!-- Name -->

                    <h2
                        class="mt-5 text-2xl sm:text-3xl font-bold text-slate-900"
                    >
                        {{ product.name }}
                    </h2>


                    <!-- SKU -->

                    <div class="mt-3 flex items-center gap-2 text-sm">

                        <span class="text-slate-500">
                            SKU:
                        </span>

                        <span class="font-mono font-medium text-slate-700">
                            {{ product.sku }}
                        </span>

                    </div>


                    <!-- Price -->

                    <div class="mt-7">

                        <p class="text-sm text-slate-500">
                            Price
                        </p>

                        <p class="mt-1 text-4xl font-bold text-slate-900">
                            ${{ formattedPrice }}
                        </p>

                    </div>


                    <!-- Stock -->

                    <div
                        class="mt-7 p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >

                        <div class="flex items-center justify-between">

                            <div>

                                <p class="text-sm text-slate-500">
                                    Available Stock
                                </p>

                                <p class="mt-1 text-2xl font-bold text-slate-900">
                                    {{ product.quantity }}
                                </p>

                            </div>

                            <div
                                class="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center"
                            >
                                📦
                            </div>

                        </div>


                        <div
                            class="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden"
                        >

                            <div
                                class="h-full rounded-full transition-all"
                                :class="
                                    Number(product.quantity) <= 0
                                        ? 'bg-red-500'
                                        : Number(product.quantity) <= 10
                                            ? 'bg-amber-500'
                                            : 'bg-emerald-500'
                                "
                                :style="{
                                    width: `${Math.min(
                                        Number(product.quantity),
                                        100
                                    )}%`
                                }"
                            ></div>

                        </div>

                    </div>


                    <!-- Description -->

                    <div class="mt-7">

                        <h3 class="text-sm font-semibold text-slate-900">
                            Description
                        </h3>

                        <p
                            v-if="product.description"
                            class="mt-2 text-sm leading-6 text-slate-600 whitespace-pre-line"
                        >
                            {{ product.description }}
                        </p>

                        <p
                            v-else
                            class="mt-2 text-sm text-slate-400 italic"
                        >
                            No description available.
                        </p>

                    </div>


                    <div class="flex-1"></div>


                    <!-- Edit -->

                    <button
                        @click="editProduct"
                        class="mt-8 w-full py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 cursor-pointer"
                    >
                        Edit Product
                    </button>

                </div>

            </div>

        </div>


        <!-- Product Information -->

        <div class="mt-6">

            <div
                class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >

                <div
                    class="px-5 sm:px-6 py-5 border-b border-slate-200"
                >

                    <h2 class="text-lg font-semibold text-slate-900">
                        Product Information
                    </h2>

                    <p class="mt-1 text-sm text-slate-500">
                        Detailed information about this product
                    </p>

                </div>


                <div
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                >

                    <!-- ID -->

                    <div
                        class="p-5 border-b sm:border-r border-slate-200"
                    >

                        <p class="text-xs uppercase tracking-wide text-slate-400">
                            Product ID
                        </p>

                        <p class="mt-2 font-semibold text-slate-900">
                            #{{ product.id }}
                        </p>

                    </div>


                    <!-- SKU -->

                    <div
                        class="p-5 border-b lg:border-r border-slate-200"
                    >

                        <p class="text-xs uppercase tracking-wide text-slate-400">
                            SKU
                        </p>

                        <p class="mt-2 font-mono font-medium text-slate-900 break-all">
                            {{ product.sku }}
                        </p>

                    </div>


                    <!-- Category -->

                    <div
                        class="p-5 border-b sm:border-r lg:border-r border-slate-200"
                    >

                        <p class="text-xs uppercase tracking-wide text-slate-400">
                            Category
                        </p>

                        <p class="mt-2 font-semibold text-slate-900">
                            {{ product.category?.name || '—' }}
                        </p>

                    </div>


                    <!-- Quantity -->

                    <div class="p-5 border-b">

                        <p class="text-xs uppercase tracking-wide text-slate-400">
                            Quantity
                        </p>

                        <p class="mt-2 font-semibold text-slate-900">
                            {{ product.quantity }}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

</template>

