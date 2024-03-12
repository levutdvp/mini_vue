import axios from "axios";

const accessToken = localStorage.getItem('accessToken')
const apiGet = axios.create({
    baseURL: 'https://random-data-api.com/api/',
    timeout: 5000,
    headers:{
        'Content-Type': 'application/json',
        'X-Access-Token': `${accessToken}`
    }
})

export default apiGet