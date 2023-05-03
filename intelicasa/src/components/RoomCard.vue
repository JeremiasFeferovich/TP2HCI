<template>
    <v-card 
        class="mx-auto room-card"
        prepend-icon="mdi-home"
        @click="openDialog = true"
      >
        <template v-slot:title>
            <p class="text-h4">{{ roomName }}</p>
        </template>

        <v-card-text class="room-info">
          <p class="text-data text-body-1">{{ roomDevices.length}} dispositivos conectados</p>
          <p class="text-data text-body-1">3 dispositivos encendidos (to do)</p>
        </v-card-text>
    </v-card>
    <v-dialog v-model="openDialog" width="50%">    
        <RoomInfo :room="room" :room-name="roomName" :room-devices="roomDevices" @delete-room="removeRoom" />
    </v-dialog>
           
</template>

<script setup>
    import { ref } from 'vue';
    import RoomInfo from '@/components/RoomInfo.vue';

    const openDialog = ref(false);

    const props = defineProps({
        room : Object,
        roomName: String,
        roomDevices: Array,
    })

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
        font-size: 16px;
        color: #6d6d6d;
        margin-bottom: 10px;
    }
</style>