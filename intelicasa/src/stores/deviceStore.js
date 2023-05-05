import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { DeviceApi } from "@/api/device";

export const useDeviceStore = defineStore('device', () => {
    // State - ref
    const devices = ref([]);
    
    // Getters - computed
    const getDevices = computed(() => devices.value)
    // Actions - funciones Javascript
    async function fetchDevices(){
        const fetchedDevices = await DeviceApi.getAll()
        console.log(fetchedDevices)
        devices.value = fetchedDevices
        return fetchedDevices
    }

    async function addDevice(device){
        const addedDevice = await DeviceApi.add(device);
        fetchDevices()
        console.log(addedDevice)
        console.log(devices.value)
    }

    async function deleteDevice(device){
        const deletedDevice = await DeviceApi.remove(device.id);
        fetchDevices()
    }


    return{
        devices,
        getDevices,
        fetchDevices, addDevice, deleteDevice
    }  

})