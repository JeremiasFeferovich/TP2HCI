<template>
    <TitleComponent title="Rooms"/>
    <v-container >        
            <v-row v-for="room in rooms" :key="room.id">
                <RoomCard :roomText="room.name" />
            </v-row>
    </v-container>
</template>


<script setup>
    import TitleComponent from '@/components/TitleComponent.vue';
    import RoomCard from '@/components/RoomCard.vue';
    import { ref } from 'vue';

    const rooms = ref([
        { id:1, name: 'Living Room'},
        { id:2, name: 'Kitchen'},
        { id:3, name: 'Bedroom'}])
</script>
  

<style scoped>
    .v-container {
        background-color: rgba(173, 216, 230, 0.605);
        margin-top: 35px;
        border-radius: 10px;
        max-width: 1000px;
        margin: 0 auto;
        padding: 10px;
        margin-top: 15px;
    }
</style>