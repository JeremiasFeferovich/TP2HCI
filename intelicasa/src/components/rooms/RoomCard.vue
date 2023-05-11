<template>
    <v-card class="mx-auto room-card" @click="openDialog = true">
        <v-row class="align-center">
            <v-col class="ml-10" cols="1">
                <img :src="typeImg" alt="typeImg" style="max-height: 100%; max-width: 100%; padding: 5px;" />
            </v-col>
            <v-col>
                <v-card-title>
                    <p class="text-h4">{{ room.name }}</p>
                </v-card-title>
            </v-col>
            <v-col>
                <v-card-text class="room-info mr-5 mt-1 align-end">
                    <p class="text-data text-h6">
                        {{ connectedDevices === 0 ? "No hay dispositivos conectados" :
                            connectedDevices === 1 ? "1 dispositivo conectado" : `${connectedDevices} dispositivos conectados`
                        }}
                    </p>
                    <p class="text-data text-h6">
                        {{ onDevices.length === 1 ?
                            "1 dispositivo encendido"
                            : onDevices.length + " dispositivos encendidos"
                        }}
                    </p>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
    <RoomInfo v-model="openDialog" :room="room" :devices="devices" @close-dialog="openDialog = false" />
</template>

<script setup>
import { ref, computed } from 'vue';
import RoomInfo from '@/components/rooms/RoomInfo.vue';
import { useRoomStore } from '@/stores/roomStore';
import dormitorio from '@/assets/dormitorio.svg';
import cocina from '@/assets/cocina.svg';
import living from '@/assets/living.svg';
import baño from '@/assets/baño.svg';
import patio from '@/assets/patio.svg';
import otro from '@/assets/otro.svg';

const openDialog = ref(false);

const roomStore = useRoomStore()

const props = defineProps({
    room: Object,
    devices: Array
})

const allDevices = ref(props.room.devices)

const onDevices = computed(() => {
    return props.room.devices ? props.room.devices.filter(device => device.state.status === 'on') : []
});

const typeImg = computed(() => {
    switch (props.room.meta.type) {
        case 'Dormitorio':
            return dormitorio;
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

const connectedDevices = computed(() => {
    const idx = roomStore.rooms.findIndex(room => props.room.id === room.id)
    return idx !== -1 && roomStore.rooms[idx] && roomStore.rooms[idx].devices ? roomStore.rooms[idx].devices.length : 0
})

const emit = defineEmits(['delete-room']);

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