import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import router from '@/router'

interface User {
  id: number
  name: string
  email: string
}

interface LoginForm {
  email: string
  password: string
}

interface RegisterForm {
  name: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    // ユーザー取得
    async fetchUser() {
      try {
        const response = await axios.get('/user')
        this.user = response.data
      } catch (error: any) {
        this.user = null
        // 401エラーが発生したらログイン画面へリダイレクト
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          router.push({ name: 'login' })
        }
      }
    },
    // ログイン
    async login(loginRequest: LoginForm) {
      try {
        const response = await axios.post('/login', loginRequest)
        const token = response.data.token
        // トークンをローカルストレージに保存
        localStorage.setItem('token', token)
        // Axiosインスタンスのデフォルトヘッダーにトークンを設定
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        this.user = response.data.user
        router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
        this.user = null
        router.push({ name: 'login' })
      }
    },
    // ログアウト
    async logout() {
      try {
        // ユーザーが認証されている場合のみログアウトリクエストを送信
        if (this.user) {
          await axios.post('/logout')
        }
      } catch (error) {
        console.error('ログアウトエラー:', error)
      } finally {
        // エラーハンドリング：トークンを削除してトップページへ遷移
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        this.user = null
        router.push({ name: 'top' })
      }
    },
    // 登録処理
    async register(userData: RegisterForm) {
      try {
        const response = await axios.post('/register', userData)
        const token = response.data.token
        // トークンをローカルストレージに保存
        localStorage.setItem('token', token)
        // Axiosインスタンスのデフォルトヘッダーにトークンを設定
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        this.user = response.data.user
        router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
        this.user = null
        router.push({ name: 'register' })
      }
    }
  },
  persist: {
    key: 'user',
    storage: sessionStorage
  }
})