<template>
    <v-row class="align-center justify-space-evenly">
        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" class="align-start">
            <p class="text-h6">Temperatura</p>
        </v-col>
        <v-col cols="6">
            <v-row class="align-center">
                <p class="mr-3">{{ device.temperature == 0 ? 'Auto' : Math.floor(device.temperature) + '°C' }}</p>
                <v-slider :disabled="disabled" hide-details v-model="device.temperature" min="18" max="38"/>
            </v-row>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-sheet class="sliderCont">
            <ImageSelect :disabled="disabled" label="Modo" :items="modeItems" :selectedItem="device.mode"
                @update="(updatedValue) => device.mode = updatedValue" />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="mt-2">
            Aspas Verticales
        </v-sheet>
    </v-row>
    <v-row class="align-center justify-center">
        <p class="mr-3">{{ verticalSwing == 0 ? 'Auto' : Math.floor(verticalSwing) + '°' }}</p>
        <v-sheet class="sliderCont">
            <v-slider :disabled="disabled" v-model="verticalSwing" hide-details min="0" max="90" step="22.5"
                show-ticks="always" tick-size="4">
            </v-slider>
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="mt-2">
            Aspas Horizontales
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <p class="mr-3">{{ horizontalSwing == -135 ? 'Auto' : Math.floor(horizontalSwing) + '°' }}</p>
        <v-sheet class="sliderCont">
            <v-slider :disabled="disabled" v-model="horizontalSwing" hide-details min="-135" max="90" step="45"
                show-ticks="always" tick-size="4"></v-slider>
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="mt-2">
            Velocidad ventilador
        </v-sheet>
    </v-row>
    <v-row align="center" justify="center">
        <p class="mr-3">{{ fanSpeed == 0 ? 'Auto' : Math.floor(fanSpeed) + '%' }}</p>
        <v-sheet class="sliderCont mt-1">
            <v-slider :disabled="disabled" v-model="fanSpeed" hide-details step="25" show-ticks="always" tick-size="4">
            </v-slider>
        </v-sheet>
        <!-- <v-icon class="ml-2" icon="mdi-fan" /> -->
    </v-row>
</template>

<script setup>
import { ref, computed } from 'vue';

import ImageSelect from './ImageSelect.vue';

import acColdMode from '@/assets/acColdMode.png'
import acHeatMode from '@/assets/acHeatMode.png'
import acVentilationMode from '@/assets/acVentilationMode.png'
import { watch } from 'vue';

const modeItems = ref([{ name: 'Ventilación', img: acVentilationMode }, { name: 'Frio', img: acColdMode }, { name: "Calor", img: acHeatMode }]);

const verticalAutomatic = ref(device.verticalSwing === 'Automático');
const horizontalAutomatic = ref(device.horizontalSwing === 'Automático');
const fanSpeedAutomatic = ref(device.fanSpeed === 'Automático');

const fanSpeed = ref(device.fanSpeed != 'Automático' ? device.fanSpeed : 0  );
const verticalSwing = ref(device.verticalSwing != 'Automático' ? device.verticalSwing : 0);
const horizontalSwing = ref(device.horizontalSwing != 'Automático' ? device.horizontalSwing : -135);

watch(verticalSwing, (newValue) => {
    device.verticalSwing = Math.floor(newValue);
});
watch(verticalAutomatic, (newValue) => {
    if (newValue === true) {
        device.verticalSwing = "Automático";
    } else {
        device.verticalSwing = verticalSwing.value;
    }
});
watch(horizontalSwing, (newValue) => {
    device.horizontalSwing = Math.floor(newValue);
});
watch(horizontalAutomatic, (newValue) => {
    if (newValue === true) {
        device.horizontalSwing = "Automático";
    } else {
        device.horizontalSwing = horizontalSwing.value;
    }
});
watch(fanSpeed, (newValue) => {
    device.fanSpeed = Math.floor(newValue);
});
watch(fanSpeedAutomatic, (newValue) => {
    if (newValue === true) {
        device.fanSpeed = "Automático";
    } else {
        device.fanSpeed = fanSpeed.value;
    }
});

const { device } = defineProps({
    device: Object,
    disabled: Boolean
})

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