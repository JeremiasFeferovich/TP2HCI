<template>
  <v-dialog v-model="dialog" width="70%">
    <template v-slot:activator="{ props }">
      <AddBtn :activator="props" />
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Agregar Rutina</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-col justify="center" align="center">
            <v-form @submit.prevent validate-on="input" ref="newRoutineForm">
              <v-row cols="12" class="fill-space">
                <v-text-field :rules="nameRules" label="Nombre de la rutina*" v-model="routineName" />
              </v-row>
              <v-row cols="12" class="fill-space">
                <v-expansion-panels variant="inset" :model-value="opened">
                  <v-expansion-panel mandatory v-for="(device, index) in selectedDevices" :key="index">
                    <v-expansion-panel-title>
                      <template v-slot:default="{ expanded }">
                        <v-row no-gutters>
                          <v-col cols="4" class="d-flex justify-start">
                            {{ device.name }}
                          </v-col>
                          <v-col cols="8" class="text-grey">
                            <v-fade-transition leave-absolute>
                              <span v-if="expanded" key="0">
                                Configure el dispositivo
                              </span>
                            </v-fade-transition>
                          </v-col>
                        </v-row>
                      </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <DevicesOptions :returnAction="true" :disabled="device.state.status === 'off'" :device="device"
                        :loadingState="false" @changeState="toggleButtonState(device)"
                        @actionSet="(action) => addAction(action)"
                        @deviceUpdate="deviceState => addDeviceState(deviceState)" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
              <v-row cols="12" class="fill-space">
                <v-select :rules="deviceRules" v-if="showSelector" label="Select" :items="devices" item-title="name" return-object
                  v-model="selectedDevice" @update:modelValue="addSelectedDevice" />
              </v-row>
            </v-form>
            <v-row cols="12" class="plus-btn">
              <v-btn icon="mdi-plus" density="comfortable" @click="showSelector = true" flat />
            </v-row>
          </v-col>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <CloseAndSaveBtns @closeDialog="closeDialog()" @handleSave="validateForm($refs.newRoutineForm)" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import DevicesOptions from '@/components/devices/DevicesOptions.vue';
import AddBtn from './AddBtn.vue'
import CloseAndSaveBtns from './CloseAndSaveBtns.vue'


const prop = defineProps({
  devices: Array,
  categories: Array
})

const emit = defineEmits(['save-routine'])

const dialog = ref(false)

const actions = ref([])

const routineName = ref('')
const selectedDevice = ref('')
const selectedDevices = ref([])
const showSelector = ref(true)
const opened = ref([0])
const devicesState = ref([])

const newRoutineForm = ref(null)

const nameRules = [(v) => !!v || 'El nombre es requerido',
(v) => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
(v) => (v && v.length <= 60) || 'El nombre debe tener menos de 60 caracteres']

const deviceRules = [(v) => selectedDevices.value.length || 'Hace falta seleccionar al menos un dispositivo']

function toggleButtonState(device) {
  if (device.state.status === 'off') {
    device.state.status = 'on'
  } else {
    device.state.status = 'off'
  }
}

async function validateForm(form) {
  const result = await form.validate()
  if (result.valid) {
    handleSave()
  }
}


function addAction(action) {
  const { device, actionName } = action
  if (actionName === "turnOn" || actionName === "turnOff") {
    actions.value = actions.value.filter(action => action.device.id !== device.id || (action.actionName !== "turnOn" && action.actionName !== "turnOff"))
  } else {
    actions.value = actions.value.filter(action => action.device.id !== device.id || action.actionName !== actionName)
  }
  actions.value.push(action)
}

function addDeviceState(deviceState) {
  devicesState.value = devicesState.value.filter(d => !d || d.id !== deviceState.id)
  devicesState.value.push(deviceState)
}


function closeDialog() {
  dialog.value = false
  selectedDevices.value = []
  selectedDevice.value = ''
}

function handleSave() {
  const routine = {
    name: routineName.value,
    actions: actions.value,
    meta: {
      devicesState: devicesState.value
    }
  }
  emit('save-routine', routine)
  selectedDevices.value = []
  dialog.value = false
}

const addSelectedDevice = () => {
  if (selectedDevice.value !== '') {
    selectedDevice.value = prop.devices.find(device => device.name === selectedDevice.value.name);

    selectedDevices.value.push(selectedDevice.value)
    selectedDevice.value = ''
    showSelector.value = false
  }

}

</script>


<style scoped>
.add-btn {
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: right;
  margin-right: 12.5%;
}

.fill-space {
  max-width: 60%;
}

.plus-btn {
  justify-content: center;
  margin-bottom: 40px;
}

.required {
  color: red;
}
</style>