import { httpService } from './http.service.js'
import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true
});
const BASE_URL = (process.env.NODE_ENV == 'production')
    ? '/api/station'
    : 'http://localhost:3030/api/station';

export const stationServiceNew = {
    query,
    getStationById,
    searchStation,
    saveStation,
    getStationByGenre
}
async function query(filterBy = {}) {
    //const res = await axios.get('http://localhost:3030/api/toy', { params: filterBy })
    const res = await axios.get(`${BASE_URL}`, { params: filterBy })
    return res.data
}

async function getStationById(stationId) {
    const res = await axios.get(`${BASE_URL}/${stationId}`)
    return res.data
}

async function getStationByGenre(stationId) {
    const res = await axios.get(`${BASE_URL}/genre/${stationId}`)
    return res.data
}

function saveStation(stationToEdit) {
    return stationToEdit._id ? _updateStation(stationToEdit) : _addStation(stationToEdit)
}

async function _addStation(stationToEdit) {
    const res = await axios.post(`${BASE_URL}`, stationToEdit)
    return res.data
}

async function _updateStation(stationToEdit) {
    const res = await axios.put(`${BASE_URL}`, stationToEdit)
    return res.data
}


async function searchStation(keySearch) {
    const stations = await query({ keySearch })
    return stations
}




    //async function remove(toyId) {
    //    await axios.delete(`${BASE_URL}/${toyId}`)
    //}
