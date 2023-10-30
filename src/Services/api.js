import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-moments-prisma.onrender.com'
})

export default api;