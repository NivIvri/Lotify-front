const initialState = {
    stations: [],
    queue: [],
    playNextQueue: [],
    currTrack: null,
}
export function stationReducer(state = initialState, action) {
    var newState = state
    const newQueue = [...state.queue]
    switch (action.type) {
        case 'SET_STATIONS':
            newState = { ...state, stations: action.stations }
            break
        case 'SET_CURR_TRACK':
            if (state.currTrack) newQueue.splice(action.idx, 1, state.currTrack)
            newState = { ...state, currTrack: action.track, queue: newQueue }
            break
        case 'ADD_TO_QUEUE':
            action.queue.splice(action.idx, 1);
            newState = { ...state, queue: action.queue };
            break
        case 'SHUFFLE_QUEUE':
            newState = { ...state, queue: action.queue };
            break
        case 'NEXT_TRACK':
            const nextTrack = newQueue.shift();
            newQueue.push(state.currTrack)
            newState = {
                ...state,
                currTrack: nextTrack,
                queue: newQueue
            };
            break
        case 'PREV_TRACK':
            const prevTrack = newQueue.pop();
            newQueue.unshift(state.currTrack)
            newState = {
                ...state,
                currTrack: prevTrack,
                queue: newQueue
            };
            break

        default:
    }
    return newState

}
