<template>
    <v-row align="center" justify="space-evenly">
        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" class="align-start">
            <p class="text-h6">Temperatura</p>
        </v-col>
        <v-col cols="6">
            <v-sheet width="80%">
                <v-row class="align-center">
                    <p class="mr-3">{{ Math.round(localTemperature) + '°C' }}</p>
                    <v-slider :disabled="disabled" hide-details v-model="localTemperature" @end="setTemperature" min="90"
                        max="230" step="1" />
                </v-row>
            </v-sheet>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-sheet class="imageCont">
            <ImageSelect :disabled="disabled" :items="heatModes" label="Fuente Calor" :initial-item="localHeatSource"
                :ignore-initial-item-changes="returnAction"
                @update:selected-item="(updatedValue) => setHeatSource(updatedValue)" />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="imageCont">
            <ImageSelect :disabled="disabled" :items="grillModes" label="Modo Grill" :initial-item="localGrillMode"
                :ignore-initial-item-changes="returnAction"
                @update:selected-item="(updatedValue) => setGrillMode(updatedValue)" />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="imageCont">
            <ImageSelect :disabled="disabled" :items="convectionModes" label="Modo Convección"
                :ignore-initial-item-changes="returnAction" :initial-item="localConvectionMode"
                @update:selected-item="(updatedValue) => setConvectionMode(updatedValue)" />
        </v-sheet>
    </v-row>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import ImageSelect from '@/components/ImageSelect.vue';
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

const localTemperature = ref(props.device.state.temperature)
const localHeatSource = ref(heatModes.find(x => x.value === props.device.state.heat))
const localGrillMode = ref(grillModes.find(x => x.value === props.device.state.grill))
const localConvectionMode = ref(convectionModes.find(x => x.value === props.device.state.convection))

const storeDevice = computed(() => deviceStore.getDevice(props.device.id))

const temperature = computed(() => storeDevice.value && storeDevice.value.state.temperature)
const heatSource = computed(() => storeDevice.value && heatModes.find(x => x.value === storeDevice.value.state.heat))
const grillMode = computed(() => storeDevice.value && grillModes.find(x => x.value === storeDevice.value.state.grill))
const convectionMode = computed(() => storeDevice.value && convectionModes.find(x => x.value === storeDevice.value.state.convection))

watch(temperature, (newVal) => {
    if (!props.returnAction) localTemperature.value = newVal;
})

watch(heatSource, (newVal) => {
    if (!props.returnAction) localHeatSource.value = newVal;
})

watch(grillMode, (newVal) => {
    if (!props.returnAction) localGrillMode.value = newVal;
})

watch(convectionMode, (newVal) => {
    if (!props.returnAction) localConvectionMode.value = newVal;
})

const emit = defineEmits(['actionSet']);

onMounted(() => {
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setTemperature', params: [localTemperature.value] })
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setHeat', params: [localHeatSource.value.value] })
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setGrill', params: [localGrillMode.value.value] })
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setConvection', params: [localConvectionMode.value.value] })
})

async function setTemperature() {
    const action = { device: { id: props.device.id }, actionName: 'setTemperature', params: [localTemperature.value] }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    }else{
        emit('actionSet', action)
    }
}

async function setHeatSource(newHeatSource) {
    const action = { device: { id: props.device.id }, actionName: 'setHeat', params: [newHeatSource.value] }
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            localHeatSource.value = newHeatSource;
        }
        loading.value = false
    } else {
        emit('actionSet', action)
        localHeatSource.value = newHeatSource;
        props.device.state.heat = newHeatSource.value;
    }
}

async function setGrillMode(newGrillMode) {
    const action = { device: { id: props.device.id }, actionName: 'setGrill', params: [newGrillMode.value] }
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            localGrillMode.value = newGrillMode;
        }
        loading.value = false
    } else {
        emit('actionSet', action)
        localGrillMode.value = newGrillMode;
        props.device.state.grill = newGrillMode.value;
    }
}

async function setConvectionMode(newConvMode) {
    const action = { device: { id: props.device.id }, actionName: 'setConvection', params: [newConvMode.value] }
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            localConvectionMode.value = newConvMode;
        }
        loading.value = false
    } else {
        emit('actionSet', action)
        localConvectionMode.value = newConvMode;
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