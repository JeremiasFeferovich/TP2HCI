import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { RoutineApi } from "@/api/routine";

export const useRoutineStore = defineStore('routine', () => {
    // State - ref
    const routines = ref([]);
    
    // Getters - computed
    // Actions - funciones Javascript
    async function fetchRoutines(){
        const fetchedRoutines = await RoutineApi.getAll()
        routines.value = fetchedRoutines
        return routines
    }
    async function addRoutine(routine){
        const addedRoutine = await RoutineApi.add(routine)
        fetchRoutines()
    }
    async function deleteRoutine(routine){
        const deletedRoutine = await RoutineApi.remove(routine)
        fetchRoutines()
    }

    async function updateRoutine(routine){
        const updatedRoutine = await RoutineApi.update(routine)
        fetchRoutines()
    }

    async function executeRoutine(routine){
        const execute = await RoutineApi.execute(routine)
    }


    return{
        routines,
        fetchRoutines,addRoutine,deleteRoutine,executeRoutine, updateRoutine
        
    }  

})