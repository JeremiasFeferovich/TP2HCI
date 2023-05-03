<template>
    <v-card class="ma-2 py-2 px-5" height="75px" @click.stop="openDialog = true">
        <v-row align="center">
            <v-col cols="3" align="center">
                <img :src="categoryImg" alt="categoryImg" style="max-height: 100%; max-width: 100%;" />
            </v-col>
            <v-col cols="6" class="text-center" align-self="center">
                <v-card-title>{{ device.name }}</v-card-title>
            </v-col>
            <v-col cols="3">
                <v-btn class="square-btn rounded-circle" v-model="device.isOn" @click.stop="toggleButtonState" 
                    variant="plain" :loading="loadingState">
                    <img :src="powerBtnImg" alt="powerState" />
                </v-btn>
            </v-col>
        </v-row>
        <v-dialog v-model="openDialog" width="30%">
            <DeviceDialog :device="device" :loadingState="loadingState" :toggleButtonState="toggleButtonState" />
        </v-dialog>
    </v-card>
</template>
  
<script setup>
import { ref, computed } from 'vue';

// Assets imports
import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'

// Category images
import lightbulb from '@/assets/lightbulb.svg'
import speaker from '@/assets/speaker.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'
import DeviceDialog from './DeviceDialog.vue'

const loadingState = ref(false);
const openDialog = ref(false);

const { device } = defineProps({
    device: Object
})

const categoryImg = computed(() => {
    switch (device.category) {
        case 'light':
            return lightbulb;
        case 'oven':
            return oven;
        case 'speaker':
            return speaker;
        case 'airConditioner':
            return airConditioner;
        default:
            return lightbulb;
    }
});

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

.v-col {
    display: flex;
    justify-content: center;
    align-items: center;
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

.square-btn {
  min-width: 45px;
  max-width: 45px;
  padding: 0;
  width: 45px;
  height: 45px;
}
</style>
  