<template>
    <v-card class="ma-2 pa-3" @click.stop="openDialog = true">
        <v-row align="center">
            <v-col cols="3">
                <img :src="categoryImg" alt="categoryImg" style="max-height: 100%; max-width: 100%;" />
            </v-col>
            <v-col cols="6" class="text-center" align-self="center">
                <v-card-title>{{ device.name }}</v-card-title>
            </v-col>
            <v-col cols="3">
                <v-btn v-model="device.isOn" @click.stop="toggleButtonState" toggle :ripple="false" size="large"
                    variant="plain" :loading="loadingState" rounded="xl">
                    <img :src="powerBtnImg" alt="powerState" />
                </v-btn>
            </v-col>
        </v-row>
        <v-dialog v-model="openDialog" width="30%">
            <LightDeviceInfo :device="device" :loadingState="loadingState" :toggleButtonState="toggleButtonState"/>
        </v-dialog>
    </v-card>
</template>
  
<script setup>
import { ref, computed, defineProps } from 'vue';
import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'
import lightbulb from '@/assets/lightbulb.svg'
import LightDeviceInfo from './LightDeviceInfo.vue';

const loadingState = ref(false);
const openDialog = ref(false);

const { device } = defineProps({
    device: Object
})

const categoryImg = lightbulb;

const powerBtnImg = computed(() => {
    return device.isOn ? powerOn : powerOff;
})

function toggleButtonState() {
    loadingState.value = true
    setTimeout(() => (loadingState.value = false), 1000)
    device.isOn = !device.isOn;
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
  