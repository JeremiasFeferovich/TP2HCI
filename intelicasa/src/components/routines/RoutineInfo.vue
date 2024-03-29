<template>
  <v-card class="routine-card-info" flat>
    <v-row class="title" align="center">
      <v-col cols="2" />
      <v-col cols="8">
        <v-row justify="center">
          <v-btn class="square-btn" v-model="routine.meta.favorite" @click="toggleButtonFavorite" toggle :ripple="false"
            size="large" variant="text" :loading="loadingFav" rounded="xl">
            <img :src="favoriteBtnImg" alt="fav button" />
          </v-btn>
          <v-card-title v-if="!editingName" class="text-h4">{{ routine.name }}</v-card-title>
          <v-form v-if="editingName" class="d-flex" @submit.prevent validate-on="input" ref="editRoutineForm">
            <v-text-field v-model="updatedName" class="editName" :rules="nameRules" variant="outlined" hide-details="auto"
              @blur="validateForm($refs.editRoutineForm)" />
            <v-btn class="square-btn" variant="text" @click="validateForm($refs.editRoutineForm)">
              <v-icon icon="mdi-check" size="20px" />
            </v-btn>
          </v-form>
          <v-btn v-if="!editingName" class="square-btn" variant="text" @click="editingName = true">
            <v-icon icon="mdi-pencil" size="20px" />
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="2" justify="center" align="center">
        <v-icon end icon="mdi-delete" @click="openDialog = true" />
      </v-col>
    </v-row>

    <v-container>
      <v-row>
        <v-divider />
        <div class="pa-4 subtitle-text">Dispositivos conectados:</div>
      </v-row>
      <v-col justify="center" align="center">
        <v-row cols="12" class="fill-space">
          <v-expansion-panels variant="inset" v-model="expansionPanelsValues">
            <v-expansion-panel v-if="thisRoutineStatus" mandatory v-for="(device, index) in thisRoutineStatus.deviceStatus" :key="index"
              :value="device.name">
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
                      <v-btn icon size="small" @click="checkIfLastDevice(device)">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <DevicesOptions :returnAction="true" :disabled="device.state.status === 'off'" :device="device"
                  :loadingState="false" @actionSet="(action) => addAction(action)" />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-col>
    </v-container>
    <v-row class="mt-1 mb-1">
      <v-divider />
    </v-row>
    <v-container>
      <v-col>
        <v-row cols="12" class="fill-space">
          <ImageSelect v-if="showSelector"
            :items="allDevices.filter(device => !thisRoutineStatus.deviceStatus.find(deviceState => deviceState.id === device.id)).map(device => ({ name: device.name, img: device.meta.category.img }))"
            @update:selected-item="(device) => addDevice(device)" label="Select" />
        </v-row>
        <v-row cols="12" class="plus-btn">
          <v-btn icon="mdi-plus" density="comfortable" @click="showSelector = true" />
        </v-row>
      </v-col>
    </v-container>
  </v-card>
  <v-dialog v-model="openDialog" width="auto">
    <ConfirmationDialog message="¿Estás seguro que deseas eliminar esta rutina?" @cancelAction="openDialog = false"
      @confirmAction="deleteRoutine" />
  </v-dialog>
  <v-dialog v-model="openDeleteDeviceDialog" width="auto">
    <ConfirmationDialog message="Si eliminas todos los dispositivos se borrará la rutina, ¿Deseas continuar?"
      @cancelAction="openDeleteDeviceDialog = false" @confirmAction="deleteRoutine" />
  </v-dialog>
</template>
  
<script setup>
import DevicesOptions from '@/components/devices/DevicesOptions.vue';
import { ref, onUnmounted, computed } from 'vue'
import { useRoutineStore } from '@/stores/routineStore';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import favoriteYes from '@/assets/favoriteYes.svg'
import favoriteNo from '@/assets/favoriteNo.svg'
import { RoutineApi } from '@/api/routine';
import ImageSelect from '@/components/ImageSelect.vue';
const routineStore = useRoutineStore();

const thisRoutineStatus = computed(() => routineStore.routinesDevicesStatus[routine.id] && routineStore.routinesDevicesStatus[routine.id].id === routine.id ? routineStore.routinesDevicesStatus[routine.id] : null)

const { routine, allDevices } = defineProps({
  routine: Object,
  allDevices: Array
});

