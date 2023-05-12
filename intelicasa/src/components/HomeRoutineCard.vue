<template>
    <v-card class="ma-1 rounded-pill" @click="openDialog = true">
        <v-row>
            <v-col cols="12">
                <v-card-title>
                    <v-row>
                        <v-col cols="8">
                            <div class="text-h5 px-5 py-2 align-center">{{ routine.name }}</div>
                        </v-col>
                        <v-col cols="2">
                            <v-btn icon="mdi-play" max-width="50px" @click.stop="executeRoutine(routine)" />
                        </v-col>
                    </v-row>
                </v-card-title>
            </v-col>
        </v-row>
        <v-dialog v-model="openDialog" width="40%">
            <RoutineInfo :routine="props.routine" :allDevices="deviceStore.devices" @close-dialog="openDialog = false;" />
        </v-dialog>
    </v-card>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRoutineStore } from '@/stores/routineStore'
    import { useDeviceStore } from '@/stores/deviceStore'
    import RoutineInfo from '@/components/routines/RoutineInfo.vue'

const props = defineProps({
    routine: Object
})

const routineStore = useRoutineStore()
const deviceStore = useDeviceStore()

const openDialog = ref(false)

function executeRoutine(routine) {
    routineStore.executeRoutine(routine)
}
</script>