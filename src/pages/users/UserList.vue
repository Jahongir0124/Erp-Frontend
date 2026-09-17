<template>
    <div class="space-y-6">

        <!-- Header -->
        <div class="flex justify-between items-center">

            <div>
                <h1 class="text-3xl font-bold text-slate-900">
                    Users
                </h1>

                <p class="text-slate-500 mt-1">
                    Manage system users
                </p>
            </div>

            <button v-if="auth.hasPermission('create-user')" @click="showCreateModal = true"
                class="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl transition cursor-pointer">
                Add User
            </button>

        </div>


        <!-- Filters -->
        <div class="bg-white border border-slate-200 rounded-2xl p-4">

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">

                <!-- Search -->
                <div class="md:col-span-2">

                    <label class="block text-sm font-medium text-slate-700 mb-2">
                        Search
                    </label>

                    <input v-model="search" type="text" placeholder="Search by name, email or role..." class="w-full p-3 border border-slate-300 rounded-xl
                               focus:outline-none focus:ring-2
                               focus:ring-blue-500">

                </div>


                <!-- Role -->
                <div>

                    <label class="block text-sm font-medium text-slate-700 mb-2">
                        Role
                    </label>

                    <select v-model="role" class="w-full p-3 border border-slate-300 rounded-xl
                               focus:outline-none focus:ring-2
                               focus:ring-blue-500">

                        <option value="">
                            All roles
                        </option>

                        <option v-for="item in roles" :key="item.id" :value="item.name">
                            {{ item.name }}
                        </option>

                    </select>

                </div>


                <!-- Status -->
                <div>

                    <label class="block text-sm font-medium text-slate-700 mb-2">
                        Status
                    </label>

                    <select v-model="status" class="w-full p-3 border border-slate-300 rounded-xl
                               focus:outline-none focus:ring-2
                               focus:ring-blue-500">

                        <option value="">
                            All statuses
                        </option>

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>

                        <option value="blocked">
                            Blocked
                        </option>

                    </select>

                </div>

            </div>


            <!-- Sort + Reset -->
            <div class="flex justify-between items-center mt-4">

                <div class="flex items-center gap-3">

                    <label class="text-sm font-medium text-slate-700">
                        Sort:
                    </label>

                    <select v-model="sort" class="px-3 py-2 border border-slate-300 rounded-lg
                               focus:outline-none focus:ring-2
                               focus:ring-blue-500">

                        <option value="desc">
                            Newest first
                        </option>

                        <option value="asc">
                            Oldest first
                        </option>

                    </select>

                </div>


                <button @click="resetFilters" class="px-4 py-2 text-sm rounded-lg
                           border border-slate-300
                           text-slate-600
                           hover:bg-slate-50
                           transition cursor-pointer">
                    Reset
                </button>

            </div>

        </div>


        <!-- Table -->
        <!-- Users Table -->
        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">

            <div class="overflow-x-auto">

                <table class="w-full text-sm">

                    <!-- Table Header -->
                    <thead class="bg-slate-50 border-b border-slate-200">

                        <tr>

                            <th class="text-left px-6 py-4 font-semibold text-slate-600">
                                #
                            </th>

                            <th class="text-left px-6 py-4 font-semibold text-slate-600">
                                User
                            </th>

                            <th class="text-left px-6 py-4 font-semibold text-slate-600">
                                Email
                            </th>

                            <th class="text-left px-6 py-4 font-semibold text-slate-600">
                                Role
                            </th>

                            <th class="text-left px-6 py-4 font-semibold text-slate-600">
                                Status
                            </th>

                            <th class="text-right px-6 py-4 font-semibold text-slate-600">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody class="divide-y divide-slate-100">

                        <!-- Loading -->
                        <tr v-if="loading">

                            <td colspan="6" class="px-6 py-12 text-center text-slate-500">
                                <div class="flex justify-center items-center gap-3">

                                    <div class="w-5 h-5 border-2
                                       border-slate-300
                                       border-t-slate-700
                                       rounded-full animate-spin"></div>

                                    Loading users...

                                </div>
                            </td>

                        </tr>


                        <!-- Users -->
                        <tr v-for="(user, index) in users" :key="user.id" v-else
                            class="hover:bg-slate-50/70 transition-colors duration-150">

                            <!-- Number -->
                            <td class="px-6 py-4 text-slate-400 font-medium">
                                {{ getRowNumber(index) }}
                            </td>


                            <!-- User -->
                            <td class="px-6 py-4">

                                <div class="flex items-center gap-3">

                                    <!-- Avatar -->
                                    <div class="w-10 h-10 rounded-full
                                       bg-slate-900
                                       text-white
                                       flex items-center justify-center
                                       font-semibold
                                       text-sm
                                       shrink-0">
                                        {{ user.name?.charAt(0)?.toUpperCase() }}
                                    </div>


                                    <!-- Name -->
                                    <div>

                                        <p class="font-semibold text-slate-900">
                                            {{ user.name }}
                                        </p>

                                        <p class="text-xs text-slate-400">
                                            ID: #{{ user.id }}
                                        </p>

                                    </div>

                                </div>

                            </td>


                            <!-- Email -->
                            <td class="px-6 py-4 text-slate-600">
                                {{ user.email }}
                            </td>


                            <!-- Role -->
                            <td class="px-6 py-4">

                                <div class="flex flex-wrap gap-1.5">

                                    <span v-for="roleName in user.roles" :key="roleName" class="inline-flex items-center
                                       px-2.5 py-1
                                       rounded-lg
                                       bg-purple-50
                                       text-purple-700
                                       border border-purple-100
                                       text-xs
                                       font-medium">
                                        {{ roleName }}
                                    </span>

                                    <span v-if="!user.roles?.length" class="text-slate-400">
                                        —
                                    </span>

                                </div>

                            </td>


                            <!-- Status -->
                            <td class="px-6 py-4">

                                <span class="inline-flex items-center gap-1.5
                                   px-2.5 py-1.5
                                   rounded-full
                                   text-xs
                                   font-semibold" :class="statusClass(user.status)">

                                    <span class="w-1.5 h-1.5 rounded-full bg-current"></span>

                                    {{ user.status }}

                                </span>

                            </td>


                            <!-- Actions -->
                            <td class="px-6 py-4">

                                <div class="flex justify-end items-center gap-1.5">


                                    <!-- Edit -->
                                    <button v-if="auth.hasPermission('update-user')" @click="editUser(user)"
                                        title="Edit user" class="group inline-flex items-center gap-1.5
                                       px-3 py-2
                                       rounded-lg
                                       text-slate-600
                                       hover:text-blue-700
                                       hover:bg-blue-50
                                       border border-transparent
                                       hover:border-blue-100
                                       transition-all
                                       duration-150
                                       cursor-pointer">

                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>

                                        <span class="hidden lg:inline">
                                            Edit
                                        </span>

                                    </button>


                                    <!-- Role -->
                                    <button v-if="auth.hasPermission('change-role-user')" @click="changeRole(user)"
                                        title="Change role" class="inline-flex items-center gap-1.5
                                       px-3 py-2
                                       rounded-lg
                                       text-slate-600
                                       hover:text-purple-700
                                       hover:bg-purple-50
                                       border border-transparent
                                       hover:border-purple-100
                                       transition-all
                                       duration-150
                                       cursor-pointer">

                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>

                                        <span class="hidden lg:inline">
                                            Role
                                        </span>

                                    </button>


                                    <!-- Status -->
                                    <button v-if="auth.hasPermission('change-status-user')" @click="changeStatus(user)"
                                        title="Change status" class="inline-flex items-center gap-1.5
                                       px-3 py-2
                                       rounded-lg
                                       text-slate-600
                                       hover:text-yellow-700
                                       hover:bg-yellow-50
                                       border border-transparent
                                       hover:border-yellow-100
                                       transition-all
                                       duration-150
                                       cursor-pointer">

                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                        <span class="hidden xl:inline">
                                            Status
                                        </span>

                                    </button>


                                    <!-- Delete -->
                                    <button v-if="auth.hasPermission('delete-user')" @click="deleteUser(user)"
                                        title="Delete user" class="inline-flex items-center gap-1.5
                                       px-3 py-2
                                       rounded-lg
                                       text-slate-600
                                       hover:text-red-700
                                       hover:bg-red-50
                                       border border-transparent
                                       hover:border-red-100
                                       transition-all
                                       duration-150
                                       cursor-pointer">

                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>

                                        <span class="hidden lg:inline">
                                            Delete
                                        </span>

                                    </button>

                                </div>

                            </td>

                        </tr>


                        <!-- Empty -->
                        <tr v-if="!loading && users.length === 0">

                            <td colspan="6" class="px-6 py-12 text-center">

                                <div class="text-slate-400">

                                    <svg class="w-10 h-10 mx-auto mb-3" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                    <p class="font-medium">
                                        No users found
                                    </p>

                                    <p class="text-sm mt-1">
                                        Try changing your search or filters
                                    </p>

                                </div>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>


        <!-- Pagination -->
        <div v-if="pagination.last_page > 1" class="flex justify-between items-center">

            <p class="text-sm text-slate-500">
                Showing
                {{ pagination.from }}
                -
                {{ pagination.to }}
                of
                {{ pagination.total }}
                users
            </p>


            <div class="flex gap-2">

                <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-2 rounded-lg border
                           border-slate-300
                           text-slate-600
                           hover:bg-slate-50
                           disabled:opacity-40
                           disabled:cursor-not-allowed
                           cursor-pointer">
                    Previous
                </button>


                <button v-for="page in pagination.last_page" :key="page" @click="changePage(page)" class="px-3 py-2 rounded-lg border
                           cursor-pointer" :class="currentPage === page
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                            ">
                    {{ page }}
                </button>


                <button @click="changePage(currentPage + 1)" :disabled="currentPage === pagination.last_page" class="px-3 py-2 rounded-lg border
                           border-slate-300
                           text-slate-600
                           hover:bg-slate-50
                           disabled:opacity-40
                           disabled:cursor-not-allowed
                           cursor-pointer">
                    Next
                </button>

            </div>

        </div>

    </div>


    <!-- Modals -->

    <CreateUserModal v-if="showCreateModal" :roles="roles" @close="showCreateModal = false"
        @created="handleUserChanged" />

    <EditUserModal v-if="showEditModal" :user="selectedUser" @close="showEditModal = false"
        @updated="handleUserChanged" />

    <ChangeRoleModal v-if="showRoleModal" :user="selectedUser" :roles="roles" @close="showRoleModal = false"
        @updated="handleUserChanged" />

    <ChangeStatusModal v-if="showStatusModal" :user="selectedUser" @close="showStatusModal = false"
        @updated="handleUserChanged" />

