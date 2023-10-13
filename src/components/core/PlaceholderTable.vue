<script setup lang="ts">
const { rows, cols } = defineProps({ rows: Number, cols: Number })
</script>
<template>
    <tr v-for="row in rows" :key="row">
        <td v-for="col in cols" :key="col">
            <p class="placeholder-glow m-0">
                <span class="placeholder w-100"></span>
            </p>
        </td>
    </tr>
</template>