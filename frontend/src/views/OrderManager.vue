<template>
  <div class="p-4">
    <h2 class="text-2xl mb-4">📦 我的訂單</h2>

    <DataTable v-model:expandedRows="expandedRows" :value="orders" dataKey="id" expandableRows tableStyle="min-width: 60rem">
      <Column expander style="width: 3rem" />
      <Column field="id" header="訂單編號" />
      <Column field="date" header="日期" />
      <Column field="status" header="狀態" />
      <Column field="total" header="總金額" />
      <Column header="操作">
        <template #body="slotProps">
          <Button label="查看詳情" icon="pi pi-search" @click="goToDetail(slotProps.data.id)" />
        </template>
      </Column>

      <template #expansion="slotProps">
        <div class="p-4 bg-gray-50 rounded">
          <h3 class="font-semibold mb-2">商品明細</h3>
          <ul>
            <li v-for="item in slotProps.data.items" :key="item.name" class="flex items-center mb-2 gap-4">
              <img :src="item.image" alt="product" class="w-16 h-16 rounded border" />
              <div class="flex-1">
                <div class="font-medium">{{ item.name }}</div>
                <div class="text-sm text-gray-600">數量：{{ item.quantity }} ｜ 售價：{{ item.price }} 元</div>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

// 引入路由
const router = useRouter()

// 資料
const expandedRows = ref([])

const orders = ref([
  {
    id: 'A123',
    date: '2025-05-26',
    status: '待出貨',
    total: 1980,
    items: [
      { name: '可愛娃娃', quantity: 2, price: 300, image: 'product-bamboo-watch.jpg' },
      { name: '吉伊卡哇', quantity: 3, price: 120, image: 'product-black-watch.jpg' }
    ]
  },
  {
    id: 'B456',
    date: '2025-05-20',
    status: '已完成',
    total: 2560,
    items: [
      { name: '模型人偶', quantity: 1, price: 1560, image: 'product-bolt-shirt.jpg' },
      { name: '扭蛋組合', quantity: 2, price: 500, image: 'product-fitness-watch.jpg' }
    ]
  },
])

// 跳轉到訂單詳情頁面
    const goToDetail = (id) => {
    router.push(`/orders/${id}`)
}

</script>
