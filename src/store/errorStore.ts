import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useErrorStore = defineStore('error', {
    state: () => ({
        validation: reactive({})
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