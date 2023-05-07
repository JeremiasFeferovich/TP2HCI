<template>
    <TitleComponent title="Habitaciones"/>
    <v-sheet class="viewSheet" color="secondary" >        
        <RoomsList v-if="!loading" 
            :rooms="roomStore.rooms"
            :devices="deviceStore.devices"
        /> 
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
    console.log(roomStore.rooms)
    loading.value = false;
})



</script>
  