import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        user: reactive({})
    }),
    persist: {
        storage: sessionStorage,
    },
    actions: {
        setUser(user: {name:string, email: string}): void {
            this.user = user
        },
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
        getUser() {
            return this.user
        },
        clear(): void {
            this.authenticated = false
            this.user = {}
        }
    }
})