</template>


<script setup>

import { ref, onMounted, watch } from 'vue'

import api from '../../services/api'

import { useAuthStore } from '../../stores/auth'

import CreateUserModal
    from '../../components/users/CreateUserModal.vue'

import EditUserModal
    from '../../components/users/EditUserModal.vue'

import ChangeRoleModal
    from '../../components/users/ChangeRoleModal.vue'

import ChangeStatusModal
    from '../../components/users/ChangeStatusModal.vue'


const auth = useAuthStore()


const roles = ref([])

const users = ref([])

const search = ref('')

const role = ref('')

const status = ref('')

const sort = ref('desc')

const loading = ref(false)

const pagination = ref({})

const currentPage = ref(1)


const showEditModal = ref(false)

const selectedUser = ref(null)

const showCreateModal = ref(false)

const showRoleModal = ref(false)

const showStatusModal = ref(false)


/*
|--------------------------------------------------------------------------
| Get Roles
|--------------------------------------------------------------------------
*/

const getRoles = async () => {

    try {

        const response = await api.get('/roles')

        roles.value = response.data.data

    } catch (error) {

        console.error(error)

    }

}


/*
|--------------------------------------------------------------------------
| Get Users
|--------------------------------------------------------------------------
*/

const getUsers = async () => {

    try {

        loading.value = true

        const response = await api.get('/users', {

            params: {

                page: currentPage.value,

                search: search.value || undefined,

                role: role.value || undefined,

                status: status.value || undefined,

                sort: sort.value

            }

        })

        users.value = response.data.data

        pagination.value = response.data.meta

    } catch (error) {

        console.error(error)

    } finally {

        loading.value = false

    }

}


