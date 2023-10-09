<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useShoppingListService } from '@/services/shoppingListService'
import { ShoppingListInterface } from '@/types'
import ShoppingList from '@/components/shopping-lists/ShoppingList.vue'

const shoppingListService = useShoppingListService()

const initialState = () => ({
    shoppingLists: [] as ShoppingListInterface[]
})

onMounted(() => {
    shoppingListService.index().then((response: {data: any[], links: any, meta: any}) => {
        response.data.forEach(item => {
            const shoppingList = {
                total: item.total,
                isPaid: item.is_paid,
                shop: {
                    name: item.shop.name
                }
            } as ShoppingListInterface
            
            state.shoppingLists.push(shoppingList)
        });
    })
})

const state = reactive(initialState())

</script>
<template>
    <div class="card">
        <div class="card-header">My shopping lists</div>
        <div class="card-body">
            <ShoppingList v-for="(shoppingList, index) in state.shoppingLists" :key="index" :shopping-list="shoppingList"/>
        </div>
    </div>
</template>