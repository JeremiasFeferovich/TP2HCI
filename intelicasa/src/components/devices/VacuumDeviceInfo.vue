<template>
    <v-row justify="space-evenly" class="mt-0">
        <span class="text-h5 font-italic">{{ status }} </span>
        <div class="batCont">
            <v-icon :icon="batteryImg" />
            <span class="text-h6 font-italic"> {{ device.state.batteryLevel }}%</span>
        </div>
    </v-row>
    <v-row v-if="device.room" justify="space-evenly" class="py-3">
        <v-btn @click="startCleaning" :disabled="device.state.batteryLevel < 5">
            <v-icon v-if="device.state.batteryLevel < 5" icon="mdi-battery-alert-variant-outline" />
            <p>{{ device.state.batteryLevel < 5 ? "" : "Limpiar" }} </p>
        </v-btn>
        <v-btn @click="pauseCleaning" :disabled="device.state.status !== 'active'">Pausar</v-btn>
        <v-btn @click="dock">Cargar</v-btn>
    </v-row>
    <v-row v-else justify="center" class="py-3">
        <p class="text-h6 font-italic">El dispositivo debe estar vinculado a una habitación</p>
    </v-row>
    <v-row justify="center">
        <v-sheet class="imageCont">
            <ImageSelect :disabled="disabled || loading" label="Modo" :items="modeItems" :initial-item="localMode"
                :ignore-initial-item-changes="returnAction"
                @update:selected-item="(updatedValue) => setMode(updatedValue)" />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="imageCont">
            <ImageSelect :disabled="loading" label="Ubicación" :items="rooms" :initial-item="localLocation"
                @update:selected-item="(updatedValue) => setLocation(updatedValue)" />
        </v-sheet>
    </v-row>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ImageSelect from './ImageSelect.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { useRoomStore } from '@/stores/roomStore';

import mopMode from '@/assets/vacuum/mopMode.png';
import vacuumMode from '@/assets/vacuum/vacuumMode.png';

import dormitorio from '@/assets/dormitorio.svg';
import cocina from '@/assets/cocina.svg';
import living from '@/assets/living.svg';
import baño from '@/assets/baño.svg';
import patio from '@/assets/patio.svg';
import otro from '@/assets/otro.svg';
import { watch } from 'vue';

const roomTypeImg = { ['Dormitorio']: dormitorio, ['Cocina']: cocina, ['Living']: living, ['Baño']: baño, ['Patio']: patio, ['Otro']: otro }

const modeItems = ref([
    { name: 'Aspirar', value: 'vacuum', img: vacuumMode },
    { name: 'Trapear', value: 'mop', img: mopMode }])

const props = defineProps({
    device: Object,
    disabled: Boolean,
    returnAction: Boolean
})

const deviceStore = useDeviceStore()
const roomStore = useRoomStore()

const loading = ref(false)
const rooms = ref(roomStore.rooms.map(x => ({ name: x.name, id: x.id, img: roomTypeImg[x.meta.type] })))

const localMode = ref(modeItems.value.find(x => x.value === props.device.state.mode))
const localLocation = ref(rooms.value.find(x => x.is = props.device.state.location))

const storeDevice = computed(() => deviceStore.getDevice(props.device.id))

const mode = computed(() => storeDevice.value && storeDevice.value.state.mode)
const location = computed(() => storeDevice.value && storeDevice.value.state.location)
const batteryLevel = computed(() => storeDevice.value && storeDevice.value.state.batteryLevel)

watch(location, (newVal) => {
    if (!props.returnAction && newVal) localLocation.value = rooms.value.find(x => x.id === newVal.id);
})

watch(mode, (newVal) => {
    if (!props.returnAction && newVal) localMode.value = modeItems.value.find(x => x.value === newVal.value);
})

const batteryImg = computed(() => {
    if (batteryLevel.value < 10) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-10`
    } else if (batteryLevel.value < 20) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-20`
    } else if (batteryLevel.value < 30) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-30`
    } else if (batteryLevel.value < 40) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-40`
    } else if (batteryLevel.value < 50) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-50`
    } else if (batteryLevel.value < 60) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-60`
    } else if (batteryLevel.value < 70) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-70`
    } else if (batteryLevel.value < 80) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-80`
    } else if (batteryLevel.value < 90) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-90`
    } else {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}`
    }
})

const status = computed(() => {
    switch (props.device.state.status) {
        case "inactive":
            return "Inactivo"
        case "docked":
            return "Cargando"
        case "active":
            return "Limpiando"
        default:
            return "Desconocido"
    }
});

const emit = defineEmits(['actionSet']);

onMounted(async () => {
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setMode', params: [props.device.state.mode] })
    emit('actionSet', { device: { id: props.device.id }, actionName: 'setLocation', params: [props.device.state.location ? props.device.state.location.id : null] })
    switch (props.device.state.status) {
        case "inactive":
            emit('actionSet', { device: { id: props.device.id }, actionName: 'pause', params: [] })
            break
        case "docked":
            emit('actionSet', { device: { id: props.device.id }, actionName: 'dock', params: [] })
            break
        case "active":
            emit('actionSet', { device: { id: props.device.id }, actionName: 'start', params: [] })
            break
    }
})

async function setMode(newMode) {
    const action = { device: { id: props.device.id }, actionName: 'setMode', params: [newMode.value] }
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            localMode.value = newMode;
        }
        loading.value = false
    } else {
        emit('actionSet', action)
        localMode.value = newMode;
        props.device.state.mode = newMode.value;
    }
}

async function setLocation(newLocation) {
    const action = { device: { id: props.device.id }, actionName: 'setLocation', params: [newLocation.id] }
    if (!props.returnAction) {
        loading.value = true
        //Location es por default null, no se puede hacer el if porque la primera vez no se actualizaria
        await deviceStore.triggerEvent(action)
        loading.value = false
    } else {
        emit('actionSet', action)
        localLocation.value = newLocation;
        props.device.state.location = newLocation.id;
    }
}

async function startCleaning() {
    const action = { device: { id: props.device.id }, actionName: 'start' }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    } else {
        emit
        props.device.state.status = 'active'
    }
}

async function pauseCleaning() {
    const action = { device: { id: props.device.id }, actionName: 'pause' }
    if (!props.returnAction) {
        loading.value = true
        // No hacemos el if, porque igual hay que hacer un fetch para obtener si
        await deviceStore.triggerEvent(action)
        loading.value = false
    } else {
        emit('actionSet', action)
        props.device.state.status = 'inactive'
    }
}

async function dock() {
    const action = { device: { id: props.device.id }, actionName: 'dock' }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    } else {
        emit('actionSet', action)
        props.device.state.status = 'docked'
    }
}


</script>

<style scoped>
.square-btn {
    min-width: 30px;
    max-width: 30px;
    width: 30px;
    height: 30px;
    margin-right: 15px;
}

.imageCont {
    width: 70%;
    display: inline-flex;
    margin-top: 1rem;
}

.batCont {
    display: flex;
    align-items: center;
}
</style>