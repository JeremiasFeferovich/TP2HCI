import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { RoomApi } from "@/api/room";

export const useRoomStore = defineStore('room', () => {
    // State - ref
    const rooms = ref([]);

    // Getters - computed
    const getRooms = computed(() => rooms.value)
    // Actions - funciones Javascript
    async function fetchRooms(){
        const fetchedRooms = await RoomApi.getAll()
        rooms.value = fetchedRooms
        return fetchedRooms
    }
    async function addRoom(room){
        const addedRoom = await RoomApi.add(room)
        fetchRooms()
    }
    
    async function deleteRoom(room){
        const deletedRoom = await RoomApi.remove(room.id)
        fetchRooms()
    }


    return{
        rooms,
        fetchRooms,addRoom,deleteRoom
    }

})