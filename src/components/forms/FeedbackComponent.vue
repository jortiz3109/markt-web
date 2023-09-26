<script lang="ts" setup>
const {feedback} = defineProps<{ feedback: string }>()

</script>
<template>
    <div v-text="feedback"/>
</template>