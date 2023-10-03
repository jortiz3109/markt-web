import { createWebHistory, createRouter, NavigationFailureType, isNavigationFailure } from 'vue-router'

const loginComponent = () => import('@/components/auth/Login.vue')
const homeComponent = () => import('@/components/HelloWorld.vue')
import Home from '@/components/Home.vue'
import { authenticatedGuard, guestGuard } from './guards'
import { useAuthStore } from '@/store/authStore'

const routes = [
    {
        path: '/',
        component: homeComponent,
    },
    {
        name: 'login',
        path: '/login',
        component: loginComponent,
        meta: {
            guards: [guestGuard]
        }
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: {
            guards: [authenticatedGuard]
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to, from, failure) => {
    if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
        router.push(failure.from.path)
      }
  })

router.beforeEach((to, from) => {
    const guards = to.meta?.guards ?? []
    const authStore = useAuthStore()

    for (const guard of guards) {
        const guardResponse = guard({to, from, authStore})

        if (guardResponse !== true) {
            return guardResponse
        }
    }   
    
    return true
})

export default router