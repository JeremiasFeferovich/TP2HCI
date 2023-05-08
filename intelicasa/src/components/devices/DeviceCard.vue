<template>
    <v-card class="ma-2 py-2 px-5" @click.stop="openDialog = true">
        <v-row align="center">
            <v-col cols="3" align="center" class="py-3 px-0">
                <v-img class="categoryImg" :src="categoryImg" alt="categoryImg" contain />
            </v-col>
            <v-col cols="6" class="text-center" align-self="center">
                <v-card-title class="text-h5">{{ props.device.name }}</v-card-title>
            </v-col>
            <v-col cols="3">
                <v-icon v-if="device.meta.category.name === 'Aspiradora'" :icon="batteryImg" size="35" />
                <v-icon v-else-if="device.meta.category.name === 'Puerta'" :icon="doorImg" size="40" />
                <v-btn v-else class="square-btn rounded-circle" v-model="props.device.state.status"
                    @click.stop="toggleButtonState" variant="text" :loading="loadingState">
                    <img :src="powerBtnImg" contain alt="powerState" />
                </v-btn>
            </v-col>
        </v-row>
        <v-dialog v-model="openDialog" width="40%">
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

import DeviceDialog from './DeviceDialog.vue'
import { DeviceApi } from '@/api/device';

const loadingState = ref(false);
const openDialog = ref(false);

const props = defineProps({
    device: Object,
})

const categoryImg = computed(() => props.device.meta.category.img);

const powerBtnImg = computed(() => {
    return props.device.state.status === 'on' ? powerOn : powerOff;
})

async function toggleButtonState() {
    loadingState.value = true
    if (await DeviceApi.triggerEvent({ device: { id: props.device.id }, actionName: props.device.state.status === 'on' ? 'turnOff' : 'turnOn' })) {
        props.device.state.status = props.device.state.status === 'on' ? 'off' : 'on';
    }
    loadingState.value = false;
}

const emit = defineEmits(['delete']);

function deleteDevice() {
    openDialog.value = false;
    emit('delete');
}

const doorImg = computed(() => {
    if (props.device.state.status === 'opened') {
        return 'mdi-door-open'
    } else if (props.device.state.status === 'closed' && props.device.state.lock === 'locked') {
        return 'mdi-door-closed-lock'
    } else
        return 'mdi-door-closed'
})

const batteryImg = computed(() => {
    if (props.device.state.batteryLevel < 10) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-10`
    } else if (props.device.state.batteryLevel < 20) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-20`
    } else if (props.device.state.batteryLevel < 30) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-30`
    } else if (props.device.state.batteryLevel < 40) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-40`
    } else if (props.device.state.batteryLevel < 50) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-50`
    } else if (props.device.state.batteryLevel < 60) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-60`
    } else if (props.device.state.batteryLevel < 70) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-70`
    } else if (props.device.state.batteryLevel < 80) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-80`
    } else if (props.device.state.batteryLevel < 90) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-90`
    } else {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}`
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
  