import router from '@/router';
import client from '@/utils/client';

const login = async (email: string, password: string) => {
    await client.get('/sanctum/csrf-cookie')
    await client.post('/auth/login', { email, password }).then(() => router.push('home'));
}

export default { login }