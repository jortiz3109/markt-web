<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useShoppingListService } from '@/services/shoppingListService'
import { ShoppingListInterface } from '@/types'
import ThreeDotsVerticalIcon from '@/components/icons/ThreeDotsVerticalIcon.vue'
import RefreshIcon from '@/components/icons/RefreshIcon.vue'
import Search from '@/components/layout/Search.vue'
import Loading from 'vue-loading-overlay'
import ShoppingList from './ShoppingList.vue'

const shoppingListService = useShoppingListService()
const initialShoppingLists = () => ([] as ShoppingListInterface[])
const shoppingLists = reactive(initialShoppingLists())
const isLoading = ref(false)

const get = async () => {
    isLoading.value = true
    shoppingListService.index().then((response: { data: any[], links: any, meta: any }) => {
        shoppingLists.length = 0
        response.data.forEach(item => {
            const shoppingList = {
                total: item.total,
                isPaid: item.is_paid,
                shop: {
                    name: item.shop.name
                }
            } as ShoppingListInterface
            shoppingLists.push(shoppingList)
        })
    }).finally(() => isLoading.value = false)
}

onMounted(async () => get())

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
                    <button class="btn btn-actions btn-sm" @click="get">
                        <RefreshIcon />
                    </button>
                </div>
                <div class="col col-auto">
                    <button type="button" class="btn btn-sm btn-actions">
                        <ThreeDotsVerticalIcon />
                    </button>
                </div>
            </div>
        </div>
        <div class="vl-parent card-body d-flex gap-3">
            <loading v-model:active="isLoading" :is-full-page="false" />
            <ShoppingList v-for="(shoppingList, index) in shoppingLists" :shopping-list="shoppingList" :key="index"/>
        </div>
    </div>
</template>