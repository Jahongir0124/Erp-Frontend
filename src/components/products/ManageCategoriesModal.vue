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
                                        d="M4 6h16M4 10h16M4 14h10M4 18h7"
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
                                    Manage Categories
                                </h2>

                                <p
                                    class="text-sm
                                           text-slate-500
                                           mt-0.5"
                                >
                                    Create and manage product categories
                                </p>

                            </div>

                        </div>


                        <!-- Close -->
                        <button
                            type="button"
                            @click="close"
                            :disabled="isBusy"
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
                    <!-- CONTENT -->
                    <!-- ========================================= -->

                    <div class="flex-1 overflow-y-auto">

                        <div class="px-6 py-5">


                            <!-- ================================= -->
                            <!-- ADD CATEGORY -->
                            <!-- ================================= -->

                            <div class="mb-6">

                                <label
                                    class="block
                                           text-sm
                                           font-medium
                                           text-slate-700
                                           mb-1.5"
                                >
                                    Add Category
                                </label>


                                <div class="flex gap-2">

                                    <input
                                        v-model="newCategory.name"
                                        type="text"
                                        placeholder="Category name..."
                                        :disabled="creating"
                                        class="flex-1
                                               px-4 py-2.5
                                               border border-slate-300
                                               rounded-xl
                                               text-sm
                                               text-slate-900
                                               placeholder:text-slate-400
                                               outline-none
                                               focus:border-blue-500
                                               focus:ring-2
                                               focus:ring-blue-500/20
                                               transition
                                               disabled:bg-slate-50"
                                        @keyup.enter="createCategory"
                                    />


                                    <button
                                        type="button"
                                        @click="createCategory"
                                        :disabled="creating"
                                        class="inline-flex
                                               items-center
                                               justify-center
                                               gap-2
                                               min-w-[90px]
                                               px-4
                                               py-2.5
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
                                            v-if="creating"
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

                                        <span>
                                            {{ creating ? 'Adding...' : 'Add' }}
                                        </span>

                                    </button>

                                </div>


                                <!-- Create Error -->
                                <div
                                    v-if="createError"
                                    class="flex items-center gap-2
                                           mt-2
                                           text-sm
                                           text-red-600"
                                >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-4 h-4 flex-shrink-0"
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

                                    <span>
                                        {{ createError }}
                                    </span>

                                </div>

                            </div>


                            <!-- ================================= -->
                            <!-- SECTION TITLE -->
                            <!-- ================================= -->

                            <div
                                class="flex items-center
                                       justify-between
                                       mb-3"
                            >

                                <h3
                                    class="text-sm
                                           font-semibold
                                           text-slate-800"
                                >
                                    Categories
                                </h3>

                                <span
                                    v-if="!loading"
                                    class="text-xs
                                           text-slate-400"
                                >
                                    {{ categories.length }}
                                    {{ categories.length === 1
                                        ? 'category'
                                        : 'categories'
                                    }}
                                </span>

                            </div>


                            <!-- ================================= -->
                            <!-- LOADING -->
                            <!-- ================================= -->

                            <div
                                v-if="loading"
                                class="flex flex-col
                                       items-center
                                       justify-center
                                       py-12"
                            >

                                <svg
                                    class="w-7 h-7
                                           animate-spin
                                           text-blue-600
                                           mb-3"
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

                                <p
                                    class="text-sm
                                           text-slate-500"
                                >
                                    Loading categories...
                                </p>

                            </div>


                            <!-- ================================= -->
                            <!-- EMPTY -->
                            <!-- ================================= -->

                            <div
                                v-else-if="categories.length === 0"
                                class="flex flex-col
                                       items-center
                                       justify-center
                                       py-12
                                       rounded-xl
                                       border border-dashed
                                       border-slate-300
                                       bg-slate-50"
                            >

                                <div
                                    class="w-12 h-12
                                           rounded-xl
                                           bg-white
                                           border border-slate-200
                                           flex items-center
                                           justify-center
                                           text-slate-400
                                           mb-3"
                                >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="1.8"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4 6h16M4 10h16M4 14h10M4 18h7"
                                        />
                                    </svg>

                                </div>

                                <p
                                    class="text-sm
                                           font-medium
                                           text-slate-600"
                                >
                                    No categories found
                                </p>

                                <p
                                    class="text-xs
                                           text-slate-400
                                           mt-1"
                                >
                                    Add your first category above
                                </p>

                            </div>


                            <!-- ================================= -->
                            <!-- CATEGORY LIST -->
                            <!-- ================================= -->

                            <div
                                v-else
                                class="space-y-2"
                            >

                                <div
                                    v-for="category in categories"
                                    :key="category.id"
                                    class="group
                                           rounded-xl
                                           border border-slate-200
                                           bg-white
                                           transition-all
                                           duration-150
                                           hover:border-slate-300
                                           hover:shadow-sm"
                                >

                                    <!-- ================================= -->
                                    <!-- VIEW MODE -->
                                    <!-- ================================= -->

                                    <div
                                        v-if="editingId !== category.id"
                                        class="flex items-center
                                               justify-between
                                               gap-3
                                               p-3.5"
                                    >

                                        <!-- Category Info -->
                                        <div
                                            class="flex items-center
                                                   gap-3
                                                   min-w-0"
                                        >

                                            <div
                                                class="w-9 h-9
                                                       flex-shrink-0
                                                       rounded-lg
                                                       bg-slate-100
                                                       text-slate-600
                                                       flex items-center
                                                       justify-center"
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
                                                        d="M4 6h16M4 10h16M4 14h10M4 18h7"
                                                    />
                                                </svg>

                                            </div>


                                            <div class="min-w-0">

                                                <p
                                                    class="font-medium
                                                           text-sm
                                                           text-slate-800
                                                           truncate"
                                                >
                                                    {{ category.name }}
                                                </p>

                                                <p
                                                    v-if="category.description"
                                                    class="text-xs
                                                           text-slate-400
                                                           truncate
                                                           mt-0.5"
                                                >
                                                    {{ category.description }}
                                                </p>

                                            </div>

                                        </div>


                                        <!-- Actions -->
                                        <div
                                            class="flex
                                                   items-center
                                                   gap-1.5
                                                   flex-shrink-0"
                                        >

                                            <!-- Edit -->
                                            <button
                                                type="button"
                                                @click="startEdit(category)"
                                                :disabled="isBusy"
                                                class="w-9 h-9
                                                       flex items-center
                                                       justify-center
                                                       rounded-lg
                                                       text-slate-500
                                                       hover:bg-slate-100
                                                       hover:text-slate-800
                                                       transition-colors
                                                       cursor-pointer
                                                       disabled:opacity-40
                                                       disabled:cursor-not-allowed"
                                                title="Edit"
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
                                                        d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213 3 20.5l1.287-4.5L16.862 3.487z"
                                                    />
                                                </svg>

                                            </button>


                                            <!-- Delete -->
                                            <button
                                                type="button"
                                                @click="deleteCategory(category)"
                                                :disabled="isBusy"
                                                class="w-9 h-9
                                                       flex items-center
                                                       justify-center
                                                       rounded-lg
                                                       text-red-500
                                                       hover:bg-red-50
                                                       hover:text-red-600
                                                       transition-colors
                                                       cursor-pointer
                                                       disabled:opacity-40
                                                       disabled:cursor-not-allowed"
                                                title="Delete"
                                            >

                                                <svg
                                                    v-if="deletingId !== category.id"
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
                                                        d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v12a1 1 0 01-1 1H8a1 1 0 01-1-1V7m3 4v5m4-5v5"
                                                    />
                                                </svg>


                                                <svg
                                                    v-else
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

                                            </button>

                                        </div>

                                    </div>


                                    <!-- ================================= -->
                                    <!-- EDIT MODE -->
                                    <!-- ================================= -->

                                    <div
                                        v-else
                                        class="p-3.5"
                                    >

                                        <div
                                            class="flex
                                                   items-center
                                                   gap-2"
                                        >

                                            <input
                                                v-model="editName"
                                                type="text"
                                                :disabled="updating"
                                                class="flex-1
                                                       px-3.5 py-2.5
                                                       border border-blue-400
                                                       rounded-lg
                                                       text-sm
                                                       text-slate-900
                                                       outline-none
                                                       ring-2
                                                       ring-blue-500/10
                                                       disabled:bg-slate-50"
                                                @keyup.enter="updateCategory(category)"
                                            />


                                            <!-- Save -->
                                            <button
                                                type="button"
                                                @click="updateCategory(category)"
                                                :disabled="updating"
                                                class="inline-flex
                                                       items-center
                                                       justify-center
                                                       gap-1.5
                                                       px-3.5 py-2.5
                                                       rounded-lg
                                                       bg-slate-900
                                                       text-white
                                                       text-sm
                                                       font-medium
                                                       hover:bg-slate-800
                                                       transition-colors
                                                       cursor-pointer
                                                       disabled:opacity-50"
                                            >

                                                <svg
                                                    v-if="updating"
                                                    class="w-3.5 h-3.5 animate-spin"
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

                                                {{ updating
                                                    ? 'Saving...'
                                                    : 'Save'
                                                }}

                                            </button>


                                            <!-- Cancel -->
                                            <button
                                                type="button"
                                                @click="cancelEdit"
                                                :disabled="updating"
                                                class="px-3.5 py-2.5
                                                       rounded-lg
                                                       border
                                                       border-slate-300
                                                       bg-white
                                                       text-slate-600
                                                       text-sm
                                                       font-medium
                                                       hover:bg-slate-50
                                                       transition-colors
                                                       cursor-pointer
                                                       disabled:opacity-50"
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    <!-- ========================================= -->
                    <!-- FOOTER -->
                    <!-- ========================================= -->

                    <div
                        class="flex items-center
                               justify-between
                               px-6 py-4
                               border-t border-slate-200
                               bg-slate-50/50"
                    >

                        <p
                            class="text-xs
                                   text-slate-400"
                        >
                            Changes are saved automatically.
                        </p>

                        <button
                            type="button"
                            @click="close"
                            :disabled="isBusy"
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
                            Close
                        </button>

                    </div>

                </div>

            </Transition>

        </div>

    </Transition>

