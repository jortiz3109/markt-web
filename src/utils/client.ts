import axios from 'axios'
import { useErrorStore } from '@/store/errorStore'
import pinia from '@/store'

const errorStore = useErrorStore(pinia)

const interceptErrors = (error: any) => {
    if (error.response.status === 422 && error?.response?.data?.errors) {
        errorStore.setValidationErrors(error.response.data.errors)
    }

    return Promise.reject(error);
}

const axiosSetup = () => {
    const instance = axios.create()
    instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    instance.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'
    instance.defaults.headers.common['Accept'] = 'application/json'
    instance.defaults.withCredentials = true
    instance.interceptors.response.use(response => response, error => interceptErrors(error))

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