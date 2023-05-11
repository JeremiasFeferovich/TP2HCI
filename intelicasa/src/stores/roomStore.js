import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { RoomApi } from "@/api/room";
import { useDeviceStore } from "./deviceStore";

export const useRoomStore = defineStore('room', () => {

    const deviceStore = useDeviceStore()
    // State - ref
    const rooms = ref([]);

    // Getters - computed
    const getRooms = computed(() => rooms.value)
    // Actions - funciones Javascript
    async function fetchRooms() {
        const fetchedRooms = await RoomApi.getAll()
        if (fetchedRooms) {
            fetchedRooms.forEach(async room => {
                room.devices = await RoomApi.getDevices(room.id)
            });
        }
        rooms.value = fetchedRooms
        return fetchedRooms
    }

    async function fetchRoom(roomId){
        const fetchedRoom = await RoomApi.get(roomId)
        const index = rooms.value.findIndex(room => room.id === roomId)
        if( index !== -1){
            rooms.value[index] = fetchedRoom
        }
        return fetchRoom
    }
    async function addRoom(room){
        const addedRoom = await RoomApi.add(room)
        fetchRooms()
    }

    async function deleteRoom(room) {
        const deletedRoom = await RoomApi.remove(room.id)
        fetchRooms()
        deviceStore.fetchDevices()
    }

    async function updateRoom(room) {
        const updatedRoom = await RoomApi.update(room)
        fetchRooms()
    }

    async function removeDeviceFromRoom(device) {
        const removedDevice = await RoomApi.removeDevice(device.id)
        fetchRooms()
        deviceStore.fetchDevices()
    }

    async function addDeviceToRoom(id, device) {
        const addedDevice = await RoomApi.addDevice(id, device)
        fetchRooms()
        deviceStore.fetchDevices()
    }


    return {
        rooms,
        fetchRoom,fetchRooms,addRoom,deleteRoom, removeDeviceFromRoom, addDeviceToRoom, updateRoom
    }

})