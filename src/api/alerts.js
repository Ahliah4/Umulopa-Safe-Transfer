// src/api/alerts.js
import apiClient from './client';

const AlertService = {
    /**
     * Get all alerts with pagination and filters
     */
    getAll: async (params = {}) => {
        const { page = 1, limit = 10, status, type, severity } = params;
        const queryParams = new URLSearchParams({
            page,
            limit,
            ...(status && { status }),
            ...(type && { type }),
            ...(severity && { severity }),
        });
        
        const response = await apiClient.get(`/alerts?${queryParams}`);
        return response.data;
    },

    /**
     * Get alert by ID
     */
    getById: async (id) => {
        const response = await apiClient.get(`/alerts/${id}`);
        return response.data;
    },

    /**
     * Get pending alerts
     */
    getPending: async () => {
        const response = await apiClient.get('/alerts/pending');
        return response.data;
    },

    /**
     * Get unread alerts
     */
    getUnread: async () => {
        const response = await apiClient.get('/alerts/unread');
        return response.data;
    },

    /**
     * Create a new alert
     */
    create: async (alertData) => {
        const response = await apiClient.post('/alerts', alertData);
        return response.data;
    },

    /**
     * Update alert status
     */
    updateStatus: async (id, status) => {
        const response = await apiClient.patch(`/alerts/${id}/status`, { status });
        return response.data;
    },

    /**
     * Mark alert as read
     */
    markAsRead: async (id) => {
        const response = await apiClient.post(`/alerts/${id}/read`);
        return response.data;
    },

    /**
     * Mark alert as resolved
     */
    resolve: async (id) => {
        const response = await apiClient.post(`/alerts/${id}/resolve`);
        return response.data;
    },

    /**
     * Test donor alert
     */
    testDonorAlert: async (donorId, message) => {
        const response = await apiClient.post('/alerts/test-donor', { donorId, message });
        return response.data;
    },

    /**
     * Send Kitwe notification
     */
    notifyKitwe: async (message) => {
        const response = await apiClient.post('/alerts/notify-kitwe', { message });
        return response.data;
    },

    /**
     * Get alert statistics
     */
    getStats: async () => {
        const response = await apiClient.get('/alerts/stats');
        return response.data;
    },
};

export default AlertService;