<script setup>


const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

</script>

<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mt-5 mx-auto" elevation="4" height="80px"
        rounded max-width="30%" margin-bottom="20px">
        <p class="text-h3">{{ props.title }}</p>
    </v-sheet>
</template>

<style scoped></style>
