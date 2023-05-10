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
            <ImageSelect :disabled="disabled || loading" label="Modo" :items="modeItems" :initial-item="mode"
                @update:selected-item="(updatedValue) => setMode(updatedValue)" />
        </v-sheet>
    </v-row>
    <v-row justify="center">
        <v-sheet class="imageCont">
            <ImageSelect :disabled="loading" label="Ubicación" :items="rooms" :initial-item="location"
                @update:selected-item="(updatedValue) => setLocation(updatedValue)" />
        </v-sheet>
    </v-row>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ImageSelect from './ImageSelect.vue';
import { useDeviceStore } from '@/stores/deviceStore';

import mopMode from '@/assets/vacuum/mopMode.png';
import vacuumMode from '@/assets/vacuum/vacuumMode.png';

import livingRoom from '@/assets/living.svg';

const modeItems = ref([
    { name: 'Aspirar', value: 'vacuum', img: vacuumMode },
    { name: 'Trapear', value: 'mop', img: mopMode }])

const props = defineProps({
    device: Object,
    disabled: Boolean,
    returnAction: Boolean
})

const deviceStore = useDeviceStore()

const loading = ref(false)

const mode = ref(modeItems.value.find(x => x.value === props.device.state.mode))
const rooms = ref([
    { name: 'Living', id: "dc21c4175eec5558", img: livingRoom },
])

const batteryImg = computed(() => {
    if (props.device.state.batteryLevel < 10) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-10`
    } else if (props.device.state.batteryLevel < 20) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-20`
    } else if (props.device.state.batteryLevel < 30) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-30`
    } else if (props.device.state.batteryLevel < 40) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-40`
    } else if (props.device.state.batteryLevel < 50) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-50`
    } else if (props.device.state.batteryLevel < 60) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-60`
    } else if (props.device.state.batteryLevel < 70) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-70`
    } else if (props.device.state.batteryLevel < 80) {
        return `mdi-battery${props.device.state.status === "docked" ? "-charging" : ""}-80`
    } else if (props.device.state.batteryLevel < 90) {
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

const location = ref(rooms.value.find(x => x.is = props.device.state.location))

const emit = defineEmits(['actionSet']);

onMounted(() => {
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

onUnmounted(() => {
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
            mode.value = newMode;
            props.device.state.mode = newMode.value;
        }
        loading.value = false
    } else {
        mode.value = newMode;
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
    }
    location.value = newLocation;
    props.device.state.location = newLocation.id;
}

async function startCleaning() {
    const action = { device: { id: props.device.id }, actionName: 'start' }
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            props.device.state.status = 'active'
        }
        loading.value = false
    } else {
        props.device.state.status = 'active'
    }
}

async function pauseCleaning() {
    const action = { device: { id: props.device.id }, actionName: 'pause' }
    if (!props.returnAction) {
        loading.value = true
        // No hacemos el if, porque igual hay que hacer un fetch para obtener si
        if (await deviceStore.triggerEvent(action)) {
            props.device.state.status = 'inactive'
        }
        loading.value = false
    } else {
        props.device.state.status = 'inactive'
    }
}

async function dock() {
    const action = { device: { id: props.device.id }, actionName: 'dock' }
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            props.device.state.status = 'docked'
        }
        loading.value = false
    } else {
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