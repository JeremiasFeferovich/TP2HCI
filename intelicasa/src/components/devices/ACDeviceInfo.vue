<template>
    <v-row class="align-center justify-space-evenly">
        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" class="align-start">
            <p class="text-h6">Temperatura</p>
        </v-col>
        <v-col cols="6">
            <v-row class="align-center">
                <p class="mr-3">{{ Math.floor(temperature) + '°C' }}</p>
                <v-slider :disabled="disabled || loading" hide-details v-model="temperature" @end="setTemperature" min="18"
                    max="38" step="1" />
            </v-row>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-sheet class="sliderCont">
            <ImageSelect :disabled="disabled || loading" label="Modo" :items="modeItems" :initial-item="mode"
                @update:selected-item="(updatedValue) => setMode(updatedValue)" />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="mt-2">
            Aspas Verticales
        </v-sheet>
    </v-row>
    <v-row class="align-center justify-center">
        <p class="mr-3">{{ verticalSwing === 0 ? 'Auto' : Math.floor(verticalSwing) + '°' }}</p>
        <v-sheet class="sliderCont">
            <v-slider :disabled="disabled || loading" v-model="verticalSwing" hide-details min="0" max="90" step="22.5"
                show-ticks="always" tick-size="4" @end="setVerticalSwing">
            </v-slider>
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="mt-2">
            Aspas Horizontales
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <p class="mr-3">{{ horizontalSwing === -135 ? 'Auto' : Math.floor(horizontalSwing) + '°' }}</p>
        <v-sheet class="sliderCont">
            <v-slider :disabled="disabled || loading" v-model="horizontalSwing" hide-details min="-135" max="90" step="45"
                show-ticks="always" tick-size="4" @end="setHorizontalSwing"></v-slider>
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="mt-2">
            Velocidad ventilador
        </v-sheet>
    </v-row>
    <v-row align="center" justify="center">
        <p class="mr-3">{{ fanSpeed === 0 ? 'Auto' : Math.floor(fanSpeed) + '%' }}</p>
        <v-sheet class="sliderCont mt-1">
            <v-slider :disabled="disabled || loading" v-model="fanSpeed" hide-details step="25" show-ticks="always"
                tick-size="4" @end="setFanSpeed">
            </v-slider>
        </v-sheet>
        <!-- <v-icon class="ml-2" icon="mdi-fan" /> -->
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import ImageSelect from './ImageSelect.vue';
import { useDeviceStore } from '@/stores/deviceStore';

import acColdMode from '@/assets/ac/acColdMode.png'
import acHeatMode from '@/assets/ac/acHeatMode.png'
import acVentilationMode from '@/assets/ac/acVentilationMode.png'

const modeItems = ref([
    { name: 'Ventilación', value: 'fan', img: acVentilationMode },
    { name: 'Frio', value: 'cool', img: acColdMode },
    { name: "Calor", value: 'heat', img: acHeatMode }])

const props = defineProps({
    device: Object,
    disabled: Boolean,
    returnAction: Boolean
})

const deviceStore = useDeviceStore()

const loading = ref(false)

const temperature = ref(props.device.state.temperature)
const mode = ref(modeItems.value.find(x => x.value === props.device.state.mode))

const fanSpeed = ref(props.device.state.fanSpeed !== 'auto' ? parseInt(props.device.state.fanSpeed) : 0)
const verticalSwing = ref(props.device.state.verticalSwing !== 'auto' ? parseInt(props.device.state.verticalSwing) : 0)
const horizontalSwing = ref(props.device.state.horizontalSwing !== 'auto' ? parseInt(props.device.state.horizontalSwing) : -135)

const emit = defineEmits(['actionSet']);

async function setTemperature() {
    const action = { device: { id: props.device.id }, actionName: 'setTemperature', params: [temperature.value] }
    emit('actionSet', action)
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    }
}

async function setMode(newMode) {
    const action = { device: { id: props.device.id }, actionName: 'setMode', params: [newMode.value] }
    emit('actionSet', action)
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            mode.value = newMode;
            props.device.state.mode = newMode.value;
        }
        loading.value = false
    }
}

async function setVerticalSwing() {
    const newVerticalSwing = verticalSwing.value === 0 ? 'auto' : Math.floor(verticalSwing.value)
    const action = { device: { id: props.device.id }, actionName: 'setVerticalSwing', params: [newVerticalSwing] }
    emit('actionSet', action)
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            props.device.state.verticalSwing = newVerticalSwing;
        }
        loading.value = false
    }
}

async function setHorizontalSwing() {
    const newHorizontalSwing = horizontalSwing.value === -135 ? 'auto' : Math.floor(horizontalSwing.value)
    const action = { device: { id: props.device.id }, actionName: 'setHorizontalSwing', params: [newHorizontalSwing] }
    emit('actionSet', action)
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            props.device.state.horizontalSwing = newHorizontalSwing;
        }
        loading.value = false
    }
}

async function setFanSpeed() {
    const newFanSpeed = fanSpeed.value === 0 ? 'auto' : Math.floor(fanSpeed.value)
    const action = { device: { id: props.device.id }, actionName: 'setFanSpeed', params: [newFanSpeed] }
    emit('actionSet', action)
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            props.device.state.fanSpeed = newFanSpeed;
        }
        loading.value = false
    }
}

</script>

<style scoped>
.square-btn {
    min-width: 30px;
    max-width: 30px;
    width: 30px;
    height: 30px;
    margin-right: 15px;
}

.sliderCont {
    width: 70%;
    display: inline-flex;
}
</style>