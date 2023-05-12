<template>
  <v-dialog width="50%">
    <v-card class="room-card-info" flat :disabled="loading">
      <v-row>
        <v-card-title v-if="!editingName" class="text-h4">{{ room.name }}</v-card-title>
        <v-form v-if="editingName" class="d-flex" @submit.prevent validate-on="input" ref="editRoomForm">
          <v-text-field v-model="updatedName" class="editName" :rules="nameRules" variant="outlined" hide-details="auto"
            @blur="validateForm($refs.editRoomForm)" />
          <v-btn class="square-btn" variant="text" @click="validateForm($refs.editRoomForm)">
            <v-icon icon="mdi-check" size="20px" />
          </v-btn>
        </v-form>
        <v-btn v-if="!editingName" class="square-btn" variant="text" @click="editingName = true">
          <v-icon icon="mdi-pencil" size="20px" />
        </v-btn>
        <v-col class="mr-1" align="end">
          <v-icon end icon="mdi-delete" @click="openDialog = true" />
        </v-col>
      </v-row>
      <v-row>
        <v-divider />
        <div class="pa-3 ml-3 subtitle-text">Dispositivos conectados:</div>
      </v-row>
      <v-container fluid>
        <v-row v-for="(device, index) in devicesShown" :key="index" align="center">
          <v-col cols="12" class="device-card ml-4">
            <DeviceCard :device="device" />
          </v-col>
          <v-col class="text-end mr-8">
            <v-btn icon size="small" @click="removeDevice(device)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-divider />
        </v-row>
        <v-row cols="8" class="fill-space">
          <DeviceSelect v-if="showSelector || !devicesShown.length" :label="'Dispositivos disponibles'"
            :devices="availableDevices.filter(device => !devicesShown.includes(device))"
            @update:selected-device="(item) => addSelectedDevice(item)" @update:menu="" />
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn icon="mdi-plus" density="comfortable" @click="showSelector = true" />
          </v-col>
        </v-row>
      </v-container>


    </v-card>
    <v-dialog v-model="openDialog" width="auto">
      <ConfirmationDialog message="¿Estás seguro que deseas eliminar esta habitación?" @cancelAction="openDialog = false"
        @confirmAction="deleteRoom" />
    </v-dialog>
  </v-dialog>
</template>
  
<script setup>
import DeviceCard from '@/components/devices/DeviceCard.vue';
import { useRoomStore } from '@/stores/roomStore';
import { useDeviceStore } from '@/stores/deviceStore'
import { ref, computed } from 'vue';
import ConfirmationDialog from '../ConfirmationDialog.vue';
import { watch } from 'vue';

const deviceStore = useDeviceStore();
import DeviceSelect from './DeviceSelect.vue';


const roomsStore = useRoomStore()

const props = defineProps({
  room: Object,
  devices: Array
});

const openDialog = ref(false);

/* filter the devices that they dont have the room attribute*/
const availableDevices = computed(() => {
  return deviceStore.devices.filter(device => !device.room);
});

const devicesShown = ref(roomsStore.rooms.find(room => room.id === props.room.id).devices)
const showSelector = ref(false)
const editingName = ref(false);
const updatedName = ref(props.room.name);
const editRoomForm = ref(null)
const nameRules = [(v) => !!v || 'El nombre es requerido',
(v) => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
(v) => (v && v.length <= 60) || 'El nombre debe tener menos de 60 caracteres',
(v) => /^[a-zA-Z0-9_ ]*$/.test(v) || 'El nombre solo puede contener letras, números, espacios y _',
(v) => (!roomsStore.rooms.find(room => room.name === v) || props.room.name === v) || 'Ya existe una habitación con ese nombre']
const loading = ref(false)

async function editName() {
  const updatedRoom = { ...props.room, name: updatedName.value }
  loading.value = true
  await roomsStore.updateRoom(updatedRoom);
  loading.value = false
  editingName.value = false
}
async function validateForm(form) {
  const result = await form.validate()
  if (result.valid) {
    editName()
  }
}

async function deleteRoom() {
  loading.value = true
  await roomsStore.deleteRoom(props.room)
  loading.value = false
}

async function removeDevice(device) {
  loading.value = true
  await roomsStore.removeDeviceFromRoom(device)
  devicesShown.value = devicesShown.value.filter(dev => dev.id !== device.id)
  loading.value = false
}

async function addSelectedDevice(newDevice) {
  loading.value = true
  await roomsStore.addDeviceToRoom(props.room.id, newDevice)
  devicesShown.value = [...devicesShown.value, newDevice]
  loading.value = false
  showSelector.value = false
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

.editName {
  min-width: 200px;
}
</style>
