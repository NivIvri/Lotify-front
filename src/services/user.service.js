import Axios from 'axios'
import { httpService } from './http.service';
const axios = Axios.create({
    withCredentials: true
});

const BASE_URL = (process.env.NODE_ENV == 'production')
    ? '/api/auth'
    : 'http://localhost:3030/api/auth';


const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getById
}




window.userService = userService;

async function login(credentials) {
    let res = await axios.post(`${BASE_URL}/login`, credentials)
    let user = res.data
    if (user) {
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    }
    return user;
}
async function signup(userInfo) {
    let res = await axios.post(`${BASE_URL}/signup`, userInfo)
    //let res = await axios.post('http://localhost:3030/api/auth/signup', userInfo)
    let user = res.data
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user;
}


async function logout() {
    await httpService.get('auth/logout')
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    return Promise.resolve()
}

async function getLoggedinUser() {
    const user = {
        username: 'a',
        fullname: 'b',
    }
    await sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))

    return await JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user;
}
