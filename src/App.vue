<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
</script>
<template>
  <Navbar />
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
