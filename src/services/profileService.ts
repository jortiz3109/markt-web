import { useApiClient } from "@/utils/apiClient";

const apiClient = useApiClient()

export function useProfileService() {
    const info = async (): Promise<any> => {
        return apiClient.get('/api/user/info')
    }
    
    return { info }
}