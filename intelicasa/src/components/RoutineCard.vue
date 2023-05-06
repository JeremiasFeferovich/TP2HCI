<template>
    <v-card class="ma-2 pa-3 routine-card" @click="openDialog = true">
        <v-row align="center">
            <v-col cols="6" align="left" class="pl-5">
                <p class="text-h4">{{ prop.name }}</p>
            </v-col>
            <v-col cols="6">
                <div class="image-container">
                    <v-img v-for="(device, index) in routine.devices" :key="index" :src="categoryImg(device)"
                        alt="categoryImg" contain height="40px" width="40px" />
                </div>
            </v-col>
        </v-row>
    </v-card>
    <v-dialog v-model="openDialog" width="50%">
        <RoutineInfo :routine="routine" :allDevices="allDevices" @delete-routine="removeRoutine" />
    </v-dialog>
</template>

<script setup>

import { ref, computed } from 'vue';
import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'
import lightbulb from '@/assets/lightbulb.svg'
import speaker from '@/assets/speaker.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'
import RoutineInfo from './RoutineInfo.vue';

const openDialog = ref(false);

const buttonState = ref(false);
const loading = ref(false);

const powerBtnImg = computed(() => {
    return buttonState.value ? powerOn : powerOff;
})

const prop = defineProps({
    name: String,
    routine: Object,
    allDevices: Array
})

function toggleButtonState() {
    loading.value = true
    setTimeout(() => (loading.value = false), 1000)
    buttonState.value = !buttonState.value;
}

const emit = defineEmits(['remove-routine']);

function removeRoutine() {
    openDialog.value = false;
    emit('remove-routine');
}



function categoryImg(device) {
    switch (device.category) {
        case 'Luces':
            return lightbulb;
        case 'Horno':
            return oven;
        case 'Parlante':
            return speaker;
        case 'Aire Acondicionado':
            return airConditioner;
        default:
            return lightbulb;
    }
};


</script>

<style scoped>
.routine-card {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
}

.routine-card:hover {
    background-color: rgba(220, 220, 220, 0.892);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.image-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 100%;

}
</style>