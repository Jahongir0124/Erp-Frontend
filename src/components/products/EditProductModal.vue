
<template>
    <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="close"
    >

        <!-- Modal -->
        <div
            class="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col"
        >

            <!-- =========================================================
                 Header
            ========================================================== -->
            <div
                class="flex justify-between items-center px-6 py-5 border-b shrink-0"
            >

                <div>
                    <h2 class="text-2xl font-bold">
                        Edit Product
                    </h2>

                    <p class="text-slate-500 text-sm mt-1">
                        Update product information and images
                    </p>
                </div>

                <button
                    type="button"
                    @click="close"
                    :disabled="loading || uploadingImage"
                    class="w-9 h-9 rounded-lg text-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer disabled:opacity-50"
                >
                    ×
                </button>

            </div>


            <!-- =========================================================
                 Content
            ========================================================== -->
            <form
                @submit.prevent="submit"
                class="overflow-y-auto"
            >

                <div class="p-6">

                    <!-- General Error -->
                    <div
                        v-if="generalError"
                        class="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                    >
                        {{ generalError }}
                    </div>


                    <!-- =================================================
                         Main Grid
                    ================================================== -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">


                        <!-- =================================================
                             LEFT — Product Information
                        ================================================== -->
                        <div class="space-y-5">

                            <div>
                                <h3 class="font-semibold text-lg">
                                    Product Information
                                </h3>

                                <p class="text-sm text-slate-500 mt-1">
                                    Update the basic product information.
                                </p>
                            </div>


                            <!-- Product Name -->
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


                            <!-- Price + Quantity -->
                            <div class="grid grid-cols-2 gap-4">

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

                            </div>


                            <!-- Description -->
                            <div>

                                <label class="block text-sm font-medium mb-1">
                                    Description
                                </label>

                                <textarea
                                    v-model="form.description"
                                    rows="7"
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

                        </div>


                        <!-- =================================================
                             RIGHT — Product Images
                        ================================================== -->
                        <div>

                            <div class="flex justify-between items-start mb-4">

                                <div>
                                    <h3 class="font-semibold text-lg">
                                        Product Images
                                    </h3>

                                    <p class="text-sm text-slate-500 mt-1">
                                        Upload and manage product images.
                                    </p>
                                </div>


                                <!-- Upload -->
                                <label
                                    class="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm hover:bg-slate-800 cursor-pointer transition disabled:opacity-50"
                                >
                                    {{ uploadingImage ? 'Uploading...' : '+ Add Image' }}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        class="hidden"
                                        :disabled="uploadingImage"
                                        @change="uploadImage"
                                    >
                                </label>

                            </div>


                            <!-- Image Error -->
                            <div
                                v-if="imageError"
                                class="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                            >
                                {{ imageError }}
                            </div>


                            <!-- Images -->
                            <div
                                v-if="images.length"
                                class="grid grid-cols-2 gap-4"
                            >

                                <div
                                    v-for="image in images"
                                    :key="image.id"
                                    class="border border-slate-200 rounded-xl overflow-hidden bg-white"
                                >

                                    <!-- Image -->
                                    <div class="relative">

                                        <img
                                            :src="image.url"
                                            class="w-full h-40 object-cover bg-slate-100"
                                            :alt="form.name"
                                        >


                                        <!-- Primary Badge -->
                                        <span
                                            v-if="image.is_primary === 1"
                                            class="absolute top-2 left-2 px-2 py-1 rounded-lg bg-green-600 text-white text-xs font-medium"
                                        >
                                            Primary
                                        </span>

                                    </div>


                                    <!-- Image Actions -->
                                    <div class="p-3">

                                        <div
                                            class="flex items-center justify-between gap-2"
                                        >

                                            <!-- Primary -->
                                            <button
                                                v-if="image.is_primary !== 1"
                                                type="button"
                                                @click="setPrimaryImage(image)"
                                                class="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                                            >
                                                Set primary
                                            </button>

                                            <span
                                                v-else
                                                class="text-sm text-green-600 font-medium"
                                            >
                                                Primary image
                                            </span>


                                            <!-- Delete -->
                                            <button
                                                type="button"
                                                @click="deleteImage(image)"
                                                class="text-sm text-red-600 hover:text-red-800 cursor-pointer"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            <!-- Empty Images -->
                            <div
                                v-else
                                class="border-2 border-dashed border-slate-200 rounded-2xl min-h-[360px] flex flex-col items-center justify-center text-center p-6"
                            >

                                <div
                                    class="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-2xl mb-3"
                                >
                                    +
                                </div>

                                <p class="font-medium text-slate-600">
                                    No images
                                </p>

                                <p class="text-sm text-slate-400 mt-1">
                                    Add an image using the button above.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                <!-- =========================================================
                     Footer
                ========================================================== -->
                <div
                    class="flex justify-end gap-3 px-6 py-4 border-t bg-slate-50 shrink-0"
                >

                    <button
                        type="button"
                        @click="close"
                        :disabled="loading || uploadingImage"
                        class="px-5 py-3 border border-slate-200 bg-white rounded-xl hover:bg-slate-100 cursor-pointer disabled:opacity-50"
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        :disabled="loading || uploadingImage"
                        class="px-5 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 cursor-pointer disabled:opacity-50"
                    >
                        {{ loading ? 'Updating...' : 'Update Product' }}
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
| Props
|--------------------------------------------------------------------------
*/

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})


