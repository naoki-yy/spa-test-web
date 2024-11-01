import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '../views/UserList.vue'
import TaskList from '../views/TaskList.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'
import Top from '@/views/TopView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/top',
      name: 'top',
      component: Top
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/task',
      name: 'task',
      component: TaskList,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/user',
      name: 'user',
      component: UserList,
      meta: { requiresAuth: true }, 
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.user) {
    try {
      await authStore.fetchUser();
    } catch (error) {
      console.error('ユーザー情報の取得に失敗:', error);
    }
  }

  if (to.meta.requiresAuth && !authStore.user) {
    next({ name: 'top' })
  } else {
    next();
  }
})

export default router
