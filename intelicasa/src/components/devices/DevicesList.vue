<template>
    <input v-if="showSearchbar" class="search-bar" :value="text" @input="$emit('update', text)" type="text"
        placeholder="Buscar">
    <v-row no-gutters>
        <v-col v-for="(dev, index) in devices" :key="index" cols="12" sm="6" lg="3">
            <DeviceCard :device="dev" @delete="$emit('delete', dev)" />
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

</script>
