<template>
    <div>
        <Title :titleText="'Rooms'" />
        <ul>
            <li class="rooms-container" v-for="room in rooms" :key="room.id">
                <RoomCard :roomText="room.name" />
            </li>
        </ul>
    </div>
</template>
  
<script>
    import Title from '@/components/Title.vue'
    import RoomCard from '@/components/RoomCard.vue'

    export default {
        components: {
            Title,
            RoomCard
        },
        data() {
            return {
                rooms: [
                    { id: 1, name: 'Living Room' },
                    { id: 2, name: 'Kitchen' },
                    { id: 3, name: 'Bedroom' },
                ],
            }
        },
    }
</script>

<style scoped>
    .rooms-container {
        padding: 10px;
        width: 800px;
        background-color: rgba(173, 216, 230, 0.605);
        display: flex;
        justify-content: center;
        margin: 0 auto;
    }
</style>