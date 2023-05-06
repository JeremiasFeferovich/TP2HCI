<template>
    <v-select class="mt-3"
        :label="props.label"
        :items="devices" 
        :menu-props="{ closeOnContentClick: true }"
        item-title="name" 
        return-object 
        v-model="selectedDevice" 
        variant="outlined" 
        hide-details auto hide-selected>
            <template v-slot:selection="{item}"> 
                <v-row no-gutters align="center">
                    <p class="text-h6 ml-5">{{ item.value.name }}</p>
                </v-row>
            </template>
            <template v-slot:item="{item}"> 
                <v-list-item @click="updateSelectedItem(item)">
                    <v-row no-gutters align="center">
                        <p class="text-h6 ml-5">{{ item.value.name }}</p>
                    </v-row>
                </v-list-item>
            </template>
    </v-select>
</template>

<script setup>
    import { ref } from 'vue';

    const selectedDevice = ref(null);

    const props = defineProps({
        devices: Array,
        label: String,
    });

    const emit = defineEmits(['update:selectedDevice']);

    function updateSelectedItem(item) {
        selectedDevice.value = item.value;
        emit('update:selectedDevice', selectedDevice.value);
    }
</script>