<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';


interface Props {
  snackbar: boolean;
  text: string;
  color?: string;
}
const props = withDefaults(
  defineProps<Props>(),
  { snackbar: false, text: "注意書き", color: 'blue-lighten-1', },
);

const emit = defineEmits(['update:snackbar']);

const snackbar = ref(props.snackbar)

// 親からの`snackbar`の変化を監視し、内部状態に反映（snackbarを開くのに利用）
watch(() => props.snackbar, (newVal) => {
  snackbar.value = newVal;
});

// snackbarがtimeoutしたとき、falseをemit
watch(snackbar, (newVal) => {
  if (!newVal) {
    emit('update:snackbar', snackbar.value)
  }
})
// 閉じるボタンを押した時、falseをemit
const closeSnackBar = () => {
  snackbar.value = false;
  emit('update:snackbar', snackbar.value);
}
</script>

<template>
  <v-snackbar v-model="snackbar" :timeout="2000" :color=props.color multi-line>
    {{ props.text }}

    <template v-slot:actions>
      <v-btn color="light" variant="text" @click="closeSnackBar">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>