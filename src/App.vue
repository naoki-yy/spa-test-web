<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import TopLogo from '@/assets/TopLogo.png'
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
const userName = computed(() => authStore.user?.name ?? 'ゲスト');
const resource = ref({
  img: TopLogo
})

</script>

<template>
  <v-app>
    <template v-if="authStore.user">
      <v-navigation-drawer permanent width="200">
        <v-list>
          <div class="text-center">
              <img :src=resource.img width="140px" height="90px">
          </div>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home" :to="{ name: 'home' }"
            link></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="Task" value="task" :to="{ name: 'task' }" link></v-list-item>
          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item prepend-icon="mdi-database-check-outline" v-bind="props" title="Data"></v-list-item>
            </template>
            <v-list-item title="１ヶ月データ" value=""></v-list-item>
            <v-list-item title="総合分析" value=""></v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </template>
    <v-app-bar color="grey-lighten-3">
      <v-app-bar-title>
        <h3>Learning ...</h3>
      </v-app-bar-title>
      <template v-slot:append>
        <template v-if="authStore.user">
          <p class="mr-7 py-2 px-4 border">
            <v-icon class="mr-1">mdi-account-circle</v-icon>
            {{ userName }}さん
          </p>
          <v-btn @click="authStore.logout" class="bg-red-lighten-1 mr-10">
              ログアウト
          </v-btn>
        </template>
        <template v-else>
          <v-btn>
            <RouterLink :to="{ name: 'login' }">
              ログイン
            </RouterLink>
          </v-btn>
          <v-btn>
            <RouterLink :to="{ name: 'register' }">
              新規登録
            </RouterLink>
          </v-btn>
        </template>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-sheet>
          <RouterView />
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>

</template>

<style scoped></style>
