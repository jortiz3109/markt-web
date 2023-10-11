import pinia from '@/store'
import router from '@/routes/web'
import { useErrorStore } from '@/store/errorStore'
import { validationError } from '@/types'
import { HTTP_INTERNAL_SERVER_ERROR, HTTP_UNAUTHORIZED, HTTP_UNPROCESSABLE_ENTITY } from '@/constants/httpStatuses'
import { useAuthStore } from '@/store/authStore'

export const evaluateResponse = async (response: Response): Promise<any> => {
    const body = await response.json()
    if (response.ok) {
        return body
    }

    evaluateError(response, body)

    const error = setError(response, body)
    return Promise.reject(error)
}

const setError = (response: Response, body: any) => ({
    status: response.status,
    statusText: response.statusText,
    message: body.message ?? 'Request error'
})

const evaluateError = (response: Response, body: any): void => {
    switch (response.status) {
        case HTTP_UNAUTHORIZED:
            const authStore = useAuthStore(pinia)
            authStore.clear()
            router.push({ name: 'login' })
            break
        case HTTP_UNPROCESSABLE_ENTITY:
            processValidationErrors(body?.errors)
            break
        case HTTP_INTERNAL_SERVER_ERROR:
            console.log('Server error');
            break
    }

}

const processValidationErrors = (errors: any = {}): void => {
    const errorStore = useErrorStore(pinia)
    const validationErrors = []

    for (const [key, values] of Object.entries(errors)) {
        validationErrors.push({ for: key, errors: values } as validationError)
    }

    errorStore.setValidationErrors(validationErrors)
}