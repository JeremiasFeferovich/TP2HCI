<template>
    <v-card class="ma-2 py-2 px-5" @click.stop="openDialog = true">
        <v-row align="center">
            <v-col cols="3" align="center">
                <img :src="categoryImg" alt="categoryImg" style="max-height: 100%; max-width: 100%;" />
            </v-col>
            <v-col cols="6" class="text-center" align-self="center">
                <v-card-title class="text-h5">{{ props.device.name }}</v-card-title>
            </v-col>
            <v-col cols="3">
                <v-btn class="square-btn rounded-circle" v-model="props.device.isOn" @click.stop="toggleButtonState"
                    variant="plain" :loading="loadingState">
                    <img :src="powerBtnImg" alt="powerState" />
                </v-btn>
            </v-col>
        </v-row>
        <v-dialog v-model="openDialog" width="30%">
            <DeviceDialog :device="props.device" :loadingState="loadingState" @changeState="toggleButtonState"
                :categoryImg="categoryImg" @delete="deleteDevice" />
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
import blinds from '@/assets/blinds.svg'

import DeviceDialog from './DeviceDialog.vue'

const loadingState = ref(false);
const openDialog = ref(false);

const props = defineProps({
    device: Object,
})

const categoryImg = computed(() => {
    switch (props.device.category) {
        case 'Luces':
            return lightbulb;
        case 'Horno':
            return oven;
        case 'Parlante':
            return speaker;
        case 'Aire Acondicionado':
            return airConditioner;
        case 'Persiana':
            return blinds;
        default:
            return lightbulb;
    }
});

const powerBtnImg = computed(() => {
    return props.device.isOn ? powerOn : powerOff;
})

function toggleButtonState() {
    loadingState.value = true
    setTimeout(() => (loadingState.value = false), 1000)
    props.device.isOn = !props.device.isOn;
}

const emit = defineEmits(['delete']);

function deleteDevice() {
    openDialog.value = false;
    emit('delete');
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
  