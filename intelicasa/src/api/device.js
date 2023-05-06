import { Api } from "./api.js"
import lightbulb from '@/assets/lightbulb.svg'
import speaker from '@/assets/speaker.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'
import blinds from '@/assets/blinds.svg'

class DeviceApi {

    static allCategories = []

    static categories = [{ name: "Aire Acondicionado", value: "ac", img: airConditioner }, { name: "Luces", value: "lamp", img: lightbulb }, { name: "Persiana", value: "blinds", img: blinds }, { name: "Horno", value: "oven", img: oven }, { name: "Parlante", value: "speaker", img: speaker }]

    static async getCategories() {
        this.allCategories = await Api.get(`${Api.baseUrl}/devicetypes`)
        return this.allCategories
    }

    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ''}`
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
        }
        return await Api.post(DeviceApi.getUrl(), body)
    }

    static async remove(id) {
        return await Api.delete(DeviceApi.getUrl(id))
    }

    static async get(id) {
        return await Api.get(DeviceApi.getUrl(id))
    }

    static async getAll() {
        if (!this.allCategories.length) {
            await this.getCategories()
        }
        const devices = await Api.get(DeviceApi.getUrl())
        return devices.map(device => {
            const category = this.categories.find(category => category.value === device.type.name);
            return {
                ...device,
                category: category,
                favorite: device.meta && device.meta.favorite ? device.meta.favorite : false
            };
        });
    }

    static async getDevice(id) {
        if (!this.allCategories.length) {
            await this.getCategories()
        }
        const device = await Api.get(DeviceApi.getUrl(id))
        const category = this.categories.find(category => category.value === device.type.name);
        return {
            ...device,
            category: category
        };
    }

    static async triggerEvent(deviceId, event, data) {
        return await Api.put(`${Api.baseUrl}/devices/${deviceId}/${event}`,data)
    }

    static async toggleFavorite(device) {
        return await Api.put(`${Api.baseUrl}/devices/${device.id}`, {name: device.name, meta: { favorite : !device.favorite}})
    }


}

export { DeviceApi }