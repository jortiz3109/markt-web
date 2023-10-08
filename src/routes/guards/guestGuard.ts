const guestGuard = ({authStore}): boolean => {    
    return authStore.isGuest()
}

export default  guestGuard