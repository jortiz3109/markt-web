import pinia from '@/store'
import { evaluateResponse } from '@/utils/evaluateResponse'
import { HttpClient } from './HttpClient'
import { useErrorStore } from '@/store/errorStore'
import { useAuthStore } from '@/store/authStore'
import { apiGetRequest, apiPostRequest } from '@/types'

export function useApiClient() {
    const client = new HttpClient()
    const errorStore = useErrorStore(pinia)
    const authStore = useAuthStore(pinia)

    const clearErrors = () => errorStore.clear()

    const prepare = (): void => {
        clearErrors()
        renewToken()
        addBearerToken()
    }

    const addBearerToken = (): void => {
        if (authStore.hasBearerToken()) {
            client.setBearerToken(authStore.getBearerToken())
        }
    }

    const get = async (url: string, query: any = {}): Promise<any> => {
        prepare()
        const request: apiGetRequest = {
            url,
            query,
            method: 'GET'
        }

        return client.get(request).then((response: Response) => evaluateResponse(response))
    }

    const post = async (url: string, data: any = {}): Promise<any> => {
        prepare()

        const request: apiPostRequest = {
            url,
            data,
            method:'POST'
        }

        return client.post(request).then((response: Response) => evaluateResponse(response))
    }

    const put = async (url: string, data: any = {}): Promise<any> => {
        prepare()

        const request: apiPostRequest = {
            url,
            data,
            method:'PUT'
        }

        return client.post(request).then((response: Response) => evaluateResponse(response))
    }

    const patch = async (url: string, data: any = {}) => {
        prepare()

        const request: apiPostRequest = {
            url,
            data,
            method:'PATCH'
        }

        return client.post(request).then((response: Response) => evaluateResponse(response))
    }

    const logout = async (): Promise<any> => {
        clearErrors()
        addBearerToken()
        post('/auth/logout')
    }

    const login = async (credentials: {email: string, password: string}): Promise<any> => {
        clearErrors()

        const request: apiPostRequest = {
            url: 'auth/login',
            method:'POST',
            data: credentials
        }
        
        return client.post(request).then((response: Response) => evaluateResponse(response))
    }

    const renewToken = (): void => {
        const tokenExpiration = authStore.getTokenExpiration()
        if (tokenExpiration) {
            const tokenExpirationDate = new Date(tokenExpiration)
            const actualDate = new Date()

            const diffMs = +tokenExpirationDate - +actualDate;
            const diffMins = Math.floor((diffMs / 1000) / 60);

            if (tokenExpirationDate > actualDate && diffMins <= 5) {
                const request: apiPostRequest = {
                    url: '/auth/token/renew',
                    method:'POST',
                    data: {}
                }

                client.post(request)
                    .then((response: Response) => response.json())
                    .then((response) => authStore.setTokenExpiration(response.data.expires_at))
            }
        }
    }

    return { get, post, put, patch, login, logout }
}