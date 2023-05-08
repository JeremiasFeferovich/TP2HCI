<template>
    <v-row align="center" justify="space-evenly">
        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" align="start">
            <p class="text-h6">Intensidad</p>
        </v-col>
        <v-col cols="6" align="center">
            <v-sheet width="90%">
                <v-slider :disabled="disabled || loading" hide-details v-model="intensity" step="1" @end="updateIntensity"
                    thumb-label />
            </v-sheet>
        </v-col>
    </v-row>
    <v-row align="center">
        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" align="start">
            <p class="text-h6">Color</p>
        </v-col>
        <v-col cols="6" align="center">
            <v-btn :disabled="disabled || loading" class="square-btn rounded-circle" variant="outlined"
                @click="showColorPicker = true" :style="{ backgroundColor: device.state.color }"></v-btn>
            <v-dialog class="ma-0" v-model="showColorPicker" width="auto" align="centers">
                <v-color-picker :disabled="loading" v-model="color" hide-inputs @update:model-value="updateColor"
                    class="ma-0 px-2 pt-2" mode="hex" />
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

const deviceStore = useDeviceStore();

const showColorPicker = ref(false);

const loading = ref(false);

const intensity = ref(props.device.state.brightness);
const color = ref(props.device.state.color);
const updateTimeout = ref(null);

const deviceState = {
    id: props.device.id,
    name: props.device.name,
    meta: {
        category: props.device.meta.category
    },
    state: JSON.parse(JSON.stringify(props.device.state))
}

const props = defineProps({
    device: Object,
    disabled: Boolean,
    returnAction: Boolean
})

const emit = defineEmits(['actionSet', 'deviceUpdate']);

onMounted(() => {
    console.log(deviceState)
    emit('deviceUpdate', deviceState)
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setBrightness', params: [intensity.value] })
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setColor', params: [color.value] })
})

async function updateColor() {
    const action = { device: { id: props.device.id }, actionName: 'setColor', params: [color.value] }
    clearTimeout(updateTimeout.value);
    updateTimeout.value = setTimeout(async () => {
        emit('actionSet', action)
        deviceState.state.color = JSON.parse(JSON.stringify(color.value))
        emit('deviceUpdate', deviceState)
        if (!props.returnAction) {
            loading.value = true;
            if (deviceStore.triggerEvent(action)) {
                props.device.state.color = color.value;
            }
            loading.value = false;
        }
    }, 250); // wait for 250ms before sending the request
}

async function updateIntensity() {
    const action = { device: { id: props.device.id }, actionName: 'setBrightness', params: [intensity.value] }
    emit('actionSet', action)
    deviceState.state.brightness = JSON.parse(JSON.stringify(intensity.value))
    emit('deviceUpdate', deviceState)
    console.log(props.device)
    console.log(deviceState)
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
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
</style>