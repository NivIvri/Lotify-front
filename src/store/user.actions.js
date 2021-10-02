import { userService } from "../services/user.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'
//import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from "../services/socket.service.js";

export function loadUser() {
    return async dispatch => {
        try {
            console.log('action user');
            const user = await userService.getLoggedinUser()

            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        }
    }
}


export function addLikeToTrack(trackId, stationOrTrack) {
    return async dispatch => {
        try {
            await userService.addLikeToTrack(trackId, stationOrTrack)
            dispatch({ type: 'ADD_LIKE_TO_TRACK', trackId, stationOrTrack })

        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}


export function removeLikeFromTrack(trackId, stationOrTrack) {
    return async dispatch => {
        try {
            await userService.removeLikeFromTrack(trackId,stationOrTrack)
            dispatch({ type: 'REMOVE_LIKE_FROM_TRACK', trackId, stationOrTrack })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}


export function setUserPref(userPref) {
    return async dispatch => {
        try {
            await userService.setUserPref(userPref)
            dispatch({ type: 'SET_USERֹ_PREF', userPref })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            showErrorMsg('Cannot login')
            console.log('Cannot login', err)
        }
    }
}


export function onSignup(credentials) {
    return (dispatch) => {
        userService.signup(credentials)
            .then(user => {
                dispatch({
                    type: 'SET_USER',
                    user
                })
            })
            .catch(err => {
                showErrorMsg('Cannot signup')
                console.log('Cannot signup', err)
            })

    }
}

export function onLogout() {
    return (dispatch) => {
        userService.logout()
            .then(() => dispatch({
                type: 'SET_USER',
                user: null
            }))
            .catch(err => {
                showErrorMsg('Cannot logout')
                console.log('Cannot logout', err)
            })
    }
}


export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}