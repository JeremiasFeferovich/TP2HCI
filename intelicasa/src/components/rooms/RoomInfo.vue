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
            <v-row v-for="(device, index) in room.devices" :key="index" align="center">
                <v-col cols="12" class="device-card ml-4">
                    <DeviceCard :device="device" />
                </v-col>
                <v-col class="text-end mr-8">
                    <v-btn icon size="small" color="error" @click="removeDevice(device)">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
                <v-divider/>
            </v-row>
            <v-row cols="12" class="fill-space">
              <v-select v-if="showSelector" label="Dispositivos disponible" :items="availableDevices" item-title="name" return-object v-model="selectedDevice"
                @update:modelValue="addSelectedDevice" />
            </v-row>
            <v-row>
                <v-col cols="12" class="text-center">
                    <v-btn icon="mdi-plus" density="comfortable" @click="showSelector = true" />
                </v-col>
            </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn size="large" color="blue-darken-1" variant="flat"  @click="closeDialog">
            Guardar
          </v-btn>
        </v-card-actions>

    </v-card>
</template>
  
<script setup>
    import DeviceCard from '@/components/devices/DeviceCard.vue';
    import { useRoomStore } from '@/stores/roomStore';
    import { ref, computed } from 'vue';
    import CloseAndSaveBtns from '@/components/CloseAndSaveBtns.vue';

    const roomsStore = useRoomStore();

    const props = defineProps({
        room: Object,
        devices: Array
    });
    /* filter the devices that they dont have the room attribute*/
    const availableDevices = computed(() => {
        return props.devices.filter(device => !device.room);
    });

    const selectedDevice = ref('');
    const showSelector = ref(false);

    function deleteRoom() {
        roomsStore.deleteRoom(props.room);
    }

    function removeDevice(device) {
        roomsStore.deleteDeviceFromRoom(device);
    }

    function addSelectedDevice(selectedDevice) {
        console.log(selectedDevice);
        roomsStore.addDeviceToRoom(props.room, selectedDevice);
        showSelector.value = false;
    }

    const emit = defineEmits(['closeDialog'])

    function closeDialog() {
        emit('closeDialog')
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
