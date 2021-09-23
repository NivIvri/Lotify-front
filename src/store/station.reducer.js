const initialState = {
    stations: [],
    queue: [],
    playNextQueue: [],
    recentlyPlayed: [],
    currTrack: null,
    currIdx: null
}
export function stationReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_STATIONS':
            newState = { ...state, stations: action.stations }
            break
        case 'SET_CURR_TRACK':
            newState = { ...state, currTrack: action.track, currIdx: action.idx }
            break
        case 'ADD_TO_QUEUE':
            // const newQueue=state.queue.concat(action.station);
            newState = { ...state, queue: action.station };
            break
        case 'NEXT_TRACK':
            // state.recentlyPlayed.unshift(state.currTrack);
            // newState = { ...state, queue: action.queue, currTrack: action.track };
            state.currIdx++;
            newState = { ...state, currTrack: state.queue[state.currIdx] };
            break
        case 'PREV_TRACK':
            state.currIdx--;
            newState = { ...state, currTrack: state.queue[state.currIdx] };
            // const track = state.recentlyPlayed.shift();
            // state.queue.unshift(state.currTrack)
            // newState = { ...state, currTrack: track };
            break

        default:
    }
    return newState

}
