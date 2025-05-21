<template>
  <div class="p-6 space-y-6">
    <!-- 搜尋 + 篩選 -->
    <div class="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="搜尋訂單..."
        class="input input-bordered w-full md:w-1/3"
        v-model="searchText"
      />

      <select class="select select-bordered w-full md:w-1/4" v-model="statusFilter">
        <option value="">全部狀態</option>
        <option>待出貨</option>
        <option>已出貨</option>
        <option>已完成</option>
        <option>退貨</option>
      </select>

      <select class="select select-bordered w-full md:w-1/4" v-model="timeFilter">
        <option value="">全部時間</option>
        <option>一週內</option>
        <option>一個月內</option>
        <option>三個月內</option>
      </select>
    </div>

    <!-- 訂單表格 -->
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>商品訊息</th>
            <th>售價</th>
            <th>數量</th>
            <th>訂單總額</th>
            <th>交易狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td>
              <div class="flex items-center gap-4">
                <img :src="order.image" alt="商品圖" class="w-16 h-16 object-cover rounded" />
                <div>
                  <p class="font-semibold">{{ order.name }}</p>
                  <p class="text-sm text-gray-500">編號：{{ order.code }}</p>
                  <p class="text-sm text-gray-500">顏色：{{ order.color }}｜尺寸：{{ order.size }}</p>
                </div>
              </div>
            </td>
            <td>${{ order.price }}</td>
            <td>{{ order.quantity }}</td>
            <td>${{ order.price * order.quantity }}</td>
            <td>
              <span
                class="badge"
                :class="{
                  'badge-success': order.status === '已完成',
                  'badge-warning': order.status === '已出貨',
                  'badge-error': order.status === '退貨'
                }"
              >
                {{ order.status }}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-outline">查看</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchText = ref('')
const statusFilter = ref('')
const timeFilter = ref('')

// 假資料
const orders = ref([
  {
    id: 1,
    image: 'https://via.placeholder.com/60',
    name: '魯夫模型',
    code: 'A12345',
    color: '黑',
    size: 'M',
    price: 800,
    quantity: 2,
    status: '已完成',
    createdAt: '2025-05-19'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/60',
    name: '吉伊卡哇-吉伊',
    code: 'B67890',
    color: '',
    size: 'L',
    price: 1200,
    quantity: 1,
    status: '已出貨',
    createdAt: '2025-05-13'
  }
])

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchSearch = order.name.includes(searchText.value) || order.code.includes(searchText.value)
    const matchStatus = !statusFilter.value || order.status === statusFilter.value
    // 這邊時間篩選先略過邏輯，你之後可以加上日期運算
    const matchTime = true
    return matchSearch && matchStatus && matchTime
  })
})
</script>
