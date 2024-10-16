import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '../views/UserList.vue'
import TaskList from '../views/TaskList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/task',
      name: 'task',
      component: TaskList
    },
    {
      path: '/user',
      name: 'user',
      component: UserList
    }
  ]
})

export default router
