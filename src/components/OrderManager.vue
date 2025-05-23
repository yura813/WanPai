<template>
  <div class="p-6 bg-white rounded-xl shadow space-y-6">
    <!-- 篩選列 -->
    <div class="flex flex-wrap gap-4">
      <InputText v-model="searchText" placeholder="搜尋訂單" class="w-full md:w-1/3" />

      <Dropdown
        v-model="statusFilter"
        :options="statusOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="訂單狀態"
        class="w-full md:w-1/4"
        panelClass="surface-overlay border-round shadow-2 p-2"
      />

      <Dropdown
        v-model="timeFilter"
        :options="timeOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="全部時間"
        class="w-full md:w-1/4"
        panelClass="surface-overlay border-round shadow-2 p-2"
      />
    </div>

    <!-- 商品資訊標題列（獨立） -->
    <div class="bg-gray-100 px-4 text-sm font-semibold grid grid-cols-7 gap-4">
      <div></div>
      <div class="col-span-2">商品資訊</div>
      <div>售價</div>
      <div>數量</div>
      <div>訂單總額</div>
      <div>交易狀態</div>
    </div>

    <!-- 訂單列表 -->
    <div v-if="paginatedOrders.length" class="space-y-6">
      <div v-for="order in paginatedOrders" :key="order.id" class="border rounded-lg">
        <!-- 訂單資訊列 -->
        <div class="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 grid grid-cols-2">
          <div>訂單編號：{{ order.orderId }}</div>
          <div class="text-right">購買日期：{{ order.orderDate }}</div>
        </div>

        <!-- 單筆訂單商品內容 -->
        <div class="grid grid-cols-7 gap-4 items-center px-4 py-3">
          <img :src="order.items[0].image" class="w-16 h-16 rounded object-cover" alt="商品圖片" />

          <div class="col-span-2">
            <p class="font-medium">{{ order.items[0].name }}</p>
            <p class="text-sm text-gray-500">{{ order.items[0].code }}</p>
          </div>

          <div>${{ order.items[0].price }}</div>
          <div>{{ order.items[0].quantity }}</div>
          <div class="font-semibold">NT${{ order.totalAmount }}</div>

          <div class="space-y-1">
            <span :class="['inline-block px-2 py-1 rounded-full text-xs font-semibold', statusClass(order.status)]">
              {{ order.status }}
            </span>
            <div>
              <RouterLink :to="`/order/${order.id}`" class="text-blue-600 hover:underline text-sm block">
                訂單詳情
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-400 p-6">目前沒有符合的訂單資料</div>

    <!-- 分頁控制 -->
    <div class="flex justify-center gap-2 mt-4">
      <button @click="prevPage" class="btn btn-sm" :disabled="currentPage === 1">上一頁</button>
      <span class="text-sm text-gray-600">第 {{ currentPage }} 頁</span>
      <button @click="nextPage" class="btn btn-sm" :disabled="currentPage === totalPages">下一頁</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const searchText = ref('');
const statusFilter = ref('');
const timeFilter = ref('');
const currentPage = ref(1);
const itemsPerPage = 5;

const statusOptions = [
  { label: '訂單狀態', value: '' },
  { label: '待出貨', value: '待出貨' },
  { label: '已出貨', value: '已出貨' },
  { label: '已完成', value: '已完成' },
  { label: '退貨', value: '退貨' },
];

const timeOptions = [
  { label: '全部時間', value: '' },
  { label: '一週內', value: '一週內' },
  { label: '一個月內', value: '一個月內' },
];

const orders = ref([
  {
    id: 1,
    orderId: 'ORD123456',
    orderDate: '2025-05-20',
    status: '已完成',
    totalAmount: 2200,
    items: [
      {
        productId: 'P001',
        image: 'https://placekitten.com/60/60',
        name: '吉伊卡哇-烏薩奇',
        code: 'A12345',
        price: 1680,
        quantity: 1,
      },
    ],
  },
]);

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchSearch =
      !searchText.value ||
      (order.orderId?.includes(searchText.value) ||
        order.items?.some((item) => item.name?.includes(searchText.value)));
    const matchStatus = !statusFilter.value || order.status === statusFilter.value;
    return matchSearch && matchStatus;
  });
});

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage));
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredOrders.value.slice(start, start + itemsPerPage);
});

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
function statusClass(status) {
  return {
    '已完成': 'bg-green-100 text-green-700',
    '待出貨': 'bg-yellow-100 text-yellow-700',
    '已出貨': 'bg-blue-100 text-blue-700',
    '退貨': 'bg-red-100 text-red-700',
  }[status] || 'bg-gray-100 text-gray-600';
}
</script>
