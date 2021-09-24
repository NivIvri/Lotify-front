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
    const { currIdx } = state
    const newQueue=[...state.queue]
    switch (action.type) {
        case 'SET_STATIONS':
            newState = { ...state, stations: action.stations }
            break
        case 'SET_CURR_TRACK':
            newState = { ...state, currTrack: action.track, currIdx: action.idx-1 }
            break
        case 'ADD_TO_QUEUE':
            // const newQueue=state.queue.concat(action.station);
            action.queue.splice(currIdx+1, 1);
            newState = { ...state, queue: action.queue };
            break
        case 'SHUFFLE_QUEUE':
            // const newQueue=state.queue.concat(action.station);
            newState = { ...state, queue: action.queue };
            break
        case 'NEXT_TRACK':
            // state.recentlyPlayed.unshift(state.currTrack);
            // newState = { ...state, queue: action.queue, currTrack: action.track };

            newQueue.splice(currIdx+1, 1, state.currTrack);
            newState = { ...state,
                currTrack: state.queue[state.currIdx+1],
                currIdx:state.currIdx+1,
                queue:newQueue };
            break
        case 'PREV_TRACK':
            newQueue.splice(currIdx, 1, state.currTrack);
            newState = { ...state,
                currTrack: state.queue[state.currIdx-1],
                currIdx:state.currIdx-1,
                queue:newQueue };
            // const track = state.recentlyPlayed.shift();
            // state.queue.unshift(state.currTrack)
            // newState = { ...state, currTrack: track };
            break

        default:
    }
    return newState

}
