import { storageService } from "./async-storage.service"
const KEY='stations'

export const stationService={
    query,

}

async function query(){
    return await storageService.query(KEY)
}