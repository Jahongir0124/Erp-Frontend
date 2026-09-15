
import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../pages/Dashboard.vue";
import Login from "../pages/Login.vue";
import UserList from "../pages/users/UserList.vue";
import ProductList from "../pages/products/ProductList.vue";
import CategoryList from "../pages/categories/CategoryList.vue";
import ProductDetail from "../components/products/ProductDetail.vue";
import OrderList from "../pages/orders/OrderList.vue";
import OrderDetail from "../pages/orders/OrderDetail.vue";


const routes = [

    {
        path: "/",
        redirect: "/login"
    },

    {
        path: "/login",
        component: Login
    },

    {
        path: "/dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/users",
        component: UserList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/products",
        component: ProductList,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/products/:id',
        name: 'product-detail',
        component: ProductDetail,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/orders',
        component: OrderList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/orders/:id",
        component: OrderDetail,
        meta: {
            requiresAuth: true
        }
    },


    {
        path: "/categories",
        component: CategoryList,
        meta: {
            requiresAuth: true
        }
    }

];


const router = createRouter({
    history: createWebHistory(),
    routes
});


router.beforeEach((to) => {

    const token = localStorage.getItem("token");

    if (to.meta.requiresAuth && !token) {
        return "/login";
    }

    if (to.path === "/login" && token) {
        return "/dashboard";
    }

    return true;
});


export default router;

