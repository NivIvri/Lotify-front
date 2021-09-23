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
            debugger;
            newState = { ...state, currIdx:action.idx}
            break
        default:
    }
    return newState

}
