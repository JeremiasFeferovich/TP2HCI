<template>
    <TitleComponent title="Rutinas" />
    <v-sheet class="viewSheet" color="secondary">
        <v-row v-for="(routine, index) in routines" :key="index">
            <RoutineCard :name="routine.name" :routine="routine" @remove-routine="removeRoutine(routine)"
                :allDevices="devices" />
        </v-row>
    </v-sheet>
    <AddRoutineDialog :devices="devices" :categories="categories" @save-routine="addRoutine" />
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
import { useDeviceStore } from '@/stores/deviceStore';
import { useRoutineStore } from '@/stores/routineStore'

const deviceStore = useDeviceStore();
const routineStore = useRoutineStore();


const categories = [{ name: "airConditioner", img: airConditioner }, { name: "light", img: lightbulb }, { name: "blinds", img: blinds }, { name: "oven", img: oven }, { name: "speaker", img: speaker }]

const devices = ref(deviceStore.getDevices)
const routines = ref(routineStore.getRoutines);


function addRoutine(newRoutine) {
    routineStore.addRoutine(newRoutine);
}

function removeRoutine(routine) {
    routineStore.deleteRoutine(routine);
}


</script>
