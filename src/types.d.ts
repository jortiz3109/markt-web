export interface clientConfig {
        method: string,
        mode: string,
        cache: string,
        credentials: string,
        headers: Headers,
        redirect: string,
        body: any
}

export interface validationError {
    for: string
    errors: string[]
}

export interface ShoppingListInterface {
    total: string,
    isPaid: boolean,
    shop: {
        name: string
    }
}

export interface apiRequest {
    url: string,
    method: string,
    headers?: any,
}

export type apiGetRequest = apiRequest & {
    query: any
}

export type apiPostRequest = apiRequest & {
    data: any
}