<template>
    <DevicePower v-show="device.category !== 'Persiana'" :device="device" :loading-state="false"
        @changeState="$emit('changeState')" />
    <LightDeviceInfo :disabled="!device.isOn" v-if="device.category === 'Luces'" :device="device" />
    <ACDeviceInfo :disabled="!device.isOn" v-else-if="device.category === 'Aire Acondicionado'" :device="device" />
    <OvenDeviceInfo :disabled="!device.isOn" v-else-if="device.category === 'Horno'" :device="device" />
    <SpeakerInfo :disabled="!device.isOn" v-else-if="device.category === 'Parlante'" :device="device" />
    <BlindsDeviceInfo v-else-if="device.category === 'Persiana'" :device="device" />
</template>

<script setup>
import DevicePower from './devices/DevicePower.vue';
import LightDeviceInfo from './devices/LightDeviceInfo.vue';
import ACDeviceInfo from './devices/ACDeviceInfo.vue';
import OvenDeviceInfo from './devices/OvenDeviceInfo.vue';
import SpeakerInfo from './devices/SpeakerInfo.vue';
import BlindsDeviceInfo from './devices/BlindsDeviceInfo.vue';
import { ref } from 'vue';

const { device, disabled, loadingState } = defineProps({
    device: Object,
    disabled: Boolean,
    loadingState: Boolean,

})




</script>