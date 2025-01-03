import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL + '/api',
});

axiosClient.interceptors.request.use( (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use( (response) => {
    return response;
}, (error) => {
    const {response} = error;
    try {
        if (response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN');
        }
        if (response.status === 403) {
            return response;
        }
        // else 404, 403...
    } catch (e) {
        console.error(e);
    }

    throw error;
});

export default axiosClient;
