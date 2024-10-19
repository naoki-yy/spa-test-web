<script setup lang="ts">
interface Props {
    title: string;
    subtitle: string;
}

const props = defineProps<Props>()
    
</script>

<template>
    <v-card elevation="4">
        <template v-slot:title>
            <v-row>
                <v-col cols="9">
                    <h2>{{ props.title }}</h2>
                </v-col>
                <v-col cols="3" class="text-end pt-5 pr-6">
                    <slot name="button"></slot>
                </v-col>
            </v-row>
        </template>
        <template v-slot:subtitle>{{ props.subtitle }}</template>
        <template v-slot:text>
            <slot></slot>
        </template>
    </v-card>
</template>