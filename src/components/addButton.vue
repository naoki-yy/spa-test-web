<script setup lang="ts">
interface Props {
    color?: string;
    button_name?: string;
    button_icon?: string;
}

const props = withDefaults(
    defineProps<Props>(),
    { color: 'red-lighten-1', button_name: '追加', button_icon: 'mdi-plus' },
);
</script>

<template>
    <v-btn :color="color" elevation="2">
        <v-icon class="pr-2">{{ props.button_icon }}</v-icon>{{ props.button_name }}</v-btn>
</template>