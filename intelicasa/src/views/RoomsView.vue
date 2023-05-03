<template>
    <TitleComponent title="Rooms" />
    <v-sheet color="secondary">
        <v-row v-for="room in rooms" :key="room.id">
        <RoomCard :roomText="room.name" />
    </v-row>
</v-sheet>
    <RoomDialog />
</template>


<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import RoomCard from '@/components/RoomCard.vue';
import RoomDialog from '@/components/RoomDialog.vue';
import { ref } from 'vue';

const rooms = ref([
    { id: 1, name: 'Living Room' },
    { id: 2, name: 'Kitchen' },
    { id: 3, name: 'Bedroom' }])
</script>
  


<style scoped>
.v-sheet {       
    margin-top: 35px;
    border-radius: 10px;
    width: 75%;
    margin: 0 auto;
    padding: 25px 50px;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
}
</style>