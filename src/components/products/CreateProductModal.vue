
<template>
    <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="close"
    >
        <div class="bg-white w-full max-w-lg rounded-2xl shadow-xl">

            <!-- Header -->
            <div class="flex justify-between items-center p-6 border-b">

                <div>
                    <h2 class="text-2xl font-bold">
                        Add Product
                    </h2>

                    <p class="text-slate-500 text-sm mt-1">
                        Create a new product
                    </p>
                </div>

                <button
                    type="button"
                    @click="close"
                    :disabled="loading"
                    class="text-2xl text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                    ×
                </button>

            </div>


            <!-- Form -->
            <form
                @submit.prevent="submit"
                class="p-6 space-y-5"
            >

                <!-- General Error -->
                <div
                    v-if="generalError"
                    class="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                >
                    {{ generalError }}
                </div>


                <!-- Name -->
                <div>

                    <label class="block text-sm font-medium mb-1">
                        Product Name
                    </label>

                    <input
                        v-model="form.name"
                        type="text"
                        placeholder="Enter product name"
                        class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="{
                            'border-red-500': errors.name
                        }"
                    >

                    <p
                        v-if="errors.name"
                        class="text-red-500 text-sm mt-1"
                    >
                        {{ errors.name }}
                    </p>

                </div>


                <!-- Category -->
                <div>

                    <label class="block text-sm font-medium mb-1">
                        Category
                    </label>

                    <select
                        v-model="form.category_id"
                        class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="{
                            'border-red-500': errors.category_id
                        }"
                    >

                        <option value="">
                            Select category
                        </option>

                        <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                        >
                            {{ category.name }}
                        </option>

                    </select>

                    <p
                        v-if="errors.category_id"
                        class="text-red-500 text-sm mt-1"
                    >
                        {{ errors.category_id }}
                    </p>

                </div>


                <!-- Price -->
                <div>

                    <label class="block text-sm font-medium mb-1">
                        Price
                    </label>

                    <input
                        v-model="form.price"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="{
                            'border-red-500': errors.price
                        }"
                    >

                    <p
                        v-if="errors.price"
                        class="text-red-500 text-sm mt-1"
                    >
                        {{ errors.price }}
                    </p>

                </div>


                <!-- Quantity -->
                <div>

                    <label class="block text-sm font-medium mb-1">
                        Quantity
                    </label>

                    <input
                        v-model="form.quantity"
                        type="number"
                        min="0"
                        placeholder="0"
                        class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="{
                            'border-red-500': errors.quantity
                        }"
                    >

                    <p
                        v-if="errors.quantity"
                        class="text-red-500 text-sm mt-1"
                    >
                        {{ errors.quantity }}
                    </p>

                </div>


                <!-- Description -->
                <div>

                    <label class="block text-sm font-medium mb-1">
                        Description
                    </label>

                    <textarea
                        v-model="form.description"
                        rows="4"
                        placeholder="Product description..."
                        class="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="{
                            'border-red-500': errors.description
                        }"
                    ></textarea>

                    <p
                        v-if="errors.description"
                        class="text-red-500 text-sm mt-1"
                    >
                        {{ errors.description }}
                    </p>

                </div>


                <!-- Buttons -->
                <div class="flex justify-end gap-3 pt-2">

                    <button
                        type="button"
                        @click="close"
                        :disabled="loading"
                        class="px-5 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        :disabled="loading"
                        class="px-5 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 cursor-pointer disabled:opacity-50"
                    >
                        {{ loading ? 'Creating...' : 'Create Product' }}
                    </button>

                </div>

            </form>

        </div>
    </div>
</template>


<script setup>

import { onMounted, reactive, ref } from 'vue'
import api from '../../services/api'


/*
|--------------------------------------------------------------------------
| Emits
|--------------------------------------------------------------------------
*/

const emit = defineEmits([
    'close',
    'created'
])


/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const categories = ref([])

const loading = ref(false)

const generalError = ref('')


const form = reactive({
    name: '',
    category_id: '',
    price: '',
    description: '',
    quantity: ''
})


const errors = reactive({
    name: '',
    category_id: '',
    price: '',
    description: '',
    quantity: ''
})


/*
|--------------------------------------------------------------------------
| Get Categories
|--------------------------------------------------------------------------
*/

const getCategories = async () => {

    try {

        const response = await api.get('/category')

        categories.value = response.data.data

    } catch (error) {

        console.error(error)

        generalError.value =
            'Failed to load categories'

    }

}


/*
|--------------------------------------------------------------------------
| Clear Errors
|--------------------------------------------------------------------------
*/

const clearErrors = () => {

    errors.name = ''
    errors.category_id = ''
    errors.price = ''
    errors.description = ''
    errors.quantity = ''

    generalError.value = ''

}


/*
|--------------------------------------------------------------------------
| Submit
|--------------------------------------------------------------------------
*/

const submit = async () => {

    clearErrors()

    try {

        loading.value = true

        await api.post('/product', {

            name: form.name,

            category_id: Number(form.category_id),

            price: Number(form.price),

            description: form.description || null,

            quantity: form.quantity === ''
                ? null
                : Number(form.quantity)

        })

        emit('created')

        emit('close')

    } catch (error) {

        console.error(error)

        /*
        |--------------------------------------------------------------------------
        | Validation Error
        |--------------------------------------------------------------------------
        */

        if (error.response?.status === 422) {

            const validationErrors =
                error.response.data.errors || {}

            errors.name =
                validationErrors.name?.[0] || ''

            errors.category_id =
                validationErrors.category_id?.[0] || ''

            errors.price =
                validationErrors.price?.[0] || ''

            errors.description =
                validationErrors.description?.[0] || ''

            errors.quantity =
                validationErrors.quantity?.[0] || ''

        } else {

            generalError.value =
                error.response?.data?.message ||
                'Failed to create product'

        }

    } finally {

        loading.value = false

    }

}


/*
|--------------------------------------------------------------------------
| Close
|--------------------------------------------------------------------------
*/

const close = () => {

    if (loading.value) {
        return
    }

    emit('close')

}


/*
|--------------------------------------------------------------------------
| Load Categories
|--------------------------------------------------------------------------
*/

onMounted(() => {

    getCategories()

})

</script>

