<template>
    <TitleComponent title="Inicio" class="mb-5" />
    <v-container fluid>
        <v-sheet class="viewSheet" color="secondary">
            <v-row justify="center" class="mb-5 text-h4">
                Rutinas destacadas
                <v-divider />
            </v-row>
            <v-btn class="text-h6" align="center" variant="text"
                v-if="routineStore.routines.length && !routineStore.routines.filter(routine => routine.meta.favorite).length"
                :to="{ name: 'routines' }" value="routines">
                Aún no tienes rutinas destacadas. Haga click aquí para seleccionar una.
            </v-btn>
            <v-btn class="text-h6" align="center" variant="text" v-if="!routineStore.routines.length"
                :to="{ name: 'routines' }" value="routines">
                Aún no tienes rutinas. Haga click aquí para agregar una.
            </v-btn>
            <RoutinesList v-if="!loading" />
        </v-sheet>
        <v-sheet class="viewSheet" color="secondary">
            <v-row justify="center" class="mb-5 text-h4">
                Dispositivos destacados
                <v-divider />
            </v-row>
            <v-btn class="text-h6 mb-2" align="center" variant="text"
                v-if="deviceStore.devices.length && !deviceStore.devices.filter(device => device.meta.favorite).length"
                :to="{ name: 'devices' }" value="devices">
                Aún no tienes dispositivos destacados. Haga click aquí para seleccionar uno.
            </v-btn>
            <v-btn class="text-h6 mb-2" align="center" variant="text" v-if="!deviceStore.devices.length"
                :to="{ name: 'devices' }" value="devices">
                Aún no tienes dispositivos. Haga click aquí para agregar uno.
            </v-btn>
            <DevicesList v-if="!loading" :showSearchbar="false"
                
                @delete="(device) => deleteDevice(device)" />
        </v-sheet>
    </v-container>
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import { ref } from 'vue';

import DevicesList from '@/components/devices/DevicesList.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { onMounted } from 'vue';
import { useRoutineStore } from '@/stores/routineStore';
import RoutinesList from '@/components/RoutinesList.vue';

const loading = ref(false)
const deviceStore = useDeviceStore();
const routineStore = useRoutineStore();

onMounted(async () => {
    loading.value = true
    await deviceStore.fetchDevices();
    await deviceStore.fetchCategories();
    await routineStore.fetchRoutines();
    loading.value = false
})

function deleteDevice(device) {
    deviceStore.deleteDevice(device)
}

function deleteRoutine(routine) {
    routineStore.deleteRoutine(routine)
}
</script>

<style scoped>
.v-container {
    padding: 0;
}
</style>