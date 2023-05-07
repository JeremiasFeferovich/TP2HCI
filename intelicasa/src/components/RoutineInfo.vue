<template>
    <v-card class="routine-card-info" flat>

        <v-row>
            <v-card-title>
                <p class="text-h5">{{ routine.name }}</p>
            </v-card-title>
            <v-col class="mr-1" align="end">
                <v-icon end icon="mdi-delete" @click="deleteRoutine" />
            </v-col>
        </v-row>
        <v-container>
            <v-col justify="center" align="center">
                <v-row cols="12" class="fill-space">
                    <v-expansion-panels variant="inset" :model-value="opened">
                        <v-expansion-panel mandatory v-for="(device, index) in routine.devices" :key="index">
                            <v-expansion-panel-title>
                                <template v-slot:default="{ expanded }">
                                    <v-row no-gutters>
                                        <v-col cols="3">
                                            <v-img :src="categoryImg(device)" alt="categoryImg" contain height="40px"
                                                width="40px" />
                                        </v-col>
                                        <v-col cols="6" class="d-flex justify-start text-h5">
                                            {{ device.name }}
                                        </v-col>
                                        <v-col cols="3" class="d-flex justify-end pr-5">
                                            <v-icon end icon="mdi-delete" @click.stop="deleteDevice(device)" />
                                        </v-col>

                                    </v-row>
                                </template>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <DevicesOptions :returnAction="true" :disabled="!device.isOn" :device="device"
                                    :loadingState="false" @changeState="toggleButtonState(device)"
                                    @actionSet="(action) => addAction(action)" />
                            </v-expansion-panel-text>


                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-row>
                <v-row cols="12" class="fill-space">
                    <v-select label="Select" :items="allDevices" item-title="name" return-object v-model="selectedDevice"
                        @update:modelValue="addSelectedDevice" />
                </v-row>
            </v-col>
        </v-container>
    </v-card>
</template>
  
<script setup>
import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'
import lightbulb from '@/assets/lightbulb.svg'
import speaker from '@/assets/speaker.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'
import DevicesOptions from './devices/DevicesOptions.vue';
import { ref } from 'vue'

const { routine, allDevices } = defineProps({
    routine: Object,
    allDevices: Array
});

const selectedDevice = ref('');
const emit = defineEmits(['delete-routine']);

function deleteRoutine() {
    emit('delete-routine');
}

function deleteDevice(device) {
    routine.devices = routine.devices.filter(d => d.name !== device.name)
}

function addAction(action) {

    const { device, actionName } = action
    if (actionName === "turnOn" || actionName === "turnOff") {
        routine.actions.value = routine.actions.value.filter(action => action.device.id !== device.id || (action.actionName !== "turnOn" && action.actionName !== "turnOff"))

    } else {
        routine.actions.value = routine.actions.value.filter(action => action.device.id !== device.id || action.actionName !== actionName)
    }
    routine.actions.value.push(action)
}


const addSelectedDevice = () => {
    if (selectedDevice.value !== '') {
        selectedDevice.value = allDevices.find(device => device.name === selectedDevice.value.name);

        routine.devices.push(selectedDevice.value)
        selectedDevice.value = ''
        showSelector.value = false
    }

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
.routine-card-info {
    padding: 16px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
}


.device-card {
    max-width: 70%;
    margin: auto;
}

.subtitle-text {
    color: rgb(121, 121, 121);
}
</style>
