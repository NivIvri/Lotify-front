import storageService from '../services/storage.service'
import { utilService } from './util.service.js'
import { gPlaylists } from "./data";
import axios from 'axios'
export const userService = {
    query,
    saveStation,
    getStationById,
    getNextStationId,
    getLoggedinUser,
    addLikeToTrack,
    removeLikeFromTrack,
    setUserPref
}


const KEY = 'user';
var gUser;
_createUser();

function query(filterBy) {
    return Promise.resolve(gUser)
}


async function addLikeToTrack(trackId, stationOrTrack) {
    if (stationOrTrack === 'station') {
        await gUser.likedStations.push(trackId)
    }
    else {
        await gUser.likedTracks.push(trackId)
    }
    _saveStationsToStorage()
    return Promise.resolve()
}

async function removeLikeFromTrack(currTrackId, stationOrTrack) {
    if (stationOrTrack === 'station') {
        let likedStations = gUser.likedStations.filter(trackId => trackId !== currTrackId)
        gUser.likedStations = likedStations
    }
    else {
        let likedTracks = gUser.likedTracks.filter(track => track.id !== currTrackId)
        gUser.likedTracks = likedTracks
    }

    _saveStationsToStorage()
    return Promise.resolve()
}

async function getLoggedinUser() {
    return Promise.resolve(gUser)
}

async function setUserPref(userPref) {
    gUser.userPref = userPref
    _saveStationsToStorage()
}




function saveStation(userToEdit) {
    return userToEdit.id ? _updateStation(userToEdit) : _addStation(userToEdit)
}


function _addStation(userToEdit) {
    var user = _createStation(userToEdit)
    gUser.unshift(user)
    _saveStationsToStorage();
    return Promise.resolve(user)
}

function _updateStation(userToEdit) {
    var userIdx = gUser.findIndex(function (user) {
        return user.id === userToEdit.id;
    })
    gUser[userIdx] = userToEdit
    _saveStationsToStorage();
    return Promise.resolve()
}


function getStationById(userId) {
    console.log(gUser);
    var user = gUser.find(function (user) {
        return userId === user._id
    })
    return Promise.resolve(user)
}


function getNextStationId(userId) {
    const userIdx = gUser.findIndex(user => user.id === userId)
    let nextStationIdx = userIdx + 1
    if (nextStationIdx === gUser.length) nextStationIdx = 0
    return gUser[nextStationIdx].id
}

function _createStation(userToEdit) {
    userToEdit._id = utilService.makeId()
    return userToEdit
}

function _createUser() {
    var user = storageService.loadFromStorage(KEY)
    //user = user ? storageService.loadFromStorage(KEY) : []
    if (!user) {
        user =
        {
            username: 'guest123',
            fullname: 'b',
            likedTracks: [],  // songs that marked with 'like'
            likedStations: [],
            recentlyPlayedStations: [],
            recentlyPlayedSongs: [],
            userPref: [],
        }
    }
    gUser = user;
    _saveStationsToStorage();
}

function _saveStationsToStorage() {
    storageService.saveToStorage(KEY, gUser)
}

