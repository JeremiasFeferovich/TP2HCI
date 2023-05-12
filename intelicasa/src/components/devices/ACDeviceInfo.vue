<template>
    <v-row class="align-center justify-space-evenly">
        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" class="align-start">
            <p class="text-h6">Temperatura</p>
        </v-col>
        <v-col cols="6">
            <v-row class="align-center">
                <p class="mr-3">{{ Math.floor(localTemperature) + '°C' }}</p>
                <v-slider :disabled="disabled || loading" hide-details v-model="localTemperature" @end="setTemperature"
                    min="18" max="38" step="1" />
            </v-row>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-sheet class="sliderCont">
            <ImageSelect :disabled="disabled || loading" label="Modo" :items="modeItems" :initial-item="localMode"
                :ignore-initial-item-changes="returnAction"
                @update:selected-item="(updatedValue) => setMode(updatedValue)" />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="mt-2">
            Aspas Verticales
        </v-sheet>
    </v-row>
    <v-row class="align-center justify-center">
        <p class="mr-3">{{ localVerticalSwing === 0 ? 'Auto' : Math.floor(localVerticalSwing) + '°' }}</p>
        <v-sheet class="sliderCont">
            <v-slider :disabled="disabled || loading" v-model="localVerticalSwing" hide-details min="0" max="90" step="22.5"
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
        <p class="mr-3">{{ localHorizontalSwing === -135 ? 'Auto' : Math.floor(localHorizontalSwing) + '°' }}</p>
        <v-sheet class="sliderCont">
            <v-slider :disabled="disabled || loading" v-model="localHorizontalSwing" hide-details min="-135" max="90"
                step="45" show-ticks="always" tick-size="4" @end="setHorizontalSwing"></v-slider>
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="mt-2">
            Velocidad ventilador
        </v-sheet>
    </v-row>
    <v-row align="center" justify="center">
        <p class="mr-3">{{ localFanSpeed === 0 ? 'Auto' : Math.floor(localFanSpeed) + '%' }}</p>
        <v-sheet class="sliderCont mt-1">
            <v-slider :disabled="disabled || loading" v-model="localFanSpeed" hide-details step="25" show-ticks="always"
                tick-size="4" @end="setFanSpeed">
            </v-slider>
        </v-sheet>
    </v-row>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
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

const localTemperature = ref(props.device.state.temperature)
const localMode = ref(modeItems.value.find(x => x.value === props.device.state.mode))
const localFanSpeed = ref(props.device.state.fanSpeed !== 'auto' ? parseInt(props.device.state.fanSpeed) : 0)
const localVerticalSwing = ref(props.device.state.verticalSwing !== 'auto' ? parseInt(props.device.state.verticalSwing) : 0)
const localHorizontalSwing = ref(props.device.state.horizontalSwing !== 'auto' ? parseInt(props.device.state.horizontalSwing) : -135)

const temperature = computed(() => deviceStore.getDevice(props.device.id).state.temperature)
const mode = computed(() => modeItems.value.find(x => x.value === deviceStore.getDevice(props.device.id).state.mode))
const fanSpeed = computed(() => deviceStore.getDevice(props.device.id).state.fanSpeed)
const verticalSwing = computed(() => deviceStore.getDevice(props.device.id).state.verticalSwing)
const horizontalSwing = computed(() => deviceStore.getDevice(props.device.id).state.horizontalSwing)

watch(temperature, (newVal) => {
    if (!props.returnAction) localTemperature.value = newVal;
})

watch(mode, (newVal) => {
    if (!props.returnAction) localMode.value = modeItems.value.find(x => x.value === newVal.value);
})

watch(fanSpeed, (newVal) => {
    if (!props.returnAction) localFanSpeed.value = newVal !== 'auto' ? parseInt(newVal) : 0;
})

watch(verticalSwing, (newVal) => {
    if (!props.returnAction) localVerticalSwing.value = newVal !== 'auto' ? parseInt(newVal) : 0;
})

watch(horizontalSwing, (newVal) => {
    if (!props.returnAction) localHorizontalSwing.value = newVal !== 'auto' ? parseInt(newVal) : -135;
})

const emit = defineEmits(['actionSet']);

onMounted(() => {
    if (props.returnAction) {
        const newVerticalSwing = localVerticalSwing.value === 0 ? 'auto' : Math.floor(localVerticalSwing.value)
        const newFanSpeed = localFanSpeed.value === 0 ? 'auto' : Math.floor(localFanSpeed.value)
        const newHorizontalSwing = localHorizontalSwing.value === -135 ? 'auto' : Math.floor(localHorizontalSwing.value)

        emit('actionSet', { device: { id: props.device.id }, actionName: 'setTemperature', params: [localTemperature.value] })
        emit('actionSet', { device: { id: props.device.id }, actionName: 'setMode', params: [localMode.value.value] })
        emit('actionSet', { device: { id: props.device.id }, actionName: 'setVerticalSwing', params: [newVerticalSwing] })
        emit('actionSet', { device: { id: props.device.id }, actionName: 'setHorizontalSwing', params: [newHorizontalSwing] })
        emit('actionSet', { device: { id: props.device.id }, actionName: 'setFanSpeed', params: [newFanSpeed] })
    }
})

async function setTemperature() {
    const action = { device: { id: props.device.id }, actionName: 'setTemperature', params: [localTemperature.value] }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    }
}

async function setMode(newMode) {
    const action = { device: { id: props.device.id }, actionName: 'setMode', params: [newMode.value] }
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            localMode.value = newMode;
        }
        loading.value = false
    } else {
        emit('actionSet', action)
        localMode.value = newMode;
        props.device.state.mode = newMode.value;
    }
}

async function setVerticalSwing() {
    const newVerticalSwing = localVerticalSwing.value === 0 ? 'auto' : Math.floor(localVerticalSwing.value)
    const action = { device: { id: props.device.id }, actionName: 'setVerticalSwing', params: [newVerticalSwing] }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    } else {
        emit('actionSet', action)
        props.device.state.verticalSwing = newVerticalSwing;
    }
}

async function setHorizontalSwing() {
    const newHorizontalSwing = localHorizontalSwing.value === -135 ? 'auto' : Math.floor(localHorizontalSwing.value)
    const action = { device: { id: props.device.id }, actionName: 'setHorizontalSwing', params: [newHorizontalSwing] }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    } else {
        emit('actionSet', action)
        props.device.state.horizontalSwing = newHorizontalSwing;
    }
}

async function setFanSpeed() {
    const newFanSpeed = localFanSpeed.value === 0 ? 'auto' : Math.floor(localFanSpeed.value)
    const action = { device: { id: props.device.id }, actionName: 'setFanSpeed', params: [newFanSpeed] }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    } else {
        emit('actionSet', action)
        props.device.state.fanSpeed = newFanSpeed;
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