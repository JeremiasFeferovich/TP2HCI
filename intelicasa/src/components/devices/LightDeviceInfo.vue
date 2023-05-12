<template>
    <v-row align="center" justify="space-evenly">
        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" align="start">
            <p class="text-h6">Intensidad</p>
        </v-col>
        <v-col cols="6" align="center">
            <v-sheet width="90%">
                <v-slider :disabled="disabled || loading" hide-details v-model="localIntensity" step="1"
                    @end="updateIntensity" thumb-label />
            </v-sheet>
        </v-col>
    </v-row>
    <v-row align="center">
        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" align="start">
            <p class="text-h6">Color</p>
        </v-col>
        <v-col cols="6" align="center">
            <v-btn :disabled="disabled || loading" class="square-btn rounded-circle" variant="outlined"
                @click="showColorPicker = true" :style="{ backgroundColor: color }"></v-btn>
            <v-dialog class="ma-0" v-model="showColorPicker" width="auto" align="centers">
                <v-color-picker :disabled="loading" v-model="localColor" hide-inputs @update:model-value="updateColor"
                    class="ma-0 px-2 pt-2" mode="hex" />
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, computed, onUnmounted, onMounted, defineEmits, onBeforeUnmount } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { watch } from 'vue';

const props = defineProps({
    device: Object,
    disabled: Boolean,
    returnAction: Boolean
})

const deviceStore = useDeviceStore();

const showColorPicker = ref(false);

const loading = ref(false);

const localIntensity = ref(props.device.state.brightness)
const localColor = ref(props.device.state.color)

const intensity = computed(() => deviceStore.getDevice(props.device.id).state.brightness)
const color = computed(() => deviceStore.getDevice(props.device.id).state.color)

watch(intensity, (newVal) => {
    if (!props.returnAction) localIntensity.value = newVal;
})

watch(color, (newVal) => {
    if (!props.returnAction) localColor.value = newVal;
})


const updateTimeout = ref(null);

const emit = defineEmits(['actionSet']);

onMounted(() => {
    if (props.returnAction) {
        emit('actionSet', { device: { id: props.device.id }, actionName: 'setBrightness', params: [localIntensity.value] })
        emit('actionSet', { device: { id: props.device.id }, actionName: 'setColor', params: [localColor.value] })
    }
})

onUnmounted(() => {
    if (props.returnAction) {
        emit('actionSet', { device: { id: props.device.id }, actionName: 'setBrightness', params: [localIntensity.value] })
        emit('actionSet', { device: { id: props.device.id }, actionName: 'setColor', params: [localColor.value] })
    }
})

async function updateColor() {
    const action = { device: { id: props.device.id }, actionName: 'setColor', params: [localColor.value] }
    clearTimeout(updateTimeout.value);
    updateTimeout.value = setTimeout(async () => {
        if (!props.returnAction) {
            loading.value = true;
            await deviceStore.triggerEvent(action)
            loading.value = false;
        }
    }, 250); // wait for 250ms before sending the request
}

async function updateIntensity() {
    const action = { device: { id: props.device.id }, actionName: 'setBrightness', params: [localIntensity.value] }
    if (!props.returnAction) {
        loading.value = true
        await deviceStore.triggerEvent(action)
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
</style>