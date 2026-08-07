import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import RoleModulePage from "./pages/RoleModulePage";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import { isAuthenticated } from "./utils/authStorage";
import { canAccessRoute, getDashboardPath } from "./utils/roles";
import { useAppState } from "./context/useAppState";

const lazy = (loader) => React.createElement(React.lazy(loader));

function ProtectedRoute({ children }) {
  const { user } = useAppState();
  const location = useLocation();
  if (!isAuthenticated() || !user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!canAccessRoute(user.role, location.pathname)) return <Navigate to={getDashboardPath(user.role)} replace />;
  return children;
}

function PublicOnly({ children }) {
  const { user } = useAppState();
  return isAuthenticated() && user ? <Navigate to={getDashboardPath(user.role)} replace /> : children;
}

export function AppRoutes() {
  const { user } = useAppState();
  const dashboard = user ? getDashboardPath(user.role) : "/login";
  return <Suspense fallback={<div className="min-h-screen grid place-items-center bg-slate-50">Loading…</div>}><Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
    <Route path="/login/donor" element={<PublicOnly><Login /></PublicOnly>} />
    <Route path="/login/staff" element={<PublicOnly><Login /></PublicOnly>} />
    <Route path="/login/regional" element={<PublicOnly><Login /></PublicOnly>} />
    <Route path="/login/admin" element={<PublicOnly><Login /></PublicOnly>} />
    <Route path="/login/*" element={<Navigate to="/login" replace />} />
    <Route path="/signup" element={<PublicOnly><Signup /></PublicOnly>} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
    <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
      <Route path="dashboard" element={<Navigate to={dashboard} replace />} />
      <Route path="admin" element={<Dashboard />} />
      <Route path="admin/users" element={<RoleModulePage />} />
      <Route path="admin/roles" element={<RoleModulePage />} />
      <Route path="admin/hospitals" element={<RoleModulePage />} />
      <Route path="admin/permissions" element={<RoleModulePage />} />
      <Route path="admin/audit-logs" element={<RoleModulePage />} />
      <Route path="admin/reports" element={<RoleModulePage />} />
      <Route path="admin/system-health" element={<RoleModulePage />} />
      <Route path="admin/settings" element={<RoleModulePage />} />
      <Route path="admin/backup" element={<RoleModulePage />} />
      <Route path="regional" element={<Dashboard />} />
      <Route path="regional/inventory" element={<RoleModulePage />} />
      <Route path="regional/distribution" element={<RoleModulePage />} />
      <Route path="regional/hospitals" element={<RoleModulePage />} />
      <Route path="regional/emergency" element={<RoleModulePage />} />
      <Route path="regional/transfers" element={<RoleModulePage />} />
      <Route path="regional/analytics" element={<RoleModulePage />} />
      <Route path="regional/reports" element={<RoleModulePage />} />
      <Route path="regional/settings" element={<RoleModulePage />} />
      <Route path="staff" element={<Dashboard />} />
      <Route path="staff/emergency" element={<RoleModulePage />} />
      <Route path="donor" element={<Dashboard />} />
      <Route path="donor/donate" element={<RoleModulePage />} />
      <Route path="donor/appointments" element={<RoleModulePage />} />
      <Route path="donor/donations" element={<RoleModulePage />} />
      <Route path="donor/history" element={<RoleModulePage />} />
      <Route path="donor/emergency" element={<RoleModulePage />} />
      <Route path="donor/rewards" element={<RoleModulePage />} />
      <Route path="donor/profile" element={<RoleModulePage />} />
      <Route path="admin/dashboard" element={<Navigate to="/admin" replace />} />
      <Route path="staff/dashboard" element={<Navigate to="/staff" replace />} />
      <Route path="donor/dashboard" element={<Navigate to="/donor" replace />} />
      <Route path="patients" element={lazy(() => import("./pages/patients/PatientManagement"))} />
      <Route path="patients/add" element={lazy(() => import("./pages/patients/PatientManagement"))} />
      <Route path="patients/:patientId" element={lazy(() => import("./pages/patients/PatientManagement"))} />
      <Route path="patients/request" element={lazy(() => import("./pages/patients/BloodRequest"))} />
      <Route path="patients/history" element={lazy(() => import("./pages/patients/RequestHistory"))} />
      <Route path="patients/transfusions" element={lazy(() => import("./pages/patients/TransfusionHistory"))} />
      <Route path="inventory" element={lazy(() => import("./pages/inventory/InventoryDashboard"))} />
      <Route path="inventory/add" element={lazy(() => import("./pages/inventory/AddBloodPack"))} />
      <Route path="donors" element={lazy(() => import("./pages/donors/DonorList"))} />
      <Route path="reports/weekly" element={lazy(() => import("./pages/reports/WeeklyReport"))} />
      <Route path="reports/usage" element={lazy(() => import("./pages/reports/UsageStatistics"))} />
      <Route path="reports/low-stock" element={lazy(() => import("./pages/reports/LowStockReport"))} />
      <Route path="reports/monthly" element={lazy(() => import("./pages/reports/MonthlyReport"))} />
      <Route path="settings" element={lazy(() => import("./pages/Settings"))} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes></Suspense>;
}

export default function App() { return <BrowserRouter><AppRoutes /></BrowserRouter>; }
