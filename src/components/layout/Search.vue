<script setup lang="ts">
import { ref, watch } from 'vue'

const searchTerm = ref('')

const { placeholder } = defineProps({
    placeholder: {
        type: String,
        default: 'Search'
    }
})

watch(searchTerm, () => {
    if(searchTerm.value.length >= 5) {
        console.log(`Searching for term: ${searchTerm.value}`);
    }
})

const emit = defineEmits(['search.submit'])
</script>
<template>
    <div class="input-group input-group-sm">
        <input
            type="search"
            name="search"
            id="search"
            v-model="searchTerm"
            class="form-control form-control-sm"
            :placeholder="placeholder"
            aria-describedby="button-search">
    </div>
</template>