import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { DeviceApi } from "@/api/device";

import lightbulb from '@/assets/lightbulb.svg'
import speaker from '@/assets/speaker.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'
import blinds from '@/assets/blinds.svg'

export const useDeviceStore = defineStore('device', () => {
    // State - ref
    const devices = ref([]);

    const categories = ref([]);

    // Getters - computed

    // Actions - funciones Javascript
    async function fetchDevices() {
        const fetchedDevices = await DeviceApi.getAll()
        console.log(fetchedDevices)
        devices.value = fetchedDevices
        return fetchedDevices
    }

    async function fetchCategories() {
        if (!categories.value.length) {
            const fetchedCategories = await DeviceApi.getCategories();
            const categoriesValues = [
                { name: "Aire Acondicionado", value: "ac", img: airConditioner },
                { name: "Luces", value: "lamp", img: lightbulb },
                { name: "Persiana", value: "blinds", img: blinds },
                { name: "Horno", value: "oven", img: oven },
                { name: "Parlante", value: "speaker", img: speaker },
            ];

            const filteredCategories = fetchedCategories.filter((fetchedCategory) =>
                categoriesValues.some((category) => category.value === fetchedCategory.name)
            );

            const updatedCategories = filteredCategories.map((filteredCategory) => {
                const category = categoriesValues.find((category) => category.value === filteredCategory.name);
                return { ...filteredCategory, img: category.img, name: category.name, value: category.value };
            });
            categories.value = updatedCategories;
            console.log(categories.value);
        }
        console.log(categories.value);
        return categories.value;
    }

    async function addDevice(device) {
        const addedDevice = await DeviceApi.add(device);
        fetchDevices()
    }

    async function deleteDevice(device) {
        const deletedDevice = await DeviceApi.remove(device.id);
        fetchDevices()
    }

    return {
        devices, categories,
        fetchDevices, addDevice, deleteDevice, fetchCategories

    }

})