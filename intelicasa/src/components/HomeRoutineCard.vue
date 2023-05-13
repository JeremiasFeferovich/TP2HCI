<template>
    <v-card :disabled="loading" class="ma-1 rounded-pill" @click="openDialog = true">
        <v-row>
            <v-col cols="12">
                <v-card-title>
                    <v-row>
                        <v-col cols="8">
                            <div class="text-h5 px-5 py-2 align-center">{{ routine.name }}</div>
                        </v-col>
                        <v-col cols="2">
                            <v-btn :loading="loading" icon="mdi-play" max-width="50px" @click.stop="executeRoutine(routine)" />
                        </v-col>
                    </v-row>
                </v-card-title>
            </v-col>
        </v-row>
        <v-dialog v-model="openDialog" width="40%">
            <RoutineInfo :routine="props.routine" :allDevices="deviceStore.devices" @close-dialog="openDialog = false;" />
        </v-dialog>
        <v-snackbar v-model="snackbarOpen" location="bottom" timeout="3000" :color="snackbarColor">{{ snackbarText }}
            <template v-slot:actions>
                <v-btn color="white" variant="text" @click="snackbarOpen = false">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRoutineStore } from '@/stores/routineStore'
import { useDeviceStore } from '@/stores/deviceStore'
import RoutineInfo from '@/components/routines/RoutineInfo.vue'

const loading = ref(false);

const snackbarOpen = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('success');

const props = defineProps({
    routine: Object
})

const routineStore = useRoutineStore()

const openDialog = ref(false)

async function executeRoutine(routine) {
    loading.value = true;
    if (await routineStore.executeRoutine(routine)) {
        snackbarText.value = 'Rutina ejecutada exitosamente';
        snackbarColor.value = 'success';
        snackbarOpen.value = true;
    } else {
        snackbarText.value = 'Error al ejecutar la rutina';
        snackbarColor.value = 'error';
        snackbarOpen.value = true;
    }
    loading.value = false;
}

</script>