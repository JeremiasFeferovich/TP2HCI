import { Api } from "./api.js"

class RoomApi{

    static getUrl(slug){ 
        return `${Api.baseUrl}/rooms${slug ? `/${slug}` : ''}`
    }

    static async add(room){
        const body = {
            name: room.name,
            meta: {
                type: room.type
            }
        }
        const roomPost = await Api.post(RoomApi.getUrl(), body)
        room.devices.forEach(device => {
            this.addDevice(roomPost.id, device)
        });
        return roomPost
    }

    static async update(room){
        const updatedRoom = await Api.put(RoomApi.getUrl(room.id), {name: room.name, meta: { ...room.meta}})
        return updatedRoom
    }

    static async delete(id){
        return await Api.delete(RoomApi.getUrl(id))
    }

    static async deleteDevice(id) {
        return await Api.delete(`${RoomApi.getUrl()}/devices/${id}`)
    }

    static async getRoom(id){
        return await Api.get(RoomApi.getUrl(id))
    }

    static async getDevices(id){
        return await Api.get(`${RoomApi.getUrl(id)}/devices`)
    }

    static async getAll(){
        return await Api.get(RoomApi.getUrl())
    }

    static async addDevice(id, device){
        return await Api.post(`${RoomApi.getUrl(id)}/devices/${device.id}`)

    }

}

export { RoomApi }