
<template>

    <div
        class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
    >

        <div
            class="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        >

            <!-- Header -->
            <div
                class="flex justify-between items-center px-6 py-5 border-b border-slate-200"
            >

                <div>
                    <h2 class="text-xl font-semibold text-slate-900">
                        Create Order
                    </h2>

                    <p class="text-sm text-slate-500 mt-1">
                        Create a new customer order
                    </p>
                </div>

                <button
                    @click="closeModal"
                    class="text-slate-400 hover:text-slate-700 text-xl cursor-pointer"
                >
                    ✕
                </button>

            </div>


            <!-- Body -->
            <div class="p-6 overflow-y-auto space-y-6">

                <!-- Error -->
                <div
                    v-if="error"
                    class="px-4 py-3 rounded-lg bg-red-50 text-red-600 text-sm"
                >
                    {{ error }}
                </div>


                <!-- Customer -->
                <div>

                    <label
                        class="block text-sm font-medium text-slate-700 mb-2"
                    >
                        Customer
                    </label>

                    <select
                        v-model="customerId"
                        class="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="">
                            Select customer
                        </option>

                        <option
                            v-for="customer in customers"
                            :key="customer.id"
                            :value="customer.id"
                        >
                            {{ customer.name }}
                        </option>

                    </select>

                </div>


                <!-- Products -->
                <div>

                    <div class="flex justify-between items-center mb-3">

                        <h3 class="font-semibold text-slate-900">
                            Products
                        </h3>

                        <button
                            @click="addItem"
                            class="px-3 py-2 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 cursor-pointer"
                        >
                            + Add Product
                        </button>

                    </div>


                    <!-- Product rows -->
                    <div class="space-y-3">

                        <div
                            v-for="(item, index) in items"
                            :key="index"
                            class="grid grid-cols-[1fr_120px_120px_40px] gap-3 items-center"
                        >

                            <!-- Product -->
                            <select
                                v-model="item.product_id"
                                class="border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >

                                <option value="">
                                    Select product
                                </option>

                                <option
                                    v-for="product in products"
                                    :key="product.id"
                                    :value="product.id"
                                >
                                    {{ product.name }}
                                </option>

                            </select>


                            <!-- Quantity -->
                            <input
                                v-model.number="item.quantity"
                                type="number"
                                min="1"
                                placeholder="Quantity"
                                class="border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />


                            <!-- Price -->
                            <div
                                class="px-3 py-2.5 bg-slate-50 rounded-lg text-sm text-slate-700"
                            >
                                {{ getProductPrice(item.product_id) }}
                            </div>


                            <!-- Remove -->
                            <button
                                @click="removeItem(index)"
                                :disabled="items.length === 1"
                                class="text-red-500 hover:text-red-700 disabled:text-slate-300 cursor-pointer disabled:cursor-not-allowed"
                            >
                                ✕
                            </button>

                        </div>

                    </div>

                </div>


                <!-- Total -->
                <div
                    class="flex justify-end border-t border-slate-200 pt-5"
                >

                    <div class="text-right">

                        <p class="text-sm text-slate-500">
                            Total
                        </p>

                        <p class="text-2xl font-bold text-slate-900">
                            {{ totalAmount.toFixed(2) }}
                        </p>

                    </div>

                </div>

            </div>


            <!-- Footer -->
            <div
                class="flex justify-end gap-3 px-6 py-5 border-t border-slate-200"
            >

                <button
                    @click="closeModal"
                    class="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 cursor-pointer"
                >
                    Cancel
                </button>

                <button
                    @click="createOrder"
                    :disabled="saving"
                    class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                    {{ saving ? 'Creating...' : 'Create Order' }}
                </button>

            </div>

        </div>

    </div>

</template>


<script setup>

import { ref, computed, onMounted } from 'vue'
import api from '../../services/api'


const emit = defineEmits([
    'close',
    'created'
])


const customers = ref([])

const products = ref([])

const customerId = ref('')

const items = ref([
    {
        product_id: '',
        quantity: 1
    }
])

const saving = ref(false)

const error = ref('')


const getCustomers = async () => {

    try {

        const response = await api.get('/customers')

        customers.value = response.data.data

    } catch (err) {

        console.error(err)

        error.value =
            err.response?.data?.message ||
            'Failed to load customers'

    }

}


const getProducts = async () => {

    try {

        const response = await api.get('/product')

        products.value = response.data.data

    } catch (err) {

        console.error(err)

        error.value =
            err.response?.data?.message ||
            'Failed to load products'

    }

}


const addItem = () => {

    items.value.push({
        product_id: '',
        quantity: 1
    })

}


const removeItem = (index) => {

    if (items.value.length === 1) {
        return
    }

    items.value.splice(index, 1)

}


const getProductPrice = (productId) => {

    const product = products.value.find(
        product => String(product.id) === String(productId)
    )

    if (!product) {
        return '-'
    }

    return Number(product.price).toFixed(2)

}


const totalAmount = computed(() => {

    return items.value.reduce((total, item) => {

        const product = products.value.find(
            product => String(product.id) === String(item.product_id)
        )

        if (!product) {
            return total
        }

        return total + (
            Number(product.price) *
            Number(item.quantity || 0)
        )

    }, 0)

})


const createOrder = async () => {

    try {

        error.value = ''

        if (!customerId.value) {

            error.value = 'Please select a customer'

            return
        }


        const validItems = items.value.filter(
            item =>
                item.product_id &&
                Number(item.quantity) >= 1
        )


        if (validItems.length === 0) {

            error.value = 'Please add at least one product'

            return
        }


        saving.value = true


        const payload = {

            customer_id: Number(customerId.value),

            items: validItems.map(item => ({
                product_id: Number(item.product_id),
                quantity: Number(item.quantity)
            }))

        }


        await api.post('/orders', payload)


        emit('created')

        closeModal()

    } catch (err) {

        console.error(err)

        error.value =
            err.response?.data?.message ||
            'Failed to create order'

    } finally {

        saving.value = false

    }

}


const closeModal = () => {

    emit('close')

}


onMounted(() => {

    getCustomers()

    getProducts()

})

</script>

