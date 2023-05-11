<template>
    <v-row v-if="!rooms || !rooms.length" justify="center">
        <p class="text-h6" align="center" >Aún no tienes habitaciones</p>
    </v-row>
    <v-row v-else v-for="(room, index) in rooms" :key="index">
        <RoomCard 
            :room="room"
            :devices="devices"
        />
    </v-row>
</template>

<script setup>
    import RoomCard from '@/components/rooms/RoomCard.vue';

    const props = defineProps({
        rooms: Array,
        devices: Array
    })
</script>