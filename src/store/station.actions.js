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

export function setCurrTrack(idx){
    return async (dispatch) => {
                dispatch({
                    type: 'SET_CURR_TRACK',
                    idx
                })
    }
}

export function addToQueue(station){
    return async (dispatch) => {
                dispatch({
                    type: 'ADD_TO_QUEUE',
                    station
                })
    }
}

