<template>
    <v-row justify="space-evenly" class="mt-3">
        <v-btn :disabled="device.state.lock === 'locked' || loading" class="d-flex" @click="setDoorState">
            <v-col justify="center" align="center">
                <v-icon class="mb-2" :icon="doorImg" size="45" />
                <span class="button">{{ doorText }}</span>
            </v-col>
        </v-btn>
        <v-btn :disabled="device.state.status === 'opened' || loading" class="d-flex" @click="setLockState">
            <v-col justify="center" align="center">
                <v-icon class="mb-2" :icon="lockImg" size="45" />
                <span class="button">{{ lockText }}</span>
            </v-col>
        </v-btn>
    </v-row>
</template>

<script setup>
import { ref, computed, onUnmounted, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

const props = defineProps({
    device: Object,
    disabled: Boolean,
    returnAction: Boolean
})

const deviceStore = useDeviceStore()

const loading = ref(false)

const doorImg = computed(() => {
    if (props.device.state.status === "closed") {
        return "mdi-door-closed"
    } else {
        return "mdi-door-open"
    }
})

const doorText = computed(() => {
    if (props.device.state.status === "closed") {
        return "Abrir"
    } else {
        return "Cerrar"
    }
})

const lockImg = computed(() => {
    if (props.device.state.lock === "locked") {
        return "mdi-lock-outline"
    } else {
        return "mdi-lock-open-outline"
    }
})

const lockText = computed(() => {
    if (props.device.state.lock === "locked") {
        return "Desbloquear"
    } else {
        return "Bloquear"
    }
})

const emit = defineEmits(['actionSet']);

onMounted(() => {
    if (props.returnAction) {
        emit('actionSet', { device: { id: props.device.id }, actionName: props.device.state.status === "opened" ? "close" : "open", params: [] })
        emit('actionSet', { device: { id: props.device.id }, actionName: props.device.state.lock === "locked" ? "unlock" : "lock", params: [] })
    }
})

onUnmounted(() => {
    if (props.returnAction) {
        emit('actionSet', { device: { id: props.device.id }, actionName: props.device.state.status === "opened" ? "close" : "open", params: [] })
        emit('actionSet', { device: { id: props.device.id }, actionName: props.device.state.lock === "locked" ? "unlock" : "lock", params: [] })
    }
})



async function setDoorState() {
    const action = { device: { id: props.device.id }, actionName: props.device.state.status === "opened" ? "close" : "open", params: [] }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    } else {
        props.device.state.status = props.device.state.status === "opened" ? "closed" : "opened";
    }
}

async function setLockState() {
    const action = { device: { id: props.device.id }, actionName: props.device.state.lock === "locked" ? "unlock" : "lock", params: [] }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
        loading.value = false
    } else {
        props.device.state.lock = props.device.state.lock === "locked" ? "unlocked" : "locked";
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