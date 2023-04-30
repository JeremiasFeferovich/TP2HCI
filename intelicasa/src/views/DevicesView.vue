<template>
    <TitleComponent title="Devices"/>
    <v-container fluid>
        <v-row no-gutters>
            <v-col v-for="n in 5" :key="n" cols="12" sm="6" lg="3">
                <DeviceCard />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import TitleComponent from '@/components/TitleComponent.vue';
    import DeviceCard from '@/components/DeviceCard.vue';

</script>