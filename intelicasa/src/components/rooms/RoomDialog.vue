<template>
  <div class="add-btn">
    <v-dialog v-model="dialog" width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          Agregar
          <v-icon end icon="mdi-plus-circle"></v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title align="center">
          <span class="text-h5">Nueva Habitación</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col align="center">
              <v-row cols="12" class="fill-space">
                <v-text-field v-model="roomName" label="Nombre de la habitación*" required />
              </v-row>

              <v-list class="mb-3">
                <v-list-item-subtitle>Dispositivos seleccionados</v-list-item-subtitle>
                <v-divider length="75%"/>
                
                <v-card v-if="selectedDevices.length === 0" >
                  <div class="pa-2 text-center text-h6 bg-secondary rounded-xl rounded-be-0 mt-3 mb-3 w-50 h-50">
                    <p style="font-size: 14px;">Todavía no se han seleccionado dispositivos.</p>
                  </div>
                </v-card>

                <v-alert
                  v-if="attemptSave && selectedDevices.length === 0"
                  v-model="attemptSave"
                  border="start"
                  variant="tonal"
                  closable
                  close-label="Close Alert"
                  color="warning"
                  title="Advertencia"
                  max-width="80%"
                  max-height="70px"
                  class="mt-2 mb-2"
                >
                  Se requiere seleccionar al menos un dispositivo para crear una habitación.
                </v-alert>
                  
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
                        <v-btn icon size="small" color="error" @click="removeSelectedDevice(device)">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-list-item>
                <v-divider length="75%"/>
              </v-list>

              <v-row cols="12">
                <v-col class="text-center">
                  <v-list-item-subtitle>Seleccione dispositivo a agregar</v-list-item-subtitle>
                </v-col>
              </v-row>

              <v-row cols="12" class="fill-space">
                <DeviceSelect v-if="showSelector" :devices="devices" :label="firstDevice ? 'Dispositivo*' : 'Dispositivo'"
                  @update:selectedDevice="(item) => addSelectedDevice(item)" />
              </v-row>

              <v-row cols="12" class="plus-btn">
                <v-btn class="mt-3" icon="mdi-plus" density="comfortable" @click="showSelector = true" />
              </v-row>

              <v-row cols="12" class="fill-space">
                <v-select :items="roomTypes" v-model="roomType" label="Tipo de habitación*" required />
              </v-row>
            </v-col>
          </v-container>

          <small v-if="showRequired" class="required-info">*Indica campos obligatorios</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn size="large" color="blue-darken-1" variant="text" @click="dialog = false; attemptSave=false; showRequired=false">
            Cerrar
          </v-btn>
          <v-btn size="large" color="blue-darken-1" variant="flat"  @click="saveRoom">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { useRoomStore } from '@/stores/roomStore';
import DeviceSelect from '@/components/rooms/DeviceSelect.vue';

const roomStore = useRoomStore();
const props = defineProps({
  devices: Array,
});

const showRequired = ref(false);
const showSelector = ref(true)
const firstDevice = ref(true)
const dialog = ref(false)
const roomName = ref('')
const roomType = ref('')
const roomTypes = ref(['Dormitorio', 'Cocina', 'Living', 'Baño', 'Patio', 'Otro'])
const selectedDevices = ref([])
const deviceInputs = ref([])
const attemptSave = ref(false)

function saveRoom() {
  if (roomName.value === '' || roomType.value === '' || selectedDevices.value.length === 0) {
    showRequired.value = true;
    attemptSave.value = true;
    return;
  }
  const newRoom = {
    name: roomName.value,
    devices: selectedDevices.value,
    type: roomType.value,
  }
  console.log(newRoom)
  roomStore.addRoom(newRoom);
  dialog.value = false;
  // Reset form values;
  roomName.value = '';
  roomType.value = '';
  deviceInputs.value = [null];
  attemptSave.value = false
}

function addSelectedDevice(selectedDevice) {
  console.log("selected device is: " + selectedDevice.value)
  if (selectedDevice.value !== '') {
    selectedDevice.value = props.devices.find(device => device.name === selectedDevice.name);
    selectedDevices.value.push(selectedDevice)
    showSelector.value = false
  }
  console.log("selected devices: " + selectedDevices)
}

function removeSelectedDevice(selectedDevice) {
  if (selectedDevice.value !== '') {
    selectedDevice.value = props.devices.find(device => device.name === selectedDevice.name);
    selectedDevices.value.pop(selectedDevice)
    showSelector.value = false
  }
  console.log("selected devices: " + selectedDevices)
}
</script>


<style scoped>
.add-btn {
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: right;
  margin-right: 20%;

}

.fill-space {
  max-width: 60%;
}

.plus-btn {
  justify-content: center;
  margin-bottom: 40px;
}

.required-info {
  color: red;
}

.categoryImg {
    height: 75px;
    width: 75px;
    padding: 5px 0;
}
</style>