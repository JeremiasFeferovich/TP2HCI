<template>
    <TitleComponent title="Habitaciones"/>
    <v-sheet class="viewSheet" color="secondary" >        
            <v-row v-for="(room, index) in rooms" :key="index">
            <RoomCard 
                    :room="room" 
                    @remove-room="handleRemoveRoom(room)"
                />
        </v-row>
    </v-sheet>
    <RoomDialog :object-title="'New Room'" @save-room="addRoom" />
</template>


<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import RoomCard from '@/components/rooms/RoomCard.vue';
import RoomDialog from '@/components/rooms/RoomDialog.vue';
import { ref } from 'vue';

const rooms = ref([
    { name: 'Living', devices: ["TV", "Luces"], type: "Living" },
    { name: 'Cocina', devices: ["Helader", "Luces"], type: "Cocina" },
    { name: 'Habitación', devices: ["Luces"], type: "Habitación" },
    { name: 'Baño', devices: ["Luces"], type: "Baño" },
    { name: 'Patio', devices: ["Luces"], type: "Patio" }
])

function addRoom(newRoom) {
    rooms.value.push(newRoom);
}

function handleRemoveRoom(room) {
    rooms.value = rooms.value.filter(r => r !== room);
}

</script>
  