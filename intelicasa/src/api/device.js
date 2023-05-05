import { Api } from "./api.js"
import lightbulb from '@/assets/lightbulb.svg'
import speaker from '@/assets/speaker.svg'
import oven from '@/assets/oven.svg'
import airConditioner from '@/assets/airConditioner.svg'
import blinds from '@/assets/blinds.svg'

class DeviceApi {

    static categories = []

    static async getCategories() {
        this.categories = await Api.get(`${Api.baseUrl}/devicetypes`)
    }

    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ''}`
    }

    static async add(device) {
        if (!this.categories.length) {
            await this.getCategories()
        }
        const body = {
            type: {
                id: this.categories.find(category => category.name === device.category).id
            },
            name: device.name,
        }
        return await Api.post(DeviceApi.getUrl(), body)
    }

    static async modify(device) {
        return await Api.put(DeviceApi.getUrl(device.id), device)
    }

    static async remove(id) {
        return await Api.delete(DeviceApi.getUrl(id))
    }

    static async get(id) {
        return await Api.get(DeviceApi.getUrl(id))
    }

    static async getAll() {
        if (!this.categories.length) {
            await this.getCategories()
        }
        const categories = [{ name: "Aire Acondicionado", value: "ac", img: airConditioner }, { name: "Luces", value: "lamp", img: lightbulb }, { name: "Persiana", value: "blinds", img: blinds }, { name: "Horno", value: "oven", img: oven }, { name: "Parlante", value: "speaker", img: speaker }]

        const devices = await Api.get(DeviceApi.getUrl())
        return devices.map(device => {
            const category = categories.find(category => category.value === device.type.name);
            return {
                ...device,
                category: category
            };
        });

    }

}

export { DeviceApi }