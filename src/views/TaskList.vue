<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LBlock from '@/components/LBlock.vue';
import { tasklist } from './Task/taskAction';
import SnackBar from '@/components/SnackBar.vue';

// タスクテーブル定義
const itemsPerPage = ref(10);
const pages = ref([
    { value: 5, title: '5' },
    { value: 10, title: '10' },
    { value: 20, title: '20' },
    { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' }
])
const headers = ref([
    { title: '完了', align: 'start' as 'start', sortable: false, key: 'check' },
    { title: 'タスク名', align: 'start' as 'start', sortable: true, key: 'name' },
    { title: 'タスク詳細', align: 'start' as 'start', sortable: true, key: 'detail' },
    { title: '期限', align: 'start' as 'start', sortable: true, key: 'deadline' },
])

const {
    init,
    tasks,
    updated,
    deleted,
    completeTask,
    snackOpen,
    snackText,
    snackColor
} = tasklist();

const handleTaskCheck = (taskId: number) => {
    completeTask(taskId)
}

onMounted(() => {
    init();
})
</script>
<template>
    <l-block title="Task" subtitle="タスク一覧">
        <v-data-table 
            v-model:items-per-page="itemsPerPage" 
            :headers="headers" 
            :items="tasks"
            :items-per-page-options="pages" 
            items-per-page-text="表示行数" 
            class="elevation-1 bg-grey-lighten-4 pt-4"
            height="500"
        >
            <template v-slot:[`item.check`]="{ item }">
                <v-checkbox v-model="item.check" @change="handleTaskCheck(item.id)"/>
            </template>
            <template v-slot:[`item.detail`]="{ item }">
                <span class="truncate">{{ item.detail }}</span>
            </template>
        </v-data-table>
        <SnackBar v-model:snackbar="snackOpen" :text=snackText :color=snackColor />
    </l-block>
</template>

<style scoped>
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    display: inline-block;
}

::v-deep(.v-input__details) {
    display: none !important;
}
</style>