<template>
    <v-card class="ma-2 pa-0 pb-3">
        <v-card-title>
            <v-row align="center">
                <v-col cols="3">
                    <img :src="categoryImg" alt="categoryImg" style="max-height: 100%; max-width: 100%;" />
                </v-col>
                <v-col cols="6" class="text-center" align-self="center">
                    <v-card-title class="text-h5">{{ device.name }}</v-card-title>
                </v-col>
                <v-col cols="2">
                    <v-btn class="square-btn" v-model="device.favorite" @click="toggleButtonFavorite" toggle :ripple="false"
                        size="large" variant="plain" :loading="loadingFav" rounded="xl">
                        <img :src="favoriteBtnImg" alt="fav button" />
                    </v-btn>
                </v-col>
                <v-col cols="1">
                    <v-btn class="square-btn" variant="text" @click="$emit('delete')">
                        <v-icon icon="mdi-delete" size="40px">

                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <DevicesOptions :disabled="!device.isOn" :device="device" :loadingState="loadingState"
                @changeState="changeState" />
            <v-row justify="end" class="mr-1">
                <v-btn icon="mdi-delete" variant="text" @click="delete"></v-btn>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

import favoriteYes from '@/assets/favoriteYes.svg'
import favoriteNo from '@/assets/favoriteNo.svg'
import DevicesOptions from '@/components/devices/DevicesOptions.vue';

const loadingFav = ref(false);

const favoriteBtnImg = computed(() => {
    return device.favorite ? favoriteYes : favoriteNo;
})

function toggleButtonFavorite() {
    loadingFav.value = true
    setTimeout(() => (loadingFav.value = false), 500)
    device.favorite = !device.favorite;
}

const { device, loadingState } = defineProps({
    device: Object,
    loadingState: Boolean,
    categoryImg: String,
})

const emit = defineEmits(['changeState', 'delete'])

function deleteDevice() {
    emit('delete')
}

function toggleButtonState() {
    emit('changeState')
}

</script>
<style scoped>
.square-btn {
    min-width: 30px;
    max-width: 30px;
    width: 30px;
    height: 30px;
    margin-right: 15px;
}
</style>