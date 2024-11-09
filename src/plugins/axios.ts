import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  // baseURL: 'https://study-manage-api.kakeinokanri.site/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
})

// トークンの取得と設定（例として、ローカルストレージから取得）
const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default axiosInstance