/*
|--------------------------------------------------------------------------
| Search / Filters
|--------------------------------------------------------------------------
*/

let searchTimer = null

watch(search, () => {

    clearTimeout(searchTimer)

    searchTimer = setTimeout(() => {

        currentPage.value = 1

        getUsers()

    }, 400)

})


watch(
    [role, status, sort],
    () => {

        currentPage.value = 1

        getUsers()

    }
)


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

    getUsers()

}


const getRowNumber = (index) => {

    return (
        (pagination.value.current_page - 1) *
        pagination.value.per_page
    ) + index + 1

}


/*
|--------------------------------------------------------------------------
| Reset Filters
|--------------------------------------------------------------------------
*/

const resetFilters = () => {

    search.value = ''

    role.value = ''

    status.value = ''

    sort.value = 'desc'

    currentPage.value = 1

    getUsers()

}


/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

const statusClass = (status) => {

    switch (status) {

        case 'active':
            return 'bg-green-50 text-green-700'

        case 'inactive':
            return 'bg-yellow-50 text-yellow-700'

        case 'blocked':
            return 'bg-red-50 text-red-700'

        default:
            return 'bg-slate-50 text-slate-600'

    }
}


/*
|--------------------------------------------------------------------------
| User actions
|--------------------------------------------------------------------------
*/

const editUser = (user) => {

    selectedUser.value = user

    showEditModal.value = true

}


const changeRole = (user) => {

    selectedUser.value = user

    showRoleModal.value = true

}


const changeStatus = (user) => {

    selectedUser.value = user

    showStatusModal.value = true

}


const handleUserChanged = () => {

    showCreateModal.value = false

    showEditModal.value = false

    showRoleModal.value = false

    showStatusModal.value = false

    getUsers()

}


/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

const deleteUser = async (user) => {

    const confirmed = confirm(
        `${user.name} - shu foydalanuvchi o'chirilsinmi?`
    )

    if (!confirmed) {
        return
    }

    try {

        await api.delete(`/users/${user.id}`)

        await getUsers()

    } catch (error) {

        console.error(error)

        alert('Userni o‘chirishda xatolik yuz berdi')

    }

}


/*
|--------------------------------------------------------------------------
| Mounted
|--------------------------------------------------------------------------
*/

onMounted(() => {

    getUsers()

    getRoles()

})

</script>