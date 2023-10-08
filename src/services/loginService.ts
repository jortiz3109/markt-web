import { useApiClient } from '@/utils/apiClient'
import { useAuthStore } from '@/store/authStore'
import router from '@/routes/web'
import pinia from '@/store'


export function useLoginService() {
    const apiClient = useApiClient()
    const authStore = useAuthStore(pinia)

    const login = async (credentials: { email: string, password: string }): Promise<any> => {
        apiClient.login(credentials).then((response: { token: string, expires_at: string; user: any }) => {
            const {token, expires_at} = response
            authStore.setToken({token, expiresAt: expires_at})
            authStore.setUser(response.user)
            router.push({ name: 'home' })
        })
    }

    const logout = async (): Promise<any> => {
        apiClient.logout().then(() => {
            authStore.clear()
            router.push({ name: 'login' })
        })
    }

    return { login, logout }
}