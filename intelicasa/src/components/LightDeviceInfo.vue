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
            <v-row align="center" justify="space-evenly">
                <v-card-title>Intensidad</v-card-title>
                <v-sheet width="40%">
                    <v-slider hide-details v-model="device.intensity" thumb-label />
                </v-sheet>
            </v-row>
            <v-row align="center" justify="space-evenly">
                <v-card-title>Color</v-card-title>
                <v-btn class="square-btn rounded-circle" variant="outlined"  @click="showColorPicker = true" :style="{ backgroundColor: device.color }"></v-btn>
                <v-dialog v-model="showColorPicker" width="auto">
                    <v-color-picker v-model="device.color" hide-inputs class="ma-0 px-2 pt-2" mode="hex" />
                </v-dialog>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import powerOn from '@/assets/powerOn.svg';
import powerOff from '@/assets/powerOff.svg'
import favoriteYes from '@/assets/favoriteYes.svg'
import favoriteNo from '@/assets/favoriteNo.svg'
import lightbulb from '@/assets/lightbulb.svg'

const categoryImg = lightbulb;
const loadingFav = ref(false);
const showColorPicker = ref(false);

const { device, toggleButtonState, loadingState } = defineProps({
    device: Object,
    toggleButtonState: Function,
    loadingState: Boolean,
})

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

</script>

<style scoped>
.square-btn {
  min-width: 35px;
  max-width: 35px;
  width: 35px;
  height: 35px;
}
</style>