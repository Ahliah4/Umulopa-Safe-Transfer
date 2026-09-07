// src/api/config.js

const getBaseURL = () => {
    // Priority 1: Environment variable
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL.replace(/\/$/, '');
    }

    // Priority 2: Production URL
    if (import.meta.env.NODE_ENV === 'production') {
        return 'https://api.umoyolink.com';
    }

    // Priority 3: Default development URL (server root)
    return 'http://localhost:5000';
};

const getApiBaseURL = () => `${getBaseURL().replace(/\/api$/, '')}/api`;

const API_CONFIG = {
    // ✅ Base URL (no /api prefix) - for health checks
    baseURL: getBaseURL(),
    
    // API routes are mounted by the backend under /api.
    apiBaseURL: getApiBaseURL(),
    
    // ✅ Timeout
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 60000,
    
    // ✅ Token storage keys
    tokenKey: import.meta.env.VITE_TOKEN_KEY || 'umoyolink_token',
    refreshTokenKey: import.meta.env.VITE_REFRESH_TOKEN_KEY || 'umoyolink_refresh_token',
    userKey: import.meta.env.VITE_USER_KEY || 'umoyolink_user',
    
    // ✅ Default headers
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    
    // ✅ Enable debug mode (set VITE_DEBUG=false in .env to disable)
    debug: import.meta.env.VITE_DEBUG !== 'false',
    
    // ✅ Health check endpoint
    healthEndpoint: '/health',
};

export default API_CONFIG;
