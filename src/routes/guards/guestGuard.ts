const guestGuard = (from: { name: any }): { name: string } | boolean => {
    const authValues = JSON.parse(sessionStorage.getItem('auth') ?? '{}')
    const isAuthenticated = authValues?.authenticated ?? false

    return isAuthenticated
        ? { name: from.name }
        : true
}

export default guestGuard