</template>


<script setup>

import {
    computed,
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
    'updated'
])


/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const categories = ref([])

const loading = ref(false)

const creating = ref(false)

const updating = ref(false)

const deletingId = ref(null)

const editingId = ref(null)

const editName = ref('')

const createError = ref('')


const newCategory = reactive({
    name: ''
})


/*
|--------------------------------------------------------------------------
| Busy State
|--------------------------------------------------------------------------
*/

const isBusy = computed(() => {

    return (
        loading.value ||
        creating.value ||
        updating.value ||
        deletingId.value !== null
    )

})


/*
|--------------------------------------------------------------------------
| Get Categories
|--------------------------------------------------------------------------
*/

const getCategories = async () => {

    try {

        loading.value = true

        const response =
            await api.get('/category')

        categories.value =
            response.data.data

    }

    catch (error) {

        console.error(error)

    }

    finally {

        loading.value = false

    }

}


/*
|--------------------------------------------------------------------------
| Create Category
|--------------------------------------------------------------------------
*/

const createCategory = async () => {

    createError.value = ''

    const name =
        newCategory.name.trim()


    if (!name) {

        createError.value =
            'Category name is required'

        return

    }


    try {

        creating.value = true

        await api.post('/category', {
            name: name
        })


        newCategory.name = ''


        await getCategories()


        emit('updated')

    }

    catch (error) {

        console.error(error)


        if (
            error.response?.status === 422
        ) {

            createError.value =
                error.response.data.errors?.name?.[0] ||
                'Invalid category'

        }

        else {

            createError.value =
                'Failed to create category'

        }

    }

    finally {

        creating.value = false

    }

}


