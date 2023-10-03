<script setup lang="ts">
import Logout from '../auth/Logout.vue'
import { useAuthStore } from '@/store/authStore'

const authStore = useAuthStore()
</script>
<template>
    <nav class="navbar navbar-expand-lg mb-3">
      <div class="container">
        <a class="navbar-brand" href="#">Markt</a>
        <Logout v-if="authStore.isAuthenticated()" />
      </div>
    </nav>
</template>