const selectedDevice = ref('');
const emit = defineEmits(['close-dialog']);
const showSelector = ref(false);
const openDialog = ref(false);
const openDeleteDeviceDialog = ref(false);
const editingName = ref(false);
const editRoutineForm = ref(null);
const loadingFav = ref(false);
const updatedName = ref(routine.name);
const expansionPanelsValues = ref([])
const nameRules = [(v) => !!v || 'El nombre es requerido',
(v) => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
(v) => (v && v.length <= 60) || 'El nombre debe tener menos de 60 caracteres',
(v) => /^[a-zA-Z0-9_ ]*$/.test(v) || 'El nombre solo puede contener letras, números, espacios y _',
(v) => (!routineStore.routines.find(routine => routine.name === v) || routine.name === v) || 'Ya existe una rutina con ese nombre']


function deleteRoutine() {
  for (const key in routineStore.routinesDevicesStatus) {
    const routineState = routineStore.routinesDevicesStatus[key];
    console.log(routineState);
    console.log(routineState.id, routine.id);
  }
  routineStore.routinesDevicesStatus.splice(routineStore.routinesDevicesStatus.findIndex(routineState => routineState.id === routine.id), 1)
  routineStore.deleteRoutine(routine)
  emit('close-dialog');
}

function checkIfLastDevice(device) {
  if (new Set(routine.actions.map(action => action.device.id)).size === 1) {
    openDeleteDeviceDialog.value = true
  } else {
    deleteDevice(device)
  }
}


function deleteDevice(device) {
  if (thisRoutineStatus) {
    thisRoutineStatus.value.deviceStatus = thisRoutineStatus.value.deviceStatus.filter(deviceState => deviceState.id !== device.id)
  }
  routine.actions = routine.actions.filter(action => action.device.id !== device.id)
}

const favoriteBtnImg = computed(() => {
  return routine.meta.favorite ? favoriteYes : favoriteNo;
})

async function toggleButtonFavorite() {
  loadingFav.value = true
  if (await RoutineApi.toggleFavorite(routine)) {
    routine.meta.favorite = !routine.meta.favorite
  }
  loadingFav.value = false
}

function addAction(newAction) {
  let found = false
  const deviceIndex = routine.actions.findIndex(action => action.device.id === newAction.device.id)
  if (deviceIndex !== -1) {
    routine.actions.forEach(action => {
      if (action.device.id === newAction.device.id) {
        if ((action.actionName === "turnOn" || action.actionName === "turnOff") && (newAction.actionName === "turnOn" || newAction.actionName === "turnOff")
          || (action.actionName === "lock" || action.actionName === "unlock") && (newAction.actionName === "lock" || newAction.actionName === "unlock")
          || (action.actionName === "open" || action.actionName === "close") && (newAction.actionName === "open" || newAction.actionName === "close")
          || (action.actionName === "start" || action.actionName === "pause" || action.actionName === "dock") && (newAction.actionName === "start" || newAction.actionName === "pause" || newAction.actionName === "dock")) {
          action.actionName = newAction.actionName;
          found = true
        } else if (action.actionName === newAction.actionName) {
          action.params = newAction.params;
          found = true
        }
      }
    })
  }
  if (!found || deviceIndex === -1) {
    routine.actions.push(newAction)
  }
  thisRoutineStatus.value.deviceStatus.forEach(device => {
    if (device.id === newAction.device.id) {
      device.state = { ...device.state, ...routineStore.getStateFromAction(newAction) }
    }
  })
}

onUnmounted(() => {
  console.log(thisRoutineStatus.value)
  if (thisRoutineStatus.value) {
    handleUpdate()
  }
})


const addDevice = (selected) => {
  if (!expansionPanelsValues.value) {
    expansionPanelsValues.value = []
  }
  expansionPanelsValues.value.push(selected.name)
  selectedDevice.value = allDevices.find(device => device.name === selected.name);
  thisRoutineStatus.value.deviceStatus.unshift(selectedDevice.value)
  selectedDevice.value = ''
  showSelector.value = false
}

function handleUpdate() {
  routineStore.updateRoutine(routine)
}
function editName() {
  const updatedRoutine = { ...routine, name: updatedName.value }
  routine.name = updatedRoutine.name
  routineStore.updateRoutine(updatedRoutine);
  editingName.value = false
}

async function validateForm(form) {
  const result = await form.validate()
  if (result.valid) {
    editName()
  }
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

.editName {
  min-width: 200px;
}

.subtitle-text {
  color: rgb(121, 121, 121);
}

.title {
  min-height: 80px;
  margin: 0 0;
}
</style>
