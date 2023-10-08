<script setup lang="ts">
import { useAuthStore } from '@/store/authStore'

const authStore = useAuthStore()

</script>
<template>
    <div class="card">
        <div class="card-header">Logged in as: <strong>{{ authStore.getUser().name }}</strong></div>
        <div class="card-body">
            Welcome to the markt app
        </div>
    </div>
</template>