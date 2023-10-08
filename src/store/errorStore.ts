import { defineStore } from 'pinia'
import { validationError } from '@/types'

export const useErrorStore = defineStore('error', {
    state: () => ({
        validation: [] as validationError[]
    }),
    actions: {
        clear(): void {
            this.$reset()
        },
        setValidationError(error: validationError): void {
            this.validation.push(error)
        },
        setValidationErrors(validationErrors: validationError[]): void {
            this.validation = validationErrors
        },
        getValidationErrors(): object {
            return this.validation
        },
        getValidationErrorsFor(field: string): Array<String> {
            const error = this.validation.find((error: validationError) => error.for === field)

            return error?.errors ?? []
        },
    }
})