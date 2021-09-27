import storageService from '../services/storage.service'
import { utilService } from './util.service.js'
import { gPlaylists } from "./data";
import axios from 'axios'
export const stationService = {
    query,
    saveStation,
    deleteStation,
    getStationById,
    getNextStationId,
    searchSong
}
const KEY = 'stations';
var gStations;
let songCache = []
_createStations();

function query(filterBy) {
    return Promise.resolve(gStations)
}

function deleteStation(stationId) {
    var stationIdx = gStations.findIndex(function (station) {
        return stationId === station.id
    })
    gStations.splice(stationIdx, 1)
    _saveStationsToStorage();
    return Promise.resolve()
}

function saveStation(stationToEdit) {
    return stationToEdit.id ? _updateStation(stationToEdit) : _addStation(stationToEdit)
}


function _addStation(stationToEdit) {
    var station = _createStation(stationToEdit.vendor, stationToEdit.speed)
    gStations.unshift(station)
    _saveStationsToStorage();
    return Promise.resolve()
}

function _updateStation(stationToEdit) {
    var stationIdx = gStations.findIndex(function (station) {
        return station.id === stationToEdit.id;
    })
    gStations[stationIdx] = stationToEdit
    _saveStationsToStorage();
    return Promise.resolve()
}


function getStationById(stationId) {
    console.log(gStations);
    var station = gStations.find(function (station) {
        return stationId === station._id
    })
    return Promise.resolve(station)
}


function getNextStationId(stationId) {
    const stationIdx = gStations.findIndex(station => station.id === stationId)
    let nextStationIdx = stationIdx + 1
    if (nextStationIdx === gStations.length) nextStationIdx = 0
    return gStations[nextStationIdx].id
}

function _createStation() {

}

function _createStations() {
    var stations = storageService.loadFromStorage(KEY)
    if (!stations || !stations.length) {
        stations = []
        gPlaylists.map(playlist => {
            stations.push(playlist)
        })
    }
    gStations = stations;
    _saveStationsToStorage();
}

function _saveStationsToStorage() {
    storageService.saveToStorage(KEY, gStations)
}


async function searchSong(keySerch) {
    console.log('service:', keySerch)
    //keySerch = keySerch.trim()
    songCache = storageService.loadFromStorage([keySerch])
    if (songCache) {
        console.log('No need to fetch, retrieving from Cache');
        return (songCache)
    }

    //debugger
    try {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${keySerch}&type=video&videoCategoryId=10&key=AIzaSyDv4FZEk6YGXCuTdAs7Ib_UErbyFh3eUUs`)
        console.log('Axios RES:', res);
        songCache = res.data
        await storageService.saveToStorage([keySerch], res.data)
        console.log(res.data, 'res.data');
        return res.data
    }

    catch (err) {
        console.log('Cannot reach server:', err);
    }
}


