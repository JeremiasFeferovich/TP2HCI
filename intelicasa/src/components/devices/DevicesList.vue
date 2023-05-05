<template>
    <input v-if="showSearchbar" class="search-bar mx-2" :value="text" @input="updateText(text)" type="text"
    placeholder="Buscar"
    />
    <v-row no-gutters class="ma-0 ">
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

    const emit = defineEmits(['delete', 'update']);

    function deleteDevice(device) {
        emit('delete', device);
    }

    function updateText(text) {
        emit('update', text);
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
