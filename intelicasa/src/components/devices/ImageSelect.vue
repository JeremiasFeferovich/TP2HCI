<template>
    <v-select :disabled="disabled" v-model="selectedItem" return-object variant="outlined" :items="items"
        :label="props.label" hide-details auto item-title="name" hide-selected
        :menu-props="{ closeOnContentClick: true, }">
        <template v-slot:selection="{ item, index }">
            <v-row no-gutters align="center">
                <v-img :src="item.raw.img" :alt="item.raw.name" contain height="40px" width="40px" />
                <p class="text-h6 ml-5">{{ item.raw.name }}</p>
            </v-row>
        </template>
        <template v-slot:item="{ item }">
            <v-list-item @click="updateSelectedItem(item)">
                <v-row no-gutters align="center">
                    <v-img :src="item.raw.img" :alt="item.raw.name" contain max-height="40px" max-width="40px" />
                    <p class="text-h6 ml-5">{{ item.raw.name }}</p>
                </v-row>
            </v-list-item>
        </template>
    </v-select>
</template>
  
<script setup>

import { ref } from 'vue';

const selectedItem = ref(props.initialItem);

const props = defineProps({
    items: Array,
    label: String,
    disabled: Boolean,
    initialItem: Object
});

const emit = defineEmits(['update:selectedItem']);

function updateSelectedItem(item) {
    selectedItem.value = item.value;
    emit('update:selectedItem', selectedItem.value);
}


</script>

<style scoped></style>