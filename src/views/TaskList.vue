<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LBlock from '@/components/LBlock.vue';
import { tasklist } from './Task/taskAction';
import SnackBar from '@/components/SnackBar.vue';
import modalView from '@/components/modalView.vue';

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

const tab = ref(0);

const {
    init,
    tasks,
    checkingTasks,
    checkedTaskInit,
    addTask,
    updated,
    deleted,
    completeTask,
    unCompleteTask,
    snackOpen,
    snackText,
    snackColor,
    dialog,
    openDialog,
    closeDialog,
    taskName,
    taskDetail,
    deadLine,
    createTask,
    form,
    required,
    dateValidator,
} = tasklist();

const handleTaskCheck = (taskId: number) => {
    completeTask(taskId)
}

const handleTaskUnCheck = (taskId: number) => {
    unCompleteTask(taskId)
}

const getCheckingTask = async () => {
    await checkedTaskInit();
}

onMounted(() => {
    init();
})
</script>
<template>
    <l-block title="Task" subtitle="タスク一覧">
        <template #button>
            <v-btn color="red-lighten-1" elevation="2" @click="addTask">
                <v-icon class="pr-2">mdi-plus</v-icon>追加</v-btn>
        </template>
        <v-tabs v-model="tab">
            <v-tab value="1">タスク一覧</v-tab>
            <v-tab value="2" @click="getCheckingTask()">完了済タスク</v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item value="1">
                <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="tasks"
                    :items-per-page-options="pages" items-per-page-text="表示行数"
                    class="elevation-1 bg-grey-lighten-4 pt-4" height="500">
                    <template v-slot:[`item.check`]="{ item }">
                        <v-checkbox v-model="item.check" class="checkbox" @change="handleTaskCheck(item.id)" />
                    </template>
                    <template v-slot:[`item.detail`]="{ item }">
                        <span class="truncate">{{ item.detail }}</span>
                    </template>
                    <!-- データがない場合の表示 -->
                    <template v-slot:no-data>
                        <v-alert class="text-center">
                            タスクはありません
                        </v-alert>
                    </template>
                </v-data-table>
            </v-window-item>
            <v-window-item value="2">
                <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="checkingTasks"
                    :items-per-page-options="pages" items-per-page-text="表示行数"
                    class="elevation-1 bg-grey-lighten-4 pt-4" height="500">
                    <template v-slot:[`item.check`]="{ item }">
                        <v-checkbox v-model="item.check" :true-value="1" class="checkbox"
                            @change="handleTaskUnCheck(item.id)" />
                    </template>
                    <template v-slot:[`item.detail`]="{ item }">
                        <span class="truncate">{{ item.detail }}</span>
                    </template>
                    <!-- データがない場合の表示 -->
                    <template v-slot:no-data>
                        <v-alert class="text-center">
                            完了済みタスクはありません
                        </v-alert>
                    </template>
                </v-data-table>
            </v-window-item>
        </v-window>

        <!-- SnackBar -->
        <SnackBar v-model:snackbar="snackOpen" :text=snackText :color=snackColor />
    </l-block>

    <!-- ダイアログ -->
    <modal-view v-model="dialog" title="タスクの追加" color="bg-red-lighten-1">
        <template #content>
            <v-form ref='form'>
                <v-row>
                    <v-col cols="6">
                        <v-text-field type="date" :rules="[required, dateValidator]" v-model="deadLine" label="期限"
                            clearable></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mb-1">
                    <v-col cols="8">
                        <v-text-field v-model="taskName" :rules="[required]" variant="outlined" label="タスク名"
                            clearable></v-text-field>
                    </v-col>
                </v-row>
                <v-textarea v-model="taskDetail" variant="outlined" label="タスク詳細" clearable></v-textarea>
            </v-form>
        </template>
        <template #button>
            <v-row justify="center">
                <v-col cols="auto" class="pt-0">
                    <v-btn elevation="2" class="bg-red-lighten-1" @click="createTask">追加</v-btn>
                </v-col>
            </v-row>
        </template>
    </modal-view>
</template>

<style scoped>
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    display: inline-block;
}

::v-deep(.checkbox .v-input__details) {
    display: none !important;
}
</style>