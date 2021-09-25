const initialState = {
    stations: [],
    queue: [],
    playNextQueue: [],
    currTrack: null,
}
export function stationReducer(state = initialState, action) {
    var newState = state
    const newQueue = [...state.queue]
    const newPlayNextQueue = [...state.playNextQueue]
    let nextTrack = {}
    switch (action.type) {
        case 'SET_STATIONS':
            newState = { ...state, stations: action.stations }
            break
        case 'SET_CURR_TRACK':
            if (action.track.nextQueue) {
                if (state.currTrack) newPlayNextQueue.splice(action.idx, 1)
            }
            else {
                if (state.currTrack) {
                    newQueue.splice(action.idx, 1)
                }
            }
            if (!state.currTrack?.nextQueue) {
                newQueue.push(state.currTrack)
            }
            newState = { ...state, currTrack: action.track, queue: newQueue, playNextQueue: newPlayNextQueue }

            break
        case 'SET_QUEUE':
            action.queue.splice(action.idx, 1);
            newState = { ...state, queue: action.queue };
            break
        case 'ADD_TO_NEXT_QUEUE':
            newPlayNextQueue.push(action.track)
            newState = { ...state, playNextQueue: newPlayNextQueue };
            break
        case 'SHUFFLE_QUEUE':
            newState = { ...state, queue: action.queue };
            break
        case 'NEXT_TRACK':
            if (state.playNextQueue.length>0) {
                nextTrack = newPlayNextQueue.shift();
                
            } else {
                nextTrack = newQueue.shift();
            }
            if (!state.currTrack.nextQueue) newQueue.push(state.currTrack)
            newState = {
                ...state,
                currTrack: nextTrack,
                queue: newQueue,
                playNextQueue: newPlayNextQueue
            };

            break
        case 'PREV_TRACK':
            nextTrack = newQueue.pop();
            newQueue.unshift(state.currTrack)
            newState = {
                ...state,
                currTrack: nextTrack,
                queue: newQueue,
            };
            break

        default:
    }
    return newState

}