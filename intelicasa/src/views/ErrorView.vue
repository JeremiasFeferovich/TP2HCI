<template>
    <v-container>
        <h1 class="text-h2">{{ errorMessage + loadingDots }}</h1>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

const loadingDots = ref('.');

setInterval(() => {
    if (loadingDots.value.length < 3) {
        loadingDots.value += '.';
    } else {
        loadingDots.value = '';
    }
}, 500);

const props = defineProps({
    errorMessage: String,
    loading: Boolean
})

</script>
<style scoped>
.v-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
  