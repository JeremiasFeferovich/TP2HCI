<template>
    <v-row align="center">
        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" align="start">
            <p class="text-h6">Estado</p>
        </v-col>
        <v-col cols="6" align="center">
            <v-btn @click="changeState" toggle size="large" variant="text" class="square-btn rounded-circle"
                :loading="loadingState">
                <img :src="powerBtnImg" alt="powerState" />
            </v-btn>
        </v-col>
    </v-row>
</template>

<script setup>

import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'
import { computed, ref, onBeforeUnmount } from 'vue';

const props = defineProps({
    device: Object,
    loadingState: Boolean,
    returnAction: Boolean
})

const emit = defineEmits(['changeState', 'actionSet']);

onBeforeUnmount(() => {
    emit('actionSet', { device: { id: props.device.id }, actionName: props.device.state.status === 'on' ? 'turnOn' : 'turnOff', params: [] })
})

function changeState() {
    if (props.returnAction) {
        emit('actionSet', { device: { id: props.device.id }, actionName: props.device.state.status === 'on' ? 'turnOff' : 'turnOn', params: [] })
    }
    emit('changeState')
}

const powerBtnImg = computed(() => {
    return props.device.state.status === 'on' ? powerOn : powerOff;
})

</script>

<style scoped>
.square-btn {
    min-width: 45px;
    max-width: 45px;
    padding: 0;
    width: 45px;
    height: 45px;
}
</style>