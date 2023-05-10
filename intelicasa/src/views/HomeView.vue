<template>
    <TitleComponent title="Inicio" class="mb-5" />
    <v-container fluid>
        <v-row justify="center">
            <h1 class="text-h4">Rutinas</h1>
        </v-row>
        <v-sheet class="viewSheet" color="secondary">
            <v-row justify="center" class="mb-5 text-h4">
                Dispositivos
                <v-divider/>
            </v-row>
            <p class="text-h6" align="center" v-if="deviceStore.devices && deviceStore.devices.length && !deviceStore.devices.filter(device => device.meta.favorite).length">Aún no tienes dispositivos favoritos</p>
            <p class="text-h6" align="center" v-else-if="!deviceStore.devices || !deviceStore.devices.length">Aún no tienes dispositivos</p>
            <DevicesList v-if="!loading" :showSearchbar="false" :devices="deviceStore.devices && deviceStore.devices.filter(device => device.meta.favorite)"
                @delete="(device) => deleteDevice(device)"/>
        </v-sheet>
    </v-container>
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import { ref } from 'vue';

import DevicesList from '@/components/devices/DevicesList.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { onMounted } from 'vue';

const loading = ref(false)
const deviceStore = useDeviceStore();

onMounted(async () => {
    loading.value = true
    await deviceStore.fetchDevices();
    await deviceStore.fetchCategories();
    loading.value = false
})

function deleteDevice(device) {
    deviceStore.deleteDevice(device)
}

</script>

<style scoped>
.v-container {
    padding: 0;
}
</style>