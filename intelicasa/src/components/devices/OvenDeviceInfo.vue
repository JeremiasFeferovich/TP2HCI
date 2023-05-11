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
        <v-sheet class="imageCont">
            <ImageSelect :disabled="disabled" :items="heatModes" label="Fuente Calor" :initial-item="heatSource"
                @update:selected-item="(updatedValue) => setHeatSource(updatedValue)" />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="imageCont">
            <ImageSelect :disabled="disabled" :items="grillModes" label="Modo Grill" :initial-item="grillMode"
                @update:selected-item="(updatedValue) => setGrillMode(updatedValue)" />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="imageCont">
            <ImageSelect :disabled="disabled" :items="convectionModes" label="Modo Convección"
                :initial-item="convectionMode" @update:selected-item="(updatedValue) => setConvectionMode(updatedValue)" />
        </v-sheet>
    </v-row>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ImageSelect from './ImageSelect.vue'
import { useDeviceStore } from '@/stores/deviceStore';

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

const props = defineProps({
    device: Object,
    disabled: Boolean,
    returnAction: Boolean
})

const deviceStore = useDeviceStore()

const loading = ref(false)

const temperature = ref(props.device.state.temperature)
const heatSource = ref(heatModes.find(x => x.value === props.device.state.heat))
const grillMode = ref(grillModes.find(x => x.value === props.device.state.grill))
const convectionMode = ref(convectionModes.find(x => x.value === props.device.state.convection))

const emit = defineEmits(['actionSet']);

onMounted(() => {
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setTemperature', params: [temperature.value] })
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setHeat', params: [heatSource.value.value] })
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setGrill', params: [grillMode.value.value] })
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setConvection', params: [convectionMode.value.value] })
})


onUnmounted(() => {
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setTemperature', params: [temperature.value] })
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setHeat', params: [heatSource.value.value] })
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setGrill', params: [grillMode.value.value] })
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setConvection', params: [convectionMode.value.value] })
})


async function setTemperature() {
    const action = { device: { id: props.device.id }, actionName: 'setTemperature', params: [temperature.value] }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    }
}

async function setHeatSource(newHeatSource) {
    const action = { device: { id: props.device.id }, actionName: 'setHeat', params: [newHeatSource.value] }
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            heatSource.value = newHeatSource;
        }
        loading.value = false
    } else {
        heatSource.value = newHeatSource;
        props.device.state.heat = newHeatSource.value;
    }
}

async function setGrillMode(newGrillMode) {
    const action = { device: { id: props.device.id }, actionName: 'setGrill', params: [newGrillMode.value] }
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            grillMode.value = newGrillMode;
        }
        loading.value = false
    } else {
        grillMode.value = newGrillMode;
        props.device.state.grill = newGrillMode.value;
    }
}

async function setConvectionMode(newConvMode) {
    if (!props.returnAction) {
        const action = { device: { id: props.device.id }, actionName: 'setConvection', params: [newConvMode.value] }
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            convectionMode.value = newConvMode;
        }
        loading.value = false
    } else {
        convectionMode.value = newConvMode;
        props.device.state.convection = newConvMode.value;
    }
}

</script>

<style scoped>
.square-btn {
    min-width: 35px;
    max-width: 35px;
    width: 35px;
    height: 35px;
}

.imageCont {
    width: 70%;
    display: inline-flex;
    margin-top: 1rem;
}
</style>