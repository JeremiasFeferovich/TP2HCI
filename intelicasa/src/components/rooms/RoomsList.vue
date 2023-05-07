<template>
    <v-row v-for="(room, index) in rooms" :key="index">
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