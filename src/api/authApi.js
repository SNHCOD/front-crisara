import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api', // ajusta la URL según tu configuración
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // Método para autenticar
  login(params) {
    return apiClient.post('/login', params);
  },
};
