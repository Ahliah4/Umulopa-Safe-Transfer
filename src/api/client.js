// src/api/client.js
import axios from 'axios';
import API_CONFIG from './config';

// ✅ Create axios instance with the correct baseURL (no /api)
const apiClient = axios.create({
    baseURL: API_CONFIG.apiBaseURL, // ✅ Now this is just http://localhost:5000
    timeout: API_CONFIG.timeout,
    headers: API_CONFIG.headers,
});

// ✅ Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        if (API_CONFIG.debug) {
            console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
            console.log('  Headers:', config.headers);
            if (config.data) {
                console.log('  Data:', config.data);
            }
        }
        
        // ✅ Add token if available
        const token = localStorage.getItem(API_CONFIG.tokenKey);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// ✅ Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        if (API_CONFIG.debug) {
            console.log(`✅ API Response: ${response.config.url}`, response.status);
        }
        return response;
    },
    (error) => {
        // ✅ Handle network errors
        if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
            console.error('❌ Network Error: Cannot connect to backend');
            console.error('   Make sure backend is running at:', API_CONFIG.baseURL);
            
            const customError = new Error('Unable to connect to server. Please check if the backend is running.');
            customError.isNetworkError = true;
            customError.originalError = error;
            return Promise.reject(customError);
        }
        
        // ✅ Handle 401 Unauthorized
        if (error.response?.status === 401) {
            console.warn('⚠️ 401 Unauthorized - Token may be expired');
        }
        
        // ✅ Log other errors
        if (API_CONFIG.debug) {
            console.error('❌ API Error:', error.response?.status, error.message);
            console.error('  URL:', error.config?.url);
            console.error('  Data:', error.response?.data);
        }
        
        return Promise.reject(error);
    }
);

// ✅ Test function to check connection
export const testConnection = async () => {
    try {
        console.log('🔍 Testing connection to:', API_CONFIG.baseURL);
        const response = await axios.get(`${API_CONFIG.baseURL}${API_CONFIG.healthEndpoint}`);
        console.log('✅ Connection successful!', response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        return { success: false, error: error.message };
    }
};

export default apiClient;