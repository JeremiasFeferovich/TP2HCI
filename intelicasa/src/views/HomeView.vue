<template>
    <TitleComponent title="Inicio" class="mb-5" />
    <v-container fluid>
        <v-row justify="center">
            <h1 class="text-h4">Rutinas</h1>
        </v-row>
        <v-row justify="center">
            <h1 class="text-h4">Dispositivos</h1>
        </v-row>
        <v-sheet color="secondary">
            <DevicesList :showSearchbar="false" :devices="shownDevices" @delete="deleteDevice" />
        </v-sheet>
    </v-container>
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue'
import DevicesList from '@/components/devices/DevicesList.vue';
import { ref, watch } from 'vue';


const allDevices = ref([{ name: "Aire", category: "Aire Acondicionado", image: "airconditioner", isOn: false, favorite: true, temperature: 24, mode: "Ventilación", verticalSwing: "Automático", horizontalSwing: "Automático", fanSpeed: "Automático" },
{ name: "Luces", category: "Luces", image: "lightbulb", isOn: false, favorite: true, intensity: 0, color: "#FFAAA0" },
{ name: "Persiana", category: "Persiana", image: "blinds", isOn: false, favorite: true, position: 50, open: function () { this.position = 100 }, close: function () { this.position = 0 } },
{ name: "Horno", category: "Horno", image: "oven", isOn: false, favorite: true, temperature: 120, heatSource: "Convencional", grillMode: "Apagado", convectionMode: "Convencional" },
{ name: "Parlante", category: "Parlante", image: "speaker", isOn: false, favorite: true, volume: 5, genres: ["Clasica", "Country"], genre: "Clasica", song: "Alguna cancion", state: "stop", next: function () { return }, previous: function () { return }, play: function () { this.state = 'play' }, stop: function () { this.state = 'stop' }, pause: function () { this.state = 'pause' }, resume: function () { this.state = 'play' } }]
);

const shownDevices = ref(allDevices.value);


function filterDevices() {
    shownDevices.value = allDevices.value.filter((device) => device.favorite);
}

function deleteDevice(device) {
    allDevices.value = allDevices.value.filter(dev => dev !== device);
    watch(allDevices.value, filterDevices, { immediate: true });
}

watch(allDevices.value, filterDevices, { immediate: true });


</script>

<style scoped>
.v-sheet {
    margin-top: 35px;
    border-radius: 10px;
    width: 75%;
    margin: 0 auto;
    padding: 25px 25px;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
}

.v-container {
    padding: 0;
}
</style>