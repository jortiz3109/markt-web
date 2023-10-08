import { evaluateResponse } from '@/utils/evaluateResponse'
import { HttpClient } from './HttpClient'
import { useErrorStore } from '@/store/errorStore'
import { useAuthStore } from '@/store/authStore'
import pinia from '@/store'


export function useApiClient() {
    const client = new HttpClient()
    const errorStore = useErrorStore(pinia)
    const authStore = useAuthStore(pinia)

    const clearErrors = () => errorStore.clear()

    const prepare = () => {
        clearErrors()
        addBearerToken()
        renewToken()
    }

    const addBearerToken = (): void => {
        if (authStore.hasBearerToken()) {
            client.setBearerToken(authStore.getBearerToken())
        }
    }

    const get = async (url: string, data: any = {}) => {
        prepare()
        return client.get(url, data).then((response: Response) => evaluateResponse(response))
    }

    const post = async (url: string, data: any = {}) => {
        prepare()
        return client.post(url, data).then((response: Response) => evaluateResponse(response))
    }

    const logout = async () => {
        clearErrors()
        addBearerToken()
        return client.post('/auth/logout').then((response: Response) => evaluateResponse(response))
    }

    const login = async (data: { email: string, password: string }) => {
        clearErrors()
        return client.post('/auth/login', data).then((response: Response) => evaluateResponse(response))
    }

    const renewToken = (): void => {
        const tokenExpiration = authStore.getTokenExpiration()
        if (tokenExpiration) {
            const tokenExpirationDate = new Date(tokenExpiration)
            const actualDate = new Date()

            if (tokenExpirationDate < actualDate) {
                return
            }

            const diffMs = +tokenExpirationDate - +actualDate;
            const diffMins = Math.floor((diffMs / 1000) / 60);

            console.log(diffMins);

            if (diffMins <= 10) {
                client.renewToken()
                    .then((response: Response) => response.json())
                    .then((response) => authStore.setTokenExpiration(response.data.expires_at))
            }
        }
    }

    const setBearerToken = (bearerToken: string) => client.setBearerToken(bearerToken)

    return { get, post, login, logout, setBearerToken }
}