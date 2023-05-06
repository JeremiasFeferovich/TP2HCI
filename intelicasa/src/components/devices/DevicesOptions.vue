<template>
    <DevicePower v-show="device.category.name !== 'Persiana'" :device="device" :loading-state="loadingState"
        @changeState="changeState" />
    <LightDeviceInfo :disabled="disabled" v-if="device.category.name === 'Luces'" :device="device" :returnAction="returnAction" @actionSet="(action) => emitAction(action)"/>
    <ACDeviceInfo :disabled="disabled" v-else-if="device.category.name === 'Aire Acondicionado'" :device="device" />
    <OvenDeviceInfo :disabled="disabled" v-else-if="device.category.name === 'Horno'" :device="device" />
    <SpeakerInfo :disabled="disabled" v-else-if="device.category.name === 'Parlante'" :device="device" />
    <BlindsDeviceInfo v-else-if="device.category.name === 'Persiana'" :device="device" />
</template>

<script setup>
import DevicePower from '@/components/devices/DevicePower.vue';
import LightDeviceInfo from '@/components/devices/LightDeviceInfo.vue';
import ACDeviceInfo from '@/components/devices/ACDeviceInfo.vue';
import OvenDeviceInfo from '@/components/devices/OvenDeviceInfo.vue';
import SpeakerInfo from '@/components/devices/SpeakerInfo.vue';
import BlindsDeviceInfo from '@/components/devices/BlindsDeviceInfo.vue';

const props= defineProps({
    device: Object,
    disabled: Boolean,
    loadingState: Boolean,
    returnAction: Boolean
})

function emitAction(action) {
    emit('actionSet', action)
}

const emit = defineEmits(['changeState', 'actionSet']);

function changeState() {
    emit('changeState')
}


</script>