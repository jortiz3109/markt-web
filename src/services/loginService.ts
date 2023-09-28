import client from '@/utils/client'

const login = async (credentials: {email: string, password: string}): Promise<any> => {
    await client.get('/sanctum/csrf-cookie')
    return client.post('/auth/login', credentials);
}

export default { login }