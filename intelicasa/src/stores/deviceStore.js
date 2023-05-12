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

    const devicesLastEvents = ref([]);

    const categories = ref([]);

    const routineStore = useRoutineStore();
    const roomStore = useRoomStore();

    const latestTimestamp = ref(null);

    const eventSource = ref(null);

    // Getters - computed
    const getDevice = computed(() => (deviceId) => devices.value.find(device => device.id === deviceId))
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

    function startEventListeners(deviceId) {
        eventSource.value = DeviceApi.startEventListeners(deviceId ? deviceId : null)
        eventSource.value.onmessage = (event) => {
            const eventJson = JSON.parse(event.data);
            const device = devices.value.find(device => device.id === eventJson.deviceId)
            const result = updateDeviceFromEvent(eventJson)
            if (result) {
                device.state = { ...device.state, ...result }
            }
        };
    }

    function stopEventListeners() {
        DeviceApi.stopEventListeners()
    }

    async function triggerEvent(event) {
        const response = await DeviceApi.triggerEvent(event);
        if (response) {
            const device = devices.value.find(device => device.id === event.device.id)
            device.state = { ...device.state, ...getStateFromAction(event) }
        }
    }


    function updateDeviceFromEvent(event) {
        if (!devicesLastEvents[event.deviceId]) {
            devicesLastEvents[event.deviceId] = { events: { [event.event]: { timestamp: new Date().getTime() } } };
        } else {
            // Si habia eventos mas nuevos a este lo ignoro
            if (devicesLastEvents[event.deviceId].events[event.event]?.timestamp >= new Date(event.timestamp).getTime()) {
                return null;
            }
            devicesLastEvents[event.deviceId].events[event.event] = { timestamp: new Date().getTime() };
        }

        switch (event.event) {
            case 'statusChanged':
                return { status: event.args.newStatus };
            case 'brightnessChanged':
                return { brightness: event.args.newBrightness };
            case 'colorChanged':
                return { color: event.args.newColor };
            case "temperatureChanged":
                return { temperature: event.args.newTemperature };
            case 'modeChanged':
                return { mode: event.args.newMode };
            case 'verticalSwingChanged':
                return { verticalSwing: event.args.newSwing };
            case 'horizontalSwingChanged':
                return { horizontalSwing: event.args.newSwing };
            case 'fanSpeedChanged':
                return { fanSpeed: event.args.newSpeed };
            case 'heatChanged':
                return { heat: event.args.newHeat };
            case 'grillChanged':
                return { grill: event.args.newGrill };
            case 'convectionChanged':
                return { convection: event.args.newConvection };
            case 'lockChanged':
                return { lock: event.args.newLock };
            case 'locationChanged':
                return { location: event.args.newLocation };
            default:

        }
    }

    function statusChangedSetTimestamp(action, currentTimestamp) {
        if (!devicesLastEvents[action.device.id]) {
            devicesLastEvents[action.device.id] = { events: { ["statusChanged"]: { timestamp: currentTimestamp } } };
        } else {
            devicesLastEvents[action.device.id].events['statusChanged'] = { timestamp: currentTimestamp };
        }
    }

    function getStateFromAction(action) {
        const currentTimestamp = new Date().getTime();
        switch (action.actionName) {
            case 'turnOff':
                statusChangedSetTimestamp(action, currentTimestamp)
                return { status: 'off' }
            case 'turnOn':
                statusChangedSetTimestamp(action, currentTimestamp)
                return { status: 'on' }
            case 'setBrightness':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["setBrightness"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['brighthessChanged'] = { timestamp: currentTimestamp };
                }
                return { brightness: action.params[0] }
            case 'setColor':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["colorChanged"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['colorChanged'] = { timestamp: currentTimestamp };
                }
                return { color: action.params[0] }
            case 'setTemperature':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["temperatureChanged"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['temperatureChanged'] = { timestamp: currentTimestamp };
                }
                return { temperature: action.params[0] }
            case 'setMode':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["modeChanged"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['modeChanged'] = { timestamp: currentTimestamp };
                }
                return { mode: action.params[0] }
            case 'setVerticalSwing':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["verticalSwingChanged"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['verticalSwingChanged'] = { timestamp: currentTimestamp };
                }
                return { verticalSwing: action.params[0] }
            case 'setHorizontalSwing':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["horizontalSwingChanged"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['horizontalSwingChanged'] = { timestamp: currentTimestamp };
                }
                return { horizontalSwing: action.params[0] }
            case 'setFanSpeed':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["fanSpeedChanged"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['fanSpeedChanged'] = { timestamp: currentTimestamp };
                }
                return { fanSpeed: action.params[0] }
            case 'setHeat':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["heatChanged"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['heatChanged'] = { timestamp: currentTimestamp };
                }
                return { heat: action.params[0] }
            case 'setGrill':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["grillChanged"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['grillChanged'] = { timestamp: currentTimestamp };
                }
                return { grill: action.params[0] }
            case 'setConvection':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["convectionChanged"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['convectionChanged'] = { timestamp: currentTimestamp };
                }
                return { convection: action.params[0] }
            case 'lock':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["lockChanged"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['lockChanged'] = { timestamp: currentTimestamp };
                }
                return { lock: 'locked' }
            case 'unlock':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["lockChanged"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['lockChanged'] = { timestamp: currentTimestamp };
                }
                return { lock: 'unlocked' }
            case 'open':
                statusChangedSetTimestamp(action, currentTimestamp)
                return { status: 'opened' }
            case 'close':
                statusChangedSetTimestamp(action, currentTimestamp)
                return { status: 'closed' }
            case 'setLocation':
                if (!devicesLastEvents[action.device.id]) {
                    devicesLastEvents[action.device.id] = { events: { ["locationChanged"]: { timestamp: currentTimestamp } } };
                } else {
                    devicesLastEvents[action.device.id].events['locationChanged'] = { timestamp: currentTimestamp };
                }
                return { location: action.params[0] }
            case 'start':
                statusChangedSetTimestamp(action, currentTimestamp)
                return { status: 'active' }
            case 'pause':
                statusChangedSetTimestamp(action, currentTimestamp)
                return { status: 'inactive' }
            case 'dock':
                statusChangedSetTimestamp(action, currentTimestamp)
                return { status: 'docked' }
            default:
                console.log('Action not implemented')
                console.log(action)
                break;
        }
    }

    return {
        devices, categories,
        getDevice,
        fetchDevices, addDevice, fetchDevice, updateDevice, deleteDevice, fetchCategories, triggerEvent, startEventListeners, stopEventListeners
    }

})