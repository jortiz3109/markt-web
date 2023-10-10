import { useAuthStore } from "@/store/authStore"
const guestGuard = (): boolean => {    
    const authStore = useAuthStore()
    return authStore.isGuest()
}

export default  guestGuard