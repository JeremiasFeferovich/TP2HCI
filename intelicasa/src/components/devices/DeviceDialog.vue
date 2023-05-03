<template>
    <v-card class="ma-2 pa-0 pb-3">
        <v-card-title>
            <v-row align="center">
                <v-col cols="3">
                    <img :src="categoryImg" alt="categoryImg" style="max-height: 100%; max-width: 100%;" />
                </v-col>
                <v-col cols="6" class="text-center" align-self="center">
                    <v-card-title>{{ device.name }}</v-card-title>
                </v-col>
                <v-col cols="3">
                    <v-btn v-model="device.favorite" @click="toggleButtonFavorite" toggle :ripple="false" size="large"
                        variant="plain" :loading="loadingFav" rounded="xl">
                        <img :src="favoriteBtnImg" alt="fav button" />
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <v-row align="center" justify="space-evenly">
                <v-card-title>Estado</v-card-title>
                <v-btn v-model="device.isOn" @click="toggleButtonState" toggle :ripple="false" size="large" variant="plain"
                    :loading="loadingState" rounded="xl">
                    <img :src="powerBtnImg" alt="powerState" />
                </v-btn>
            </v-row>
            <LightDeviceInfo v-if="device.category === 'light'" :device="device" />
            <ACDeviceInfo v-else-if="device.category === 'airConditioner'" :device="device" />
            <OvenDeviceInfo v-else-if="device.category === 'oven'" :device="device" />
            <SpeakerInfo v-else-if="device.category === 'speaker'" :device="device" />
        </v-card-text>

    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

import lightbulb from '@/assets/lightbulb.svg'
import speaker from '@/assets/speaker.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'

import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'
import favoriteYes from '@/assets/favoriteYes.svg'
import favoriteNo from '@/assets/favoriteNo.svg'

import LightDeviceInfo from './LightDeviceInfo.vue';
import OvenDeviceInfo from './OvenDeviceInfo.vue';
import ACDeviceInfo from './ACDeviceInfo.vue';
import SpeakerInfo from './SpeakerInfo.vue';

const loadingFav = ref(false);

const categoryImg = computed(() => {
    switch (device.category) {
        case 'light':
            return lightbulb;
        case 'oven':
            return oven;
        case 'speaker':
            return speaker;
        case 'airConditioner':
            return airConditioner;
        default:
            return lightbulb;
    }
});

const powerBtnImg = computed(() => {
    return device.isOn ? powerOn : powerOff;
})

const favoriteBtnImg = computed(() => {
    return device.favorite ? favoriteYes : favoriteNo;
})

function toggleButtonFavorite() {
    loadingFav.value = true
    setTimeout(() => (loadingFav.value = false), 500)
    device.favorite = !device.favorite;
}

const { device, toggleButtonState, loadingState } = defineProps({
    device: Object,
    toggleButtonState: Function,
    loadingState: Boolean,
})

</script>