import axios from 'axios';
const api = axios.create({
  baseURL: 'https://vite-app-backend-aek2.onrender.com/api/', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(function (config) {
    const accessToken =  localStorage.getItem('accessToken')
    console.log('accessToken :>> ', accessToken);
    if(accessToken) {
      const newConfig = {...config}
      newConfig.headers['X-Access-Token']  = accessToken
      return config
    }
    return config
    
    }, function (error) {
      return Promise.reject(error);
    });
    
    export default api;
    
    