<template>
    <!-- <input v-if="showSearchbar" class="search-bar" v-model="text" type="text" placeholder="Buscar"> -->
    <v-text-field v-if="showSearchbar" v-model="searchText" placeholder="Buscar" type="text"
        variant="outlined"></v-text-field>
    <v-row v-if="devices.length && !shownDevices.length" justify="center">
        <p class="text-h6" align="center">No hay dispositivos con ese nombre</p>
    </v-row>
    <v-row>
        <v-col v-for="(dev, index) in shownDevices" :key="index" cols="12" sm="6" lg="3">
            <DeviceCard :device="dev" @delete="deleteDevice(dev)" />
        </v-col>
    </v-row>
</template>

<script setup>

import { ref, computed } from 'vue';
import DeviceCard from './DeviceCard.vue'

const searchText = ref('');

const shownDevices = computed(() => {
    return props.devices.filter(device => device.name.toLowerCase().includes(searchText.value.toLowerCase()))
})

const props = defineProps({
    devices: Array,
    showSearchbar: Boolean,
})

const emit = defineEmits(['delete'])

function deleteDevice(device) {
    emit('delete', device);
}

</script>

<style scoped>
.search-bar {
    max-width: 65%;
    padding: 10px;
    border: 1px solid #9a9999;
    border-radius: 5px;
    font-size: 16px;
    background-color: white;
    opacity: 0.8;
    outline: none;
}

.search-bar:focus {
    border-color: black;
    box-shadow: 0 0 8px 0 rgba(33, 150, 243, 0.4);
}
</style>
