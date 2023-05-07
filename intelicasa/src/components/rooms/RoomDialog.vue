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
          <span class="text-h5">New Room</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col align="center">
              <v-row cols="12" class="fill-space">
                <v-text-field v-model="roomName" label="Room name*" required />
              </v-row>
              <v-row cols="12" class="fill-space">
                <DeviceSelect :devices="devices" label="Device 1*" @update:selectedDevice="(item) => addSelectedDevice(item)"/>
              </v-row>
              <v-row cols="12" class="fill-space" v-for="(deviceInput, index) in deviceInputs" :key="index">
                <DeviceSelect :devices="devices" :label="`Device ${index + 2}`" 
                  @update:selectedDevice="(item) => addSelectedDevice(item)"
                />
              </v-row>
              <v-row cols="12" class="plus-btn">
                <!-- <v-btn icon="mdi-plus" density="comfortable" @click="addDeviceInput" /> -->
              </v-row>
              <v-row cols="12" class="fill-space">
                <v-select :items="roomTypes" v-model="roomType" label="Type*" required />
              </v-row>
            </v-col>
          </v-container>
          <small v-if="showRequired" class="required-info">*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="saveRoom">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script setup>
  import { ref } from 'vue'
  import { useRoomStore } from '@/stores/roomStore';
  import DeviceSelect from '@/components/rooms/DeviceSelect.vue';

  const roomStore = useRoomStore();
  const props = defineProps({
    devices: Array,
  });

  const showRequired = ref(false);
  const showSelector = ref(true)
  const dialog = ref(false)
  const roomName = ref('')
  const roomType = ref('')
  const roomTypes = ref(['Habitación', 'Cocina', 'Living', 'Baño', 'Patio', 'Otro'])
  const selectedDevices = ref([])
  const deviceInputs = ref([null])

  function saveRoom() {
    if (roomName.value === '' || roomType.value === '' || selectedDevices.value.length === 0) {
      showRequired.value = true;
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
  }

  function addSelectedDevice(selectedDevice) {
    console.log(selectedDevice)
    if (selectedDevice.value !== '') {
    selectedDevice.value = props.devices.find(device => device.name === selectedDevice.name);
    selectedDevices.value.push(selectedDevice)
    showSelector.value = false
  }

  function addDeviceInput() {
    deviceInputs.value.push(null);
  }

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
</style>