/*
|--------------------------------------------------------------------------
| Emits
|--------------------------------------------------------------------------
*/

const emit = defineEmits([
    'close',
    'updated'
])


/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const categories = ref([])

const images = ref([])

const loading = ref(false)

const uploadingImage = ref(false)

const generalError = ref('')

const imageError = ref('')


/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
*/

const form = reactive({
    name: '',
    category_id: '',
    price: '',
    description: '',
    quantity: ''
})


/*
|--------------------------------------------------------------------------
| Validation Errors
|--------------------------------------------------------------------------
*/

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
| Load Product
|--------------------------------------------------------------------------
*/

const loadProduct = async () => {

    try {

        const response = await api.get(
            `/product/${props.product.id}`
        )

        const product = response.data.data

        form.name =
            product.name

        form.category_id =
            product.category?.id || ''

        form.price =
            product.price

        form.description =
            product.description || ''

        form.quantity =
            product.quantity ?? ''

        images.value =
            product.images || []

    } catch (error) {

        console.error(error)

        generalError.value =
            error.response?.data?.message ||
            'Failed to load product'

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
| Update Product
|--------------------------------------------------------------------------
*/

const submit = async () => {

    clearErrors()

    try {

        loading.value = true

        await api.patch(
            `/product/${props.product.id}`,
            {
                name: form.name,

                category_id:
                    Number(form.category_id),

                price:
                    Number(form.price),

                description:
                    form.description || null,

                quantity:
                    form.quantity === ''
                        ? null
                        : Number(form.quantity)
            }
        )

        emit('updated')

        emit('close')

    } catch (error) {

        console.error(error)

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
                'Failed to update product'

        }

    } finally {

        loading.value = false

    }

}


/*
|--------------------------------------------------------------------------
| Upload Image
|--------------------------------------------------------------------------
*/



/*
|--------------------------------------------------------------------------
| Set Primary Image
|--------------------------------------------------------------------------
*/


const uploadImage = async (event) => {

    const file = event.target.files[0]

    if (!file) {
        return
    }

    imageError.value = ''

    try {

        uploadingImage.value = true

        const formData = new FormData()

        formData.append('image', file)

        const response = await api.post(
            `/products/${props.product.id}/images`,
            formData,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }
        )

        images.value.push(response.data.data)

        event.target.value = ''

    } catch (error) {

        console.error(error)

        imageError.value =
            error.response?.data?.errors?.image?.[0] ||
            error.response?.data?.message ||
            'Failed to upload image'

    } finally {

        uploadingImage.value = false

    }
}




/*
|--------------------------------------------------------------------------
| Delete Image
|--------------------------------------------------------------------------
*/

const deleteImage = async (image) => {

    if (!confirm('Delete this image?')) {
        return
    }

    imageError.value = ''

    try {

        await api.delete(
            `/products/${props.product.id}/${image.id}`
        )

        images.value =
            images.value.filter(
                item => item.id !== image.id
            )

    } catch (error) {

        console.error(error)

        imageError.value =
            error.response?.data?.message ||
            'Failed to delete image'

    }

}


/*
|--------------------------------------------------------------------------
| Close
|--------------------------------------------------------------------------
*/

const close = () => {

    if (loading.value || uploadingImage.value) {
        return
    }

    emit('close')

}


/*
|--------------------------------------------------------------------------
| Mounted
|--------------------------------------------------------------------------
*/

onMounted(async () => {

    await getCategories()

    await loadProduct()

})

</script>


