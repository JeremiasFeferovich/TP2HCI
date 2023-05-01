<template>
    <TitleComponent title="Devices"/>
    <input v-model="searchText" /> 
    <v-container fluid >
        <input v-model.trim="search" type="text" placeholder="Search">
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
    import { ref, watch } from 'vue';

    const search = ref("")
    
    const d = [{title: "disp 1"}, 
                        {title: "disp 2"}, 
                        {title: "disp 3"}, 
                        {title: "disp 4"},
                        {title: "disp 5"}];
    const devices = ref(d)
        


    watch(search, () => {
    devices.value = d.filter(device => device.title.toLowerCase().includes(search.value.toLowerCase()))
    })

</script>

<style scoped>
    .search-bar {
        width: 75%;
        margin: 0 auto;
    }
</style>