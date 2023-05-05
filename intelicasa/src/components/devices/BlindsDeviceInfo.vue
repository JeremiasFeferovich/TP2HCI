<template>
    <v-row align="center" justify="center">
        <v-icon v-if="position < 40" class="mr-6" size="50" icon="mdi-window-shutter" />
        <v-icon v-else class="mr-6" size="50" icon="mdi-window-shutter-open" />
        <v-sheet>
            <v-slider class="sliderVertCont" hide-details direction="vertical" v-model="position" @end="updatePosition" />
        </v-sheet>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import { DeviceApi } from "@/api/device";

const props = defineProps({
    device: Object,
})

const position = ref(props.device.state.currentLevel);

function updatePosition() {
    console.log(position.value);
    console.log(props.device.state.currentLevel);
    DeviceApi.triggerEvent(props.device.id, 'open', [position.value])
    //device.position = position.value;
}

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