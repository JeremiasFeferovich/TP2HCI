<template>
    <div class="add-btn">
        <v-dialog v-model="dialog" width="50%">
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props">
                    Add
                    <v-icon end icon="mdi-plus-circle"></v-icon>
                </v-btn>
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
                            <v-text-field label="Device name*" v-model="deviceName" required />
                        </v-row>
                        <v-row>
                            <ImageSelect :items="categories" label="Category*" :selectedItem="selectedCategory"  @update="(updatedValue) => selectedCategory = updatedValue" required/>
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
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ImageSelect from './ImageSelect.vue';

const dialog = ref(false)

const showRequired = ref(false)

const selectedCategory = ref('')

const deviceName = ref('')

function handleSave () {
    if (selectedCategory.value === '' || deviceName.value === '') {
        showRequired.value = true;
        return;
    }
    const device = {
        name: deviceName.value,
        category: selectedCategory.value
    }
    prop.addDevice(device);
    dialog.value = false
}

const prop = defineProps({
    addDevice: Function,
    objectTitle: String,
    categories: Array
})
</script>


<style scoped>
.add-btn {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: right;
    margin-right: 20%;

}

.fill-space {
    max-width: 60%;
}

.required {
    color: red;
}
</style>