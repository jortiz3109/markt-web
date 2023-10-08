import { useApiClient } from '@/utils/apiClient'

export function useShoppingListService() {
    const apiClient = useApiClient()

    const index = async (): Promise<any> => {
        return apiClient.get('/api/shopping-lists')
    }

    return { index }
}