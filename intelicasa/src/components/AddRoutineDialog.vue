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
        <v-card-title>
          <span class="text-h5">Agregar Rutina</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col justify="center" align="center">
              <v-row cols="12" class="fill-space">
                <v-text-field label="Nombre de la rutina*" required />
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
                      <DevicesOptions :disabled="!device.isOn" :device="device" :loadingState="false"
                        @changeState="toggleButtonState(device)" />
                    </v-expansion-panel-text>


                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
              <v-row cols="12" class="fill-space">
                <v-select label="Select" :items="devices" item-title="name" return-object v-model="selectedDevice"
                  @update:modelValue="addSelectedDevice" />
              </v-row>
              <v-row cols="12" class="plus-btn">
                <v-btn icon="mdi-plus" density="comfortable" @click="showSelector = true" flat />
              </v-row>
            </v-col>
          </v-container>
          <small class="required">* indica campo requerido</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Cerrar
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DevicesOptions from './DevicesOptions.vue'



const prop = defineProps({
  devices: Array,
  categories: Array
})

const dialog = ref(false)

const selectedDevice = ref('')
const selectedDevices = ref([])
const showSelector = ref(true)
const opened = ref([0])

function toggleButtonState(device) {
  device.isOn = !device.isOn;
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
  margin-right: 20%;

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