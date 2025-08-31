import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:5000/api',
    baseURL:'https://orderease-backend-mc1u.onrender.com/api',
    withCredentials: true
})

export default instance