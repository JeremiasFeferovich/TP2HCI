<template>
  <v-card class="routine-card-info" flat v-click-outside="handleUpdate">

    <v-row>
      <v-card-title>
        <p class="text-h5">{{ routine.name }}</p>
      </v-card-title>
      <v-col class="mr-1" align="end">
        <v-icon end icon="mdi-delete" @click="deleteRoutine" />
      </v-col>
    </v-row>
    <v-container>
      <v-col justify="center" align="center">
        <v-row cols="12" class="fill-space">
          <v-expansion-panels variant="inset" :model-value="opened">
            <v-expansion-panel mandatory v-for="(device, index) in routine.meta.devicesState" :key="index">
              <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                  <v-row no-gutters>
                    <v-col cols="3">
                      <v-img :src="device.meta.category.img" alt="categoryImg" contain height="40px" width="40px" />
                    </v-col>
                    <v-col cols="6" class="d-flex justify-start text-h5">
                      {{ device.name }}
                    </v-col>
                    <v-col cols="3" class="d-flex justify-end pr-5">
                      <v-icon end icon="mdi-delete" @click.stop="deleteDevice(device)" />
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <DevicesOptions :returnAction="true" :disabled="device.state.status === 'off'" :device="device"
                  :loadingState="false" @changeState="toggleButtonState(device)"
                  @actionSet="(action) => addAction(action)"
                  @deviceUpdate="(deviceState) => addDeviceState(deviceState)" />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
        <v-row cols="12" class="fill-space">
          <v-select v-if="showSelector" label="Select"
            :items="allDevices.filter(device => !routine.meta.devicesState.find(deviceState => deviceState.id === device.id))"
            item-title="name" return-object v-model="selectedDevice" @update:modelValue="addDevice" />
        </v-row>
        <v-row cols="12" class="plus-btn">
          <v-btn icon="mdi-plus" density="comfortable" @click="showSelector = true" flat />
        </v-row>
      </v-col>
    </v-container>
  </v-card>
</template>
  
<script setup>
import DevicesOptions from './devices/DevicesOptions.vue';
import { ref } from 'vue'
import { useRoutineStore } from '@/stores/routineStore';

const routineStore = useRoutineStore();

const { routine, allDevices } = defineProps({
  routine: Object,
  allDevices: Array
});

const selectedDevice = ref('');
const emit = defineEmits(['delete-routine']);
const showSelector = ref(false);

function deleteRoutine() {
  emit('delete-routine');
}

function deleteDevice(device) {
  routine.devices = routine.devices.filter(d => d.name !== device.name)
}

function addAction(action) {
  const { device, actionName } = action
  if (actionName === "turnOn" || actionName === "turnOff") {
    routine.actions = routine.actions.filter(action => action.device.id !== device.id || (action.actionName !== "turnOn" && action.actionName !== "turnOff"))

  } else {
    routine.actions = routine.actions.filter(action => action.device.id !== device.id || action.actionName !== actionName)
  }
  routine.actions.push(action)
}

function addDeviceState(deviceState) {
  routine.meta.devicesState = routine.meta.devicesState.map(d => {
    if (d.id === deviceState.id) {
      d.state = deviceState.state
    }
    return d
  })
}


function toggleButtonState(device) {
  routine.meta.devicesState = routine.meta.devicesState.map(d => {
    if (d.id === device.id) {
      d.state.status = d.state.status === 'on' ? 'off' : 'on'
    }
    return d
  })
}

const addDevice = () => {
  if (selectedDevice.value !== '') {
    selectedDevice.value = allDevices.find(device => device.name === selectedDevice.value.name);

    routine.meta.devicesState.push(selectedDevice.value)
    selectedDevice.value = ''
    showSelector.value = false
  }

}

function handleUpdate() {
  const updatedRoutine = {
    id: routine.id,
    name: routine.name,
    actions: routine.actions,
    meta: {
      devicesState: routine.meta.devicesState
    }
  }
  routineStore.updateRoutine(updatedRoutine)
}

</script>
  
<style scoped>
.plus-btn {
  justify-content: center;
  margin-bottom: 40px;
}

.routine-card-info {
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
