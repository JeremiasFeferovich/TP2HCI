<template>
    <!-- <input v-if="showSearchbar" class="search-bar" v-model="text" type="text" placeholder="Buscar"> -->
    <v-text-field v-if="showSearchbar" v-model="searchText" placeholder="Buscar" type="text" variant="outlined"></v-text-field>
    <v-row no-gutters>
        <v-col v-for="(dev, index) in shownDevices" :key="index" cols="12" sm="6" lg="3">
            <DeviceCard :device="dev" @delete="deleteDevice(dev)" />
        </v-col>
    </v-row>
</template>

<script setup>

import { ref, computed, watch } from 'vue';
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
    emit('delete', device)
}

</script>
