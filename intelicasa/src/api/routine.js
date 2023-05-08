import { Api } from "./api.js"


class RoutineApi{

    static getUrl(slug){ 
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ''}`
    }

    static async add(routine){
        routine.actions.forEach(action => {
            action.device = { id: action.device.id}
        });
        console.log(routine)
        return await Api.post(RoutineApi.getUrl(), routine)
    }

    static async update(routine){
        routine.actions.forEach(action => {
            action.device = { id: action.device.id}
        });
        return await Api.put(RoutineApi.getUrl(routine.id), routine)
    }

    static async remove(routine){
        return await Api.delete(RoutineApi.getUrl(routine.id))
    }

    static async execute(routine){
        return await Api.put(`${RoutineApi.getUrl(routine.id)}/execute`, routine)
    }

    static async get(id){
        return await Api.get(RoutineApi.getUrl(id))
    }

    static async getAll(){
        return await Api.get(RoutineApi.getUrl())
    }

}

export { RoutineApi }