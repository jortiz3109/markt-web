<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
</script>
<template>
  <Navbar />
  <div class="container">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>
