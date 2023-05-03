<template>
    <v-row align="center" justify="space-evenly">
        <v-card-title>Temperatura</v-card-title>
        <v-sheet width="40%">
            <v-slider hide-details v-model="device.temperature" thumb-label min="90" max="230">
                <template v-slot:thumb-label="{ modelValue }">
                    {{ Math.round(modelValue) + '°C' }}
                </template>
            </v-slider>
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="sliderCont">
            <v-select v-model="device.heatSource" variant="outlined" :items="['Convencional', 'Abajo', 'Arriba']"
                label="Fuente Calor" hide-details hide-selected />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="sliderCont">
            <v-select v-model="device.grillMode" variant="outlined" :items="['Apagado', 'Economico', 'Completo']"
                label="Modo Grill" hide-details hide-selected />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="sliderCont">
            <v-select v-model="device.convectionMode" variant="outlined" :items="['Convencional', 'Economico', 'Apagado']"
                label="Modo convección" hide-details hide-selected />
        </v-sheet>
    </v-row>
</template>

<script setup>

const { device } = defineProps({
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

.sliderCont {
    width: 70%;
    display: inline-flex;
    margin-top: 1rem;
}
</style>