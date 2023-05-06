<template>
    <v-card class="ma-2 pa-0 pb-3">
        <v-card-title>
            <v-row align="center">
                <v-col cols="2" align="center" justify-content="center">
                    <v-img :src="device.category.img" alt="categoryImg" contain  />
                </v-col>
                <v-col cols="8">
                    <v-row justify="center">
                        <v-btn class="square-btn" variant="text" @click="editName">
                            <v-icon icon="mdi-pencil" size="40px" />
                        </v-btn>
                        <v-card-title class="text-h5">{{ device.name }}</v-card-title>
                        <v-btn class="square-btn" v-model="device.favorite" @click="toggleButtonFavorite" toggle
                            :ripple="false" size="large" variant="text" :loading="loadingFav" rounded="xl">
                            <img :src="favoriteBtnImg" alt="fav button" />
                        </v-btn>
                    </v-row>
                </v-col>
                <v-col cols="2" justify="center">
                    <v-btn class="square-btn" variant="text" @click="deleteDevice">
                        <v-icon icon="mdi-delete" size="40px" />
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text class="pt-0 pb-4">
            <DevicesOptions :disabled="disabled" :device="device" :loadingState="loadingState"
                @changeState="toggleButtonState" />
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

import favoriteYes from '@/assets/favoriteYes.svg'
import favoriteNo from '@/assets/favoriteNo.svg'
import DevicesOptions from '@/components/devices/DevicesOptions.vue';
import { DeviceApi } from "@/api/device";
import { useDeviceStore } from '@/stores/deviceStore';
import { onMounted } from 'vue';

const deviceStore = useDeviceStore();

onMounted(() => {
    deviceStore.fetchDevice(device.id);
})

const loadingFav = ref(false);

const disabled = computed(() => device.state.status === 'off' ? true : false);

const favoriteBtnImg = computed(() => {
    return device.favorite ? favoriteYes : favoriteNo;
})

async function toggleButtonFavorite() {
    loadingFav.value = true
    if (await DeviceApi.toggleFavorite(device)) {
        device.favorite = !device.favorite
    }
    loadingFav.value = false
}

const { device, loadingState } = defineProps({
    device: Object,
    loadingState: Boolean,
})

const emit = defineEmits(['changeState', 'delete'])

function deleteDevice() {
    emit('delete')
}

function editName(){
    
}

function toggleButtonState() {
    emit('changeState')
}

</script>
<style scoped>
.square-btn {
    min-width: 50px;
    max-width: 50px;
    width: 50px;
    height: 50px;
    margin-right: 15px;
}
</style>