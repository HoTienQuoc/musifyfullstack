import axios from 'axios'
import { API_BASE_URL } from '../App'

// create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('adminToken');
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

// Response interceptor to handle auth encors globally
apiClient.interceptors.request.use(
    response => response,
    error => {
        if(error.response?.status===401){
            //Token expired or invalid
            localStorage.removeItem('adminToken')
            localStorage.removeItem('adminUser')
            window.location.href="/login";
        }
        return Promise.reject(error)
    }
);

export const songsApi = {
    add: (formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        return apiClient.post('/api/songs',formData, config);
    },
    list: () => apiClient.get('/api/songs'),
    remove: (id) => apiClient.delete(`/api/songs/${id}`)
}

export const albumsApi = {
    add: (formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        return apiClient.post('/api/albums',formData, config);
    },
    list: () => apiClient.get('/api/albums'),
    remove: (id) => apiClient.delete(`/api/albums/${id}`)
}

export default apiClient;