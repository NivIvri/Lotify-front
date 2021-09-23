import { storageService } from "./async-storage.service"
const KEY='stations'


const gPlaylists = require('../data/playlist.json')

function query() {
    return Promise.resolve(gPlaylists);
}

function getById(playlistId) {
    debugger
    const playlist = gPlaylists.find(playlist => playlist._id === playlistId)
    return Promise.resolve(playlist)
}

function remove(playlistId) {
    const idx = gPlaylists.findIndex(playlist => playlist._id === playlistId)
    gPlaylists.splice(idx, 1)
    return _savePlaylistsToFile()
}


function save(playlist) {
    if (playlist._id) {
        const idx = gPlaylists.findIndex(currPlaylist => currPlaylist._id === playlist._id)
        gPlaylists[idx] = playlist;
    } else {
        playlist._id = _makeId()
        gPlaylists.push(playlist)
    }
    return _savePlaylistsToFile()
        .then(() => {
            return playlist;
        })
}

module.exports = {
    query,

}

async function query(){
    return await storageService.query(KEY)
}