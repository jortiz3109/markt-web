import { defineStore } from 'pinia'

interface authState {
    token: {
        token: null | string,
        expiresAt: null | string
    },
    user: {
        name: string | null,
        email: string | null
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: {
            token: null,
            expiresAt: null,
        },
        user: {
            name: null,
            email: null
        }
    }) as authState,
    persist: {
        storage: localStorage,
    },
    actions: {
        setUser(user: { name: string, email: string }): void {
            this.user = user
        },
        setToken(token: {token: string, expiresAt: string}): void {
            this.token = token
        },
        getTokenExpiration(): string | null {
            return this.token.expiresAt
        },
        setTokenExpiration(expiresAt: string): void {
            this.token.expiresAt = expiresAt
        },
        hasBearerToken(): boolean {
            return null !== this.token.token
        },
        getBearerToken(): string {
            return this.token.token ?? ''
        },
        isAuthenticated(): boolean {            
            return this.token.expiresAt
                ? new Date(this.token.expiresAt) > new Date()
                : false
        },
        isGuest(): boolean {
            return false === this.isAuthenticated()
        },
        getUser() {
            return this.user
        },
        clear(): void {
            this.$reset()
        }
    }
})