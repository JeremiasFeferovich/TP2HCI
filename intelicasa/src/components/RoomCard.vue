<template>
    <v-card id="room-card"
        class="mx-auto"
        prepend-icon="mdi-home"
      >
        <template v-slot:title>
            <p class="room-title">{{ roomText }}</p>
        </template>

        <v-card-text class="room-info">
          <p class="text-data">5 dispositivos conectados</p>
          <p class="text-data">3 dispositivos encendidos</p>
        </v-card-text>
    </v-card>
</template>

<script setup>
    import { defineProps } from 'vue';

    const prop = defineProps({
        roomText: String
    })
</script>


<style scoped>
    #room-card {
        margin-top: 20px;
        margin-bottom: 15px;
        width: 600px;
    }

    #room-card:hover {
        background-color: rgba(220, 220, 220, 0.892);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .room-title {
        font-size: 30px;
        color: #333;
        display: flex;
        align-items: center;    
    }

    .room-info {
        font-size: 18px;
        display: flex;
        flex-direction: column;
        align-items: end;
        margin-bottom: -10px;
        margin-top: -25px;
    }

    .text-data {
        font-size: 16px;
        color: #6d6d6d;
        margin-bottom: 10px;
    }
</style>