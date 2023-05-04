<template>
    <div class="add-btn">
        <v-btn color="primary" size="x-large" v-bind="activator">
            <p class="text-h6">AGREGAR</p>
            <v-icon end icon="mdi-plus-circle"></v-icon>
        </v-btn>
    </div>
</template>

<script setup>

const { activator } = defineProps({
    activator: Object
})

</script>

<style scoped>
.add-btn {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: right;
    margin-right: 12.5%;
}
</style>