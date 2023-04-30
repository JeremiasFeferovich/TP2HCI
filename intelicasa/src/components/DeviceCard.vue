<template>
    <v-card class="ma-2 pa-3">
        <v-row align="center">
            <v-col cols="3">
                <img :src="categoryImg" alt="categoryImg" style="max-height: 100%; max-width: 100%;" />
            </v-col>
            <v-col cols="6" class="text-center" align-self="center">
                <v-card-title>{{ title }}</v-card-title>
            </v-col>
            <v-col cols="3">
                <v-btn v-model="buttonState" @click="toggleButtonState" toggle :ripple="false" size="large" variant="plain" :loading="loading" rounded="xl">
                    <img :src="powerBtnImg" alt="powerState" />
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>

import { ref, computed, defineProps } from 'vue';
import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'
import lightbulb from '@/assets/lightbulb.svg'

const buttonState = ref(false);
const loading = ref(false);

const props = defineProps({
  title: String
});

const powerBtnImg = computed(() => {
    return buttonState.value ? powerOn : powerOff;
})

const categoryImg = lightbulb;

function toggleButtonState() {
    loading.value = true
    setTimeout(() => (loading.value = false), 1000)
    buttonState.value = !buttonState.value;
}

</script>

<style scoped>
    .v-row {
        height: 100%;
    }
    .v-btn {
        display: flex; 
        justify-content: center; 
        align-items: center;
    }
    .v-btn img {
        max-height: 100%; 
        max-width: 100%;
    }
</style>
