export const ROLES = Object.freeze({
  SYSTEM_ADMIN: "admin",
  REGIONAL_CENTRE: "regional",
  HOSPITAL_STAFF: "staff",
  DONOR: "donor",
});

export const roleLabels = {
  [ROLES.SYSTEM_ADMIN]: "System Administrator",
  [ROLES.REGIONAL_CENTRE]: "Regional Blood Centre",
  [ROLES.HOSPITAL_STAFF]: "Hospital Staff",
  [ROLES.DONOR]: "Blood Donor",
};

const dashboardPaths = {
  [ROLES.SYSTEM_ADMIN]: "/admin",
  [ROLES.REGIONAL_CENTRE]: "/regional",
  [ROLES.HOSPITAL_STAFF]: "/staff",
  [ROLES.DONOR]: "/donor",
};

export function normaliseRole(role) {
  if (role === "SuperAdmin" || role === "SystemAdministrator") return ROLES.SYSTEM_ADMIN;
  if (role === "RegionalCentre") return ROLES.REGIONAL_CENTRE;
  if (role === "HospitalStaff") return ROLES.HOSPITAL_STAFF;
  if (role === "Donor") return ROLES.DONOR;
  return Object.values(ROLES).includes(role) ? role : ROLES.DONOR;
}

export function getDashboardPath(role) {
  return dashboardPaths[normaliseRole(role)];
}

const staffRoutes = [
  "/patients", "/patients/add", "/patients/request", "/patients/history", "/patients/transfusions",
  "/inventory", "/inventory/add", "/donors", "/reports/weekly", "/reports/usage",
  "/reports/low-stock", "/reports/monthly", "/settings",
];
const adminRoutes = ["/admin/users", "/admin/roles", "/admin/hospitals", "/admin/permissions", "/admin/audit-logs", "/admin/reports", "/admin/system-health", "/admin/backup", "/admin/settings"];
const regionalRoutes = ["/regional/inventory", "/regional/distribution", "/regional/hospitals", "/regional/emergency", "/regional/transfers", "/regional/analytics", "/regional/reports", "/regional/settings"];
const staffDashboardRoutes = ["/staff/emergency"];
const donorRoutes = ["/donor/donate", "/donor/appointments", "/donor/donations", "/donor/history", "/donor/emergency", "/donor/rewards", "/donor/profile"];

export function canAccessRoute(role, path) {
  const route = path.split("?")[0].replace(/\/$/, "") || "/";
  const resolvedRole = normaliseRole(role);
  if (route === getDashboardPath(resolvedRole) || route === "/change-password") return true;
  if (resolvedRole === ROLES.SYSTEM_ADMIN) return adminRoutes.includes(route) || regionalRoutes.includes(route) || staffRoutes.includes(route);
  if (resolvedRole === ROLES.REGIONAL_CENTRE) return regionalRoutes.includes(route) || staffRoutes.includes(route);
  if (resolvedRole === ROLES.HOSPITAL_STAFF) return route.startsWith("/patients/") || staffDashboardRoutes.includes(route) || staffRoutes.includes(route);
  return donorRoutes.includes(route) || route === "/settings";
}

export const sidebarNav = [
  { to: "/dashboard", label: "Dashboard", icon: "home", roles: Object.values(ROLES) },
  { section: "Hospital operations", roles: [ROLES.HOSPITAL_STAFF] },
  { to: "/patients/add", label: "Register Patient", icon: "userPlus", roles: [ROLES.HOSPITAL_STAFF] },
  { to: "/patients/request", label: "Blood Requests", icon: "droplet", roles: [ROLES.HOSPITAL_STAFF, ROLES.REGIONAL_CENTRE] },
  { to: "/patients/transfusions", label: "Transfusions", icon: "heartbeat", roles: [ROLES.HOSPITAL_STAFF] },
  { section: "Blood centre", roles: [ROLES.REGIONAL_CENTRE, ROLES.SYSTEM_ADMIN] },
  { to: "/inventory", label: "Blood Inventory", icon: "inventory", roles: [ROLES.REGIONAL_CENTRE, ROLES.SYSTEM_ADMIN] },
  { to: "/inventory/add", label: "Add Blood Pack", icon: "plus", roles: [ROLES.REGIONAL_CENTRE] },
  { to: "/donors", label: "Donor Registry", icon: "users", roles: [ROLES.HOSPITAL_STAFF, ROLES.REGIONAL_CENTRE, ROLES.SYSTEM_ADMIN] },
  { section: "Reports", roles: [ROLES.REGIONAL_CENTRE, ROLES.SYSTEM_ADMIN] },
  { to: "/reports/weekly", label: "Weekly Report", icon: "file", roles: [ROLES.REGIONAL_CENTRE, ROLES.SYSTEM_ADMIN] },
  { to: "/reports/usage", label: "Usage Statistics", icon: "chart", roles: [ROLES.REGIONAL_CENTRE, ROLES.SYSTEM_ADMIN] },
  { to: "/reports/low-stock", label: "Low Stock", icon: "alert", roles: [ROLES.HOSPITAL_STAFF, ROLES.REGIONAL_CENTRE, ROLES.SYSTEM_ADMIN] },
  { to: "/settings", label: "Settings", icon: "settings", roles: Object.values(ROLES) },
];

export const getNavItemsForRole = (role) => sidebarNav.filter((item) => item.roles.includes(normaliseRole(role)));
export const resolveDashboardLink = (role, item) => item.to === "/dashboard" ? getDashboardPath(role) : item.to;
