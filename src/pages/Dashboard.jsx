// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import { useAppState } from "../context/useAppState";
import DonorDashboard from "./dashboard/DonorDashboard";
import StaffDashboard from "./dashboard/StaffDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import RegionalDashboard from "./dashboard/RegionalDashboard";
import { normaliseRole, ROLES } from "../utils/roles";

export default function Dashboard() {
  const navigate = useNavigate();
  const { patients, bloodRequests, transfusions, donors, user } = useAppState();
  
  // ✅ Calculate totals with safe defaults
  const totals = {
    patients: patients?.length || 0,
    requests: bloodRequests?.length || 0,
    transfusions: transfusions?.length || 0,
    donors: donors?.length || 0
  };
  
  // ✅ Normalize role with fallback
  const role = normaliseRole(user?.role) || ROLES.DONOR;

  // ✅ Dashboard mapping
  const dashboards = {
    [ROLES.DONOR]: <DonorDashboard totals={totals} onNavigate={navigate} />,
    [ROLES.HOSPITAL_STAFF]: <StaffDashboard totals={totals} onNavigate={navigate} />,
    [ROLES.REGIONAL_CENTRE]: <RegionalDashboard totals={totals} onNavigate={navigate} />,
    [ROLES.SYSTEM_ADMIN]: <AdminDashboard totals={totals} onNavigate={navigate} />,
  };

  // ✅ Return the appropriate dashboard or a fallback
  const DashboardComponent = dashboards[role];
  
  if (!DashboardComponent) {
    console.warn(`⚠️ No dashboard found for role: ${role}`);
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Dashboard</h2>
        <p className="text-gray-500 mt-2">No dashboard available for your role.</p>
        <button 
          onClick={() => navigate('/profile')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Profile
        </button>
      </div>
    );
  }

  return DashboardComponent;
}
