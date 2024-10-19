<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
    title: string;
    color?: string;
    button_icon?: string;
    modelValue: boolean;
}

const props =  withDefaults(
    defineProps<Props>(),
    { color: 'blue-lighten-1', button_icon: 'mdi-close' },
);

const dialog = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
    dialog.value = newVal;
})

const emit = defineEmits(['update:modelValue']);

const closeDialog = () => {
    emit('update:modelValue', false);
}
</script>

<template>
    <v-dialog v-model="dialog" :max-width="600">
        <v-card>
            <v-card-title :class="props.color" class="py-3">
                <v-row>
                    <v-col cols="10">
                        <h4>{{ props.title }}</h4>
                    </v-col>
                    <v-col cols="2" class="text-right">
                        <v-btn 
                            elevation="0" 
                            :class="props.color" 
                            @click="closeDialog"
                        ><v-icon>{{ props.button_icon }}</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <slot name="content"></slot>
            </v-card-text>
            <v-card-actions>
                <slot name="button"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>