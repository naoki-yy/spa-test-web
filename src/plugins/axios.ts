import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  (config) => {
    const xsrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1]

    if (xsrfToken) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// レスポンスインターセプターでエラーハンドリング
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 419) {
      console.warn('CSRF トークンが切れました。再取得します。');
      
      // CSRFトークンを再取得
      await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

      // 再試行するための元のリクエストを取得
      const config = error.config;
      return axios.request(config);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance
