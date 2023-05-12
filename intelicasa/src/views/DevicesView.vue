<template>
    <TitleComponent title="Dispositivos" />
    <v-sheet class="viewSheet" color="secondary">
        <v-row v-if="deviceStore.devices && !deviceStore.devices.length" justify="center">
            <p class="text-h6" align="center">Aún no tienes dispositivos.</p>
        </v-row>
        <DevicesList v-else v-if="!loading" :showSearchbar="true" :devices="deviceStore.devices"
            @delete="(device) => deleteDevice(device)" />
    </v-sheet>
    <AddDeviceDialog v-if="!loading" objectTitle="Nuevo dispositivo" :categories="deviceStore.categories"
        @addDevice="(newDevice) => addDevice(newDevice)" />
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import AddDeviceDialog from '@/components/devices/AddDeviceDialog.vue';
import { ref } from 'vue';

import DevicesList from '@/components/devices/DevicesList.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { useRoomStore } from '@/stores/roomStore';
import { onMounted } from 'vue';

const loading = ref(false)
const deviceStore = useDeviceStore();
const roomStore = useRoomStore();

onMounted(async () => {
    loading.value = true
    await deviceStore.fetchDevices();
    await deviceStore.fetchCategories();
    await roomStore.fetchRooms()
    loading.value = false
})

function addDevice(device) {
    deviceStore.addDevice(device);
}

function deleteDevice(device) {
    deviceStore.deleteDevice(device)
}

</script>
