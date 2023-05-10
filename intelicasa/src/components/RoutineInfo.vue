<template>
  <v-card class="routine-card-info" flat>
    <v-row>
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
      <v-col class="mr-1" align="end">
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
          <v-expansion-panels variant="inset">
            <v-expansion-panel mandatory v-for="(device, index) in routineStore.routinesDevicesStatus[routine.id]"
              :key="index">
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
          <v-select v-if="showSelector" label="Select"
            :items="allDevices.filter(device => !routineStore.routinesDevicesStatus[routine.id].find(deviceState => deviceState.id === device.id))"
            item-title="name" return-object v-model="selectedDevice" @update:modelValue="addDevice" />
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
</template>
  
<script setup>
import DevicesOptions from './devices/DevicesOptions.vue';
import { ref, onUnmounted, computed } from 'vue'
import { useRoutineStore } from '@/stores/routineStore';
import ConfirmationDialog from './ConfirmationDialog.vue';
import favoriteYes from '@/assets/favoriteYes.svg'
import favoriteNo from '@/assets/favoriteNo.svg'
import { RoutineApi } from '@/api/routine';
const routineStore = useRoutineStore();

const { routine, allDevices } = defineProps({
  routine: Object,
  allDevices: Array
});

const selectedDevice = ref('');
const emit = defineEmits(['delete-routine']);
const showSelector = ref(false);
const openDialog = ref(false);
const editingName = ref(false);
const editRoutineForm = ref(null);
const loadingFav = ref(false);
const updatedName = ref(routine.name);
const nameRules = [(v) => !!v || 'El nombre es requerido',
(v) => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
(v) => (v && v.length <= 60) || 'El nombre debe tener menos de 60 caracteres',
(v) => /^[a-zA-Z0-9_ ]*$/.test(v) || 'El nombre solo puede contener letras, números, espacios y _',
(v) => (!routineStore.routines.find(routine => routine.name === v) || routine.name === v) || 'Ya existe una rutina con ese nombre']


function deleteRoutine() {
  emit('delete-routine');
}

function deleteDevice(device) {
  routine.actions = routine.actions.filter(action => action.device.id !== device.id)
  if (routine.actions.length === 0) {
    emit('delete-routine')
  }
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
  routineStore.routinesDevicesStatus[routine.id].forEach(device => {
    if (device.id === newAction.device.id) {
      device.state = { ...device.state, ...routineStore.getStateFromAction(newAction) }
    }
  })
}

onUnmounted(() => {
  handleUpdate()
})


const addDevice = () => {
  if (selectedDevice.value !== '') {
    selectedDevice.value = allDevices.find(device => device.name === selectedDevice.value.name);
    routineStore.routinesDevicesStatus[routine.id].push(selectedDevice.value)
    selectedDevice.value = ''
    showSelector.value = false
  }

}

function handleUpdate() {
  routineStore.updateRoutine(routine)
}
function editName() {
  const updatedRoutine = { ...routine, name: updatedName.value }
  routine.name = updatedRoutine.name
  console.log(updatedRoutine)
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
</style>
