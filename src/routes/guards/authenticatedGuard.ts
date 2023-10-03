import { useAuthStore } from '@/store/authStore';
import { useErrorStore } from '@/store/errorStore';
import Cookies from 'js-cookie'

const authenticatedGuard = (): { name: string } | boolean => {
    const errorStore = useErrorStore()
    const authStore = useAuthStore()
    const cookie = Cookies.get('XSRF-TOKEN')
    
    if (!cookie && authStore.isAuthenticated()) {
        authStore.clear()
        sessionStorage.clear()
        errorStore.setValidationErrors({"email":["Have been logged out due to inactivity."]})  
    }

    return authStore.isGuest()
        ? { name: 'login' }
        : true
}

export default authenticatedGuard