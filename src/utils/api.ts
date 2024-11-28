import axios from 'axios';
import { router } from '@/router';
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const storedData = localStorage.getItem('user');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const token = parsedData.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear user data if needed
            localStorage.removeItem('user');

            // Redirect to the login page
            router.push({ name: 'Login' }).catch((err) => {
                console.warn('Redirect error:', err);
            });
        }
        return Promise.reject(error); // Reject other errors for local handling
    }
);
export default api;
