<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  if (sessionStorage.getItem('home-reloaded')) {
    sessionStorage.removeItem('home-reloaded');
  }
});

</script>
<template>
  <v-container fluid class="d-flex align-center justify-center">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" class="text-center">
        <div class="d-flex justify-center">
          <v-btn elevation="2" color="primary" class="mr-4 white--text" :to="{ name: 'login' }" router>
            ログイン
          </v-btn>
          <v-btn elevation="2" color="secondary" class="white--text" :to="{ name: 'register' }" router>
            新規登録
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<style scoped>
.display-2 {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.2;
}

.subtitle-1 {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}
</style>