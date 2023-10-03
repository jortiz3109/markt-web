import client from '@/utils/client'

export function useProfileService(authStore) {
    const info = async (): Promise<any> => {
        client.get('/api/user/info').then((response) => {
            const { name, email } = response.data.user
            
            authStore.setUser({ name, email })
        });
    }
    
    return { info }
}