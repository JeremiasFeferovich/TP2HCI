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
            <v-btn :disabled="disabled" class="square-btn rounded-circle" variant="outlined" @click="showColorPicker = true"
                :style="{ backgroundColor: device.state.color }"></v-btn>
            <v-dialog class="ma-0" v-model="showColorPicker" width="auto" align="centers">
                <v-color-picker :disabled="loading" v-model="color" hide-inputs @update:model-value="updateColor"
                    class="ma-0 px-2 pt-2" mode="hex" />
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import { DeviceApi } from '@/api/device';

const showColorPicker = ref(false);

const loading = ref(false);

const intensity = ref(props.device.state.brightness);
const color = ref(props.device.state.color);
const updateTimeout = ref(null);

const props = defineProps({
    device: Object,
    disabled: Boolean
})

const emit = defineEmits(['updateColor', 'updateIntensity', 'toggleState']);


async function updateColor() {
    loading.value = true;
    clearTimeout(updateTimeout.value);
    updateTimeout.value = setTimeout(async () => {
        if (DeviceApi.triggerEvent(props.device.id, 'setColor', [color.value])){
            props.device.state.color = color.value;
        }
    }, 250); // wait for 250ms before sending the request
    loading.value = false;
}

async function updateIntensity() {
    loading.value = true
    await DeviceApi.triggerEvent(props.device.id, 'setBrightness', [intensity.value])
    loading.value = false
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