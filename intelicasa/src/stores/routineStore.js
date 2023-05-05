import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useRoutineStore = defineStore('routine', () => {
    // State - ref
    const routines = ref([{
        name: 'Llegada', devices:
            [
                { name: "Aire", category: "Aire Acondicionado", isOn: false, favorite: false, temperature: 24, mode: "Ventilación", verticalSwing: "Automático", horizontalSwing: "Automático", fanSpeed: "Automático" },
                { name: "Luces", category: "Luces", isOn: false, favorite: false, intensity: 0, color: "#FFAAA0" },
                { name: "Persiana", category: "Persiana", isOn: false, favorite: false, position: 50, open: function () { this.position = 100 }, close: function () { this.position = 0 } },
            ]
    },
    {
        name: 'Salida', devices:
            [
                { name: "Aire", category: "Aire Acondicionado", isOn: false, favorite: false, temperature: 24, mode: "Ventilación", verticalSwing: "Automático", horizontalSwing: "Automático", fanSpeed: "Automático" },
                { name: "Luces", category: "Luces", isOn: false, favorite: false, intensity: 0, color: "#FFAAA0" },
                { name: "Persiana", category: "Persiana", isOn: false, favorite: false, position: 50, open: function () { this.position = 100 }, close: function () { this.position = 0 } },
            ]
    }]);
    
    // Getters - computed
    const getRoutines = computed(() => routines.value)
    // Actions - funciones Javascript
    function fetchRoutines(){
        return routines
    }
    function addRoutine(routine){
        routines.value.push(routine)
    }
    function deleteRoutine(routine){
        routines.value.splice(routines.value.indexOf(routine), 1)
    }


    return{
        getRoutines,
        fetchRoutines,addRoutine,deleteRoutine
        
    }  

})