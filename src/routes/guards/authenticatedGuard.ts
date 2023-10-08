import { useAuthStore } from '@/store/authStore';
import { useErrorStore } from '@/store/errorStore';
import { validationError } from '@/types';

const authenticatedGuard = (): { name: string } | boolean => {
    const errorStore = useErrorStore()
    const authStore = useAuthStore()
    
    if (authStore.isGuest()) {
        authStore.clear()
        errorStore.setValidationError({for: "email", errors: ["Have been logged out due to inactivity."]} as validationError)  
    }

    return authStore.isGuest()
        ? { name: 'login' }
        : true
}

export default authenticatedGuard