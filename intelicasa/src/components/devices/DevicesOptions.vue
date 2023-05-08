<template>
    <DevicePower v-show="device.meta.category.name !== 'Puerta' && device.meta.category.name !== 'Aspiradora'"
        :device="device" :loading-state="loadingState" :returnAction="returnAction"
        @actionSet="(action) => emitAction(action)" @changeState="changeState" />
    <LightDeviceInfo :disabled="disabled" v-if="device.meta.category.name === 'Luces'" :device="device"
        :returnAction="returnAction" @actionSet="(action) => emitAction(action)"
        @deviceUpdate="(device) => emitDeviceUpdate(device)" />
    <ACDeviceInfo :disabled="disabled" v-else-if="device.meta.category.name === 'Aire Acondicionado'" :device="device"
        :returnAction="returnAction" @actionSet="(action) => emitAction(action)" />
    <OvenDeviceInfo :disabled="disabled" v-else-if="device.meta.category.name === 'Horno'" :device="device"
        :returnAction="returnAction" @actionSet="(action) => emitAction(action)" />
    <VacuumDeviceInfo v-else-if="device.meta.category.name === 'Aspiradora'" :device="device" :returnAction="returnAction"
        @actionSet="(action) => emitAction(action)" />
    <DoorDeviceInfo v-else-if="device.meta.category.name === 'Puerta'" :device="device" />
</template>

<script setup>
import DevicePower from '@/components/devices/DevicePower.vue';
import LightDeviceInfo from '@/components/devices/LightDeviceInfo.vue';
import ACDeviceInfo from '@/components/devices/ACDeviceInfo.vue';
import OvenDeviceInfo from '@/components/devices/OvenDeviceInfo.vue';
import DoorDeviceInfo from '@/components/devices/DoorDeviceInfo.vue';
import VacuumDeviceInfo from '@/components/devices/VacuumDeviceInfo.vue';

const props = defineProps({
    device: Object,
    disabled: Boolean,
    loadingState: Boolean,
    returnAction: Boolean
})

function emitAction(action) {
    emit('actionSet', action)
}
function emitDeviceUpdate(deviceState) {
    emit('deviceUpdate', deviceState)
}

const emit = defineEmits(['changeState', 'actionSet', 'deviceUpdate']);

function changeState() {
    const deviceState = {
        id: props.device.id,
        name: props.device.name,
        category: props.device.category,
        state: JSON.parse(JSON.stringify(props.device.state))
    }
    emit('deviceUpdate', deviceState)
    emit('changeState')
}


</script>