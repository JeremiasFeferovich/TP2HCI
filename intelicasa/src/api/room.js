import { Api } from "./api.js"


class RoomApi{

    static getUrl(slug){ 
        return `${Api.baseUrl}/rooms${slug ? `/${slug}` : ''}`
    }

    static async add(room){
        return await Api.post(RoomApi.getUrl(), room)
    }

    static async modify(room){
        return await Api.put(RoomApi.getUrl(room.id), room)
    }

    static async remove(room){
        return await Api.delete(RoomApi.getUrl(room.id))
    }

    static async get(id){
        return await Api.get(RoomApi.getUrl(id))
    }

    static async getAll(){
        return await Api.get(RoomApi.getUrl())
    }

}

export { RoomApi }