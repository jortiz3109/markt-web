import { defineStore } from 'pinia'

interface validationError {
    for: string
    errors: string[]
}

export const useErrorStore = defineStore('error', {
    state: () => ({
        validation: [] as validationError[]
    }),
    actions: {
        clear(): void {
            this.$reset()
        },
        setValidationErrors(errors: any): void {
            for (const [key, values] of Object.entries(errors)) {
                this.validation.push({for: key, errors: values} as validationError)
            }
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