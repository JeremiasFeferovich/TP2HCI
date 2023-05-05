import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useDeviceStore = defineStore('device', () => {
    // State - ref


    const devices = ref([{ name: "Aire", category: "Aire Acondicionado", isOn: false, favorite: false, temperature: 24, mode: "Ventilación", verticalSwing: "Automático", horizontalSwing: "Automático", fanSpeed: "Automático" },
    { name: "Luces", category: "Luces",  isOn: false, favorite: false, intensity: 0, color: "#FFAAA0" },
    { name: "Persiana", category: "Persiana", isOn: false, favorite: false, position: 50, open: function () { this.position = 100 }, close: function () { this.position = 0 } },
    { name: "Horno", category: "Horno", isOn: false, favorite: false, temperature: 120, heatSource: "Convencional", grillMode: "Apagado", convectionMode: "Convencional" },
    { name: "Parlante", category: "Parlante", isOn: false, favorite: false, volume: 5, genres: ["Clasica", "Country"], genre: "Clasica", song: "Alguna cancion", state: "stop", next: function () { return }, previous: function () { return }, play: function () { this.state = 'play' }, stop: function () { this.state = 'stop' }, pause: function () { this.state = 'pause' }, resume: function () { this.state = 'play' } }]
    );
    
    // Getters - computed
    const getDevices = computed(() => devices.value)
    // Actions - funciones Javascript
    function fetchDevices(){
        return devices
    }
    function addDevice(device){
        devices.value.push(device)
    }
    function deleteDevice(device){
        devices.value.splice(devices.value.indexOf(device), 1)
    }


    return{
        getDevices,
        fetchDevices,addDevice,deleteDevice
        
    }  

})