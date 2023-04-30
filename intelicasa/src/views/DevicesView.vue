<template>
    <TitleComponent title="Devices"/>
    
    <v-container fluid >
        <v-row no-gutters>
            <v-col v-for="device in devices" :key="device.id" cols="12" sm="6" lg="3">
                <DeviceCard :deviceTitle="device.title"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import TitleComponent from '@/components/TitleComponent.vue';
    import DeviceCard from '@/components/DeviceCard.vue';
    import { ref } from 'vue';

    const devices = ref([
        { id:1, title: 'Device 2'},
        { id:2, title: 'Device 2'},
        { id:3, title: 'Device 3'},
        { id:4, title: 'Device 4'}])

</script>

<style scoped>
    .search-bar {
        width: 75%;
        margin: 0 auto;
    }
</style>