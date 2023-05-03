<template>
    <TitleComponent title="Rutinas"/>
    <v-container fluid class="d-flex flex-column justify-center " style="width: 50%;">        
        <RoutineCard />
        <RoutineCard />
        <RoutineCard />
    </v-container>
    <AddRoutineDialog :devices="allDevices" :categories="categories"/>

    
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

    const allDevices = ref([{ name: "Aire", category: "airConditioner", isOn: false, favorite: false, temperature: 24, mode: "Ventilación", verticalSwing: "Automático", horizontalSwing: "Automático", fanSpeed: "Automático" },
    { name: "Luces", category: "light", isOn: false, favorite: false, intensity: 0, color: "#FFAAA0" },
    { name: "Persiana", category: "blinds", isOn: false, favorite: false, position: 50, open: function () { this.position = 100 }, close: function () { this.position = 0 } },
    { name: "Horno", category: "oven", isOn: false, favorite: false, temperature: 120, heatSource: "Convencional", grillMode: "Apagado", convectionMode: "Convencional" },
    { name: "Parlante", category: "speaker", isOn: false, favorite: false, volume: 5, genres: ["clasica", "country"], genre: "clasica", song: "Alguna cancion", state: "stop", next: function () { return }, previous: function () { return }, play: function () { this.state = 'play' }, stop: function () { this.state = 'stop' }, pause: function () { this.state = 'pause' }, resume: function () { this.state = 'play' } }]);

    const categories = [{ name: "airConditioner", img: airConditioner }, { name: "light", img: lightbulb }, { name: "blinds", img: blinds }, { name: "oven", img: oven }, { name: "speaker", img: speaker }]


</script>
