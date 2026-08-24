// src/pages/auth/Login.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCheck, FaTint, FaEnvelope, FaEye, FaEyeSlash, FaLock, FaShieldAlt } from "react-icons/fa";
import AuthLayout from "./AuthLayout";
import { setAuthenticated, isAuthenticated } from "../../utils/authStorage";
import { useAppState } from "../../context/useAppState";
import { getDashboardPath, ROLES, roleLabels } from "../../utils/roles";
import AuthService from "../../api/auth";

function Login() {
  const { login } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  // Determine role from URL
  const routeRole = location.pathname === "/login/staff" 
    ? ROLES.STAFF 
    : location.pathname === "/login/regional" 
      ? ROLES.REGIONAL 
      : location.pathname === "/login/admin" 
        ? ROLES.ADMIN 
        : ROLES.DONOR;

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(routeRole);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!email || !email.trim()) {
      setError("Please enter your email address");
      setErrorType("auth");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      setErrorType("auth");
      return;
    }

    setLoading(true);
    setError("");
    setErrorType("");

    try {
      const response = await AuthService.login(email.trim(), password);

      if (response && response.success) {
        const token = localStorage.getItem('umoyolink_token');

        if (!token) {
          setError("Login succeeded but token not saved. Please try again.");
          setErrorType("unknown");
          setLoading(false);
          return;
        }

        setAuthenticated(email.trim());
        
        login({ 
          email: email.trim(), 
          username: email.trim(), 
          role, 
          rememberMe 
        });

        const dashboardPath = location.state?.from?.pathname || getDashboardPath(role);
        
        setTimeout(() => {
          navigate(dashboardPath, { replace: true });
        }, 150);
        
      } else {
        const errorMsg = response?.message || "Login failed. Please try again.";
        setError(errorMsg);
        setErrorType("auth");
      }
      
    } catch (err) {

      if (err.isNetworkError || err.message === 'Network Error') {
        setError("Unable to connect to server. Please check if the backend is running.");
        setErrorType("network");
      } else if (err.response) {
        const status = err.response.status;
        if (status === 401) {
          setError("Invalid email or password. Please try again.");
          setErrorType("auth");
        } else if (status === 404) {
          setError("Login endpoint not found. Please check API configuration.");
          setErrorType("network");
        } else {
          setError(err.response.data?.message || "An error occurred. Please try again.");
          setErrorType("unknown");
        }
      } else {
        setError(err.message || "Login failed. Please try again.");
        setErrorType("unknown");
      }
      
    } finally {
      setLoading(false);
    }
  };

  // Render error message
  const renderError = () => {
    if (!error) return null;

    const bgColor = errorType === "network" 
      ? "bg-yellow-50 border-yellow-400 text-yellow-800" 
      : "bg-red-50 border-red-400 text-red-800";

    return (
      <div className={`mb-4 rounded-lg border p-4 ${bgColor}`}>
        <div className="flex items-start gap-3">
          <span className="text-lg">
            {errorType === "network" ? "⚠️" : "❌"}
          </span>
          <div>
            <p className="font-medium">{error}</p>
            {errorType === "network" && (
              <p className="mt-1 text-sm opacity-75">
                Make sure the backend is running at http://localhost:5000
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <AuthLayout
      subtitle="Sign in to access your UMULOPA workspace."
      eyebrow="Secure sign in"
      footer={
        <>
          <span>Need access? </span>
          <Link to="/signup">Create account</Link>
        </>
      }
    >
      <div className="animate-[fadeUp_.55s_ease-out]">
        {/* Header - Mobile */}
        <div className="mb-9 flex items-center gap-3 lg:hidden">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7e1420] text-white shadow-lg">
            <FaTint />
          </span>
          <div>
            <p className="text-lg font-bold tracking-[.16em] text-[#71101b]">UMULOPA</p>
            <p className="text-[11px] font-medium tracking-wide text-slate-500">SAFE BLOOD TRANSFER</p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fff0f1] px-3 py-1.5 text-xs font-semibold text-[#8f1220]">
            <FaShieldAlt /> Secure sign in
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
          <p className="mt-2 leading-6 text-slate-500">
            Sign in to access your UMULOPA workspace.
          </p>
        </div>

        {/* Error Display */}
        {renderError()}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
            <span className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-[#9f1725] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#9f1725]/10">
              <FaEnvelope className="text-slate-400" />
              <input
                className="w-full bg-transparent px-3 py-3.5 text-sm outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@organisation.com"
                autoComplete="email"
                required
              />
            </span>
          </label>

          {/* Password */}
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
            <span className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-[#9f1725] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#9f1725]/10">
              <FaLock className="text-slate-400" />
              <input
                className="w-full bg-transparent px-3 py-3.5 text-sm outline-none"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                className="p-1 text-slate-400 hover:text-[#8f1220]"
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </span>
          </label>

          {/* Role Selection */}
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Access role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#9f1725] focus:bg-white focus:ring-4 focus:ring-[#9f1725]/10"
            >
              {Object.values(ROLES).map((value) => (
                <option key={value} value={value}>
                  {roleLabels[value]}
                </option>
              ))}
            </select>
          </label>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                className="peer sr-only"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="grid h-5 w-5 place-items-center rounded border border-slate-300 bg-white text-[10px] text-white transition peer-checked:border-[#8f1220] peer-checked:bg-[#8f1220]">
                <FaCheck />
              </span>
              Remember me
            </label>
            <Link
              className="text-sm font-semibold text-[#8f1220] hover:text-[#5e0c16] hover:underline"
              to="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#74101a] to-[#aa1c2a] px-5 py-4 text-sm font-bold text-white shadow-[0_12px_25px_rgba(126,20,32,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(126,20,32,.32)] disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <FaTint />
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-8 text-center text-sm text-slate-500">
          New blood donor?{" "}
          <Link className="font-semibold text-[#8f1220] hover:underline" to="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

// ✅ THIS IS THE IMPORTANT PART - DEFAULT EXPORT
export default Login;
