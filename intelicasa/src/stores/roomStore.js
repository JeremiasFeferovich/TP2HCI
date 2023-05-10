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
    async function addRoom(room) {
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

    async function deleteDeviceFromRoom(device) {
        const deletedDevice = await RoomApi.deleteDevice(device.id)
        fetchRooms()
        deviceStore.fetchDevices()
    }

    async function addDeviceToRoom(room, device) {
        const addedDevice = await RoomApi.addDevice(room.id, device)
        fetchRooms()
        deviceStore.fetchDevices()
    }


    return {
        rooms,
        fetchRooms, addRoom, deleteRoom, deleteDeviceFromRoom, addDeviceToRoom, updateRoom
    }

})