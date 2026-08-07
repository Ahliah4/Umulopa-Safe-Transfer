import { useEffect, useMemo, useState } from "react";
import { AppStateContext } from "./AppStateContext";
import {
  patients as initialPatients,
  donors as initialDonors,
  bloodRequests as initialBloodRequests,
  historyData as initialHistoryData,
  transfusions as initialTransfusions,
  weeklyActivity as initialWeeklyActivity,
  weeklyReportRows as initialWeeklyReportRows,
  usageMetrics as initialUsageMetrics,
  usageRows as initialUsageRows,
  initialStock,
} from "../data/sampleData";
import { clearAuthentication } from "../utils/authStorage";


function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(`umulopa_${key}`);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(`umulopa_${key}`, JSON.stringify(value)); } catch { /* storage is optional */ }
  }, [key, value]);
  return [value, setValue];
}

export function AppStateProvider({ children }) {
  const [patients, setPatients] = useStoredState("patients", initialPatients);
  const [bloodRequests, setBloodRequests] = useStoredState("bloodRequests", initialBloodRequests);
  const [history, setHistory] = useStoredState("history", initialHistoryData);
  const [transfusions, setTransfusions] = useStoredState("transfusions", initialTransfusions);
  const [donors, setDonors] = useStoredState("donors", initialDonors);
  const [weeklyActivity, setWeeklyActivity] = useStoredState("weeklyActivity", initialWeeklyActivity);
  const [weeklyReportRows, setWeeklyReportRows] = useStoredState("weeklyReportRows", initialWeeklyReportRows);
  const [usageMetrics, setUsageMetrics] = useStoredState("usageMetrics", initialUsageMetrics);
  const [usageRows, setUsageRows] = useStoredState("usageRows", initialUsageRows);
  const [stock, setStock] = useStoredState("stock", initialStock);
  const [adminUsers, setAdminUsers] = useStoredState("adminUsers", [
    { id: 1, name: "Dr. Chola Banda", email: "chola@ndola.org", role: "staff", hospital: "Ndola Teaching Hospital", status: "Active" },
    { id: 2, name: "Mwansa Tembo", email: "mwansa@centre.zm", role: "regional", hospital: "Copperbelt Blood Centre", status: "Active" },
    { id: 3, name: "Ruth Phiri", email: "ruth.phiri@mail.com", role: "donor", hospital: "—", status: "Pending" },
  ]);
  const [hospitals, setHospitals] = useStoredState("hospitals", [
    { id: 1, name: "Ndola Teaching Hospital", units: 48, status: "Active" },
    { id: 2, name: "Kabwe General Hospital", units: 31, status: "Active" },
    { id: 3, name: "Mufulira District Hospital", units: 18, status: "Active" },
  ]);
  const [transfers, setTransfers] = useStoredState("transfers", []);
  const [appointments, setAppointments] = useStoredState("appointments", []);
  const [emergencyResponses, setEmergencyResponses] = useStoredState("emergencyResponses", []);
  const [auditLogs, setAuditLogs] = useStoredState("auditLogs", [
    { id: 1, event: "System initialised", detail: "UMULOPA application state loaded", time: new Date().toLocaleString() },
  ]);
  const [notifications, setNotifications] = useStoredState("notifications", [
    "Urgent blood request pending for Ndola Teaching Hospital.",
    "Nightly inventory snapshot is available.",
  ]);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('umulopa_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('umulopa_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('umulopa_user');
    clearAuthentication();
  };

  const value = useMemo(
    () => ({
      patients,
      setPatients,
      bloodRequests,
      setBloodRequests,
      history,
      setHistory,
      transfusions,
      setTransfusions,
      donors,
      setDonors,
      weeklyActivity,
      setWeeklyActivity,
      weeklyReportRows,
      setWeeklyReportRows,
      usageMetrics,
      setUsageMetrics,
      usageRows,
      setUsageRows,
      stock,
      setStock,
      adminUsers,
      setAdminUsers,
      hospitals,
      setHospitals,
      transfers,
      setTransfers,
      appointments,
      setAppointments,
      emergencyResponses,
      setEmergencyResponses,
      auditLogs,
      setAuditLogs,
      notifications,
      setNotifications,
      user,
      login,
      logout,
    }),
    [
      patients,
      setPatients,
      bloodRequests,
      setBloodRequests,
      history,
      setHistory,
      transfusions,
      setTransfusions,
      donors,
      setDonors,
      weeklyActivity,
      setWeeklyActivity,
      weeklyReportRows,
      setWeeklyReportRows,
      usageMetrics,
      setUsageMetrics,
      usageRows,
      setUsageRows,
      stock,
      setStock,
      adminUsers,
      setAdminUsers,
      hospitals,
      setHospitals,
      transfers,
      setTransfers,
      appointments,
      setAppointments,
      emergencyResponses,
      setEmergencyResponses,
      auditLogs,
      setAuditLogs,
      notifications,
      setNotifications,
      user,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}
