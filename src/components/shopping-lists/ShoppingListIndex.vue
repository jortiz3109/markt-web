<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useShoppingListService } from '@/services/shoppingListService'
import { ShoppingListInterface } from '@/types'
import ShoppingList from '@/components/shopping-lists/ShoppingList.vue'
import ThreeDotsVerticalIcon from '@/components/icons/ThreeDotsVerticalIcon.vue'
import Search from '../layout/Search.vue'

const shoppingListService = useShoppingListService()

const initialState = () => ({
    shoppingLists: [] as ShoppingListInterface[]
})

onMounted(async () => {
    const response: { data: any[], links: any, meta: any } = await shoppingListService.index()
    response.data.forEach(item => {
        const shoppingList = {
            total: item.total,
            isPaid: item.is_paid,
            shop: {
                name: item.shop.name
            }
        } as ShoppingListInterface

        state.shoppingLists.push(shoppingList)
    })
})

const state = reactive(initialState())

</script>
<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <div>My shopping lists</div>
            <div class="row g-3">
                <div class="col">
                    <Search />
                </div>
                <div class="col col-auto">
                    <button type="button" class="btn btn-sm btn-actions"><ThreeDotsVerticalIcon /></button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <ShoppingList v-for="(shoppingList, index) in state.shoppingLists" :key="index" :shopping-list="shoppingList" />
        </div>
    </div>
</template>