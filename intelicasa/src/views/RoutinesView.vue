<template>
    <TitleComponent title="Rutinas" />
    <v-sheet class="viewSheet" color="secondary">
        <v-row justify="center">
            <p class="text-h6" v-if="!routineStore.routines || !routineStore.routines.length">Aún no tienes rutinas</p>
        </v-row>
        <v-row v-if="!loading" v-for="(routine, index) in routineStore.routines" :key="index">
            <RoutineCard :name="routine.name" :routine="routine" :allDevices="deviceStore.devices" />
        </v-row>
    </v-sheet>
    <AddRoutineDialog :devices="deviceStore.devices" :categories="deviceStore.categories" />
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import RoutineCard from '@/components/RoutineCard.vue';
import AddRoutineDialog from '@/components/AddRoutineDialog.vue';
import { ref, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { useRoutineStore } from '@/stores/routineStore'


const deviceStore = useDeviceStore();
const routineStore = useRoutineStore();


const loading = ref(false)

onMounted(async () => {
    loading.value = true
    await deviceStore.fetchDevices();
    await deviceStore.fetchCategories();
    await routineStore.fetchRoutines();
    loading.value = false
})



</script>
