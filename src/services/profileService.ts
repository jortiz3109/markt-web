import { useApiClient } from "@/utils/apiClient";

const apiClient = useApiClient()

export function useProfileService(authStore) {
    const info = async (): Promise<any> => {
        apiClient.get('/api/user/info').then((response) => {
            const { name, email } = response.data.user
            
            authStore.setUser({ name, email })
        });
    }
    
    return { info }
}