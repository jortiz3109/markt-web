import { createWebHistory, createRouter } from 'vue-router'

const loginComponent = () => import('@/components/auth/Login.vue')
const homeComponent = () => import('@/components/HelloWorld.vue')
import Home from '@/components/Home.vue'

const routes = [
    {
        name: "login",
        path: "/login",
        component: loginComponent,
        meta: {
            middleware: "guest"
        },
    },
    {
        path: "/",
        component: homeComponent,
        meta: {
            middleware: "auth"
        }
    },
    {
        path: "/home",
        component: Home,
        meta: {
            middleware: "auth"
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router