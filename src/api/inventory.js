// src/api/inventory.js
import apiClient from './client';

const InventoryService = {
    /**
     * Get full inventory overview
     */
    getOverview: async () => {
        const response = await apiClient.get('/inventory');
        return response.data;
    },

    /**
     * Get inventory summary with totals
     */
    getSummary: async () => {
        const response = await apiClient.get('/inventory/summary');
        return response.data;
    },

    /**
     * Get low stock items
     */
    getLowStock: async () => {
        const response = await apiClient.get('/inventory/low-stock');
        return response.data;
    },

    /**
     * Get critical stock items
     */
    getCriticalStock: async () => {
        const response = await apiClient.get('/inventory/critical-stock');
        return response.data;
    },

    /**
     * Get inventory by blood group
     */
    getByBloodGroup: async (bloodGroup) => {
        const response = await apiClient.get(`/inventory/${bloodGroup}`);
        return response.data;
    },

    /**
     * Refresh inventory
     */
    refresh: async () => {
        const response = await apiClient.post('/inventory/refresh');
        return response.data;
    },

    /**
     * Get inventory alerts
     */
    getAlerts: async () => {
        const response = await apiClient.get('/inventory/alerts');
        return response.data;
    },

    /**
     * Update inventory threshold
     */
    updateThreshold: async (bloodGroup, minThreshold, criticalThreshold) => {
        const response = await apiClient.patch(`/inventory/${bloodGroup}/threshold`, {
            minThreshold,
            criticalThreshold,
        });
        return response.data;
    },
};

export default InventoryService;