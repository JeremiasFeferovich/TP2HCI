<template>
    <TitleComponent title="Rooms"/>
    <v-sheet color="secondary" >        
            <v-row v-for="(room, index) in rooms" :key="index">
            <RoomCard 
                    :room="room" 
                    :roomName="room.name" 
                    :roomDevices="room.devices"  
                    :room-type="room.type"
                    @remove-room="handleRemoveRoom(room)"
                />
        </v-row>
</v-sheet>
    <RoomDialog :object-title="'New Room'" @save-room="addRoom" />
</template>


<script setup>
    import TitleComponent from '@/components/TitleComponent.vue';
    import RoomCard from '@/components/RoomCard.vue';
    import RoomDialog from '@/components/RoomDialog.vue';
    import { ref } from 'vue';

    const rooms = ref([
        { name: 'Living Room', devices: ["TV", "Luces"], type: "Living"},
        { name: 'Kitchen', devices: ["Helader", "Luces"], type: "Cocina"},
        { name: 'Bedroom', devices: ["Luces"], type: "Habitación"},
        { name: 'Bathroom', devices: ["Luces"], type: "Baño"},
        { name: 'Garden', devices: ["Luces"], type: "Patio"}
    ])

    function addRoom(newRoom) {
        rooms.value.push(newRoom);
    }

    function handleRemoveRoom(room) {
        rooms.value = rooms.value.filter(r => r !== room);
    }

</script>
  


<style scoped>
.v-sheet {       
    margin-top: 35px;
    border-radius: 10px;
    width: 75%;
    margin: 0 auto;
    padding: 25px 50px;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
}
</style>