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
                <v-btn class="square-btn rounded-circle" v-model="props.device.state.status" @click.stop="toggleButtonState"
                    variant="plain" :loading="loadingState">
                    <img :src="powerBtnImg" alt="powerState" />
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

const categoryImg = computed(() => props.device.category.img);

const powerBtnImg = computed(() => {
    return props.device.state.status === 'on' ? powerOn : powerOff;
})

async function toggleButtonState() {
    loadingState.value = true
    if (await DeviceApi.triggerEvent(props.device.id, props.device.state.status === 'on' ? 'turnOff' : 'turnOn')){
        props.device.state.status = props.device.state.status === 'on' ? 'off' : 'on';
    }
    loadingState.value = false;
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
  