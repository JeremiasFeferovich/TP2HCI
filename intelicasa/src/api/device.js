import { Api } from "./api.js"

class DeviceApi {

    static allCategories = []

    static eventSource = null

    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ''}`
    }

    static async getCategories() {
        this.allCategories = await Api.get(`${Api.baseUrl}/devicetypes`)
        if (this.allCategories) {
            return this.allCategories.map(category => { return { id: category.id, name: category.name } })
        }
    }

    static startEventListeners(deviceId) {
        this.eventSource = new EventSource(this.getUrl(`${deviceId ? `${deviceId}/` : ''}events`))
        return this.eventSource
    }

    static stopEventListeners() {
        this.eventSource.close();
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
                favorite: false
            }
        }
        return await Api.post(DeviceApi.getUrl(), body)
    }

    static async delete(id) {
        return await Api.delete(DeviceApi.getUrl(id))
    }

    static async getAll() {
        const devices = await Api.get(DeviceApi.getUrl())
        return devices
    }

    static async getDevice(id) {
        const device = await Api.get(DeviceApi.getUrl(id))
        return device
    }

    static async updateDevice(device) {
        const updatedDevice = await Api.put(DeviceApi.getUrl(device.id), { name: device.name, meta: { ...device.meta } })
        return updatedDevice
    }


    static async triggerEvent(event) {
        return await Api.put(`${Api.baseUrl}/devices/${event.device.id}/${event.actionName}`, event.params)
    }

    static async toggleFavorite(device) {
        return await Api.put(`${Api.baseUrl}/devices/${device.id}`, { name: device.name, meta: { ...device.meta, favorite: !device.meta.favorite } })
    }


}

export { DeviceApi }