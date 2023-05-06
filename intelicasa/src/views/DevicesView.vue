<template>
    <TitleComponent title="Dispositivos" />
    <v-sheet class="viewSheet" color="secondary">
        <DevicesList v-if="!loading" :showSearchbar="true" :devices="deviceStore.devices"
            @delete="(device) => deleteDevice(device)" />
    </v-sheet>
    <AddDeviceDialog v-if="!loading" objectTitle="Add Device" :categories="deviceStore.categories" @addDevice="(newDevice) => addDevice(newDevice)" />
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import AddDeviceDialog from '@/components/devices/AddDeviceDialog.vue';
import { ref, watch, computed } from 'vue';

import DevicesList from '@/components/devices/DevicesList.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { onMounted } from 'vue';

const search = ref("")

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
