<template>
    <v-select :disabled="disabled" v-model="localSelectedItem" return-object variant="outlined" :items="items"
        :label="props.label" hide-details="auto" auto item-title="name" hide-selected
        :menu-props="{ closeOnContentClick: true, }">
        <template v-slot:selection="{ item, index }">
            <v-row no-gutters align="center">
                <v-img :src="item.raw.img" :alt="item.raw.name" contain height="40px" width="40px" />
                <p class="text-h6 ml-5">{{ item.raw.name }}</p>
            </v-row>
        </template>
        <template v-slot:item="{ item }" >
            <v-list-item @click="updateSelectedItem(item)">
                <v-row no-gutters align="center">
                    <v-img :src="item.raw.img" :alt="item.raw.name" contain max-height="40px" max-width="40px" />
                    <p class="text-h6 ml-5">{{ item.raw.name }}</p>
                </v-row>
            </v-list-item>
        </template>
        <template v-slot:no-data v-if="showSelectedOnly">
            <p class="text-body1 py-2" align="center">No hay mas opciones disponibles</p>
        </template>
    </v-select>
</template>
  
<script setup>
import { ref, computed, watch } from 'vue';

const localSelectedItem = ref(props.initialItem);
const selectedItem = computed(()=>props.initialItem);

watch(selectedItem, (newVal) => {
    if (!props.ignoreInitialItemChanges) localSelectedItem.value = newVal;
})

const showSelectedOnly = computed(() => props.items.length === 1 && localSelectedItem.value === props.items[0])

const props = defineProps({
    items: Array,
    label: String,
    disabled: Boolean,
    initialItem: Object,
    ignoreInitialItemChanges: Boolean
});

const emit = defineEmits(['update:selectedItem']);

function updateSelectedItem(item) {
    localSelectedItem.value = item.value;
    emit('update:selectedItem', localSelectedItem.value);
}


</script>

<style scoped></style>