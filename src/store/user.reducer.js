import { userService } from '../services/user.service.js'

const initialState = {
    //user: userService.getLoggedinUser(),
    user: '',
    users: [],
}


export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'CHANGE_COUNT':
            newState = { ...state, count: state.count + action.diff }
            break;
        case 'SET_USER':
            debugger
            newState = { ...state, user: action.user }
            break;
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;
        case 'ADD_LIKE_TO_TRACK':
            debugger
            newState = { ...state, user: { ...state.user, likedTracks: [...state.likedTracks, action.trackId] } }
            break;
        default:
        case 'ADD_TOֹֹ_USERֹ_PREF':
            debugger
            newState = { ...state, user: { ...state.user, prefArtists: [...state.prefArtists, action.prefArtist] } }
            break;
        default:
    }
    // For debug:
    // window.userState = newState;
    // console.log('State:', newState);
    return newState;

}

