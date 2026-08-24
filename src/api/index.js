// src/api/index.js
// Export all services for easy importing

// ✅ Core exports
import API_CONFIG from './config';
import apiClient, { testConnection } from './client';

export { API_CONFIG, apiClient, testConnection };

// ✅ Service exports with error handling for missing files
let AuthService, DonorService, BloodPackService, PatientService, 
    TransfusionService, InventoryService, AlertService, ReportService;

try {
    AuthService = (await import('./auth')).default;
} catch (e) {
    console.warn('⚠️ AuthService not available:', e.message);
}

try {
    DonorService = (await import('./donors')).default;
} catch (e) {
    console.warn('⚠️ DonorService not available:', e.message);
}

try {
    BloodPackService = (await import('./bloodPacks')).default;
} catch (e) {
    console.warn('⚠️ BloodPackService not available:', e.message);
}

try {
    PatientService = (await import('./patients')).default;
} catch (e) {
    console.warn('⚠️ PatientService not available:', e.message);
}

try {
    TransfusionService = (await import('./transfusions')).default;
} catch (e) {
    console.warn('⚠️ TransfusionService not available:', e.message);
}

try {
    InventoryService = (await import('./inventory')).default;
} catch (e) {
    console.warn('⚠️ InventoryService not available:', e.message);
}

try {
    AlertService = (await import('./alerts')).default;
} catch (e) {
    console.warn('⚠️ AlertService not available:', e.message);
}

try {
    ReportService = (await import('./reports')).default;
} catch (e) {
    console.warn('⚠️ ReportService not available:', e.message);
}

export {
    AuthService,
    DonorService,
    BloodPackService,
    PatientService,
    TransfusionService,
    InventoryService,
    AlertService,
    ReportService,
};

// ✅ Default export for convenience
export default {
    API_CONFIG,
    apiClient,
    AuthService,
    DonorService,
    BloodPackService,
    PatientService,
    TransfusionService,
    InventoryService,
    AlertService,
    ReportService,
};