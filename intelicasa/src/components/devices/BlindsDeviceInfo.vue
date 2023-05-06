<template>
    <v-row align="center" justify="center">
        <v-col align="center">
            <span class="text-h5 font-italic">State</span>
        </v-col>
        <v-col justify-center>
            <v-row align="center" justify="center">
                <v-icon v-if="level < 40" class="mr-6" size="50" icon="mdi-window-shutter" />
                <v-icon v-else class="mr-6" size="50" icon="mdi-window-shutter-open" />
                <v-sheet>
                    <v-slider :disabled="loading" class="sliderVertCont" hide-details direction="vertical" v-model="level"
                        @end="setLevel" />
                </v-sheet>
            </v-row>
        </v-col>
        <v-col align="center">
            <v-row class="mb-5">
                <v-btn  :disabled="loading" height="100%" width="175px">
                    <v-icon class="mr-6" size="50" icon="mdi-window-shutter" />
                    <p class="text-button">Cerrar</p>
                </v-btn>
            </v-row>
            <v-row class="mt-5">
                <v-btn  :disabled="loading" height="100%"  width="175px">
                    <v-icon class="mr-6" size="50" icon="mdi-window-shutter-open" />
                    <p class="text-button">Abrir</p>
                </v-btn>
            </v-row>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import { DeviceApi } from "@/api/device";

const props = defineProps({
    device: Object,
})

const level = ref(props.device.state.currentLevel);
const loading = ref(false);
const status = ref(props.device.state.status);


</script>

<style scoped>
.square-btn {
    min-width: 35px;
    max-width: 35px;
    width: 35px;
    height: 35px;
}

.v-slider :deep(.v-input__control) {
    height: 100px;
    min-height: 0;
}
</style>