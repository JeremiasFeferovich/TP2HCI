<template>
  <div class="add-btn">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          Agregar
          <v-icon end icon="mdi-plus-circle"></v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title align="center">
          <span class="text-h5">{{ objectTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col align="center">
              <v-row cols="12" class="fill-space">
                <v-text-field v-model="roomName" label="Room name*" required />
              </v-row>
              <v-row cols="12" class="fill-space">
                <v-text-field v-model="device1" label="Device 1*" required />
              </v-row>
              <v-row cols="12" class="fill-space" v-for="(deviceInput, index) in deviceInputs" :key="index">
                <v-text-field v-model="deviceInput.value" :label="`Device ${index + 2}`" />
              </v-row>
              <v-row cols="12" class="plus-btn">
                <v-btn icon="mdi-plus" density="comfortable" @click="addDeviceInput" />
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

  const showRequired = ref(false);

  const dialog = ref(false)
  const roomName = ref('')
  const roomType = ref('')
  const roomTypes = ref(['Habitación', 'Cocina', 'Living', 'Baño', 'Patio', 'Otro'])
  const device1 = ref('')
  const devices = ref([])
  const deviceInputs = ref([{ value: '' }]) // initialize with one input

  const props = defineProps({
    objectTitle: String,
  })

  const emit = defineEmits(['save-room'])

  function saveRoom() {
    if (roomName.value === '' || roomType.value === '' || device1.value === '') {
      showRequired.value = true;
      return;
    }
    devices.value = [device1.value];
    if (deviceInputs.value.length > 0) {
      devices.value = [device1.value, ...deviceInputs.value.filter((dev) => dev.value !== "").map((input) => input.value)]
    }
    console.log(devices.value)
    const newRoom = {
      name: roomName.value,
      devices: devices.value,
      type: roomType.value,
    }
    emit('save-room', newRoom);
    dialog.value = false;
    // Reset form values;
    roomName.value = '';
    roomType.value = '';
    device1.value = '';
    deviceInputs.value = [{ value: '' }]; // reset to one input
  }

  function addDeviceInput() {
    deviceInputs.value.push({ value: '' }) // add new input
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