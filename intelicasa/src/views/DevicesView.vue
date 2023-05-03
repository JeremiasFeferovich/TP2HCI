<template>
    <TitleComponent title="Devices" />
    <v-container>
        <input class="search-bar" v-model.trim="search" type="text" placeholder="Search">
        <v-row no-gutters>
            <v-col v-for="(dev, index) in shownDevices" :key="index" cols="12" sm="6" lg="3">
                <DeviceCard :device="dev" @delete="deleteDevice(dev)" />
            </v-col>
        </v-row>
    </v-container>
    <AddDeviceDialog objectTitle="Add Device" :categories="categories" @addDevice="(newDevice) => addDevice(newDevice)" />
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import DeviceCard from '@/components/devices/DeviceCard.vue';
import AddDeviceDialog from '@/components/devices/AddDeviceDialog.vue';
import { ref, watch } from 'vue';

// Category images
import lightbulb from '@/assets/lightbulb.svg'
import speaker from '@/assets/speaker.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'
import blinds from '@/assets/blinds.svg'

const search = ref("")

const categories = [{ name: "Aire Acondicionado", img: airConditioner }, { name: "Luces", img: lightbulb }, { name: "Persiana", img: blinds }, { name: "Horno", img: oven }, { name: "Parlante", img: speaker }]

const allDevices = ref([{ name: "Aire", category: "Aire Acondicionado", isOn: false, favorite: false, temperature: 24, mode: "Ventilación", verticalSwing: "Automático", horizontalSwing: "Automático", fanSpeed: "Automático" },
{ name: "Luces", category: "Luces", isOn: false, favorite: false, intensity: 0, color: "#FFAAA0" },
{ name: "Persiana", category: "Persiana", isOn: false, favorite: false, position: 50, open: function () { this.position = 100 }, close: function () { this.position = 0 } },
{ name: "Horno", category: "Horno", isOn: false, favorite: false, temperature: 120, heatSource: "Convencional", grillMode: "Apagado", convectionMode: "Convencional" },
{ name: "Parlante", category: "Parlante", isOn: false, favorite: false, volume: 5, genres: ["Clasica", "Country"], genre: "Clasica", song: "Alguna cancion", state: "stop", next: function () { return }, previous: function () { return }, play: function () { this.state = 'play' }, stop: function () { this.state = 'stop' }, pause: function () { this.state = 'pause' }, resume: function () { this.state = 'play' } }]
);

const shownDevices = ref(allDevices.value);

const defaultDevices = [{ category: "Aire Acondicionado", isOn: false, favorite: false, temperature: 24, mode: "Ventilación", verticalSwing: "Automático", horizontalSwing: "Automático", fanSpeed: "Automático" },
{ category: "Luces", isOn: false, favorite: false, intensity: 0, color: "#FFAAA0" },
{ category: "Persiana", isOn: false, favorite: false, position: 50, open: function () { this.position = 100 }, close: function () { this.position = 0 } },
{ category: "Horno", isOn: false, favorite: false, temperature: 120, heatSource: "Convencional", grillMode: "Apagado", convectionMode: "Convencional" },
{ category: "Parlante", isOn: false, favorite: false, volume: 5, genres: ["Clasica", "Country"], genre: "Clasica", song: "Alguna cancion", state: "stop", next: function () { return }, previous: function () { return }, play: function () { this.state = 'play' }, stop: function () { this.state = 'stop' }, pause: function () { this.state = 'pause' }, resume: function () { this.state = 'play' } }];

function getDefaultDevice(category) {
    return defaultDevices.find(device => device.category === category);
}

function createDeviceWithDefaults(device) {
    const { name, category } = device;
    const defaultDevice = getDefaultDevice(category);
    return { name, category, ...defaultDevice };
}

function addDevice(device) {
    const newDevice = createDeviceWithDefaults(device);
    allDevices.value = [...allDevices.value, newDevice];
    watch(search, filterDevices, { immediate: true });
}

function deleteDevice(device) {
    allDevices.value = allDevices.value.filter(dev => dev !== device);
    watch(search, filterDevices, { immediate: true });
}

function filterDevices() {
    shownDevices.value = allDevices.value.filter(device => device.name.toLowerCase().includes(search.value.toLowerCase()));
}

watch(search, filterDevices)

</script>

<style scoped>
.search-bar {
    width: 75%;
    margin: 0 auto;
}

.v-container {
    background-color: rgba(173, 216, 230, 0.605);
    margin-top: 35px;
    border-radius: 10px;
    width: 75%;
    margin: 0 auto;
    padding: 25px 25px;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
}

.add-btn {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: right;
    margin-right: 20%;

}
</style>