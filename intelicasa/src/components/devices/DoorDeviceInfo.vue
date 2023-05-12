<template>
    <v-row justify="space-evenly" class="mt-3">
        <v-btn :disabled="localLock === 'locked' || loading" class="d-flex" @click="setDoorState">
            <v-col justify="center" align="center">
                <v-icon class="mb-2" :icon="doorImg" size="45" />
                <span class="button">{{ doorText }}</span>
            </v-col>
        </v-btn>
        <v-btn :disabled="localStatus === 'opened' || loading" class="d-flex" @click="setLockState">
            <v-col justify="center" align="center">
                <v-icon class="mb-2" :icon="lockImg" size="45" />
                <span class="button">{{ lockText }}</span>
            </v-col>
        </v-btn>
    </v-row>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

const props = defineProps({
    device: Object,
    disabled: Boolean,
    returnAction: Boolean
})

const deviceStore = useDeviceStore()

const localStatus = ref(props.device.state.status)
const localLock = ref(props.device.state.lock)

const status = computed(() => deviceStore.getDevice(props.device.id).state.status)
const lock = computed(() => deviceStore.getDevice(props.device.id).state.lock)

watch(status, (newVal) => {
    if (!props.returnAction) localStatus.value = newVal;
})

watch(lock, (newVal) => {
    if (!props.returnAction) localLock.value = newVal;
})

const loading = ref(false)

const doorImg = computed(() => {
    if (localStatus.value === "closed") {
        return "mdi-door-closed"
    } else {
        return "mdi-door-open"
    }
})

const doorText = computed(() => {
    if (localStatus.value === "closed") {
        return "Abrir"
    } else {
        return "Cerrar"
    }
})

const lockImg = computed(() => {
    if (localLock.value === "locked") {
        return "mdi-lock-outline"
    } else {
        return "mdi-lock-open-outline"
    }
})

const lockText = computed(() => {
    if (localLock.value === "locked") {
        return "Desbloquear"
    } else {
        return "Bloquear"
    }
})

const emit = defineEmits(['actionSet']);

onMounted(() => {
    if (props.returnAction) {
        emit('actionSet', { device: { id: props.device.id }, actionName: localStatus.value === "opened" ? "open" : "close", params: [] })
        emit('actionSet', { device: { id: props.device.id }, actionName: localLock.value === "locked" ? "lock" : "unlock", params: [] })
    }
})

async function setDoorState() {
    const action = { device: { id: props.device.id }, actionName: localStatus.value === "opened" ? "close" : "open", params: [] }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    } else {
        emit('actionSet', action)
        localStatus.value = localStatus.value === "opened" ? "closed" : "opened";
    }
}

async function setLockState() {
    const action = { device: { id: props.device.id }, actionName: localLock.value === "locked" ? "unlock" : "lock", params: [] }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    } else {
        emit('actionSet', action)
        localLock.value = localLock.value === "locked" ? "unlocked" : "locked";
    }
}

</script>

<style scoped>
.v-btn {
    flex-wrap: wrap;
    display: flex;
    height: 100%;
    width: 30%;
}

.v-icon {
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>