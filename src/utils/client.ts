import axios from 'axios'
import pinia from '@/store'
import { useErrorStore } from '@/store/errorStore'

import { HTTP_UNAUTHORIZED, HTTP_UNPROCESSABLE_ENTITY, HTTP_PAGE_EXPIRED } from '@/constants/httpStatuses'

const errorStore = useErrorStore(pinia)

const interceptErrors = (error: any) => {
    switch (error.response.status) {
        case HTTP_UNAUTHORIZED:
            sessionStorage.clear()
            break;

        case HTTP_UNPROCESSABLE_ENTITY:
        case HTTP_PAGE_EXPIRED:
            errorStore.setValidationErrors(error?.response?.data?.errors)
            break;
    }

    return Promise.reject(error);
}

const processSuccessResponse = (response: any) => {
    errorStore.clear()
    return response
}

const axiosSetup = () => {
    const instance = axios.create()
    instance.defaults.maxRedirects = 0
    instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    instance.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'
    instance.defaults.headers.common['Accept'] = 'application/json'
    instance.defaults.withCredentials = true
    instance.interceptors.response.use(response => processSuccessResponse(response), error => interceptErrors(error))

    return instance
}

const get = async (url: string, data: any = {}, headers: any = {}): Promise<any> => {
    const client = axiosSetup()
    return client({
        url,
        data,
        headers
    })
}

const post = async (url: string, data: any = {}, headers: any = {}): Promise<any> => {
    const client = axiosSetup()
    return client({
        method: 'post',
        url,
        data,
        headers
    })
}

export default { get, post }