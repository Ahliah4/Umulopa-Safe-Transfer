// src/api/bloodPacks.js
import apiClient from './client';

const BloodPackService = {
    /**
     * Get all blood packs with filters
     */
    getAll: async (params = {}) => {
        const { page = 1, limit = 10, bloodGroup, status } = params;
        const queryParams = new URLSearchParams({
            page,
            limit,
            ...(bloodGroup && { bloodGroup }),
            ...(status && { status }),
        });
        
        const response = await apiClient.get(`/blood-packs?${queryParams}`);
        return response.data;
    },

    /**
     * Get blood pack by ID
     */
    getById: async (id) => {
        const response = await apiClient.get(`/blood-packs/${id}`);
        return response.data;
    },

    /**
     * Get blood packs by pack ID
     */
    getByPackId: async (packId) => {
        const response = await apiClient.get(`/blood-packs/pack/${packId}`);
        return response.data;
    },

    /**
     * Register a new blood pack
     */
    create: async (packData) => {
        const response = await apiClient.post('/blood-packs', packData);
        return response.data;
    },

    /**
     * Update blood pack status
     */
    updateStatus: async (id, status) => {
        const response = await apiClient.patch(`/blood-packs/${id}/status`, { status });
        return response.data;
    },

    /**
     * Get expiring blood packs
     */
    getExpiringSoon: async () => {
        const response = await apiClient.get('/blood-packs/expiring-soon');
        return response.data;
    },

    /**
     * Get blood pack statistics
     */
    getStats: async () => {
        const response = await apiClient.get('/blood-packs/stats');
        return response.data;
    },

    /**
     * Reserve a blood pack
     */
    reserve: async (id) => {
        const response = await apiClient.post(`/blood-packs/${id}/reserve`);
        return response.data;
    },

    /**
     * Mark blood pack as transfused
     */
    markTransfused: async (id) => {
        const response = await apiClient.post(`/blood-packs/${id}/transfuse`);
        return response.data;
    },

    /**
     * Discard blood pack
     */
    discard: async (id, reason) => {
        const response = await apiClient.post(`/blood-packs/${id}/discard`, { reason });
        return response.data;
    },
};

export default BloodPackService;