import pinia from '@/store'
import { useErrorStore } from '@/store/errorStore'
import { validationError } from '@/types'
import { HTTP_UNAUTHORIZED, HTTP_UNPROCESSABLE_ENTITY } from '@/constants/httpStatuses'

const errorStore = useErrorStore(pinia)

export const evaluateResponse = (response: Response) => {
    if (response.ok) {
        return evaluateAsSuccess(response)
    }

    return evaluateAsError(response)
}

const evaluateAsError = async (response: Response): Promise<any> => {
    response.json().then(body => {
        switch (response.status) {
            case HTTP_UNAUTHORIZED:
                localStorage.clear()
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