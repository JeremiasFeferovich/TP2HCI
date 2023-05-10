import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { RoutineApi } from "@/api/routine";

export const useRoutineStore = defineStore('routine', () => {
    // State - ref
    const routines = ref([]);

    const routinesDevicesStatus = ref([])

    // Getters - computed
    // Actions - funciones Javascript

    function getRoutinesDevicesStatus() {
        const routinesDevicesStatus = [];
        const devices = {}
        const devicesActions = {};

        routines.value.forEach(routine => {
            routine.actions.forEach(action => {
                const deviceId = action.device.id;

                if (!devices[deviceId]) {
                    devices[deviceId] = action.device;
                }
                if (!devicesActions[deviceId]) {
                    devicesActions[deviceId] = [{ actionName: action.actionName, params: action.params }];
                } else {
                    devicesActions[deviceId].push({ actionName: action.actionName, params: action.params });
                }
            });

            for (const deviceId in devices) {
                const device = devices[deviceId];

                const deviceStatus = {
                    id: device.id,
                    name: device.name,
                    meta: device.meta,
                    state: {}
                }
                if (device.type.name === 'vacuum') {
                    deviceStatus.room = device.room
                }
                devicesActions[device.id].forEach(action => {
                    deviceStatus.state = { ...deviceStatus.state, ...getStateFromAction(action) }
                })

                if (!routinesDevicesStatus[routine.id]) {
                    routinesDevicesStatus[routine.id] = [deviceStatus];
                } else {
                    routinesDevicesStatus[routine.id].push(deviceStatus);
                }
            }
        });
        return routinesDevicesStatus
    }

    function getStateFromAction(action) {
        switch (action.actionName) {
            case 'turnOff':
                return { status: 'off' }
            case 'turnOn':
                return { status: 'on' }
            case 'setBrightness':
                return { brightness: action.params[0] }
            case 'setColor':
                return { color: action.params[0] }
            case 'setTemperature':
                return { temperature: action.params[0] }
            case 'setMode':
                return { mode: action.params[0] }
            case 'setFanSpeed':
                return { fanSpeed: action.params[0] }
            case 'setHeat':
                return { heat: action.params[0] }
            case 'setGrill':
                return { grill: action.params[0] }
            case 'setConvection':
                return { convection: action.params[0] }
            case 'setLocation':
                return { location: action.params[0] }
            case 'lock':
                return { lock: 'locked' }
            case 'unlock':
                return { lock: 'unlocked' }
            case 'open':
                return { status: 'opened' }
            case 'close':
                return { status: 'closed' }
            case 'setVerticalSwing':
                return { verticalSwing: action.params[0] }
            case 'setHorizontalSwing':
                return { horizontalSwing: action.params[0] }
            case 'setFanSpeed':
                return { fanSpeed: action.params[0] }
            case 'start':
                return { status: 'active' }
            case 'pause':
                return { status: 'inactive' }
            case 'dock':
                return { status: 'docked' }
            default:
                console.log('Action not implemented')
                console.log(action)
                break;
        }
    }

    async function fetchRoutines() {
        const fetchedRoutines = await RoutineApi.getAll()
        routines.value = fetchedRoutines
        if (fetchedRoutines && fetchedRoutines.length > 0) {
            routinesDevicesStatus.value = getRoutinesDevicesStatus()
        }
        return routines
    }
    async function addRoutine(routine) {
        const addedRoutine = await RoutineApi.add(routine)
        fetchRoutines()
    }
    async function deleteRoutine(routine) {
        const deletedRoutine = await RoutineApi.delete(routine)
        fetchRoutines()
    }

    async function updateRoutine(routine) {
        const updatedRoutine = await RoutineApi.update(routine)
        fetchRoutines()
    }

    async function executeRoutine(routine) {
        const execute = await RoutineApi.execute(routine)
    }


    return {
        routines, routinesDevicesStatus,
        fetchRoutines, addRoutine, deleteRoutine, executeRoutine, updateRoutine, getStateFromAction

    }

})