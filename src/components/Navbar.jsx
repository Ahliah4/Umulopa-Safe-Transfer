import { useMemo, useState } from "react";
import { FaEnvelope, FaBars, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../context/useAppState";
import { clearAuthentication } from "../utils/authStorage";
import { normaliseRole, roleLabels } from "../utils/roles";
import NotificationDropdown from "./ui/NotificationDropdown";
import UserMenu from "./ui/UserMenu";

function Navbar({ onMobileMenuToggle }) {
  const navigate = useNavigate();
  const { user, logout } = useAppState();
  const [showPanel, setShowPanel] = useState(null);

  const profileName = useMemo(() => {
    if (user?.username) return user.username;
    if (user?.email) return user.email.split("@")[0];
    if (user?.name) return user.name;
    return "User";
  }, [user]);

  const roleLabel = useMemo(() => roleLabels[normaliseRole(user?.role)], [user]);

  const initials = useMemo(() => profileName.slice(0, 2).toUpperCase(), [profileName]);

  const handleLogout = () => {
    logout();
    clearAuthentication();
    navigate("/login", { replace: true });
  };

  const renderPanel = () => {
    if (showPanel === "notifications") {
      return (
        <div className="absolute right-0 top-12 w-[min(20rem,calc(100vw-2rem))] rounded-3xl border border-gray-200 bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900">Notifications</p>
            <button type="button" onClick={() => setShowPanel(null)} className="text-sm text-[#7A0916]">Close</button>
          </div>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-[#FFF5F5] p-3 text-sm text-gray-700">Urgent blood request pending for Ndola Teaching Hospital.</div>
            <div className="rounded-2xl bg-gray-50 p-3 text-sm text-gray-700">Your donor profile is active and visible to partner hospitals.</div>
          </div>
        </div>
      );
    }

    if (showPanel === "messages") {
      return (
        <div className="absolute right-0 top-12 w-[min(20rem,calc(100vw-2rem))] rounded-3xl border border-gray-200 bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900">Messages</p>
            <button type="button" onClick={() => setShowPanel(null)} className="text-sm text-[#7A0916]">Close</button>
          </div>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-[#FFF5F5] p-3 text-sm text-gray-700">Staff update: Donor availability updated for O-.</div>
            <div className="rounded-2xl bg-gray-50 p-3 text-sm text-gray-700">Admin notice: Daily inventory report is ready.</div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onMobileMenuToggle} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 bg-white text-[#6B0F1A] md:hidden">
            <FaBars />
          </button>
          <div className="rounded-full bg-[#F3E9E9] px-3 py-2 text-sm font-semibold text-[#6B0F1A]">
            {roleLabel}
          </div>
          <nav className="hidden sm:flex sm:flex-wrap sm:items-center sm:gap-2 text-sm text-gray-500">
            <span>Home</span>
            <span className="text-gray-300">/</span>
            <span>{roleLabel}</span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <label className="hidden w-full items-center gap-2 rounded-[28px] border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-500 sm:flex sm:w-72">
            <FaSearch />
            <input type="search" placeholder="Search dashboard" className="w-full bg-transparent outline-none" />
          </label>
          <NotificationDropdown open={showPanel === "notifications"} onToggle={() => setShowPanel(showPanel === "notifications" ? null : "notifications")} notifications={["Urgent blood request pending for Ndola Teaching Hospital.", "Your donor profile is active and visible to partner hospitals."]} />
          <div className="relative">
            <button type="button" onClick={() => setShowPanel(showPanel === "messages" ? null : "messages")} className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-gray-200 bg-white text-[#6B0F1A] shadow-sm transition hover:bg-gray-50">
              <FaEnvelope />
            </button>
            {renderPanel()}
          </div>
          <UserMenu name={profileName} initials={initials} role={roleLabel} onProfile={() => navigate("/settings")} onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
