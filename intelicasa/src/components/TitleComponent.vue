<script setup>

import { defineProps } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

</script>

<template>
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mt-5 mx-auto"
    elevation="4"
    height="100"
    rounded
    max-width="50%"
    width="100%"
  >
      <h3 class="text-h3 font-weight-black">{{ props.title }}</h3>
  </v-sheet>
</template>

<style scoped>

</style>
