<template>
    <v-card class="mx-auto room-card" @click="openDialog = true">
        <img :src="typeImg" alt="typeImg" style="max-height: 100%; max-width: 100%; padding: 5px;" />
        <template v-slot:title>
            <p class="text-h5">{{ roomName }}</p>
        </template>

        <v-card-text class="room-info">
            <p class="text-data text-h6">{{ roomDevices.length }} dispositivos conectados</p>
            <p class="text-data text-h6">3 dispositivos encendidos (to do)</p>
        </v-card-text>
    </v-card>
    <v-dialog v-model="openDialog" width="50%">
        <RoomInfo :room="room" :room-name="roomName" :room-devices="roomDevices" @delete-room="removeRoom" />
    </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import RoomInfo from '@/components/RoomInfo.vue';

import habitacion from '@/assets/habitacion.svg';
import cocina from '@/assets/cocina.svg';
import living from '@/assets/living.svg';
import baño from '@/assets/baño.svg';
import patio from '@/assets/patio.svg';

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
    }
});

const emit = defineEmits(['remove-room']);

function removeRoom() {
    openDialog.value = false;
    // cada card deberia tener su propio id
    emit('remove-room');
}

</script>


<style scoped>
.room-card {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
}

.room-card:hover {
    background-color: rgba(220, 220, 220, 0.892);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.room-info {
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-bottom: -10px;
    margin-top: -25px;
}

.text-data {
    color: #6d6d6d;
    margin-bottom: 10px;
}
</style>