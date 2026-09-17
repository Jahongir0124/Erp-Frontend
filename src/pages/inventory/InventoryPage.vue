<template>
    <div class="space-y-6">

        <!-- Header -->
        <div>
            <h1 class="text-3xl font-bold text-slate-900">
                Inventories
            </h1>

            <p class="text-slate-500 mt-1">
                Manage inventory stock and history
            </p>
        </div>


        <!-- Tabs -->
        <div class="border-b border-slate-200">

            <div class="flex gap-6">

                <button
                    @click="activeTab = 'stock'"
                    class="pb-3 text-sm font-medium transition-colors duration-200 cursor-pointer"
                    :class="
                        activeTab === 'stock'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-slate-500 hover:text-slate-700'
                    "
                >
                    Inventory Stock
                </button>


                <button
                    @click="activeTab = 'history'"
                    class="pb-3 text-sm font-medium transition-colors duration-200 cursor-pointer"
                    :class="
                        activeTab === 'history'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-slate-500 hover:text-slate-700'
                    "
                >
                    Inventory History
                </button>

            </div>

        </div>


        <!-- Stock -->
        <InventoryStock
            v-if="activeTab === 'stock'"
        />


        <!-- History -->
        <InventoryHistory
            v-if="activeTab === 'history'"
        />

    </div>
</template>


<script setup>

import { ref } from 'vue'

import InventoryStock
    from '../../components/inventories/InventoryStock.vue'

import InventoryHistory
    from '../../components/inventories/InventoryHistory.vue'


const activeTab = ref('stock')

</script>