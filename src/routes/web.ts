import { createWebHistory, createRouter, NavigationFailureType, isNavigationFailure, RouteRecordRaw } from 'vue-router'

const LoginView = () => import('@/views/LoginView.vue')
const HomeView = () => import('@/views/HomeView.vue')
const HomeComponent = () => import('@/components/HelloWorld.vue')

import { authenticatedGuard, guestGuard } from './guards'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: HomeComponent,
    },
    {
        name: 'login',
        path: '/login',
        component: LoginView,
        meta: {
            guards: [guestGuard]
        }
    },
    {
        name: 'home',
        path: '/home',
        component: HomeView,
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

    for (const guard of guards) {
        const guardResponse = guard({to, from})

        if (guardResponse !== true) {
            return guardResponse
        }
    }   
    
    return true
})

export default router