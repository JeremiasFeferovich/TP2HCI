<template>
    <v-row align="center" justify="center">
        <v-icon :disabled="disabled" v-if="device.volume === 0" icon="mdi-volume-low" class="mr-1"></v-icon>
        <v-icon :disabled="disabled" v-else-if="device.volume < 5" icon="mdi-volume-medium" class="mr-1"></v-icon>
        <v-icon :disabled="disabled" v-else icon="mdi-volume-high" class="mr-1"></v-icon>

        <v-btn :disabled="disabled" density="compact" icon="mdi-minus" @click="device.volume--" />
        <v-sheet class="sliderCont">
            <v-slider :disabled="disabled" v-model="device.volume" hide-details min="0" max="10" step="1"></v-slider>
        </v-sheet>
        <v-btn density="compact" icon="mdi-plus" @click="device.volume++" />
    </v-row>
    <v-row align="center" class="my-8" justify="center">
        <v-sheet>
            <v-row justify="center">
                <span class="text-h5 font-italic"> {{ device.song }}</span>
            </v-row>
            <v-row align="center" class="mt-4" display="flex" justify="center">
                <v-btn :disabled="disabled" density="compact" variant="flat" icon="mdi-skip-previous"
                    @click="device.previous()" />
                <v-btn :disabled="disabled" v-if="device.state === 'stop' || device.state === 'pause'" class="mx-5"
                    density="compact" variant="flat" icon="mdi-play" @click="device.play();" />
                <v-btn :disabled=" disabled " v-else class="mx-5" density="compact" variant="flat" icon="mdi-pause"
                    @click=" device.pause(); " />
                <v-btn :disabled=" disabled " density="compact" variant="flat" icon="mdi-skip-next" @click=" device.next " />
            </v-row>
        </v-sheet>

    </v-row>
    <v-row align="center" display="flex" justify="center">
        <v-sheet class="sliderCont">
            <v-select :disabled=" disabled " ,class="centeredSelect" variant="outlined" :items=" device.genres "
                v-model=" device.genre " hide-details hide-selected label="Género" item-text="name" item-value="name" />
        </v-sheet>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';

const { device, disabled } = defineProps({
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

.centeredSelect :deep(.v-field__input) {
    justify-content: center;
}
</style>