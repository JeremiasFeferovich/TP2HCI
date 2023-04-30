<template>
    <TitleComponent title="Devices"/>
    
    <v-container fluid >
        <v-row no-gutters>
            <v-col v-for="(device, index) in devices" :key="index" cols="12" sm="6" lg="3">
                <DeviceCard :title="device.title"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import TitleComponent from '@/components/TitleComponent.vue';
    import DeviceCard from '@/components/DeviceCard.vue';
    import { ref } from 'vue';

    const devices = ref([{title: "disp 1"}, 
                        {title: "disp 2"}, 
                        {title: "disp 3"}, 
                        {title: "disp 4"},
                        {title: "disp 5"}]);

</script>

<style scoped>
    .search-bar {
        width: 75%;
        margin: 0 auto;
    }
</style>