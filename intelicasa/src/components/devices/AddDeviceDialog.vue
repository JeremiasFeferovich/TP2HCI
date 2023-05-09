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
                        <v-row >
                            <v-text-field :rules="nameRules" label="Device name*" v-model="deviceName" />
                        </v-row>
                        <v-row>
                            <ImageSelect :rules="categoryRules" :items="categories"
                                @update:selected-item="(item) => selectedCategory = item" label="Tipo*" />
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
import { ref, watch } from 'vue'
import ImageSelect from './ImageSelect.vue';
import AddBtn from '../AddBtn.vue';
import CloseAndSaveBtns from '../CloseAndSaveBtns.vue';
import { useDeviceStore } from '@/stores/deviceStore';

const deviceStore = useDeviceStore();

const dialog = ref(false)
const selectedCategory = ref(null)
const deviceName = ref('')

const newDeviceForm = ref(null)

const nameRules = [(v) => !!v || 'El nombre es requerido',
(v) => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
(v) => (v && v.length <= 60) || 'El nombre debe tener menos de 60 caracteres',
(v) => /^[a-zA-Z0-9_ ]*$/.test(v) || 'El nombre solo puede contener letras, números, espacios y _']


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
    deviceStore.addDevice(device);
    selectedCategory.value = null
    deviceName.value = ''
    dialog.value = false
}

const prop = defineProps({
    objectTitle: String,
    categories: Array
})
</script>


<style scoped>
.fill-space {
    max-width: 60%;
}

.required {
    color: red;
}
</style>