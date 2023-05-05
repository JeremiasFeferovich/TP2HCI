<template>
    <v-card class="mx-auto room-card" @click="openDialog = true">
        <v-row class="align-center">
            <v-col class="ml-10" cols="1">
                <img :src="typeImg" alt="typeImg" style="max-height: 100%; max-width: 100%; padding: 5px;" />
            </v-col>
            <v-col >
                <v-card-title>
                    <p class="text-h4">{{ roomName }}</p>
                </v-card-title>
            </v-col>
            <v-col>
                <v-card-text class="room-info mr-5 mt-1 align-end">
                    <p class="text-data text-h6">{{ roomDevices.length }} dispositivos conectados</p>
                    <p class="text-data text-h6">3 dispositivos encendidos (to do)</p>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
    <v-dialog v-model="openDialog" width="50%">
        <RoomInfo :room="room" :room-name="roomName" :room-devices="roomDevices" @delete-room="removeRoom" />
    </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import RoomInfo from '@/components/rooms/RoomInfo.vue';

import habitacion from '@/assets/habitacion.svg';
import cocina from '@/assets/cocina.svg';
import living from '@/assets/living.svg';
import baño from '@/assets/baño.svg';
import patio from '@/assets/patio.svg';
import otro from '@/assets/otro.svg';

const openDialog = ref(false);

const props = defineProps({
    room: Object,
    roomName: String,
    roomDevices: Array,
    roomType: String,
})

const typeImg = computed(() => {
    switch (props.roomType) {
        case 'Habitación':
            return habitacion;
        case 'Cocina':
            return cocina;
        case 'Living':
            return living;
        case 'Baño':
            return baño;
        case 'Patio':
            return patio;
        case 'Otro':
            return otro;
    }
});

const emit = defineEmits(['remove-room']);

function removeRoom() {
    openDialog.value = false;
    emit('remove-room');
}

</script>


<style scoped>
.room-card {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 90%;
    height: 100px;
}

.room-card:hover {
    background-color: rgba(220, 220, 220, 0.892);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.room-info {
    display: flex;
    flex-direction: column;
    margin-bottom: -10px;
    margin-top: -25px;

}

.text-data {
    color: #6d6d6d;
    margin-bottom: 10px;
}
</style>