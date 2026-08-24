// src/api/transfusions.js
import apiClient from './client';

const TransfusionService = {
    /**
     * Get all transfusions with pagination and filters
     */
    getAll: async (params = {}) => {
        const { page = 1, limit = 10, status, patientId } = params;
        const queryParams = new URLSearchParams({
            page,
            limit,
            ...(status && { status }),
            ...(patientId && { patientId }),
        });
        
        const response = await apiClient.get(`/transfusions?${queryParams}`);
        return response.data;
    },

    /**
     * Get transfusion by ID
     */
    getById: async (id) => {
        const response = await apiClient.get(`/transfusions/${id}`);
        return response.data;
    },

    /**
     * Allocate blood for a patient
     */
    allocate: async (data) => {
        const response = await apiClient.post('/transfusions/allocate', data);
        return response.data;
    },

    /**
     * Complete a transfusion
     */
    complete: async (id, notes) => {
        const response = await apiClient.post(`/transfusions/${id}/complete`, { notes });
        return response.data;
    },

    /**
     * Cancel a transfusion
     */
    cancel: async (id, reason) => {
        const response = await apiClient.post(`/transfusions/${id}/cancel`, { reason });
        return response.data;
    },

    /**
     * Get transfusion statistics
     */
    getStats: async () => {
        const response = await apiClient.get('/transfusions/stats');
        return response.data;
    },

    /**
     * Get transfusions by patient
     */
    getByPatient: async (patientId) => {
        const response = await apiClient.get(`/transfusions/patient/${patientId}`);
        return response.data;
    },

    /**
     * Get weekly transfusion summary
     */
    getWeeklySummary: async () => {
        const response = await apiClient.get('/transfusions/weekly-summary');
        return response.data;
    },
};

export default TransfusionService;