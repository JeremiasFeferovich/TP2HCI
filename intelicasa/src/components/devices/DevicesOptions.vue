<template>
    <DevicePower v-show="device.category !== 'Persiana'" :device="device" :loading-state="false"
        @changeState="changeState" />
    <LightDeviceInfo :disabled="!device.isOn" v-if="device.category === 'Luces'" :device="device" />
    <ACDeviceInfo :disabled="!device.isOn" v-else-if="device.category === 'Aire Acondicionado'" :device="device" />
    <OvenDeviceInfo :disabled="!device.isOn" v-else-if="device.category === 'Horno'" :device="device" />
    <SpeakerInfo :disabled="!device.isOn" v-else-if="device.category === 'Parlante'" :device="device" />
    <BlindsDeviceInfo v-else-if="device.category === 'Persiana'" :device="device" />
</template>

<script setup>
import DevicePower from '@/components/devices/DevicePower.vue';
import LightDeviceInfo from '@/components/devices/LightDeviceInfo.vue';
import ACDeviceInfo from '@/components/devices/ACDeviceInfo.vue';
import OvenDeviceInfo from '@/components/devices/OvenDeviceInfo.vue';
import SpeakerInfo from '@/components/devices/SpeakerInfo.vue';
import BlindsDeviceInfo from '@/components/devices/BlindsDeviceInfo.vue';

const { device, disabled } = defineProps({
    device: Object,
    disabled: Boolean,
})

const emit = defineEmits(['changeState']);

function changeState() {
    emit('changeState')
}


</script>