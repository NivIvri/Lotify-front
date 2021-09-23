import { stationService } from "../services/async-storage.service.js";

export function loadStations() {
    return async (dispatch) => {
        try {
                const stations=await stationService.query()
                console.log('stations from DB:', stations)
                dispatch({
                    type: 'SET_STATIONS',
                    stations
                })
            }
            catch (err) {
                console.log(`Had Issues ${err}`)
                throw err
            }
    }
}

export function setTrack(track){
    return async (dispatch) => {
                dispatch({
                    type: 'SET_TRACK',
                    track
                })
    }
}

