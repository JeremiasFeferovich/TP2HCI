<template>
    <v-card class="ma-2 pa-3" >
        <v-row align="center" style="height: 100%;" justify="space-between">
            <v-col cols="3">
                <img :src="categoryImg" alt="categoryImg" style="max-height: 100%; max-width: 100%;" />
            </v-col>
            <v-col cols="6" class="text-center" align-self="center">
                <v-card-title>Title</v-card-title>
            </v-col>
            <v-col cols="3">
                <v-btn class="ma-2 pa-3" toggle variant="plain" rounded="xl" :ripple="false" size="large"
                    v-model="buttonState" :loading="loading" @click="toggleButtonState"
                    style="display: flex; justify-content: center; align-items: center;">
                    <img :src="powerBtnImg" alt="powerState" style="max-height: 100%; max-width: 100%;" />
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>

import { ref, computed } from 'vue';
import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'
import lightbulb from '@/assets/lightbulb.svg'

const buttonState = ref(false);
const loading = ref(false);

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