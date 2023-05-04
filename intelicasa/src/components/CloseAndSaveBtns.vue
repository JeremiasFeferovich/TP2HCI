<template>
    <v-btn size="x-large" color="blue-darken-1" variant="text" @click="$emit('setDialogFalse')">
        cerrar
    </v-btn>
    <v-btn size="x-large" color="blue-darken-1" variant="flat" @click="$emit('handleSave')">
        guardar
    </v-btn>
</template>
