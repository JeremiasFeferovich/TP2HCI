<template>
    <TitleComponent title="Habitaciones" />
    <v-sheet class="viewSheet" color="secondary">
        <RoomsList v-if="!loading" :rooms="roomStore.rooms" :devices="deviceStore.devices" />
    </v-sheet>
    <AddRoomDialog v-if="!loading" :devices="deviceStore.devices" />
</template>


<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import AddRoomDialog from '@/components/rooms/AddRoomDialog.vue';
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



</script>
  