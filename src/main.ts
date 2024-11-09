import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/plugins/pinia'
import router from './router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css';

import axios from '@/plugins/axios';

// アプリ起動時にトークンをAxiosのデフォルトヘッダーに設定
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')