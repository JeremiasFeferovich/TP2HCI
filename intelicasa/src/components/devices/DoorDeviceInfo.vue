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
import { ref, computed, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

import mopMode from '@/assets/vacuum/mopMode.png';
import vacuumMode from '@/assets/vacuum/vacuumMode.png';

import livingRoom from '@/assets/living.svg';

const modeItems = ref([
    { name: 'Aspirar', value: 'vacuum', img: vacuumMode },
    { name: 'Trapear', value: 'mop', img: mopMode }])


const deviceState = {
    id: props.device.id,
    name: props.device.name,
    category: props.device.meta.category,
    state: JSON.parse(JSON.stringify(props.device.state))
}

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

const emit = defineEmits(['actionSet', 'deviceUpdate']);

onMounted(() => {
    emit('deviceUpdate', deviceState)
    emit('actionSet', { device: { id: props.device.id }, actionName: props.device.state.status === "opened" ? "close" : "open" })
    emit('actionSet', { device: { id: props.device.id }, actionName: props.device.state.lock === "locked" ? "unlock" : "lock" })
})

async function setDoorState() {
    const action = { device: { id: props.device.id }, actionName: props.device.state.status === "opened" ? "close" : "open" }
    emit('actionSet', action)
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            props.device.state.status = props.device.state.status === "opened" ? "closed" : "opened";
        }
        loading.value = false
    }
}

async function setLockState() {
    const action = { device: { id: props.device.id }, actionName: props.device.state.lock === "locked" ? "unlock" : "lock" }
    emit('actionSet', action)
    if (!props.returnAction) {
        loading.value = true
        if (await deviceStore.triggerEvent(action)) {
            props.device.state.lock = props.device.state.lock === "locked" ? "unlocked" : "locked";
        }
        loading.value = false
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