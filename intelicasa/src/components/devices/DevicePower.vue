<template>
    <v-row v-if="device.category !== 'blinds'" align="center">
        <v-col cols="1"><v-spacer></v-spacer></v-col>
        <v-col cols="5" align="start">
            <p class="text-h6">Estado</p>
        </v-col>
        <v-col cols="6" align="center">
            <v-btn v-model="isOn" @click="changeState" toggle :ripple="false" size="large" variant="plain"
                :loading="loadingState" rounded="xl">
                <img :src="powerBtnImg" alt="powerState" />
            </v-btn>
        </v-col>
    </v-row>
</template>

<script setup>

import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'
import { computed, ref } from 'vue';

const isOn = ref(props.device.state.status)

const props = defineProps({
    device: Object,
    loadingState: Boolean,
})

const emit = defineEmits(['changeState']);

function changeState() {
    emit('changeState')
}

const powerBtnImg = computed(() => {
    return props.device.state.status === 'on' ? powerOn : powerOff;
})

</script>