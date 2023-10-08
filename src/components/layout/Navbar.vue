<script setup lang="ts">
import Logout from '../auth/Logout.vue'
import Logo from '../icons/Logo.vue'
import { useAuthStore } from '@/store/authStore'

const authStore = useAuthStore()
</script>
<template>
    <nav class="navbar navbar-expand-lg mb-3">
      <div class="container">
        <a class="navbar-brand" href="#">
          <Logo width="32" height="32"/>
        </a>
        <Logout v-if="authStore.isAuthenticated()" />
      </div>
    </nav>
</template>