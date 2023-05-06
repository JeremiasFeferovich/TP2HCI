<template>
    <TitleComponent title="Habitaciones"/>
    <v-sheet class="viewSheet" color="secondary" >        
        <RoomsList v-if="!loading" 
            :rooms="roomStore.rooms"> 
        </RoomsList>
        <!-- <v-row v-for="(room, index) in rooms" :key="index">
        <RoomCard 
                :rooms="room" 
                @remove-room="handleRemoveRoom(room)"
        />
        </v-row> -->
    </v-sheet>
    <RoomDialog v-if="!loading" :devices="deviceStore.devices"/>
</template>


<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import RoomDialog from '@/components/rooms/RoomDialog.vue';
import RoomsList from '@/components/rooms/RoomsList.vue';
import { useRoomStore } from '@/stores/roomStore';
import { onMounted, ref } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

const loading = ref(false);
const roomStore = useRoomStore();
const deviceStore = useDeviceStore();

onMounted(async () => {
    loading.value = true;
    await roomStore.fetchRooms();
    await deviceStore.fetchDevices();
    loading.value = false;
})
// const rooms = ref([
//     { name: 'Living', devices: ["TV", "Luces"], type: "Living" },
//     { name: 'Cocina', devices: ["Helader", "Luces"], type: "Cocina" },
//     { name: 'Habitación', devices: ["Luces"], type: "Habitación" },
//     { name: 'Baño', devices: ["Luces"], type: "Baño" },
//     { name: 'Patio', devices: ["Luces"], type: "Patio" }
// ])

// function addRoom(newRoom) {
//     rooms.value.push(newRoom);
// }

// function handleRemoveRoom(room) {
//     roomStore.deleteRoom(room);
// }

</script>
  