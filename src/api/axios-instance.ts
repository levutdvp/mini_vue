import axios from "axios";
export const apiLogin = axios.create({
  baseURL: 'https://vite-app-backend-aek2.onrender.com/api/auth/login',
  headers: {
    'Content-type': 'application/json',
  },
})
export const apiUserInfo = axios.create({
  headers:{
    'Content-Type': 'application/json'
  },
  baseURL:'https://vite-app-backend-aek2.onrender.com/api/user/userInfo'
})