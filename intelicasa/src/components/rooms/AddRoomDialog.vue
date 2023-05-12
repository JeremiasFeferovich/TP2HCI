<template>
  <div>
    <v-dialog v-if="!loading" v-model="dialog" width="1024">
      <template v-slot:activator="{ props }">
        <AddBtn :activator="props" />
      </template>
      <v-card>
        <v-card-title align="center">
          <span class="text-h5">Nueva Habitación</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form @submit.prevent validate-on="input" ref="newRoomForm">
              <v-col align="center">
                <v-row cols="12" class="fill-space">
                  <v-text-field :rules="nameRules" class="mb-3" v-model="roomName" label="Nombre de la habitación*"
                    required />
                </v-row>

                <v-list class="mb-3">
                  <v-list-item-subtitle>Dispositivos seleccionados</v-list-item-subtitle>
                  <v-divider length="75%" />
                  <v-list-item v-for="(device, index) in selectedDevices" :key="index">
                    <v-card class="pa-2">
                      <v-row align="center">
                        <v-col cols="3" class="py-3 px-0">
                          <v-img class="categoryImg" :src="device.meta.category.img" alt="categoryImg" contain />
                        </v-col>
                        <v-col cols="6">
                          <v-list-item-title class="text-h5">{{ device.name }}</v-list-item-title>
                        </v-col>
                        <v-col cols="2" class="text-end">
                          <v-btn icon size="small" @click="deleteSelectedDevice(device)">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-list-item>
                  <v-divider length="75%" />
                </v-list>

                <v-row cols="12">
                  <v-col class="text-center">
                    <v-list-item-subtitle>Seleccione dispositivo a agregar</v-list-item-subtitle>
                  </v-col>
                </v-row>

                <v-row cols="12" class="fill-space">
                  <DeviceSelect v-if="showSelector" :rules="deviceRules"
                    :devices="availableDevices.filter((device) => !selectedDevices.includes(device))"
                    :label=" selectedDevices.length ? 'Dispositivo' : 'Dispositivo*' "
                    @update:selectedDevice="(item) => addSelectedDevice(item)" />
                </v-row>

                <v-row cols="12" class="plus-btn">
                  <v-btn class="mt-3" icon="mdi-plus" density="comfortable" @click="showSelector = true" />
                </v-row>

                <v-row cols="12" class="fill-space">
                  <v-select :rules="roomTypeRules" :items="roomTypes" v-model="roomType" label="Tipo de habitación*"
                    required hide-details="auto" />
                </v-row>
              </v-col>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn size="large" color="blue-darken-1" variant="text" @click="closeDialog">
            Cerrar
          </v-btn>
          <v-btn size="large" color="blue-darken-1" variant="flat" @click="validateForm($refs.newRoomForm)">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script setup>
import { ref, computed, watch } from 'vue'
import { useRoomStore } from '@/stores/roomStore';
import { useDeviceStore } from '@/stores/deviceStore';
import DeviceSelect from '@/components/rooms/DeviceSelect.vue';
import AddBtn from '../AddBtn.vue';
import { onMounted } from 'vue';

const roomStore = useRoomStore()
const deviceStore = useDeviceStore()
const loading = ref(false)

onMounted(() => {
  loading.value = true
  deviceStore.fetchDevices()
  loading.value = false
})

const availableDevices = computed(() => {
  return deviceStore.devices.filter(device => !device.room);
});


const showSelector = ref(true)
const firstDevice = ref(true)
const dialog = ref(false)
const roomName = ref('')
const roomType = ref('')
const roomTypes = ref(['Dormitorio', 'Cocina', 'Living', 'Baño', 'Patio', 'Otro'])
const selectedDevices = ref([])
const deviceInputs = ref([])
const attemptSave = ref(false)

const newRoomForm = ref(null)

const nameRules = [(v) => !!v || 'El nombre es requerido',
(v) => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
(v) => (v && v.length <= 60) || 'El nombre debe tener menos de 60 caracteres',
(v) => /^[a-zA-Z0-9_ ]*$/.test(v) || 'El nombre solo puede contener letras, números, espacios y _',
(v) => !roomStore.rooms.some(room => room.name === v) || 'Ya existe una habitación con ese nombre']

const deviceRules = [(v) => selectedDevices.value.length || 'Hace falta seleccionar al menos un dispositivo']
const roomTypeRules = [(v) => !!v || 'El tipo de habitación es requerido']

watch(dialog, (value) => {
  if (!value) {
    resetForm()
  }
})

function resetForm() {
  roomName.value = ''
  roomType.value = ''
  deviceInputs.value = [null]
  attemptSave.value = false
  selectedDevices.value = []
  showSelector.value = true
}


async function validateForm(form) {
  const result = await form.validate()
  if (result.valid) {
    saveRoom()
  }
}

function saveRoom() {
  const newRoom = {
    name: roomName.value,
    devices: selectedDevices.value,
    type: roomType.value,
  }
  roomStore.addRoom(newRoom);
  dialog.value = false;
  // Reset form values;
  roomName.value = '';
  roomType.value = '';
  deviceInputs.value = [null];
  attemptSave.value = false
  selectedDevices.value = []
}

function closeDialog() {
  dialog.value = false;
  showSelector.value = true
  roomName.value = '';
  roomType.value = '';
  deviceInputs.value = [null];
  attemptSave.value = false

  selectedDevices.value = []
}

function addSelectedDevice(selectedDevice) {
  if (selectedDevice.value !== '') {
    selectedDevice.value = deviceStore.devices.find(device => device.name === selectedDevice.name);
    selectedDevices.value.push(selectedDevice)
    showSelector.value = false
    /* delete selected device from availabledevicesnames*/
  }
}

function deleteSelectedDevice(selectedDevice) {
  if (selectedDevice.value !== '') {
    selectedDevice.value = deviceStore.devices.find(device => device.name === selectedDevice.name);
    /* remoce selected device from selected devices*/
    selectedDevices.value.splice(selectedDevices.value.indexOf(selectedDevice), 1)
    showSelector.value = false
    /* add selected device to available devices*/
  }
}
</script>


<style scoped>
.fill-space {
  max-width: 60%;
}

.plus-btn {
  justify-content: center;
  margin-bottom: 40px;
}

.categoryImg {
  height: 75px;
  width: 75px;
  padding: 5px 0;
}
</style>