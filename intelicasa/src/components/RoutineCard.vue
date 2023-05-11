<template>
    <v-card class="ma-2 pa-3 routine-card" @click="openDialog = true">
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
</template>

<script setup>

import { ref, computed } from 'vue';
import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'
import RoutineInfo from './RoutineInfo.vue';
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

const buttonState = ref(false);
const loading = ref(false);

const prop = defineProps({
    name: String,
    routine: Object,
    allDevices: Array
})

const emit = defineEmits(['delete-routine', 'update-routine']);


function executeRoutine(routine) {
    routineStore.executeRoutine(routine);
}

</script>

<style scoped>
.routine-card {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
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