<template>
    <TitleComponent title="Devices"/>
    <v-container fluid >
        <input v-model.trim="search" type="text" placeholder="Search">
        <v-row no-gutters>
            <v-col v-for="(dev, index) in devices" :key="index" cols="12" sm="6" lg="3">
                <DeviceCard :device="dev" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import DeviceCard from '@/components/DeviceCard.vue';
import { ref, watch} from 'vue';


const search = ref("")


const d = [ { name: "disp 1", category: "light", isOn: false, favorite: false, intensity: 0, color: "#FFEEE0" },
            { name: "disp 2", category: "light", isOn: false, favorite: false, intensity: 0, color: "#FFAAA0" },
            { name: "disp 3", category: "light", isOn: false, favorite: false, intensity: 0, color: "#FFBBB0" },
            { name: "disp 4", category: "light", isOn: false, favorite: false, intensity: 0, color: "#FFCCC0" },
            { name: "disp 5", category: "light", isOn: false, favorite: false, intensity: 0, color: "#FFDDD0" }];
const devices = ref(d)

watch(search, () => {
    devices.value = d.filter(device => device.name.toLowerCase().includes(search.value.toLowerCase()))
})

</script>

<style scoped>
.search-bar {
    width: 75%;
    margin: 0 auto;
}
</style>