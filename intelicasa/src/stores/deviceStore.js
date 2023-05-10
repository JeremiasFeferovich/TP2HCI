import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { DeviceApi } from "@/api/device";
import { useRoutineStore } from "./routineStore";
import { useRoomStore } from "./roomStore";

import lightbulb from '@/assets/lightbulb.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'
import door from '@/assets/door.svg'
import vacuum from '@/assets/vacuumCleaner.svg'

export const useDeviceStore = defineStore('device', () => {
    // State - ref
    const devices = ref([]);

    const categories = ref([]);

    const routineStore = useRoutineStore();
    const roomStore = useRoomStore();

    // Getters - computed

    // Actions - funciones Javascript
    async function fetchDevices() {
        const fetchedDevices = await DeviceApi.getAll()
        devices.value = fetchedDevices
        return fetchedDevices
    }

    async function fetchCategories() {
        if (!categories.value.length) {
            const fetchedCategories = await DeviceApi.getCategories();
            if (fetchedCategories) {
                const categoriesValues = [
                    { name: "Aire Acondicionado", value: "ac", img: airConditioner },
                    { name: "Luces", value: "lamp", img: lightbulb },
                    { name: "Horno", value: "oven", img: oven },
                    { name: "Aspiradora", value: "vacuum", img: vacuum },
                    { name: "Puerta", value: "door", img: door }
                ];

                const filteredCategories = fetchedCategories.filter((fetchedCategory) =>
                    categoriesValues.some((category) => category.value === fetchedCategory.name)
                );

                const updatedCategories = filteredCategories.map((filteredCategory) => {
                    const category = categoriesValues.find((category) => category.value === filteredCategory.name);
                    return { ...filteredCategory, img: category.img, name: category.name, value: category.value };
                });
                categories.value = updatedCategories;
            }
        }
        return categories.value;
    }

    async function addDevice(device) {
        const addedDevice = await DeviceApi.add(device);
        fetchDevices()
    }

    async function fetchDevice(deviceId) {
        const fetchedDevice = await DeviceApi.getDevice(deviceId);
        const index = devices.value.findIndex(device => device.id === deviceId);
        if (index !== -1) {
            devices.value[index] = fetchedDevice;
        }
        return fetchedDevice;
    }

    async function deleteDevice(device) {
        const deletedDevice = await DeviceApi.delete(device.id);
        if (deletedDevice) {
            routineStore.routines.forEach(routine => {
                routine.actions = routine.actions.filter(action => action.device.id !== device.id);
                // TODO preguntar sobre delete-create
                routineStore.deleteRoutine(routine);
                if (routine.actions.length > 0)
                    routineStore.addRoutine(routine);
            });
            roomStore.deleteDeviceFromRoom(device);
        }
        fetchDevices()
    }

    async function updateDevice(device) {
        const updatedDevice = await DeviceApi.updateDevice(device);
        fetchDevices()
    }

    async function triggerEvent(event) {
        return await DeviceApi.triggerEvent(event);
    }

    return {
        devices, categories,
        fetchDevices, addDevice, fetchDevice, updateDevice, deleteDevice, fetchCategories, triggerEvent
    }

})