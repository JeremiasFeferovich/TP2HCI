<template>
    <v-card class="room-card" flat>
        <v-card-title>
            <span class="text-h4">{{ roomName }}</span>
        </v-card-title>

        <v-container fluid>
            <v-row v-for="(device, index) in roomDevices" :key="index">
                <v-col cols="12">
                    <DeviceCard :device="{ name: device }" />
                </v-col>
            </v-row>
        </v-container>
        <v-row justify="end" class="mr-1">
            <v-icon end icon="mdi-delete" @click="$emit('delete-room')" />
        </v-row>
    </v-card>
</template>
  
<script setup>
import DeviceCard from '@/components/DeviceCard.vue';

const props = defineProps({
    room: Object,
    roomName: String,
    roomDevices: Array,
});
</script>
  
<style scoped>
.room-card {
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: none;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.delete-btn {
    margin-left: auto;
    cursor: pointer;
}
</style>
  

