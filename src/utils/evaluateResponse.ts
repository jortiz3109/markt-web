import pinia from '@/store'
import router from '@/routes/web'
import { useErrorStore } from '@/store/errorStore'
import { validationError } from '@/types'
import { HTTP_INTERNAL_SERVER_ERROR, HTTP_UNAUTHORIZED, HTTP_UNPROCESSABLE_ENTITY } from '@/constants/httpStatuses'
import { useAuthStore } from '@/store/authStore'

export const evaluateResponse = (response: Response): Promise<any> | Error => {
    if (response.ok) {
        return response.json()
    }
    
    evaluateError(response)

    return new Error('Request error');
}

const evaluateError = (response: Response): void => {
    const errorStore = useErrorStore(pinia)

    response.json().then(body => {
        switch (response.status) {
            case HTTP_UNAUTHORIZED:
                const authStore = useAuthStore(pinia)
                authStore.clear()
                router.push({ name: 'login' })
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
            case HTTP_INTERNAL_SERVER_ERROR:
                console.log('Server error');
                break
        }
    })
}