import storageService from '../services/storage.service'
import { utilService } from './util.service.js'
import { gPlaylists } from "./data";
import axios from 'axios'
import { update } from 'lodash';
export const userService = {
    getLoggedinUser,
    getUserById,
    addLikeToTrack,
    removeLikeFromTrack,
    AddToRecentlyPlayed,
    setUserPref,
    isGuest,
    signup,
    login,
    logout
}
const STORAGE_KEY = "user"
const URL = 'http://localhost:3030/api'


async function signup(user) {
    let userToSave = await axios.post(`${URL}/auth/signup`, user)
    userToSave = userToSave.data
    storageService.saveToStorage(STORAGE_KEY, userToSave)
    return userToSave
}

async function login(credentials) {
    console.log(credentials);
    let userToSave = await axios.post(`${URL}/auth/login`, credentials)
    userToSave = userToSave.data
    storageService.saveToStorage(STORAGE_KEY,userToSave)
    return userToSave
}

async function logout() {
    const removed = await axios.post(`${URL}/auth/logout`)
    storageService.removeFromStorage(STORAGE_KEY)
    return removed
}


async function updateUser(user) {
    let updatedUser = await axios.put(`${URL}/user/${user._id}`, user)
    return updatedUser.data
}
async function AddToRecentlyPlayed(track, stationOrTrack) {
    let user = getLoggedinUser()
    if (stationOrTrack === 'track') {
        let recentlyPlayedSongs = user.recentlyPlayedSongs
        if (!recentlyPlayedSongs.length < 10)
            recentlyPlayedSongs = recentlyPlayedSongs.slice(Math.max(recentlyPlayedSongs.length - 9, 0))
        recentlyPlayedSongs.push(track)
        user.recentlyPlayedSongs = recentlyPlayedSongs
    }
    else {
        if (!track) return
        let recentlyPlayedStations = user.recentlyPlayedStations
        if (!recentlyPlayedStations.length < 10)
            recentlyPlayedStations = recentlyPlayedStations.slice(Math.max(recentlyPlayedStations.length - 9, 0))
        recentlyPlayedStations.push(track)
        user.recentlyPlayedStations = recentlyPlayedStations
    }
    if (user.username !== "guest") {
        user = await updateUser(user)
    }
    _saveUserToStorage(user)
    return user
}

function getLoggedinUser() {
    return storageService.loadFromStorage(STORAGE_KEY)
}

async function isGuest() {
    const user = getLoggedinUser()
    console.log('here');
    return user.username === "guest"
}

async function addLikeToTrack(trackId, stationOrTrack) {
    let user = getLoggedinUser()
    console.log(user);
    if (stationOrTrack === 'station') {
        user.likedStations.push(trackId)
    }
    else {
        user.likedTracks.push(trackId)
    }
    // const isGuest=await isGuest()
    // console.log(isGuest);
    if (user.username !== "guest") {
        user = await updateUser(user)
    }
    _saveUserToStorage(user)
    return user
}

async function removeLikeFromTrack(currTrackId, stationOrTrack) {
    let user = getLoggedinUser()
    console.log(user);
    if (stationOrTrack === 'station') {
        let likedStations = user.likedStations.filter(trackId => trackId !== currTrackId)
        user.likedStations = likedStations
    }
    else {
        let likedTracks = user.likedTracks.filter(track => track.id !== currTrackId)
        user.likedTracks = likedTracks
    }
    if (user.username !== "guest") {
        user = await updateUser(user)
    }
    _saveUserToStorage(user)
    return user
}


async function getUserById(userId) {
    let user = await axios.get(`${URL}/user/${user._id}`)
    return user
}

async function setUserPref(userPref) {
    let user=await getLoggedinUser()
    user.userPref=userPref
    if(user.username!=="guest"){
        updateUser(user)
    }
    _saveUserToStorage(user)
    // let user = await axios.get(`${URL}/user/${user._id}`)
    return user
}





function _saveUserToStorage(user) {
    storageService.saveToStorage(STORAGE_KEY,user)
}
