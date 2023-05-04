<template>
    <v-row align="center" justify="space-evenly">
        <v-card-title>Intensidad</v-card-title>
        <v-sheet width="40%">
            <v-slider :disabled="disabled" hide-details v-model="device.intensity" thumb-label />
        </v-sheet>
    </v-row>
    <v-row align="center" justify="space-evenly">
        <v-card-title>Color</v-card-title>
        <v-btn :disabled="disabled" class="square-btn rounded-circle" variant="outlined" @click="showColorPicker = true"
            :style="{ backgroundColor: device.color }"></v-btn>
        <v-dialog v-model="showColorPicker" width="auto">
            <v-color-picker v-model="device.color" hide-inputs hide-canvas class="ma-0 px-2 pt-2" mode="hex" />
        </v-dialog>
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