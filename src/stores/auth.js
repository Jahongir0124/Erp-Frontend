import { defineStore } from "pinia";
import api from '../services/api';

export const useAuthStore = defineStore('auth', {

    state: () => ({

        user: null,
        roles: [],
        permissions: [],
        token: localStorage.getItem('token')
    }),

    getters: {

        hasPermission: (state) => (permission) => {
            return state.permissions.includes(permission)
        },

        hasRole: (state) => (role) => {
            return state.roles.includes(role)
        }

    },

    actions: {

        async login(data) {
            const response = await api.post(
                '/auth/login',
                data
            )

            localStorage.setItem(
                'token',
                response.data.token
            )

            this.token = response.data.token

            await this.me()
        },

        async logout() {
            await api.post('/auth/logout')

            localStorage.removeItem('token')

            this.user = null
            this.token = null
            this.roles = []
            this.permissions = []
        },

        async me() {

            const response = await api.get('/auth/me')

            this.user = response.data.user

            this.roles = response.data.roles

            this.permissions = response.data.permissions
        }
    }
})