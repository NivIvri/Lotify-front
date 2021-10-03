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
    add,
    update,
    //getById,
    //remove,
    //add,
    //addReview,
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





//async function remove(toyId) {
//    await axios.delete(`${BASE_URL}/${toyId}`)
//}


async function add(newStation) {
    console.log(newStation,'newStation');
    const res = await axios.post(`${BASE_URL}`, newStation)
    return res.data
}
async function update(track, stationId) {
    const res = await axios.put(`${BASE_URL}`, {track, stationId})
    return res.data
}
//async function addReview(toyId, review) {
//    //const res = await axios.post('http://localhost:3030/api/toy/review', { toyId, review })
//    const res = await axios.post(`${BASE_URL}/review`, { toyId, review })
//    return res.data
//}
