<script setup lang="ts">
import { ShoppingListInterface } from '@/types';

defineProps<{ shoppingList: ShoppingListInterface }>()

</script>
<template>
    <div class="col">
        <div class="card" :class="{ 'border-success': shoppingList.isPaid }">
            <div class="card-header"
                :class="{ 'text-bg-success': shoppingList.isPaid }">
                {{ shoppingList.shop.name }}
            </div>
            <div class="card-body">
                <p>Total: <span class="font-monospace">{{ shoppingList.total }}</span></p>
                <p>Created at: {{ shoppingList.createdAt.toLocaleDateString('en-US') }}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                    <span class="badge font-monospace"
                    :class="{ 'text-bg-secondary': !shoppingList.isPaid, 'text-bg-success': shoppingList.isPaid }"
                    v-text="shoppingList.items" />
                </div>
                <div>
                    <a href="#">Details</a>
                </div>
            </div>
        </div>
    </div>
</template>