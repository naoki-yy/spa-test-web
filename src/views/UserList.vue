<template>a
</template>
<!-- <template>
    <v-container>
      <v-list>
        <v-list-item v-for="user in users" :key="user.id">
          {{ user.name }}
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import axios from '@/plugins/axios'
  
  export default defineComponent({
    name: 'UserList',
    setup() {
      const users = ref([])
  
      const fetchUsers = async () => {
        try {
          const response = await axios.get('/users')
          users.value = response.data
        } catch (error) {
          console.error('Error fetching users:', error)
        }
      }
  
      onMounted(() => {
        fetchUsers()
      })
  
      return { users }
    }
  })
  </script> -->