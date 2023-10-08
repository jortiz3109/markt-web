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