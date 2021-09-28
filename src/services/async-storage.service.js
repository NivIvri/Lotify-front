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
    searchSong,
    addToStation,
    removeFromStation
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
    debugger
    if (!keySerch) return []
    console.log('service:', keySerch)
    //keySerch = keySerch.trim()
    songCache = storageService.loadFromStorage([keySerch])
    if (songCache) {
        console.log('No need to fetch, retrieving from Cache');
        return (songCache)
    }
    try {
        debugger
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${keySerch}&type=video&videoCategoryId=10&key=AIzaSyDv4FZEk6YGXCuTdAs7Ib_UErbyFh3eUUs`)
        let idxs = res.data.items.map(track => track.id.videoId)
        idxs = idxs.join()


        let duration = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${idxs}&key=AIzaSyCcPSr5m43ZCmSIEcCOn-klalKLwfoJp1Y`)
        duration = duration.data.items.map(track => track.contentDetails.duration)
        songCache = res.data
        if (!res.data?.items.length) return []
        const trackResult = res.data.items.map((track, idx) => {
            return {
                id: track.id.videoId,
                title: track.snippet.title,
                imgUrl: track.snippet.thumbnails.high.url,
                duration: duration[idx]
            }
        })

        await storageService.saveToStorage([keySerch], trackResult)
        console.log(trackResult, 'trackResult');

        return trackResult
    }
    catch (err) {
        console.log('Cannot reach server:', err);
    }
}

async function addToStation(track,stationId){
    const currStation=gStations.find((station)=>station._id===stationId)
    currStation.songs.push(track)
    _saveStationsToStorage()
}

async function removeFromStation(track,stationId){
    const currStation=gStations.find((station)=>station._id===stationId)
    const idx=currStation.songs.findIndex(currTrack=>track.id===currTrack.id)
    currStation.songs.splice(idx,1)
    _saveStationsToStorage()
}




//try {
//    const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${keySerch}&type=video&videoCategoryId=10&key=AIzaSyDv4FZEk6YGXCuTdAs7Ib_UErbyFh3eUUs`)
//    const prmDuration = axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=ma9I9VBKPiw,bpOSxM0rNPM&key=AIzaSyDv4FZEk6YGXCuTdAs7Ib_UErbyFh3eUUs`)
//    debugger
//    const [res, duration] = await Promise.all([prmRes, prmDuration])
//    console.log('Axios RES:', res);
//    //console.log('Axios RES:', duration);
//    songCache = res.data
//    await storageService.saveToStorage([keySerch], res.data)
//    console.log(res.data, 'res.data');
//    return [res.data, duration.items.contentDetails.duration]
//}

//catch (err) {
//    console.log('Cannot reach server:', err);
//}
//}


