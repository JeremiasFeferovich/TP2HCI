<template>
    <TitleComponent title="Inicio" class="mb-5" />
    <v-row justify="center">
        <h1>Rutinas</h1>
    </v-row>
    <v-row justify="center">
        <h1>Dispositivos</h1>
    </v-row>
    <DevicesList :showSearchbar="false"  :devices="shownDevices" @delete="deleteDevice" />
    
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue'
import DevicesList from '@/components/devices/DevicesList.vue';
import { ref, watch } from 'vue';


const allDevices = ref([{ name: "Aire", category: "Aire Acondicionado", image: "airconditioner", isOn: false, favorite: false, temperature: 24, mode: "Ventilación", verticalSwing: "Automático", horizontalSwing: "Automático", fanSpeed: "Automático" },
{ name: "Luces", category: "Luces", image: "lightbulb", isOn: false, favorite: false, intensity: 0, color: "#FFAAA0" },
{ name: "Persiana", category: "Persiana", image: "blinds", isOn: false, favorite: false, position: 50, open: function () { this.position = 100 }, close: function () { this.position = 0 } },
{ name: "Horno", category: "Horno", image: "oven", isOn: false, favorite: false, temperature: 120, heatSource: "Convencional", grillMode: "Apagado", convectionMode: "Convencional" },
{ name: "Parlante", category: "Parlante", image: "speaker", isOn: false, favorite: false, volume: 5, genres: ["Clasica", "Country"], genre: "Clasica", song: "Alguna cancion", state: "stop", next: function () { return }, previous: function () { return }, play: function () { this.state = 'play' }, stop: function () { this.state = 'stop' }, pause: function () { this.state = 'pause' }, resume: function () { this.state = 'play' } }]
);

const shownDevices = ref(allDevices.value);

function filterDevices() {
    shownDevices.value = allDevices.value.filter(device => device.favorite);
}

function deleteDevice(device) {
    allDevices.value = allDevices.value.filter(dev => dev !== device);
    watch(search, filterDevices, { immediate: true });
}

watch(allDevices, filterDevices)


</script>