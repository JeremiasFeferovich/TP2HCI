import { Api } from "./api.js"


class RoomApi{

    static getUrl(slug){ 
        return `${Api.baseUrl}/rooms${slug ? `/${slug}` : ''}`
    }

    static add(room){
        Api.post(RoomApi.getUrl(), room)
    }

    static modify(room){
        Api.put(RoomApi.getUrl(room.id), room)
    }

    static remove(){
        Api.delete(RoomApi.getUrl(room.id))
    }

    static get(id){
        Api.get(RoomApi.getUrl(id))
    }

    static getAll(){
        Api.get(RoomApi.getUrl())
    }

}

export { RoomApi }