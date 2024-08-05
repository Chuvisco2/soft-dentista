import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',  // Certifique-se de que o backend está rodando nesta URL
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export default api;
