<script setup lang="ts">
import LBlock from '@/components/LBlock.vue';
import detailButton from '@/components/detailButton.vue';
import { onMounted } from 'vue';

onMounted(() => {
  if (!sessionStorage.getItem('home-reloaded')) {
    sessionStorage.setItem('home-reloaded', 'true');
    setTimeout(() => {
      location.reload();
    }, 200);
  }
});
</script>

<template>
  <l-block title="Daily" subtitle="日々の確認画面">
    <template #button>
      <detail-button to="/" />
    </template>
    test
  </l-block>
  <v-row class="mt-5">
    <v-col>
      <l-block title="Timer" subtitle="今日の勉強時間">
        <template #button>
          <detail-button to="/" />
        </template>
        test
      </l-block>
    </v-col>
    <v-col>
      <l-block title="Task" subtitle="今日のタスク">
        <template #button>
          <detail-button to="/task" />
        </template>
        test
      </l-block>
    </v-col>
  </v-row>
</template>
