import client from '@/utils/client'

const info = async (): Promise<any> => {
    return client.get('/user/info');
}

export default { info }