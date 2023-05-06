import { Api } from "./api.js"


class RoomApi{

    static getUrl(slug){ 
        return `${Api.baseUrl}/rooms${slug ? `/${slug}` : ''}`
    }

    static async add(room){
        const body = {
            name: room.name,
            meta: {
                devices: room.devices,
                type: room.type
            }
        }
        return await Api.post(RoomApi.getUrl(), body)
    }

    static async modify(room){
        return await Api.put(RoomApi.getUrl(room.id), room)
    }

    static async remove(room){
        return await Api.delete(RoomApi.getUrl(room.id))
    }

    static async getRoom(id){
        return await Api.get(RoomApi.getUrl(id))
    }

    static async getAll(){
        return await Api.get(RoomApi.getUrl())
    }

}

export { RoomApi }