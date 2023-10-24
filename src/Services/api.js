import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-seekpet.onrender.com'
})

export default api;