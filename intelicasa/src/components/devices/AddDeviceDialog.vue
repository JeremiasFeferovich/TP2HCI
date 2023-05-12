<template>
    <v-dialog v-model="dialog" width="50%">
        <template v-slot:activator="{ props }">
            <AddBtn :activator="props" />
        </template>
        <v-card align="center">
            <v-card-title>
                <v-container>
                    <span class="text-h5">{{ objectTitle }}</span>
                </v-container>
            </v-card-title>
            <v-form @submit.prevent validate-on="input" ref="newDeviceForm">
                <v-card-text>
                    <v-container class="fill-space">
                        <v-row>
                            <v-text-field :rules="nameRules" label="Device name*" v-model="deviceName" />
                        </v-row>
                        <v-row>
                            <ImageSelect :rules="categoryRules" :items="categories"
                                @update:selected-item="(item) => selectedCategory = item" label="Tipo*" />
                        </v-row>
                        <v-row class="mt-5">
                            <ImageSelect
                                :items="rooms.concat({ name: 'Nueva habitacion', id: 'new', img: roomStore.roomTypeImg['Otro'] })"
                                @update:selected-item="(item) => handleRoomSelection(item)" label="Habitación"
                                :initial-item="selectedRoom" />
                            <v-dialog v-model="roomDialog" width="1024">
                                <AddRoomInfo @close-dialog="() => handleCloseAddRoom()"
                                    @roomCreated="(room) => handleRoomCreated(room)" />
                            </v-dialog>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <CloseAndSaveBtns @closeDialog="dialog = false" @handleSave="validateForm($refs.newDeviceForm)" />
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import ImageSelect from '@/components/ImageSelect.vue';
import AddBtn from '../AddBtn.vue';
import CloseAndSaveBtns from '../CloseAndSaveBtns.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { useRoomStore } from '@/stores/roomStore';
import AddRoomInfo from '@/components/rooms/AddRoomInfo.vue';

const prop = defineProps({
    objectTitle: String,
    categories: Array
})

const deviceStore = useDeviceStore();
const roomStore = useRoomStore();

const roomDialog = ref(false)

const dialog = ref(false)
const selectedCategory = ref(null)
const selectedRoom = ref(null)
const deviceName = ref('')

const newDeviceForm = ref(null)

const rooms = computed(() => roomStore.rooms.map(x => ({ name: x.name, id: x.id, img: roomStore.roomTypeImg[x.meta.type] })))

const nameRules = [(v) => !!v || 'El nombre es requerido',
(v) => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
(v) => (v && v.length <= 15) || 'El nombre debe tener menos de 15 caracteres',
(v) => /^[a-zA-Z0-9_ ]*$/.test(v) || 'El nombre solo puede contener letras, números, espacios y _',
(v) => !deviceStore.devices.some(device => device.name === v) || 'Ya existe un dispositivo con ese nombre']


const categoryRules = [(v) => !!v || 'La categoría es requerida']

watch(dialog, (value) => {
    if (!value) {
        selectedCategory.value = null
        deviceName.value = ''
    }
})

async function validateForm(form) {
    const result = await form.validate()
    if (result.valid) {
        handleSave()
    }
}

async function handleSave() {
    const device = {
        name: deviceName.value,
        category: selectedCategory.value
    }
    const newDevice = await deviceStore.addDevice(device);
    if (selectedRoom.value) {
        await roomStore.addDeviceToRoom(selectedRoom.value.id, newDevice)
    }
    selectedRoom.value = null
    selectedCategory.value = null
    deviceName.value = ''
    dialog.value = false
}

function handleRoomSelection(item) {
    if (item.id === 'new') {
        roomDialog.value = true
    } else {
        selectedRoom.value = item
    }
}

function handleCloseAddRoom() {
    if (roomDialog.value) {
        roomDialog.value = false
        selectedRoom.value = null
    }
}

function handleRoomCreated(room) {
    selectedRoom.value = rooms.value.find(x => x.id === room.id)
    roomDialog.value = false
}


</script>


<style scoped>
.fill-space {
    max-width: 60%;
}

.required {
    color: red;
}
</style>