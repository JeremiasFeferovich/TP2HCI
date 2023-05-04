<template>
    <TitleComponent title="Rutinas" />
    <v-sheet color="secondary">
        <v-row v-for="(routine, index) in routines" :key="index">
            <RoutineCard :name="routine.name" :devices="routine.devices" />
        </v-row>
    </v-sheet>
    <AddRoutineDialog :devices="allDevices" :categories="categories" />
</template>

<script setup>
import lightbulb from '@/assets/lightbulb.svg'
import speaker from '@/assets/speaker.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'
import blinds from '@/assets/blinds.svg'

import TitleComponent from '@/components/TitleComponent.vue';
import RoutineCard from '@/components/RoutineCard.vue';
import AddRoutineDialog from '@/components/AddRoutineDialog.vue';
import { ref } from 'vue';

const allDevices = ref([{ name: "Aire", category: "Aire Acondicionado", isOn: false, favorite: false, temperature: 24, mode: "Ventilación", verticalSwing: "Automático", horizontalSwing: "Automático", fanSpeed: "Automático" },
{ name: "Luces", category: "Luces", isOn: false, favorite: false, intensity: 0, color: "#FFAAA0" },
{ name: "Persiana", category: "Persiana", isOn: false, favorite: false, position: 50, open: function () { this.position = 100 }, close: function () { this.position = 0 } },
{ name: "Horno", category: "Horno", isOn: false, favorite: false, temperature: 120, heatSource: "Convencional", grillMode: "Apagado", convectionMode: "Convencional" },
{ name: "Parlante", category: "Parlante", isOn: false, favorite: false, volume: 5, genres: ["clasica", "country"], genre: "clasica", song: "Alguna cancion", state: "stop", next: function () { return }, previous: function () { return }, play: function () { this.state = 'play' }, stop: function () { this.state = 'stop' }, pause: function () { this.state = 'pause' }, resume: function () { this.state = 'play' } }]);

const categories = [{ name: "airConditioner", img: airConditioner }, { name: "light", img: lightbulb }, { name: "blinds", img: blinds }, { name: "oven", img: oven }, { name: "speaker", img: speaker }]

const routines = ref([
    {
        name: 'Llegada', devices:
            [
                { name: "Aire", category: "Aire Acondicionado", isOn: false, favorite: false, temperature: 24, mode: "Ventilación", verticalSwing: "Automático", horizontalSwing: "Automático", fanSpeed: "Automático" },
                { name: "Luces", category: "Luces", isOn: false, favorite: false, intensity: 0, color: "#FFAAA0" },
                { name: "Persiana", category: "Persiana", isOn: false, favorite: false, position: 50, open: function () { this.position = 100 }, close: function () { this.position = 0 } },
            ]
    },
    {
        name: 'Salida', devices:
            [
                { name: "Aire", category: "Aire Acondicionado", isOn: false, favorite: false, temperature: 24, mode: "Ventilación", verticalSwing: "Automático", horizontalSwing: "Automático", fanSpeed: "Automático" },
                { name: "Luces", category: "Luces", isOn: false, favorite: false, intensity: 0, color: "#FFAAA0" },
                { name: "Persiana", category: "Persiana", isOn: false, favorite: false, position: 50, open: function () { this.position = 100 }, close: function () { this.position = 0 } },
            ]
    }

])

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
</style>