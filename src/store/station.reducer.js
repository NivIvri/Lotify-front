const initialState = {
    stations: [],
    queue:[],
    playNextQueue:[],
    currTrack:null,
}
export function stationReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_STATIONS':
            newState = { ...state, stations: action.stations }
            break
        case 'SET_CURR_TRACK':
            newState = { ...state, currTrack:action.track}
            break
        case 'ADD_TO_QUEUE':
            // const newQueue=state.queue.concat(action.station);
            newState={...state,queue:action.station};
        default:
    }
    return newState

}
