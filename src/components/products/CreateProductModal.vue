<template>

    <!-- ========================================================= -->
    <!-- MODAL -->
    <!-- ========================================================= -->

    <Transition
        appear
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >

        <div
            class="fixed inset-0 z-50
                   flex items-center justify-center
                   p-4"
            @click.self="close"
        >

            <!-- Backdrop -->
            <div
                class="absolute inset-0
                       bg-slate-950/50
                       backdrop-blur-sm"
            ></div>


            <!-- ================================================= -->
            <!-- MODAL CONTENT -->
            <!-- ================================================= -->

            <Transition
                appear
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 translate-y-3"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 translate-y-3"
            >

                <div
                    class="relative
                           w-full
                           max-w-lg
                           max-h-[90vh]
                           flex flex-col
                           bg-white
                           rounded-2xl
                           shadow-2xl
                           border border-slate-200
                           overflow-hidden"
                    @click.stop
                >

                    <!-- ========================================= -->
                    <!-- HEADER -->
                    <!-- ========================================= -->

                    <div
                        class="flex items-center justify-between
                               px-6 py-5
                               border-b border-slate-200"
                    >

                        <div class="flex items-center gap-3">

                            <!-- Icon -->
                            <div
                                class="w-10 h-10
                                       rounded-xl
                                       bg-blue-50
                                       text-blue-600
                                       flex items-center
                                       justify-center
                                       flex-shrink-0"
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5"
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

                            </div>


                            <!-- Title -->
                            <div>

                                <h2
                                    class="text-lg
                                           font-semibold
                                           text-slate-900"
                                >
                                    Add Product
                                </h2>

                                <p
                                    class="text-sm
                                           text-slate-500
                                           mt-0.5"
                                >
                                    Create a new product
                                </p>

                            </div>

                        </div>


                        <!-- Close -->
                        <button
                            type="button"
                            @click="close"
                            :disabled="loading"
                            class="w-9 h-9
                                   flex items-center
                                   justify-center
                                   rounded-lg
                                   text-slate-400
                                   hover:bg-slate-100
                                   hover:text-slate-700
                                   transition-colors
                                   cursor-pointer
                                   disabled:opacity-40
                                   disabled:cursor-not-allowed"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>

                        </button>

                    </div>


                    <!-- ========================================= -->
                    <!-- FORM -->
                    <!-- ========================================= -->

                    <form
                        @submit.prevent="submit"
                        class="overflow-y-auto"
                    >

                        <div class="px-6 py-5 space-y-5">


                            <!-- General Error -->

                            <div
                                v-if="generalError"
                                class="flex items-start gap-3
                                       p-3.5
                                       rounded-xl
                                       bg-red-50
                                       border border-red-200
                                       text-red-700"
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5
                                           mt-0.5
                                           flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 9v3.75m0 3.75h.008M10.29 3.86l-7.82 13.5A1.5 1.5 0 003.77 19.5h16.46a1.5 1.5 0 001.3-2.14l-7.82-13.5a1.5 1.5 0 00-2.6 0z"
                                    />
                                </svg>

                                <p class="text-sm">
                                    {{ generalError }}
                                </p>

                            </div>


                            <!-- ================================= -->
                            <!-- NAME -->
                            <!-- ================================= -->

                            <div>

                                <label
                                    class="block
                                           text-sm
                                           font-medium
                                           text-slate-700
                                           mb-1.5"
                                >
                                    Product Name
                                </label>

                                <input
                                    v-model="form.name"
                                    type="text"
                                    placeholder="Enter product name"
                                    :class="[
                                        'w-full px-4 py-2.5',
                                        'border rounded-xl',
                                        'text-sm text-slate-900',
                                        'placeholder:text-slate-400',
                                        'outline-none transition',
                                        errors.name
                                            ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                                            : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                    ]"
                                >

                                <p
                                    v-if="errors.name"
                                    class="mt-1.5
                                           text-xs
                                           text-red-600"
                                >
                                    {{ errors.name }}
                                </p>

                            </div>


                            <!-- ================================= -->
                            <!-- CATEGORY -->
                            <!-- ================================= -->

                            <div>

                                <label
                                    class="block
                                           text-sm
                                           font-medium
                                           text-slate-700
                                           mb-1.5"
                                >
                                    Category
                                </label>

                                <select
                                    v-model="form.category_id"
                                    :class="[
                                        'w-full px-4 py-2.5',
                                        'border rounded-xl',
                                        'text-sm',
                                        'bg-white',
                                        'outline-none transition',
                                        'cursor-pointer',
                                        errors.category_id
                                            ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                                            : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                    ]"
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
                                    class="mt-1.5
                                           text-xs
                                           text-red-600"
                                >
                                    {{ errors.category_id }}
                                </p>

                            </div>


                            <!-- ================================= -->
                            <!-- PRICE + QUANTITY -->
                            <!-- ================================= -->

                            <div
                                class="grid grid-cols-1
                                       sm:grid-cols-2
                                       gap-4"
                            >

                                <!-- Price -->
                                <div>

                                    <label
                                        class="block
                                               text-sm
                                               font-medium
                                               text-slate-700
                                               mb-1.5"
                                    >
                                        Price
                                    </label>

                                    <div class="relative">

                                        <span
                                            class="absolute
                                                   left-3.5
                                                   top-1/2
                                                   -translate-y-1/2
                                                   text-sm
                                                   text-slate-400"
                                        >
                                            $
                                        </span>

                                        <input
                                            v-model="form.price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="0.00"
                                            :class="[
                                                'w-full pl-8 pr-4 py-2.5',
                                                'border rounded-xl',
                                                'text-sm text-slate-900',
                                                'outline-none transition',
                                                errors.price
                                                    ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                                                    : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                            ]"
                                        />

                                    </div>

                                    <p
                                        v-if="errors.price"
                                        class="mt-1.5
                                               text-xs
                                               text-red-600"
                                    >
                                        {{ errors.price }}
                                    </p>

                                </div>


                                <!-- Quantity -->
                                <div>

                                    <label
                                        class="block
                                               text-sm
                                               font-medium
                                               text-slate-700
                                               mb-1.5"
                                    >
                                        Quantity
                                    </label>

                                    <input
                                        v-model="form.quantity"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        :class="[
                                            'w-full px-4 py-2.5',
                                            'border rounded-xl',
                                            'text-sm text-slate-900',
                                            'outline-none transition',
                                            errors.quantity
                                                ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                                                : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                        ]"
                                    />

                                    <p
                                        v-if="errors.quantity"
                                        class="mt-1.5
                                               text-xs
                                               text-red-600"
                                    >
                                        {{ errors.quantity }}
                                    </p>

                                </div>

                            </div>


                            <!-- ================================= -->
                            <!-- DESCRIPTION -->
                            <!-- ================================= -->

                            <div>

                                <div
                                    class="flex items-center
                                           justify-between
                                           mb-1.5"
                                >

                                    <label
                                        class="block
                                               text-sm
                                               font-medium
                                               text-slate-700"
                                    >
                                        Description
                                    </label>

                                    <span
                                        class="text-xs
                                               text-slate-400"
                                    >
                                        Optional
                                    </span>

                                </div>

                                <textarea
                                    v-model="form.description"
                                    rows="4"
                                    placeholder="Describe the product..."
                                    :class="[
                                        'w-full px-4 py-3',
                                        'border rounded-xl',
                                        'text-sm text-slate-900',
                                        'placeholder:text-slate-400',
                                        'resize-none',
                                        'outline-none transition',
                                        errors.description
                                            ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                                            : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                    ]"
                                ></textarea>

                                <p
                                    v-if="errors.description"
                                    class="mt-1.5
                                           text-xs
                                           text-red-600"
                                >
                                    {{ errors.description }}
                                </p>

                            </div>

                        </div>


                        <!-- ========================================= -->
                        <!-- FOOTER -->
                        <!-- ========================================= -->

                        <div
                            class="flex justify-end
                                   gap-3
                                   px-6 py-4
                                   border-t border-slate-200
                                   bg-slate-50/50"
                        >

                            <!-- Cancel -->
                            <button
                                type="button"
                                @click="close"
                                :disabled="loading"
                                class="px-4 py-2.5
                                       rounded-xl
                                       border border-slate-300
                                       bg-white
                                       text-slate-700
                                       text-sm
                                       font-medium
                                       hover:bg-slate-50
                                       transition-colors
                                       cursor-pointer
                                       disabled:opacity-50
                                       disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>


                            <!-- Create -->
                            <button
                                type="submit"
                                :disabled="loading"
                                class="inline-flex
                                       items-center
                                       justify-center
                                       gap-2
                                       min-w-[140px]
                                       px-4 py-2.5
                                       rounded-xl
                                       bg-slate-900
                                       text-white
                                       text-sm
                                       font-medium
                                       hover:bg-slate-800
                                       transition-colors
                                       cursor-pointer
                                       disabled:opacity-50
                                       disabled:cursor-not-allowed"
                            >

                                <!-- Spinner -->
                                <svg
                                    v-if="loading"
                                    class="w-4 h-4 animate-spin"
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

                                {{ loading
                                    ? 'Creating...'
                                    : 'Create Product'
                                }}

                            </button>

                        </div>

                    </form>

                </div>

            </Transition>

        </div>

    </Transition>

</template>


<script setup>

import {
    onMounted,
    onUnmounted,
    reactive,
    ref
} from 'vue'

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

        const response =
            await api.get('/category')

        categories.value =
            response.data.data

    }

    catch (error) {

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

        })


        emit('created')

        emit('close')

    }

    catch (error) {

        console.error(error)


        if (
            error.response?.status === 422
        ) {

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

        }

        else {

            generalError.value =
                error.response?.data?.message ||
                'Failed to create product'

        }

    }

    finally {

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
| Escape
|--------------------------------------------------------------------------
*/

const handleEscape = (event) => {

    if (event.key === 'Escape') {

        close()

    }

}


/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

onMounted(() => {

    getCategories()

    window.addEventListener(
        'keydown',
        handleEscape
    )

})


onUnmounted(() => {

    window.removeEventListener(
        'keydown',
        handleEscape
    )

})

</script>