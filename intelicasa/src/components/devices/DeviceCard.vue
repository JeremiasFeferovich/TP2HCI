<template>
    <v-card class="ma-0 py-2 px-5" :disabled="loadingState" @click.stop="openDialog = true">
        <v-row align="center">
            <v-col cols="3" align="center" class="py-3 px-0">
                <v-img class="categoryImg" :src="categoryImg" alt="categoryImg" contain />
            </v-col>
            <v-col cols="6" class="text-center" align-self="center">
                <v-card-title class="text-h5">{{ device && device.name }}</v-card-title>
            </v-col>
            <v-col cols="3">
                <v-icon v-if="device && device.meta.category.name === 'Aspiradora'" :icon="batteryImg" size="35" />
                <v-icon v-else-if="device && device.meta.category.name === 'Puerta'" :icon="doorImg" size="40" />
                <v-btn v-else-if="device" class="square-btn rounded-circle" v-model="device.state.status"
                    @click.stop="toggleButtonState" variant="text" :loading="loadingState">
                    <img :src="powerBtnImg" contain alt="powerState" />
                </v-btn>
            </v-col>
        </v-row>
        <v-dialog v-model="openDialog" width="50%">
            <DeviceDialog :device="device" :loadingState="loadingState" @changeState="toggleButtonState"
                :categoryImg="categoryImg" @delete="deleteDevice" />
        </v-dialog>
    </v-card>
</template>
  
<script setup>
import { ref, computed } from 'vue';

// Assets imports
import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'

import DeviceDialog from './DeviceDialog.vue'
import { useDeviceStore } from '@/stores/deviceStore';

const deviceStore = useDeviceStore();

const loadingState = ref(false);
const openDialog = ref(false);

const device = computed(() => deviceStore.getDevice(props.deviceId));

const props = defineProps({
    deviceId: String,
})

const categoryImg = computed(() => device.value && device.value.meta.category.img);

const powerBtnImg = computed(() => {
    return device.value && device.value.state.status === 'on' ? powerOn : powerOff;
})

async function toggleButtonState() {
    loadingState.value = true
    await deviceStore.triggerEvent({ device: { id: device.value.id }, actionName: device.value.state.status === 'on' ? 'turnOff' : 'turnOn' })
    loadingState.value = false;
}

const emit = defineEmits(['delete']);

function deleteDevice() {
    openDialog.value = false;
    emit('delete');
}

const doorImg = computed(() => {
    if (device.value) {
        if (device.value.state.status === 'opened') {
            return 'mdi-door-open'
        } else if (device.value.state.status === 'closed' && device.value.state.lock === 'locked') {
            return 'mdi-door-closed-lock'
        } else
            return 'mdi-door-closed'
    }
})

const batteryImg = computed(() => {
    if (device.value) {
        if (device.value.state.batteryLevel < 10) {
            return `mdi-battery${device.value.state.status === "docked" ? "-charging" : ""}-10`
        } else if (device.value.state.batteryLevel < 20) {
            return `mdi-battery${device.value.state.status === "docked" ? "-charging" : ""}-20`
        } else if (device.value.state.batteryLevel < 30) {
            return `mdi-battery${device.value.state.status === "docked" ? "-charging" : ""}-30`
        } else if (device.value.state.batteryLevel < 40) {
            return `mdi-battery${device.value.state.status === "docked" ? "-charging" : ""}-40`
        } else if (device.value.state.batteryLevel < 50) {
            return `mdi-battery${device.value.state.status === "docked" ? "-charging" : ""}-50`
        } else if (device.value.state.batteryLevel < 60) {
            return `mdi-battery${device.value.state.status === "docked" ? "-charging" : ""}-60`
        } else if (device.value.state.batteryLevel < 70) {
            return `mdi-battery${device.value.state.status === "docked" ? "-charging" : ""}-70`
        } else if (device.value.state.batteryLevel < 80) {
            return `mdi-battery${device.value.state.status === "docked" ? "-charging" : ""}-80`
        } else if (device.value.state.batteryLevel < 90) {
            return `mdi-battery${device.value.state.status === "docked" ? "-charging" : ""}-90`
        } else {
            return `mdi-battery${device.value.state.status === "docked" ? "-charging" : ""}`
        }
    }
})

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

.categoryImg {
    height: 75px;
    width: 75px;
    padding: 5px 0;
}

.square-btn {
    min-width: 45px;
    max-width: 45px;
    padding: 0;
    width: 45px;
    height: 45px;
}
</style>
  