<template>
    <v-card class="room-card-info" flat>

        <v-row>
            <v-card-title>
                <p class="text-h5">{{ room.name }}</p>
            </v-card-title>
            <v-col class="mr-1" align="end">
                <v-icon end icon="mdi-delete" @click="deleteRoom" />
            </v-col>
        </v-row>

        <v-row>
            <v-divider />
            <div class="pa-3 ml-3 subtitle-text" color="red">Dispositivos conectados:</div>
        </v-row>

        <v-container fluid>
            <v-row v-for="(device, index) in room.devices" :key="index">
                <v-col cols="12" class="device-card">
                    <DeviceCard :device="{ name: device }" />
                </v-col>
            </v-row>
        </v-container>

    </v-card>
</template>
  
<script setup>
import DeviceCard from '@/components/devices/DeviceCard.vue';

const props = defineProps({
    room: Object
});

const emit = defineEmits(['delete-room']);

function deleteRoom() {
    emit('delete-room');
}

</script>
  
<style scoped>
.room-card-info {
    padding: 16px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
}


.device-card {
    max-width: 70%;
    margin: auto;
}

.subtitle-text {
    color: rgb(121, 121, 121);
}
</style>
