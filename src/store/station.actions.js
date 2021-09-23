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

export function setCurrTrack(track,idx){
    return async (dispatch) => {
                dispatch({
                    type: 'SET_CURR_TRACK',
                    track,
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

export function playNextTrack(){
    return async (dispatch) => {
                dispatch({
                    type: 'NEXT_TRACK',
                })
    }
}

export function playPrevTrack(){
    return async (dispatch) => {
                dispatch({
                    type: 'PREV_TRACK',
                })
    }
}



