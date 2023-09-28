import { createWebHistory, createRouter } from 'vue-router'

const loginComponent = () => import('@/components/auth/Login.vue')
const homeComponent = () => import('@/components/HelloWorld.vue')
import Home from '@/components/Home.vue'
import { useAuthStore } from '@/store/authStore'

const routes = [
    {
        path: '/',
        component: homeComponent,
        meta: {
            middleware: "auth"
        }
    },
    {
        name: 'login',
        path: '/login',
        component: loginComponent,
        meta: {
            middleware: 'guest'
        },
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: {
            middleware: 'auth'
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    const authStore = useAuthStore()

    if (to.meta.middleware === 'auth' && authStore.isGuest()) {
        return { name: 'login' }
    }

    if (to.meta.middleware === 'guest' && authStore.isAuthenticated()) {
        return { name: from.name }
    }

    return true;
})

export default router