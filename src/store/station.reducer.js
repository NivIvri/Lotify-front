const initialState = {
    stations: [],
    currTrack:null,
}
export function stationReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_STATIONS':
            newState = { ...state, stations: action.stations }
            break
        case 'SET_TRACK':
            newState = { ...state, currTrack:action.track}
            break
        default:
    }
    return newState

}
