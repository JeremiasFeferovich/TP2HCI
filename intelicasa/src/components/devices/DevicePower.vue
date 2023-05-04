<template>
    <v-row v-if="device.category !== 'blinds'" align="center" justify="space-evenly">
        <v-card-title>Estado</v-card-title>
        <v-btn v-model="device.isOn" @click="$emit('changeState')" toggle :ripple="false" size="large" variant="plain"
            :loading="loadingState" rounded="xl">
            <img :src="powerBtnImg" alt="powerState" />
        </v-btn>
    </v-row>
</template>

<script setup>

import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'
import { computed } from 'vue';

const props = defineProps({
    device: Object,
    loadingState: Boolean,
})

const powerBtnImg = computed(() => {
    return props.device.isOn ? powerOn : powerOff;
})

</script>