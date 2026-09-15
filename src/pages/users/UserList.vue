<template>
<div class="space-y-6">

    <!-- Header -->
    <div class="flex justify-between items-center">

        <div>
            <h1 class="text-3xl font-bold">
                Users
            </h1>

            <p class="text-slate-500">
                Manage system users
            </p>
        </div>

        <button
            v-if="auth.hasPermission('create-user')"
            @click="showCreateModal = true"
            class="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl transition cursor-pointer">

            Add User

        </button>
       

    </div>

    <!-- Search -->
    <div
        class="bg-white border border-slate-200 rounded-2xl p-4">

        <input
            v-model="search"
            type="text"
            placeholder="Search users..."
            class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">

    </div>

    <!-- Table -->
    <div
        class="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <table class="w-full">

            <thead class="bg-slate-50">

                <tr>
                    <th class="text-left p-4">№</th>
                    <th class="text-left p-4">Name</th>
                    <th class="text-left p-4">Email</th>
                    <th class="text-left p-4">Role</th>
                    <th class="text-left p-4">Status</th>
                    <th class="text-left p-4">Actions</th>

                </tr>

            </thead>

            <tbody>

                <tr
                    v-for="(user, index) in filteredUsers"
                    :key="user.id"
                    class="border-t hover:bg-slate-50">
                    <td class="p-4">
                        {{ index + 1 }}
                    </td>   
                    <td class="p-4">
                        {{ user.name }}
                    </td>

                    <td class="p-4">
                        {{ user.email }}
                    </td>

                    <td class="p-4">
                        {{ user.roles?.[0] || '-' }}
                    </td>

                    <td class="p-4">

                        <span
                            :class="user.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'"
                            class="px-3 py-1 rounded-full text-xs">

                            {{ user.status }}

                        </span>

                    </td>

                    <td class="p-4 flex gap-2">

                        <button
                            v-if="auth.hasPermission('update-user')"
                            @click="editUser(user)"
                            class="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer transition">

                            Edit

                        </button>
                         <button
                            v-if="auth.hasPermission('change-role-user')"
                            @click="changeRole(user)"
                            class="px-3 py-1 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer">
                            Role
                        </button>
                        <button
                            v-if="auth.hasPermission('change-status-user')"
                            @click="changeStatus(user)"
                            class="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 cursor-pointer transition">
                            Status
                        </button>

                        <button
                            v-if="auth.hasPermission('delete-user')"
                            @click="deleteUser(user)"
                            class="px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer transition">

                            Delete

                        </button>

                    </td>

                </tr>

                <tr v-if="filteredUsers.length === 0">

                    <td
                        colspan="5"
                        class="text-center p-8 text-slate-500">

                        No users found

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>
<CreateUserModal
    v-if="showCreateModal"
    :roles="roles"
    @close="showCreateModal = false"
    @created="getUsers"
/>
<EditUserModal
    v-if="showEditModal"
    :user="selectedUser"
    @close="showEditModal = false"
    @updated="getUsers"
/>
<ChangeRoleModal
    v-if="showRoleModal"
    :user="selectedUser"
    :roles="roles"
    @close="showRoleModal = false"
    @updated="getUsers"
/>
<ChangeStatusModal
    v-if="showStatusModal"
    :user="selectedUser"
    @close="showStatusModal = false"
    @updated="getUsers"
/>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../../services/api'
import { useAuthStore } from '../../stores/auth'
import CreateUserModal from '../../components/users/CreateUserModal.vue'
import EditUserModal from '../../components/users/EditUserModal.vue'
import ChangeRoleModal from '../../components/users/ChangeRoleModal.vue'
import ChangeStatusModal from '../../components/users/ChangeStatusModal.vue'
const auth = useAuthStore()
const roles = ref([])
const users = ref([])
const search = ref('')
const loading = ref(false)
const showEditModal = ref(false)
const selectedUser = ref(null)
const showCreateModal = ref(false)
const showRoleModal = ref(false)
const showStatusModal = ref(false)
const getRoles = async () => {
    
    try {
        const response = await api.get('/roles')
        roles.value = response.data.data
    }

    catch (error) {
        console.error(error)
    }
}

const changeRole =  (user) => {
    selectedUser.value = user
    showRoleModal.value = true
}

const changeStatus = (user) => {
    selectedUser.value = user
    showStatusModal.value = true
}
const getUsers = async () => {

    try {

        loading.value = true

        const response = await api.get('/users')

        users.value = response.data.data

    } catch (error) {

        console.error(error)

    } finally {

        loading.value = false

    }

}

const editUser = (user) => {
    selectedUser.value = user
    showEditModal.value = true
}
const filteredUsers = computed(() => {

    return users.value.filter(user =>
        user.name
            .toLowerCase()
            .includes(search.value.toLowerCase())
    )

})

const deleteUser = async (user) => {

    const confirmed = confirm(
        `${user.name} - shu foydalanuvchi o'chirilsinmi?`
    )

    if (!confirmed){
        return
    }

    try {

        await api.delete(`/users/${user.id}`)
        await getUsers()
    }

    catch (error) {
        console.error(error)
        alert(`Xato ${error}`)
    }
}

onMounted(() => {
    getUsers()
    getRoles()
})
</script>