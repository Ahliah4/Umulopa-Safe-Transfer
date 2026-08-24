// src/api/reports.js
import apiClient from './client';

const ReportService = {
    /**
     * Get daily inventory report
     */
    getDailyInventory: async (date) => {
        const query = date ? `?date=${date}` : '';
        const response = await apiClient.get(`/reports/daily-inventory${query}`);
        return response.data;
    },

    /**
     * Get weekly usage report
     */
    getWeeklyUsage: async (weekStart) => {
        const query = weekStart ? `?weekStart=${weekStart}` : '';
        const response = await apiClient.get(`/reports/weekly-usage${query}`);
        return response.data;
    },

    /**
     * Get expired blood report
     */
    getExpiredBlood: async () => {
        const response = await apiClient.get('/reports/expired');
        return response.data;
    },

    /**
     * Get donor activity report
     */
    getDonorActivity: async (params = {}) => {
        const { period = 'month', startDate, endDate } = params;
        const queryParams = new URLSearchParams({
            period,
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
        });
        
        const response = await apiClient.get(`/reports/donor-activity?${queryParams}`);
        return response.data;
    },

    /**
     * Get transfusion statistics
     */
    getTransfusionStats: async (params = {}) => {
        const { period = 'month', startDate, endDate } = params;
        const queryParams = new URLSearchParams({
            period,
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
        });
        
        const response = await apiClient.get(`/reports/transfusions?${queryParams}`);
        return response.data;
    },

    /**
     * Get low stock incident report
     */
    getLowStockIncidents: async (params = {}) => {
        const { period = 'month', startDate, endDate } = params;
        const queryParams = new URLSearchParams({
            period,
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
        });
        
        const response = await apiClient.get(`/reports/low-stock?${queryParams}`);
        return response.data;
    },

    /**
     * Export report in PDF or Excel
     */
    export: async (type, params = {}) => {
        const queryParams = new URLSearchParams(params);
        const response = await apiClient.get(`/reports/export/${type}?${queryParams}`, {
            responseType: 'blob',
        });
        return response.data;
    },

    /**
     * Generate custom report
     */
    generate: async (reportData) => {
        const response = await apiClient.post('/reports/generate', reportData);
        return response.data;
    },

    /**
     * Get report templates
     */
    getTemplates: async () => {
        const response = await apiClient.get('/reports/templates');
        return response.data;
    },

    /**
     * Get saved reports
     */
    getSavedReports: async () => {
        const response = await apiClient.get('/reports/saved');
        return response.data;
    },
};

export default ReportService;