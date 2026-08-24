// src/api/auth.js
import apiClient from './client';
import API_CONFIG from './config';

const AuthService = {
    /**
     * Login user
     */
    login: async (email, password) => {
        try {
            const response = await apiClient.post('/auth/login', { email, password });

            if (response.data.success) {
                const { accessToken, refreshToken, user } = response.data.data;

                localStorage.setItem(API_CONFIG.tokenKey, accessToken);
                localStorage.setItem(API_CONFIG.refreshTokenKey, refreshToken);
                localStorage.setItem(API_CONFIG.userKey, JSON.stringify(user));
            }

            return response.data;
        } catch (error) {
            console.error('AuthService.login error:', error.message);
            throw error;
        }
    },

    /**
     * Register a new user
     */
    register: async (userData) => {
        try {
            const response = await apiClient.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            console.error('AuthService.register error:', error.message);
            throw error;
        }
    },

    /**
     * Get current user profile
     */
    getProfile: async () => {
        try {
            const response = await apiClient.get('/auth/me');
            return response.data;
        } catch (error) {
            console.error('❌ Get profile error:', error.message);
            throw error;
        }
    },

    /**
     * Logout user
     */
    logout: async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error('❌ Logout error:', error.message);
        } finally {
            // ✅ Clear local storage regardless
            localStorage.removeItem(API_CONFIG.tokenKey);
            localStorage.removeItem(API_CONFIG.refreshTokenKey);
            localStorage.removeItem(API_CONFIG.userKey);
        }
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: () => {
        const token = localStorage.getItem(API_CONFIG.tokenKey);
        return !!token;
    },

    /**
     * Get current user from local storage
     */
    getCurrentUser: () => {
        const userStr = localStorage.getItem(API_CONFIG.userKey);
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    },

    /**
     * Refresh access token
     */
    refreshToken: async () => {
        const refreshToken = localStorage.getItem(API_CONFIG.refreshTokenKey);
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }
        
        try {
            const response = await apiClient.post('/auth/refresh-token', { refreshToken });
            if (response.data.success) {
                const { accessToken } = response.data.data;
                localStorage.setItem(API_CONFIG.tokenKey, accessToken);
            }
            return response.data;
        } catch (error) {
            console.error('❌ Refresh token failed:', error.message);
            throw error;
        }
    },

    /**
     * Change password
     */
    changePassword: async (oldPassword, newPassword) => {
        try {
            const response = await apiClient.post('/auth/change-password', { oldPassword, newPassword });
            return response.data;
        } catch (error) {
            console.error('❌ Change password error:', error.message);
            throw error;
        }
    },

    /**
     * Forgot password
     */
    forgotPassword: async (email) => {
        try {
            const response = await apiClient.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            console.error('❌ Forgot password error:', error.message);
            throw error;
        }
    },

    /**
     * Reset password
     */
    resetPassword: async (token, newPassword) => {
        try {
            const response = await apiClient.post('/auth/reset-password', { token, newPassword });
            return response.data;
        } catch (error) {
            console.error('❌ Reset password error:', error.message);
            throw error;
        }
    },
};

export default AuthService;