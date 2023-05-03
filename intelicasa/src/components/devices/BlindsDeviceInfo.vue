<template>
    <v-row align="center" justify="center">
        <v-icon v-if="device.position < 3" class="mr-6" icon="mdi-window-shutter"/>
        <v-icon v-else class="mr-6" icon="mdi-window-shutter-open"/>

        <v-sheet >
            <v-slider class="sliderVertCont" hide-details direction="vertical" min="0" max="10" v-model="device.position" />
        </v-sheet>
    </v-row>
</template>

<script setup>
const { device} = defineProps({
    device: Object,
})

</script>

<style scoped>


.square-btn {
    min-width: 35px;
    max-width: 35px;
    width: 35px;
    height: 35px;
}

.v-slider :deep(.v-input__control){
    height: 100px;
    min-height: 0;
}

</style>