import  storageService from '../services/storage.service'
import { utilService } from './util.service.js'
import { gPlaylists } from "./data"

export const stationService = {
    query,
    saveStation,
    deleteStation,
    getStationById,
    getNextStationId
}
const KEY = 'stations';
var gStations;

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
    var station = gStations.find(function (station) {
        return stationId === station.id
    })
    return Promise.resolve(station)
}


function getNextStationId(stationId) {
    const stationIdx = gStations.findIndex(station => station.id === stationId)
    let nextStationIdx = stationIdx + 1
    if (nextStationIdx === gStations.length) nextStationIdx = 0
    return gStations[nextStationIdx].id
}

function _createStation(vendor, speed) {
    if (!speed) speed = utilService.getRandomIntInclusive(1, 200)
    return {
        id: utilService.makeId(),
        vendor,
        speed,
        desc: utilService.makeLorem(),
    }
}

function _createStations() {
    var stations = storageService.loadFromStorage(KEY)
    if (!stations || !stations.length) {
        stations = []
        gPlaylists.map(playlist=>{
         stations.push(playlist)
        })
    }
    gStations = stations;
    _saveStationsToStorage();
}

function _saveStationsToStorage() {
    storageService.saveToStorage(KEY, gStations)
}
