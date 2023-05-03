<template>
    <v-container>
        <input v-if="showSearchbar" class="search-bar" :value="text" @input="$emit('update', text)" type="text" placeholder="Buscar">
        <v-row no-gutters>
            <v-col v-for="(dev, index) in devices" :key="index" cols="12" sm="6" lg="3">
                <DeviceCard :device="dev" @delete="$emit('delete', dev)" />
            </v-col>
        </v-row>
    </v-container>
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

<style scoped>
.v-container {
    background-color: rgba(173, 216, 230, 0.605);
    margin-top: 35px;
    border-radius: 10px;
    width: 75%;
    margin: 0 auto;
    padding: 25px 25px;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
}
</style>