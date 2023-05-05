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
            <v-card-text>
                <v-container class="fill-space">
                    <v-row>
                        <v-text-field label="Device name*" v-model="deviceName" />
                    </v-row>
                    <v-row>
                        <ImageSelect :items="categories" @update:selected-item="(item) => selectedCategory=item" label="Tipo" />
                    </v-row>
                </v-container>
                <small v-if="showRequired" class="required">*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <CloseAndSaveBtns @closeDialog="dialog = false" @handleSave="handleSave" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import ImageSelect from './ImageSelect.vue';
import AddBtn from '../AddBtn.vue';
import CloseAndSaveBtns from '../CloseAndSaveBtns.vue';
import { useDeviceStore } from '@/stores/deviceStore';

const deviceStore = useDeviceStore();

const dialog = ref(false)
const showRequired = ref(false)
const selectedCategory = ref(null)
const deviceName = ref('')

function handleSave() {
    if (selectedCategory.value === '' || deviceName.value === '') {
        showRequired.value = true;
        return;
    }
    showRequired.value = false;
    console.log(selectedCategory.value)
    const device = {
        name: deviceName.value,
        category: selectedCategory.value
    }
    console.log(device)
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