
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
                        Manage Categories
                    </h2>

                    <p class="text-slate-500 text-sm mt-1">
                        Create and manage product categories
                    </p>
                </div>

                <button
                    type="button"
                    @click="close"
                    class="text-2xl text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                    ×
                </button>

            </div>


            <!-- Content -->
            <div class="p-6">

                <!-- Add Category -->
                <div class="flex gap-2 mb-6">

                    <input
                        v-model="newCategory.name"
                        type="text"
                        placeholder="Category name..."
                        class="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        @keyup.enter="createCategory"
                    >

                    <button
                        type="button"
                        @click="createCategory"
                        :disabled="creating"
                        class="bg-slate-900 text-white px-4 rounded-xl hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
                    >
                        {{ creating ? 'Adding...' : '+ Add' }}
                    </button>

                </div>

                <!-- Create Error -->
                <p
                    v-if="createError"
                    class="text-red-500 text-sm mb-4"
                >
                    {{ createError }}
                </p>


                <!-- Categories -->
                <div class="space-y-2">

                    <div
                        v-for="category in categories"
                        :key="category.id"
                        class="flex items-center justify-between p-3 border border-slate-200 rounded-xl"
                    >

                        <!-- View -->
                        <template v-if="editingId !== category.id">

                            <div>
                                <p class="font-medium">
                                    {{ category.name }}
                                </p>

                                <p
                                    v-if="category.description"
                                    class="text-sm text-slate-500"
                                >
                                    {{ category.description }}
                                </p>
                            </div>

                            <div class="flex gap-2">

                                <button
                                    type="button"
                                    @click="startEdit(category)"
                                    class="px-3 py-2 text-sm border rounded-lg hover:bg-slate-50 cursor-pointer"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    @click="deleteCategory(category)"
                                    :disabled="deletingId === category.id"
                                    class="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50 cursor-pointer"
                                >
                                    {{ deletingId === category.id ? 'Deleting...' : 'Delete' }}
                                </button>

                            </div>

                        </template>


                        <!-- Edit -->
                        <template v-else>

                            <div class="flex gap-2 w-full">

                                <input
                                    v-model="editName"
                                    type="text"
                                    class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    @keyup.enter="updateCategory(category)"
                                >

                                <button
                                    type="button"
                                    @click="updateCategory(category)"
                                    :disabled="updating"
                                    class="px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
                                >
                                    {{ updating ? 'Saving...' : 'Save' }}
                                </button>

                                <button
                                    type="button"
                                    @click="cancelEdit"
                                    :disabled="updating"
                                    class="px-3 py-2 border rounded-lg hover:bg-slate-50 cursor-pointer"
                                >
                                    Cancel
                                </button>

                            </div>

                        </template>

                    </div>


                    <!-- Empty -->
                    <div
                        v-if="!loading && categories.length === 0"
                        class="text-center py-8 text-slate-500"
                    >
                        No categories found
                    </div>


                    <!-- Loading -->
                    <div
                        v-if="loading"
                        class="text-center py-8 text-slate-500"
                    >
                        Loading categories...
                    </div>

                </div>

            </div>

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
| Get Categories
|--------------------------------------------------------------------------
*/

const getCategories = async () => {

    try {

        loading.value = true

        const response = await api.get('/category')

        categories.value = response.data.data

    } catch (error) {

        console.error(error)

    } finally {

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

    const name = newCategory.name.trim()

    if (!name) {

        createError.value = 'Category name is required'

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

    } catch (error) {

        console.error(error)

        if (error.response?.status === 422) {

            createError.value =
                error.response.data.errors?.name?.[0] ||
                'Invalid category'

        } else {

            createError.value =
                'Failed to create category'

        }

    } finally {

        creating.value = false

    }

}


/*
|--------------------------------------------------------------------------
| Start Edit
|--------------------------------------------------------------------------
*/

const startEdit = (category) => {

    editingId.value = category.id

    editName.value = category.name

}


/*
|--------------------------------------------------------------------------
| Cancel Edit
|--------------------------------------------------------------------------
*/

const cancelEdit = () => {

    editingId.value = null

    editName.value = ''

}


/*
|--------------------------------------------------------------------------
| Update Category
|--------------------------------------------------------------------------
*/

const updateCategory = async (category) => {

    const name = editName.value.trim()

    if (!name) {

        return

    }

    try {

        updating.value = true

        await api.patch(`/category/${category.id}`, {
            name: name
        })

        await getCategories()

        cancelEdit()

        emit('updated')

    } catch (error) {

        console.error(error)

    } finally {

        updating.value = false

    }

}


/*
|--------------------------------------------------------------------------
| Delete Category
|--------------------------------------------------------------------------
*/

const deleteCategory = async (category) => {

    const confirmed = confirm(
        `Are you sure you want to delete ${category.name}?`
    )

    if (!confirmed) {

        return

    }

    try {

        deletingId.value = category.id

        await api.delete(`/category/${category.id}`)

        await getCategories()

        emit('updated')

    } catch (error) {

        console.error(error)

        alert(
            error.response?.data?.message ||
            'Failed to delete category'
        )

    } finally {

        deletingId.value = null

    }

}


/*
|--------------------------------------------------------------------------
| Close
|--------------------------------------------------------------------------
*/

const close = () => {

    if (
        loading.value ||
        creating.value ||
        updating.value ||
        deletingId.value
    ) {

        return

    }

    emit('close')

}


/*
|--------------------------------------------------------------------------
| Load
|--------------------------------------------------------------------------
*/

onMounted(() => {

    getCategories()

})

</script>

