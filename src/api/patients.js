// src/api/patients.js
import apiClient from './client';

const PatientService = {
    /**
     * Get all patients with pagination and filters
     */
    getAll: async (params = {}) => {
        const { page = 1, limit = 10, search, bloodGroup, ward } = params;
        const queryParams = new URLSearchParams({
            page,
            limit,
            ...(search && { search }),
            ...(bloodGroup && { bloodGroup }),
            ...(ward && { ward }),
        });
        
        const response = await apiClient.get(`/patients?${queryParams}`);
        return response.data;
    },

    /**
     * Get patient by ID
     */
    getById: async (id) => {
        const response = await apiClient.get(`/patients/${id}`);
        return response.data;
    },

    /**
     * Get patient by hospital ID
     */
    getByHospitalId: async (hospitalId) => {
        const response = await apiClient.get(`/patients/hospital/${hospitalId}`);
        return response.data;
    },

    /**
     * Register a new patient
     */
    create: async (patientData) => {
        const response = await apiClient.post('/patients', patientData);
        return response.data;
    },

    /**
     * Update patient information
     */
    update: async (id, patientData) => {
        const response = await apiClient.patch(`/patients/${id}`, patientData);
        return response.data;
    },

    /**
     * Submit blood request for patient
     */
    requestBlood: async (id, requestData) => {
        const response = await apiClient.post(`/patients/${id}/requests`, requestData);
        return response.data;
    },

    /**
     * Get patient blood requests
     */
    getRequests: async (id) => {
        const response = await apiClient.get(`/patients/${id}/requests`);
        return response.data;
    },

    /**
     * Get patient transfusion history
     */
    getTransfusions: async (id) => {
        const response = await apiClient.get(`/patients/${id}/transfusions`);
        return response.data;
    },

    /**
     * Discharge patient
     */
    discharge: async (id) => {
        const response = await apiClient.post(`/patients/${id}/discharge`);
        return response.data;
    },

    /**
     * Get active patients
     */
    getActive: async () => {
        const response = await apiClient.get('/patients/active');
        return response.data;
    },
};

export default PatientService;