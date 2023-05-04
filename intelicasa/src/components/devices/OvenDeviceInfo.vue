<template>
    <v-row align="center" justify="space-evenly">

        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" class="align-start">
            <p class="text-h6">Temperatura</p>
        </v-col>
        <v-col cols="6">
            <v-sheet width="80%">
                <v-row class="align-center">
                    <p class="mr-3">{{ Math.round(device.temperature) + '°C' }}</p>
                    <v-slider :disabled="disabled" hide-details v-model="device.temperature" min="90" max="230" />
                </v-row>
            </v-sheet>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-sheet class="sliderCont">
            <v-select :disabled="disabled" v-model="device.heatSource" variant="outlined"
                :items="['Convencional', 'Abajo', 'Arriba']" label="Fuente Calor" hide-details hide-selected />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="sliderCont">
            <v-select :disabled="disabled" v-model="device.grillMode" variant="outlined"
                :items="['Apagado', 'Economico', 'Completo']" label="Modo Grill" hide-details hide-selected />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="sliderCont">
            <v-select :disabled="disabled" v-model="device.convectionMode" variant="outlined"
                :items="['Convencional', 'Economico', 'Apagado']" label="Modo convección" hide-details hide-selected />
        </v-sheet>
    </v-row>
</template>

<script setup>

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

.sliderCont {
    width: 70%;
    display: inline-flex;
    margin-top: 1rem;
}
</style>