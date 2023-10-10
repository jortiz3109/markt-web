import { apiGetRequest, apiPostRequest, apiRequest, clientConfig } from "@/types"

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
            redirect: 'manual'
        } as clientConfig
    }

    setBearerToken(bearerToken: string) {
        const headers = this.#config.headers
        headers.append('authorization', `Bearer ${bearerToken}`)

        this.#config.headers = headers
    }

    async call(request: apiRequest ): Promise<any> {
        
        const {method, url} = request
        this.#config.method = method

        return await fetch(url, this.#config as RequestInit)
    }

    async get(request: apiGetRequest): Promise<any> {
        const {url, method} = request
        return this.call({url, method})
    }

    async post(request:apiPostRequest): Promise<any> {
        const{url, method, data} = request
        this.#config.body = JSON.stringify(data)
        
        return this.call({url, method})
    }
}