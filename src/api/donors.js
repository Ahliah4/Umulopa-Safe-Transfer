// src/api/donors.js
import apiClient from './client';

const DonorService = {
    /**
     * Get all donors with pagination and filters
     */
    getAll: async (params = {}) => {
        const { page = 1, limit = 10, search, bloodGroup, status } = params;
        const queryParams = new URLSearchParams({
            page,
            limit,
            ...(search && { search }),
            ...(bloodGroup && { bloodGroup }),
            ...(status && { status }),
        });
        
        const response = await apiClient.get(`/donors?${queryParams}`);
        return response.data;
    },

    /**
     * Get donor by ID
     */
    getById: async (id) => {
        const response = await apiClient.get(`/donors/${id}`);
        return response.data;
    },

    /**
     * Get active donors
     */
    getActive: async () => {
        const response = await apiClient.get('/donors/active');
        return response.data;
    },

    /**
     * Get active donors by blood group
     */
    getActiveByBloodGroup: async (bloodGroup) => {
        const response = await apiClient.get(`/donors/active/${bloodGroup}`);
        return response.data;
    },

    /**
     * Register a new donor
     */
    create: async (donorData) => {
        const response = await apiClient.post('/donors', donorData);
        return response.data;
    },

    /**
     * Update donor information
     */
    update: async (id, donorData) => {
        const response = await apiClient.patch(`/donors/${id}`, donorData);
        return response.data;
    },

    /**
     * Delete donor (soft delete)
     */
    delete: async (id) => {
        const response = await apiClient.delete(`/donors/${id}`);
        return response.data;
    },

    /**
     * Get donor eligibility status
     */
    getEligibility: async (id) => {
        const response = await apiClient.get(`/donors/${id}/eligibility`);
        return response.data;
    },
};

export default DonorService;