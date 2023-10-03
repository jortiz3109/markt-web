<script setup lang="ts">
import { useLoginService } from '@/services/loginService'
import { useAuthStore } from '@/store/authStore'

const authStore = useAuthStore()
const { logout } = useLoginService(authStore)

const handleLogout = () => logout()
</script>
<template>
    <button type="button" class="btn btn-link" @click="handleLogout">Logout</button>
</template>