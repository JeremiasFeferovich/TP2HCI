<template>
    <v-card class="pa-2">
        <v-card-title align="center">
            <span class="text-h5">
                {{ message }}
            </span>
        </v-card-title>
        <v-card-actions class="d-flex justify-end pt-4">
            <v-btn size="large" color="blue-darken-1" variant="text" @click="emit('cancelAction')">
                Cancelar
            </v-btn>
            <v-btn type="submit" size="large" color="blue-darken-1" variant="flat" @click="emit('confirmAction')">
                Eliminar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>

const emit = defineEmits(['cancelAction', 'confirmAction'])

const props = defineProps({
    message: String
})

</script>