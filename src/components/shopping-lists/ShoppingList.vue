<script setup lang="ts">
import { ShoppingListInterface } from '@/types';

defineProps<{shoppingList: ShoppingListInterface}>()

</script>
<template>
    <div class="card">
        <div class="card-header">{{ shoppingList.shop.name }}</div>
        <div class="card-body">
            Total: {{ shoppingList.total }}
        </div>
    </div>
</template>