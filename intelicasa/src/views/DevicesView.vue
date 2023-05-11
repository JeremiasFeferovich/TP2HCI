<template>
    <TitleComponent title="Dispositivos" />
    <v-sheet class="viewSheet" color="secondary">
        <v-row v-if="deviceStore.devices && !deviceStore.devices.length" justify="center">
            <p class="text-h6" align="center">Aún no tienes dispositivos</p>
        </v-row>
        <DevicesList v-else v-if="!loading" :showSearchbar="true"
            @delete="(device) => deleteDevice(device)" />
    </v-sheet>
    <AddDeviceDialog v-if="!loading" objectTitle="Add Device" :categories="deviceStore.categories"
        @addDevice="(newDevice) => addDevice(newDevice)" />
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import AddDeviceDialog from '@/components/devices/AddDeviceDialog.vue';
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

function addDevice(device) {
    deviceStore.addDevice(device);
}

function deleteDevice(device) {
    deviceStore.deleteDevice(device)
}

</script>
