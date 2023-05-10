<template>
    <TitleComponent title="Inicio" class="mb-5" />
    <v-container fluid>
        <v-sheet class="viewSheet" color="secondary">
            <v-row justify="center" class="mb-5 text-h4">
                Rutinas destacadas
                <v-divider />
            </v-row>
            <p class="text-h6" align="center"
                v-if="routineStore.routines.length && !routineStore.routines.filter(routine => routine.meta.favorite).length">
                Aún no tienes rutinas favoritos</p>
            <v-row v-if="!loading"
                v-for="(routine, index) in routineStore.routines.filter(routine => routine.meta.favorite)"
                :key="routine.id">
                <RoutineCard :name="routine.name" :routine="routine" @delete-routine="deleteRoutine(routine)"
                    :allDevices="deviceStore.devices" />
            </v-row>
            <DevicesList v-if="!loading" :showSearchbar="false"
                :devices="deviceStore.devices.filter(device => device.meta.favorite)"
                @delete="(device) => deleteDevice(device)" />
        </v-sheet>
        <v-sheet class="viewSheet" color="secondary">
            <v-row justify="center" class="mb-5 text-h4">
                Dispositivos destacados
                <v-divider />
            </v-row>
            <p class="text-h6" align="center"
                v-if="deviceStore.devices && deviceStore.devices.length && !deviceStore.devices.filter(device => device.meta.favorite).length">
                Aún no tienes dispositivos favoritos</p>
            <p class="text-h6" align="center" v-else-if="!deviceStore.devices || !deviceStore.devices.length">Aún no tienes
                dispositivos</p>
            <DevicesList v-if="!loading" :showSearchbar="false"
                :devices="deviceStore.devices && deviceStore.devices.filter(device => device.meta.favorite)"
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
import RoutineCard from '@/components/RoutineCard.vue';

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

<style scoped>.v-container {
    padding: 0;
}</style>