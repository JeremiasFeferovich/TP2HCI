import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useRoomStore = defineStore('room', () => {
    // State - ref
    const rooms = ref([]);

    // Getters - computed
    const getRooms = computed(() => rooms.value)
    // Actions - funciones Javascript
    function fetchRooms(){
        return rooms
    }
    function addRoom(room){
        rooms.value.push(room)
    }
    function deleteRoom(room){
        room.value.splice(rooms.value.indexOf(room), 1)
    }


    return{
        getRooms,
        fetchRooms,addRoom,deleteRoom

    }

})