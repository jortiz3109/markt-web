import { useErrorStore } from '@/store/errorStore'
import { validationError } from '@/types'
import { HTTP_UNAUTHORIZED, HTTP_UNPROCESSABLE_ENTITY } from '@/constants/httpStatuses'
import { useAuthStore } from '@/store/authStore'
import pinia from '@/store'
import router from '@/routes/web'

export const evaluateResponse = (response: Response) => {
    if (response.ok) {
        return evaluateAsSuccess(response)
    }

    return evaluateAsError(response)
}

const evaluateAsError = async (response: Response): Promise<any> => {
    const errorStore = useErrorStore(pinia)

    response.json().then(body => {
        switch (response.status) {
            case HTTP_UNAUTHORIZED:
                const authStore = useAuthStore(pinia)
                authStore.clear()
                setTimeout(() => router.push({ name: 'login' }), 125)
                break
            case HTTP_UNPROCESSABLE_ENTITY:
                if (body?.errors) {
                    const validationErrors = []
                    for (const [key, values] of Object.entries(body.errors)) {
                        validationErrors.push({ for: key, errors: values } as validationError)
                    }

                    errorStore.setValidationErrors(validationErrors)
                }
                break
        }
    })

    return Promise.reject()
}

const evaluateAsSuccess = async (response: Response): Promise<any> => {
    const body = await response.json().then((body) => {
        localStorage.removeItem('error')
        return body
    })

    return Promise.resolve(body)
}