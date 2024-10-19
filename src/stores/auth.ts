import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import { useRouter } from 'vue-router'

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
    user: null as User | null,
  }),
  actions: {
    // ユーザ取得
    async fetchUser() {
      try {
        const response = await axios.get('/user')
        this.user = response.data
      } catch (error) {
        this.user = null
      }
    },
    // ログイン
    async login(loginRequest: LoginForm) {
      const router = useRouter()
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
        const response = await axios.post('/login', loginRequest, { withCredentials: true })
        this.user = response.data.user
      } catch (error) {
        console.error(error)
        router.push({ name: 'login' })
      }
    },
    // ログアウト
    async logout() {
      const router = useRouter()
      try {
        await axios.post('/logout')
        this.user = null
        router.push({ name: 'top' })
      } catch (error) {
        console.error(error)
      }
    },
    // 登録処理
    async register(userData: RegisterForm) {
      const router = useRouter()
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
        const response = await axios.post('/register', userData, {
          withCredentials: true
        })
        this.user = response.data.user
      } catch (error) {
        console.error(error)
        router.push({ name: 'register' })
      }
    }
  },
  persist: {
    key: 'user',
    storage: sessionStorage
  }
})
