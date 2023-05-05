<template>
    <TitleComponent title="Dispositivos" />
    <v-sheet class="viewSheet" color="secondary">
        {{ search }}
        <DevicesList v-if="!loading" :showSearchbar="true" :devices="deviceStore.devices"
            @delete="(device) => deleteDevice(device)" />
    </v-sheet>
    <AddDeviceDialog objectTitle="Add Device" :categories="categories" @addDevice="(newDevice) => addDevice(newDevice)" />
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import AddDeviceDialog from '@/components/devices/AddDeviceDialog.vue';
import { ref, watch, computed } from 'vue';

// Category images
import lightbulb from '@/assets/lightbulb.svg'
import speaker from '@/assets/speaker.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'
import blinds from '@/assets/blinds.svg'
import DevicesList from '@/components/devices/DevicesList.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { onMounted } from 'vue';

const search = ref("")

const loading = ref(false)
const deviceStore = useDeviceStore();

onMounted(async () => {
    loading.value = true
    await deviceStore.fetchDevices();
    loading.value = false
})

const categories = [{ name: "Aire Acondicionado", value: "ac", img: airConditioner }, { name: "Luces", value: "lamp", img: lightbulb }, { name: "Persiana", value: "blinds", img: blinds }, { name: "Horno", value: "oven", img: oven }, { name: "Parlante", value: "speaker", img: speaker }]

function addDevice(device) {
    deviceStore.addDevice(device);
}

function deleteDevice(device) {
    deviceStore.deleteDevice(device)
}

</script>

<style scoped>
.search-bar {
    width: 75%;
    margin: 0 auto;
}

.add-btn {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: right;
    margin-right: 20%;

}
</style>
