<template>
    <input v-if="showSearchbar" class="search-bar" :value="text" @input="updateSearch(text)" type="text"
        placeholder="Buscar">
    <v-row no-gutters>
        <v-col v-for="(dev, index) in devices" :key="index" cols="12" sm="6" lg="3">
            <DeviceCard :device="dev" @delete="deleteDevice(dev)" />
        </v-col>
    </v-row>
</template>

<script setup>

import { ref } from 'vue';
import DeviceCard from './DeviceCard.vue'

const text = ref('');

const props = defineProps({
    devices: Array,
    showSearchbar: Boolean,
    search: String,
})

const emit = defineEmits(['delete', 'update'])

function deleteDevice(device) {
    emit('delete', device)
}

function updateSearch(text) {
    emit('update', text)
}

</script>
