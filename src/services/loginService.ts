import client from '@/utils/client'
import router from '@/routes/web'
import { useAuthStore } from '@/store/authStore'

export function useLoginService() {
    const authStore = useAuthStore()
    
    const login = async (credentials: { email: string, password: string }): Promise<any> => {
        await client.get('/sanctum/csrf-cookie').then(() => {
            client.post('/auth/login', credentials).then(() => {
                authStore.setAuthenticated()
                router.push({ name: 'home' })
            })
        })
    }

    return { login }
}