<script setup lang="ts">
import { ShoppingListInterface } from '@/types';

defineProps<{shoppingList: ShoppingListInterface}>()

</script>
<template>
    <div class="card" :class="{'border-success': shoppingList.isPaid}">
        <div class="card-header" :class="{'text-bg-success': shoppingList.isPaid}">{{ shoppingList.shop.name }}</div>
        <div class="card-body">
            Total: {{ shoppingList.total }}
        </div>
    </div>
</template>