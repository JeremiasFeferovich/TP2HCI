<template>
    <v-card :disabled="loading" class="mx-auto pa-3 routine-card" @click="openDialog = true">
        <v-row align="center">
            <v-col cols="6" align="left" class="pl-5">
                <p class="text-h4">{{ prop.name }}</p>
            </v-col>
            <v-col cols="4">
                <div class="image-container">
                    <v-img v-for="(category, index) in categories" :key="category.id" :src="category.img" alt="categoryImg"
                        contain height="40px" width="40px" />
                </div>
            </v-col>
            <v-col cols="2">
                <v-btn icon="mdi-play" @click.stop="executeRoutine(routine)" />
            </v-col>
        </v-row>
    </v-card>
    <v-dialog v-model="openDialog" width="40%">
        <RoutineInfo :routine="routine" :allDevices="allDevices" @close-dialog="openDialog = false;" />
    </v-dialog>
    <v-snackbar v-model="snackbarOpen" location="bottom" timeout="3000" :color="snackbarColor" >{{ snackbarText }}
        <template v-slot:actions>
            <v-btn color="white" variant="text" @click="snackbarOpen = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup>

import { ref, computed } from 'vue';

import RoutineInfo from '@/components/routines/RoutineInfo.vue'
import { useRoutineStore } from '@/stores/routineStore';
import { useDeviceStore } from '@/stores/deviceStore';

const routineStore = useRoutineStore();
const deviceStore = useDeviceStore();

const categories = computed(() => {
    const categoryIds = routineStore.routinesDevicesStatus[prop.routine.id].map(device => device.meta.category.id);
    const cats = [];

    categoryIds.forEach(id => {
        const category = deviceStore.categories.find(c => c.id === id);
        if (category) {
            cats.push(category);
        }
    });
    return cats;
})

const openDialog = ref(false);

const loading = ref(false);

const snackbarOpen = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('success');

const prop = defineProps({
    name: String,
    routine: Object,
    allDevices: Array
})

const emit = defineEmits(['delete-routine', 'update-routine']);


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

<style scoped>
.routine-card {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 90%;
}

.routine-card:hover {
    background-color: rgba(220, 220, 220, 0.892);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.image-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 100%;

}
</style>