import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { RoomApi } from "@/api/room";
import { useDeviceStore } from "./deviceStore";
import dormitorio from '@/assets/dormitorio.svg';
import cocina from '@/assets/cocina.svg';
import living from '@/assets/living.svg';
import baño from '@/assets/baño.svg';
import patio from '@/assets/patio.svg';
import otro from '@/assets/otro.svg';

export const useRoomStore = defineStore('room', () => {

    const deviceStore = useDeviceStore()
    // State - ref
    const rooms = ref([]);
    const roomTypeImg = { ['Dormitorio']: dormitorio, ['Cocina']: cocina, ['Living']: living, ['Baño']: baño, ['Patio']: patio, ['Otro']: otro }

    // Getters - computed
    const getRooms = computed(() => rooms.value)
    const getRoom = computed(() => (id) => rooms.value.find(room => room.id === id))
    // Actions - funciones Javascript
    async function fetchRooms() {
        const fetchedRooms = await RoomApi.getAll()
        if (fetchedRooms) {
            await Promise.all(
                fetchedRooms.map(async (room) => {
                    room.devices = await RoomApi.getDevices(room.id);
                })
            );
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
        await fetchRooms()
        return addedRoom
    }

    async function deleteRoom(room) {
        const deletedRoom = await RoomApi.delete(room.id)
        fetchRooms()
        return deletedRoom
    }

    async function updateRoom(room) {
        const updatedRoom = await RoomApi.update(room)
        fetchRooms()
        return updatedRoom
    }

    async function removeDeviceFromRoom(device) {
        const removedDevice = await RoomApi.removeDevice(device.id)
        fetchRooms()
        deviceStore.fetchDevices()
        return removedDevice
    }

    async function addDeviceToRoom(id, device) {
        const addedDevice = await RoomApi.addDevice(id, device)
        await fetchRooms()
        deviceStore.fetchDevices()
        return addedDevice
    }


    return {
        rooms,roomTypeImg,
        getRooms, getRoom,
        fetchRoom,fetchRooms,addRoom,deleteRoom, removeDeviceFromRoom, addDeviceToRoom, updateRoom
    }

})