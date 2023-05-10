<template>
    <v-card class="ma-2 pa-0 pb-3">
        <v-row class="title" align="center">
            <v-col cols="2" align="center" justify-content="center">
                <v-img class="categoryImg" :src="device.meta.category.img" alt="categoryImg" contain />
            </v-col>
            <v-col cols="8">
                <v-row justify="center">
                    <v-btn class="square-btn" v-model="device.meta.favorite" @click="toggleButtonFavorite" toggle
                        :ripple="false" size="large" variant="text" :loading="loadingFav" rounded="xl">
                        <img :src="favoriteBtnImg" alt="fav button" />
                    </v-btn>
                    <v-card-title v-if="!editingName" class="text-h5">{{ device.name }}</v-card-title>
                    <v-form v-if="editingName" class="d-flex" @submit.prevent validate-on="input" ref="editDeviceForm">
                        <v-text-field v-model="updatedName" class="editName" :rules="nameRules" variant="outlined"
                            hide-details="auto" @blur="validateForm($refs.editDeviceForm)" />
                        <v-btn class="square-btn" variant="text" @click="validateForm($refs.editDeviceForm)">
                            <v-icon icon="mdi-check" size="20px" />
                        </v-btn>
                    </v-form>
                    <v-btn v-if="!editingName" class="square-btn" variant="text" @click="editingName = true">
                        <v-icon icon="mdi-pencil" size="20px" />
                    </v-btn>
                </v-row>
            </v-col>
            <v-col cols="2" justify="center" align="center">
                <v-btn class="square-btn" variant="text" @click="openDialog = true">
                    <v-icon icon="mdi-delete" size="30px" />
                </v-btn>
            </v-col>
        </v-row>
        <v-divider class="border-opacity-25" color="info"></v-divider>
        <v-card-text class="pt-0 pb-4">
            <DevicesOptions :disabled="disabled" :device="device" :loadingState="loadingState"
                @changeState="toggleButtonState" />
        </v-card-text>
        <v-dialog v-model="openDialog" width="auto">
            <ConfirmationDialog message="¿Estás seguro que deseas eliminar este dispositivo?"
                @cancelAction="openDialog = false" @confirmAction="deleteDevice" />
        </v-dialog>
    </v-card>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';

import favoriteYes from '@/assets/favoriteYes.svg'
import favoriteNo from '@/assets/favoriteNo.svg'
import DevicesOptions from '@/components/devices/DevicesOptions.vue';
import { DeviceApi } from "@/api/device";
import { useDeviceStore } from '@/stores/deviceStore';
import { onMounted } from 'vue';
import ConfirmationDialog from '../ConfirmationDialog.vue';

const deviceStore = useDeviceStore();

onMounted(() => {
    deviceStore.fetchDevice(props.device.id);
})

const loadingFav = ref(false);

const disabled = computed(() => props.device.state.status === 'off' ? true : false);

const editingName = ref(false);
const updatedName = ref(props.device.name);
const editDeviceForm = ref(null)
const openDialog = ref(false)

const nameRules = [(v) => !!v || 'El nombre es requerido',
(v) => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
(v) => (v && v.length <= 60) || 'El nombre debe tener menos de 60 caracteres',
(v) => /^[a-zA-Z0-9_ ]*$/.test(v) || 'El nombre solo puede contener letras, números, espacios y _']


const favoriteBtnImg = computed(() => {
    return props.device.meta.favorite ? favoriteYes : favoriteNo;
})

async function toggleButtonFavorite() {
    loadingFav.value = true
    if (await DeviceApi.toggleFavorite(props.device)) {
        props.device.meta.favorite = !props.device.meta.favorite
    }
    loadingFav.value = false
}

const props = defineProps({
    device: Object,
    loadingState: Boolean,
})

const emit = defineEmits(['changeState', 'delete'])

function deleteDevice() {
    emit('delete')
}

async function validateForm(form) {
    const result = await form.validate()
    if (result.valid) {
        editName()
    }
}


function editName() {
    const updatedDevice = { ...props.device, name: updatedName.value }
    deviceStore.updateDevice(updatedDevice);
    editingName.value = false
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

.categoryImg {
    height: 75px;
}

.title {
    min-height: 80px;
    margin: 0 0;
}

.v-col {
    padding: 0;
}

.editName {
    min-width: 200px;
}
</style>