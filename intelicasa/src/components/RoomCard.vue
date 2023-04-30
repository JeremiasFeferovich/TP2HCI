<template>
    <v-card id="room-card"
        class="mx-auto"
        width="600"
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

<script >
    
    export default{
        name: 'RoomCard',
        props:{
            roomText: String,
        }
    }
</script>

<style scoped>
    #room-card {
        margin-top: 20px;
        margin-bottom: 15px;
    }

    #room-card:hover {
        background-color: rgba(176, 176, 176, 0.445);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .room-title {
        font-size: 24px;
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