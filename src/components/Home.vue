<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useProfileService } from '@/services/profileService'

const authStore = useAuthStore()

onBeforeMount(() => {
    useProfileService().info()
})

</script>
<template>
    <div class="card">
        <div class="card-header">Logged in as: <strong>{{ authStore.getUser().name }}</strong></div>
        <div class="card-body">
            Welcome to the markt app
        </div>
    </div>
</template>