<template>
    <v-card 
        class="mx-auto room-card"
        prepend-icon="mdi-home"
      >
        <template v-slot:title>
            <p class="text-h4">{{ roomText }}</p>
        </template>

        <v-card-text class="room-info">
          <p class="text-data text-body-1">5 dispositivos conectados</p>
          <p class="text-data text-body-1">3 dispositivos encendidos</p>
        </v-card-text>
    </v-card>
</template>

<script setup>
    const prop = defineProps({
        roomText: String
    })
</script>


<style scoped>
    .room-card {
        margin-top: 5px;
        margin-bottom: 5px;
        width: 100%;
    }

    .room-card:hover {
        background-color: rgba(220, 220, 220, 0.892);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .room-info {
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