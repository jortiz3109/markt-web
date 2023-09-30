import client from '@/utils/client'
import { useAuthStore } from '@/store/authStore';

export function useProfileService() {
    const authStore = useAuthStore()
    
    const info = async (): Promise<any> => {
        client.get('/user/info').then((response) => {
            const { name, email } = response.data.user
            
            authStore.setUser({ name, email })
        });
    }
    
    return { info }
}