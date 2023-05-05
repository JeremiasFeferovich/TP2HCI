<template>
    <v-row align="center" justify="space-evenly">
        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" align="start">
            <p class="text-h6">Intensidad</p>
        </v-col>
        <v-col cols="6" align="center">
            <v-sheet width="90%">
                <v-slider :disabled="disabled" hide-details v-model="device.intensity" thumb-label />
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
                :style="{ backgroundColor: device.color }"></v-btn>
            <v-dialog class="ma-0" v-model="showColorPicker" width="auto" align="centers">
                <v-color-picker v-model="device.color" hide-inputs hide-details hide-canvas class="ma-0 px-2 pt-2" mode="hex" />
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';

const showColorPicker = ref(false);

const { device, disabled } = defineProps({
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
</style>