/*
|--------------------------------------------------------------------------
| Start Edit
|--------------------------------------------------------------------------
*/

const startEdit = (category) => {

    if (isBusy.value) {

        return

    }

    editingId.value =
        category.id

    editName.value =
        category.name

}


/*
|--------------------------------------------------------------------------
| Cancel Edit
|--------------------------------------------------------------------------
*/

const cancelEdit = () => {

    if (updating.value) {

        return

    }

    editingId.value = null

    editName.value = ''

}


/*
|--------------------------------------------------------------------------
| Update Category
|--------------------------------------------------------------------------
*/

const updateCategory = async (category) => {

    const name =
        editName.value.trim()


    if (!name) {

        return

    }


    try {

        updating.value = true


        await api.patch(
            `/category/${category.id}`,
            {
                name: name
            }
        )


        await getCategories()


        cancelEdit()


        emit('updated')

    }

    catch (error) {

        console.error(error)

    }

    finally {

        updating.value = false

    }

}


/*
|--------------------------------------------------------------------------
| Delete Category
|--------------------------------------------------------------------------
*/

const deleteCategory = async (category) => {

    if (isBusy.value) {

        return

    }


    const confirmed =
        confirm(
            `Are you sure you want to delete ${category.name}?`
        )


    if (!confirmed) {

        return

    }


    try {

        deletingId.value =
            category.id


        await api.delete(
            `/category/${category.id}`
        )


        await getCategories()


        emit('updated')

    }

    catch (error) {

        console.error(error)

        alert(
            error.response?.data?.message ||
            'Failed to delete category'
        )

    }

    finally {

        deletingId.value = null

    }

}


/*
|--------------------------------------------------------------------------
| Close
|--------------------------------------------------------------------------
*/

const close = () => {

    if (isBusy.value) {

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