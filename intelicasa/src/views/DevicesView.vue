<template>
    <h1>Devices</h1>
    <v-container fluid>
        <v-row no-gutters>
            <v-col v-for="n in 5" :key="n" cols="12" sm="6" lg="3">
                <DeviceCard />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import DeviceCard from '@/components/DeviceCard.vue';

</script>