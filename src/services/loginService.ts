import client from '@/utils/client'
import router from '@/routes/web'

export function useLoginService(authStore) {
    
    const login = async (credentials: { email: string, password: string }): Promise<any> => {
        await client.get('/sanctum/csrf-cookie').then(() => {
            client.post('/auth/login', credentials).then(() => {
                authStore.setAuthenticated()
                router.push({ name: 'home' })
            })
        })
    }

    const logout = async (): Promise<any> => {
        client.post('/auth/logout').then(() => {
            authStore.clear()
            router.push({name: 'login'})
        })
    }

    return { login, logout }
}