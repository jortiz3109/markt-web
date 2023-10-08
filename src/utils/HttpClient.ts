import { clientConfig } from "@/types"

export class HttpClient {
    #config: clientConfig

    constructor() {
        const headers = new Headers()
        headers.append('accept', 'application/json')
        headers.append('content-type', 'application/json')

        this.#config = {
            method: '',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: headers,
            redirect: 'manual',
            body: null
        } as clientConfig
    }

    setBearerToken(bearerToken: string) {
        const headers = this.#config.headers
        headers.append('authorization', `Bearer ${bearerToken}`)

        this.#config.headers = headers
    }

    async call(method: string, url: string, data: any = {}): Promise<any> {
        this.#config.method = method
        this.#config.body = JSON.stringify(data)

        return await fetch(url, this.#config as RequestInit)
    }

    async renewToken(): Promise<any> {
        return this.call('PATCH', 'auth/token/renew')
    }

    async get(url: string, data: any = {}): Promise<any> {
        return this.call('GET', url, data)
    }

    async post(url: string, data: any = {}): Promise<any> {
        return this.call('POST', url, data)
    }
}