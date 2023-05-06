import { Api } from "./api.js"


class RoutineApi{

    static getUrl(slug){ 
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ''}`
    }

    static async add(routine){
        return await Api.post(RoutineApi.getUrl(), routine)
    }

    static async modify(routine){
        return await Api.put(RoutineApi.getUrl(routine.id), routine)
    }

    static async remove(routine){
        return await Api.delete(RoutineApi.getUrl(routine.id))
    }

    static async get(id){
        return await Api.get(RoutineApi.getUrl(id))
    }

    static async getAll(){
        return await Api.get(RoutineApi.getUrl())
    }

}

export { RoutineApi }