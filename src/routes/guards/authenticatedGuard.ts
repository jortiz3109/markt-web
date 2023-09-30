import { useErrorStore } from '@/store/errorStore';
import Cookies from 'js-cookie'

const authenticatedGuard = (): { name: string } | boolean => {

    const errorStore = useErrorStore()
    const cookie = Cookies.get('XSRF-TOKEN')
    
    if (cookie === undefined) {
        sessionStorage.clear()
        errorStore.setValidationErrors({"email":["Have been logged out due to inactivity."]})  
    }

    const authValues = JSON.parse(sessionStorage.getItem('auth') ?? '{}')
    const isAuthenticated = authValues?.authenticated ?? false

    return !isAuthenticated
        ? { name: 'login' }
        : true
}

export default authenticatedGuard