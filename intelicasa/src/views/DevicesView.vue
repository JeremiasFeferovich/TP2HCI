<template>
    <TitleComponent title="Devices"/>
    <v-container fluid >
        <input v-model.trim="search" type="text" placeholder="Search">
        <v-row no-gutters>
            <v-col v-for="(dev, index) in devices" :key="index" cols="12" sm="6" lg="3">
                <DeviceCard :device="dev" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import DeviceCard from '@/components/devices/DeviceCard.vue';
import { ref, watch} from 'vue';


const search = ref("")

function next(){
    return;
}

function previous(){
    return;
}

function play(){
    return;
}

function stop(){
    return;
}

function pause(){
    return;
}

function resume(){
    return;
}


const d = [ { name: "Aire", category: "airConditioner", isOn: false, favorite: false, temperature: 24, mode: "Ventilación", verticalSwing: "Automático", horizontalSwing: "Automático", fanSpeed: "Automático" },
            { name: "Luces", category: "light", isOn: false, favorite: false, intensity: 0, color: "#FFAAA0" },
            { name: "Persiana", category: "blinds", isOn: false, favorite: false, position: 0, open:()=>position=100, close:()=>position=0},
            { name: "Horno", category: "oven", isOn: false, favorite: false, temperature: 120, heatSource: "Convencional", grillMode:"Apagado", convectionMode:"Convencional" },
            { name: "Parlante", category: "speaker", isOn: false, favorite: false, volume: 5, genres: ["clasica", "country"], genre: "clasica" , song: "Alguna cancion" ,state: "stop", next: next, previous: previous, play: play, stop: stop, pause: pause, resume: resume }];
const devices = ref(d)

watch(search, () => {
    devices.value = d.filter(device => device.name.toLowerCase().includes(search.value.toLowerCase()))
})

</script>

<style scoped>
.search-bar {
    width: 75%;
    margin: 0 auto;
}
</style>