<template>
    <v-row align="center" justify="center">
        <v-col align="center">
            <span class="text-h5 font-italic">{{ status }}</span>
        </v-col>
        <v-col justify-center>
            <v-row align="center" justify="center">
                <v-icon v-if="level < 40" class="mr-6" size="50" icon="mdi-window-shutter" />
                <v-icon v-else class="mr-6" size="50" icon="mdi-window-shutter-open" />
                <v-sheet>
                    <v-slider :disabled="loading" class="sliderVertCont" hide-details direction="vertical" v-model="level"
                 step="1" @end="setLevel" />
                </v-sheet>
            </v-row>
        </v-col>
        <v-col align="center">
            <v-row class="mb-5">
                <v-btn :disabled="loading" height="100%" width="175px" @click="open">
                    <v-icon class="mr-6" size="50" icon="mdi-window-shutter-open" />
                    <p class="text-button">Abrir</p>
                </v-btn>
            </v-row>
            <v-row class="mt-5">
                <v-btn :disabled="loading" height="100%" width="175px" @click="close">
                    <v-icon class="mr-6" size="50" icon="mdi-window-shutter" />
                    <p class="text-button">Cerrar</p>
                </v-btn>
            </v-row>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

const deviceStore = useDeviceStore();

const props = defineProps({
    device: Object,
    returnAction: Boolean
})

const emit = defineEmits(['actionSet']);

const level = ref(props.device.state.level);
const loading = ref(false);
const status = computed(() => {
    switch (props.device.state.status) {
        case "opened":
            return "Abierto"
        case "closed":
            return "Cerrado"
        case "opening":
            return "Abriendo"
        case "closing":
            return "Cerrando"
        default:
            return "Desconocido"
    }
}
);

async function setLevel() {
    const action = { device: { id: props.device.id }, actionName: 'setLevel', params: [level.value] }
    emit('actionSet', action)
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        await deviceStore.fetchDevice(props.device.id)
        loading.value = false
    }
}

async function open() {
    const action = { device: { id: props.device.id }, actionName: 'open', params: [] }
    emit('actionSet', action)
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        await deviceStore.fetchDevice(props.device.id)
        loading.value = false
    }
}

async function close() {
    const action = { device: { id: props.device.id }, actionName: 'close', params: [] }
    emit('actionSet', action)
    if (!props.returnAction) {
        loading.value = true
            await deviceStore.triggerEvent(action)
        await deviceStore.fetchDevice(props.device.id)
        loading.value = false
    }
}

</script>

<style scoped>
.square-btn {
    min-width: 35px;
    max-width: 35px;
    width: 35px;
    height: 35px;
}

.v-slider :deep(.v-input__control) {
    height: 100px;
    min-height: 0;
}
</style>