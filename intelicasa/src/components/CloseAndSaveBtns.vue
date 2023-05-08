<template>
    <v-btn size="large" color="blue-darken-1" variant="text" @click="closeDialog">
        cerrar
    </v-btn>
    <v-btn size="large" color="blue-darken-1" variant="flat" @click="handleSave">
        guardar
    </v-btn>
</template>

<script setup>

const emit = defineEmits(['closeDialog', 'handleSave'])

function closeDialog() {
    emit('closeDialog')
}

function handleSave() {
    emit('handleSave')
}




</script>
