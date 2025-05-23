import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const app = createApp(App); // ✅ 這行一定要先

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  unstyled: true,
})

app.component('InputText', InputText)
app.component('Dropdown', Dropdown)

app.mount('#app')
