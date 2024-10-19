<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const authStore = useAuthStore();

// バリデーション
const form = ref();
const required = (value: string) => !!value || '必須項目です。';

const handleRegister = async () => {
    const isValid = await form.value?.validate()
    if (isValid.valid) {
        errorMessage.value = '';
        try {
            await authStore.register({
                name: name.value,
                email: email.value,
                password: password.value,
            })
            router.push({ name: 'home' })
        } catch (error) {
            errorMessage.value = '登録に失敗しました。'
        }
    }
}

</script>
<template>
    <v-container fluid class="d-flex align-center justify-center min-vh-100">
        <v-card elevation="10" width="500" class="pa-5">
            <v-card-title class="justify-center">
                <h2>新規登録</h2>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field v-model="name" :rules="[required]" variant="outlined" label="ユーザ名" clearable
                        prepend-inner-icon="mdi-account" class="mb-4"></v-text-field>

                    <v-text-field v-model="email" :rules="[required]" variant="outlined" label="メールアドレス"
                        clearable prepend-inner-icon="mdi-email" class="mb-4"></v-text-field>

                    <v-text-field v-model="password" :rules="[required]" variant="outlined" label="パスワード"
                        clearable prepend-inner-icon="mdi-lock" type="password"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn elevation="2" class="bg-red-lighten-1 white--text" @click="handleRegister">
                    新規登録
                </v-btn>
            </v-card-actions>
            <v-card-subtitle class="pt-4 text-center">
                <small>
                    すでにアカウントをお持ちですか？
                    <router-link to="/login">ログイン</router-link>
                </small>
            </v-card-subtitle>
        </v-card>
    </v-container>
</template>


<style scoped></style>