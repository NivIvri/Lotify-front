const fs = require('fs')


const gPlaylists = require('../data/playlist.json')

function query() {
    return Promise.resolve(gPlaylists);
}

function getById(playlistId) {
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
    getById,
    remove,
    save
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _savePlaylistsToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/playlist.json', JSON.stringify(gPlaylists, null, 2), (err) => {
            if (err) return reject(err)
            resolve();
        })
    })
}
