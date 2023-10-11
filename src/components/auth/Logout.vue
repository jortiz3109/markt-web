<script setup lang="ts">
import { useLoginService } from '@/services/loginService'
import { useAuthStore } from '@/store/authStore'
import router from '@/routes/web'

const authStore = useAuthStore()
const { logout } = useLoginService()

const handleLogout = () => logout().finally(() => {
    authStore.clear()
    router.push({ name: 'login' })
})
</script>
<template>
    <button type="button" class="btn btn-link" @click="handleLogout">Logout</button>
</template>