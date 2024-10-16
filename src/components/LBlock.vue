<script setup lang="ts">
interface Props {
    title: string;
    subtitle: string;
}
const props = defineProps<Props>();
</script>

<template>
    <v-card  elevation="4">
        <template v-slot:title><h2>{{ props.title }}</h2></template>
        <template v-slot:subtitle>{{ props.subtitle }}</template>
        <template v-slot:text>
            <slot></slot>
        </template>
    </v-card>
</template>