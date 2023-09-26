import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', {
    state: () => ({
        validation: {}
    }),
    actions: {
        clear(): void {
            this.validation = {}
        },
        setValidationErrors(errors: any): void {
            this.validation = errors
        },
        getValidationErrors(): object {
            return this.validation
        },
        getValidationErrorsFor(field: string): Array<any> {
            return this.validation[field] ?? []
        },
    }
})