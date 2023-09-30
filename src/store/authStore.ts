import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        user: {
            name: '',
            email: ''
        }
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
        getUser(): {name: string, email: string} {
            return this.user
        },
        clear(): void {
            this.$reset
        }
    }
})