<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


</script>
<template>
    <v-container fluid class="hero-container d-flex align-center justify-center">
        <v-row align="center" justify="center">
            <v-col cols="12" md="8" class="text-center">
                <h1 class="display-2 font-weight-bold mb-4 white--text">Learning...</h1>
                <p class="subtitle-1 white--text mb-6">
                    あなたの学びをもっと楽しく、もっと効率的に。タスクを管理し、目標に向かって一歩ずつ進みましょう！
                </p>
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
.hero-container {
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #4facfe, #00f2fe);
  color: #fff;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
}

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