import { Api } from "./api.js"
import lightbulb from '@/assets/lightbulb.svg'
import speaker from '@/assets/speaker.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'
import door from '@/assets/door.svg'
import vacuum from '@/assets/vacuumCleaner.svg'

class DeviceApi {


    static allCategories = []

    static categories = [
        { name: "Aire Acondicionado", value: "ac", img: airConditioner },
        { name: "Luces", value: "lamp", img: lightbulb },
        { name: "Horno", value: "oven", img: oven },
        { name: "Parlante", value: "speaker", img: speaker },
        { name: "Aspiradora", value: "vacuum", img: vacuum },
        { name: "Puerta", value: "door", img: door }
    ]

    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ''}`
    }

    static async getCategories() {
        this.allCategories = await Api.get(`${Api.baseUrl}/devicetypes`)
        return this.allCategories
    }


    static async add(device) {
        if (!this.allCategories.length) {
            await this.getCategories()
        }
        const body = {
            type: {
                id: this.allCategories.find(category => category.name === device.category.value).id
            },
            name: device.name,
            meta: {
                favorite: false,
                category: device.category
            }
        }
        return await Api.post(DeviceApi.getUrl(), body)
    }

    static async remove(id) {
        return await Api.delete(DeviceApi.getUrl(id))
    }

    static async getAll() {
        const devices = await Api.get(DeviceApi.getUrl())
        // return devices.map(device => {
        //     const category = this.categories.find(category => category.value === device.type.name);
        //     return {
        //         ...device,
        //         category: category,
        //         favorite: device.meta && device.meta.favorite ? device.meta.favorite : false
        //     };
        // });
        return devices
    }

    static async getDevice(id) {
        const device = await Api.get(DeviceApi.getUrl(id))
        const category = this.categories.find(category => category.value === device.type.name);
        // return {
        //     ...device,
        //     category: category,
        //     favorite: device.meta && device.meta.favorite ? device.meta.favorite : false
        // };
        return device
    }

    static async triggerEvent(event) {
        return await Api.put(`${Api.baseUrl}/devices/${event.device.id}/${event.actionName}`, event.params)
    }

    /*
        static async triggerEvent(deviceId, event, data) {
            return await Api.put(`${Api.baseUrl}/devices/${deviceId}/${event}`,data)
        }
    */
    static async toggleFavorite(device) {
        return await Api.put(`${Api.baseUrl}/devices/${device.id}`, { name: device.name, meta: { favorite: !device.favorite } })
    }


}

export { DeviceApi }