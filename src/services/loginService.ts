import { useApiClient } from '@/utils/apiClient'

export function useLoginService() {
    const apiClient = useApiClient()

    const login = async (credentials: { email: string, password: string }): Promise<any> => {
        return apiClient.login(credentials)
    }

    const logout = async (): Promise<any> => {
        return apiClient.logout()
    }

    return { login, logout }
}