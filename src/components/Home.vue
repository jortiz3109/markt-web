<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/store/authStore'
import profileService from '@/services/profileService'

const authStore = useAuthStore()

onBeforeMount(() => {
    profileService.info().then((response) => {
        const { name, email } = response.data.user
        authStore.setUser({ name, email })
    })
})

</script>
<template>
    WELCOME!!! {{ authStore.getUser().name }}
</template>