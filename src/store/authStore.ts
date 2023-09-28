import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
    }),
    persist: {
        storage: sessionStorage,
    },
    actions: {
        setAuthenticated(): void {
            this.authenticated = true
        },
        setUnauthenticated(): void {
            this.authenticated = false
        },
        isAuthenticated(): boolean {
            return this.authenticated
        },
        isGuest(): boolean {
            return !this.authenticated
        },
    }
})