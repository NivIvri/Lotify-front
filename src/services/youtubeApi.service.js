import storageService from './storage.service'
import axios from 'axios'
import { stationServiceNew } from './station.service';
const KEY = 'stations';
let songCache = []
export const youtubeApiService = {
    searchTrack,
    getStationByTag,
}

async function searchTrack(keySerch) {
    if (!keySerch) return []
    console.log('service:', keySerch)
    //keySerch = keySerch.trim()
    songCache = storageService.loadFromStorage([keySerch])
    if (songCache) {
        console.log('No need to fetch, retrieving from Cache');
        return (songCache)
    }
    try {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${keySerch}&type=video&videoCategoryId=10&key=AIzaSyBM9DnPair7lsEiaBpo0qeE55Ok8ncDkks`)
        let idxs = res.data.items.map(track => track.id.videoId)
        idxs = idxs.join()

        let duration = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${idxs}&key=AIzaSyBM9DnPair7lsEiaBpo0qeE55Ok8ncDkks`)
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



async function getStationByTag(tagName) {
    let songCache = storageService.loadFromStorage(tagName + "playlist")
    if (songCache) {
        console.log('No need to fetch, retrieving from Cache');
        return (songCache)
    }

    try {
        const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${tagName}&type=playlist&key=AIzaSyBM9DnPair7lsEiaBpo0qeE55Ok8ncDkks`)
        let stations = await res.data.items.map(async (station) => {
            const songs = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${station.id.playlistId}&key=AIzaSyBM9DnPair7lsEiaBpo0qeE55Ok8ncDkks`)
            return {
                genre: tagName,
                name: station.snippet.title,
                tags: [tagName],
                createdBy: {
                    _id: "u101",
                    fullname: "app",
                    imgUrl: "http://some-photo"
                },
                songs: songs.data.items.map((track) => ({
                    id: track.snippet.resourceId.videoId,
                    title: track.snippet.title,
                    imgUrl: track.snippet.thumbnails.high.url,
                    duration: "PT4M26S"
                }))
            }
        })
        stations = await Promise.all(stations)
        await storageService.saveToStorage(tagName + 'playlist', stations)
        //stations = await stationServiceNew.saveStation(stations[0])
        return stations
    }
    catch (err) {
        console.log('Cannot reach server:', err);
    }
}

