<template>
    <v-dialog v-model="dialog" width="50%">
        <template v-slot:activator="{ props }">
            <AddBtn :activator="props" />
        </template>
        <v-card>
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
                        <ImageSelect :items="categories" label="Category*" :selectedItem="selectedCategory"
                            @update="(updatedValue) => selectedCategory = updatedValue" />
                    </v-row>
                </v-container>
                <small v-if="showRequired" class="required">*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                    Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="handleSave">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import ImageSelect from './ImageSelect.vue';
import AddBtn from '../AddBtn.vue';

const dialog = ref(false)

const showRequired = ref(false)

const selectedCategory = ref('')

const deviceName = ref('')

const emit = defineEmits(['addDevice']);

function handleSave() {
    if (selectedCategory.value === '' || deviceName.value === '') {
        showRequired.value = true;
        return;
    }
    showRequired.value = false;
    const device = {
        name: deviceName.value,
        category: selectedCategory.value
    }
    emit('addDevice', device);
    selectedCategory.value = ''
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