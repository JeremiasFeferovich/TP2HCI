<template>
    <TitleComponent title="Rutinas" />
    <v-sheet class="viewSheet" color="secondary">
        <v-row v-if="!loading" v-for="(routine, index) in routineStore.routines" :key="index">
            <RoutineCard :name="routine.name" :routine="routine" @remove-routine="removeRoutine(routine)"
                :allDevices="deviceStore.devices" />
        </v-row>
    </v-sheet>
    <AddRoutineDialog :devices="deviceStore.devices" :categories="deviceStore.categories" @save-routine="addRoutine" />
</template>

<script setup>
import lightbulb from '@/assets/lightbulb.svg'
import speaker from '@/assets/speaker.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'

import TitleComponent from '@/components/TitleComponent.vue';
import RoutineCard from '@/components/RoutineCard.vue';
import AddRoutineDialog from '@/components/AddRoutineDialog.vue';
import { ref, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { useRoutineStore } from '@/stores/routineStore'


const deviceStore = useDeviceStore();
const routineStore = useRoutineStore();


const loading = ref(false)

function addRoutine(newRoutine) {
    routineStore.addRoutine(newRoutine);
}

function removeRoutine(routine) {
    routineStore.deleteRoutine(routine);
}

onMounted(async () => {
    loading.value = true
    await deviceStore.fetchDevices();
    await deviceStore.fetchCategories();
    await routineStore.fetchRoutines();
    loading.value = false
})



</script>
