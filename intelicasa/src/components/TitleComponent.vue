<script setup>

const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

</script>

<template>
    <v-sheet elevation="4" rounded>
        <p class="text-h3">{{ props.title }}</p>
    </v-sheet>
</template>

<style scoped>
.v-sheet {       
    margin-top: 35px;
    border-radius: 10px;
    width: 75%;
    height: 80px;
    margin: 0 auto;
    padding: 25px 25px;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
</style>
