<template>
    <v-row align="center" justify="space-evenly">
        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" class="align-start">
            <p class="text-h6">Temperatura</p>
        </v-col>
        <v-col cols="6">
            <v-sheet width="80%">
                <v-row class="align-center">
                    <p class="mr-3">{{ Math.round(temperature) + '°C' }}</p>
                    <v-slider :disabled="disabled" hide-details v-model="temperature" @end="setTemperature" min="90"
                        max="230" step="1" />
                </v-row>
            </v-sheet>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-sheet class="sliderCont">
            <ImageSelect :disabled="disabled" :items="heatModes" label="Fuente Calor" :initial-item="heatSource"
                @update:selected-item="(updatedValue) => setHeatSource(updatedValue)" />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="sliderCont">
            <ImageSelect :disabled="disabled" :items="grillModes" label="Modo Grill" :initial-item="grillMode"
                @update:selected-item="(updatedValue) => setGrillMode(updatedValue)" />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="sliderCont">
            <ImageSelect :disabled="disabled" :items="convectionModes" label="Modo Convección" :initial-item="convectionMode"
                @update:selected-item="(updatedValue) => setConvectionMode(updatedValue)" />
        </v-sheet>
    </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { DeviceApi } from '@/api/device'
import ImageSelect from './ImageSelect.vue'

//Image assets
import heatModeConventional from '@/assets/oven/heatModeConventional.png'
import heatModeBottom from '@/assets/oven/heatModeBottom.png'
import heatModeTop from '@/assets/oven/heatModeTop.png'

import grillModeOff from '@/assets/oven/grillModeOff.png'
import grillModeEco from '@/assets/oven/ecoMode.png'
import grillModeConventional from '@/assets/oven/grillModeConventional.png'

import convectionModeOff from '@/assets/oven/convectionModeOff.png'
import convectionModeEco from '@/assets/oven/ecoMode.png'
import convectionModeNormal from '@/assets/oven/convectionModeNormal.png'

const heatModes = [
    { name: 'Convencional', value: 'conventional', img: heatModeConventional },
    { name: 'Abajo', value: 'bottom', img: heatModeBottom },
    { name: 'Arriba', value: 'top', img: heatModeTop }]

const grillModes = [
    { name: 'Apagado', value: 'off', img: grillModeOff },
    { name: 'Economico', value: 'eco', img: grillModeEco },
    { name: 'Convencional', value: 'large', img: grillModeConventional }]

const convectionModes = [
    { name: 'Apagado', value: 'off', img: convectionModeOff },
    { name: 'Economico', value: 'eco', img: convectionModeEco },
    { name: 'Normal', value: 'normal', img: convectionModeNormal }]



const temperature = ref(props.device.state.temperature)
const heatSource = ref(heatModes.find(x => x.value === props.device.state.heat))
const grillMode = ref(grillModes.find(x => x.value === props.device.state.grill))
const convectionMode = ref(convectionModes.find(x => x.value === props.device.state.convection))

const loading = ref(false)

async function setTemperature() {
    loading.value = true
    await DeviceApi.triggerEvent(props.device.id, 'setTemperature', [temperature.value])
    loading.value = false
}

async function setHeatSource(newHeatSource) {
    loading.value = true
    if (await DeviceApi.triggerEvent(props.device.id, 'setHeat', [newHeatSource.value])) {
        heatSource.value = newHeatSource;
        props.device.state.heat = newHeatSource.value;
    }
    loading.value = false
}

async function setGrillMode(newGrillMode) {
    loading.value = true
    if (await DeviceApi.triggerEvent(props.device.id, 'setGrill', [newGrillMode.value])) {
        grillMode.value = newGrillMode;
        props.device.state.grill = newGrillMode.value;
    }
    loading.value = false
}

async function setConvectionMode(newConvMode) {
    loading.value = true
    if (await DeviceApi.triggerEvent(props.device.id, 'setConvection', [newConvMode.value])) {
        convectionMode.value = newConvMode;
        props.device.state.convection = newConvMode.value;
    }
    loading.value = false
}


const props = defineProps({
    device: Object,
    disabled: Boolean
})

</script>

<style scoped>
.square-btn {
    min-width: 35px;
    max-width: 35px;
    width: 35px;
    height: 35px;
}

.sliderCont {
    width: 70%;
    display: inline-flex;
    margin-top: 1rem;
}
</style>