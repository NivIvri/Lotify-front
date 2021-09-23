const initialState = {
    stations: [],
    queue:[],
    currIdx:null,
}
export function stationReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_STATIONS':
            newState = { ...state, stations: action.stations }
            break
        case 'SET_CURR_TRACK':
            newState = { ...state, currIdx:action.idx}
            break
        case 'ADD_TO_QUEUE':
            // const newQueue=state.queue.concat(action.station);
            newState={...state,queue:action.station};
        default:
    }
    return newState

}
