<template>
    <v-select class="centeredSelect" v-model="props.selectedItem" variant="outlined" :items="items" :label="props.label"
        hide-details auto text-align="center" item-value="name" item-text="name" hide-selected>
        <template v-slot:item="{ item }">
            <v-list-item @click="update(item.name)">
                <v-row no-gutters align="center">
                    <span>{{ item.raw.name }}</span>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-img :src="item.raw.img" :alt="item.raw.name" contain height="40px" width="40px"></v-img>
                </v-row>
            </v-list-item>
        </template>
    </v-select>
</template>
  
<script setup>

const emit = defineEmits(['update'])

function update(selectedItem) {
    emit('update', selectedItem);
}

const props = defineProps({
    items: Array,
    selectedItem: String,
    label: String,
    categories: Array
});

</script>


<style scoped>
.centeredSelect :deep(.v-field__input) {
    justify-content: center;
}
</style>