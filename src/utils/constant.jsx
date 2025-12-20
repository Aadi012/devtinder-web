// -----------------------------------------------------------
// 🌐 ENVIRONMENT CONFIG
// -----------------------------------------------------------

// Auto-detect environment
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;

// Backend URL (local vs production)
export const BASE_URL = IS_DEV
  ? "http://localhost:8888"
  : import.meta.env.VITE_API_URL || "/api";


// -----------------------------------------------------------
// 🔥 BRANDING
// -----------------------------------------------------------

export const BRAND_NAME = "Homio";

// Paths from /public folder (Vite serves these statically)
export const LOGO = "/logo.png";
export const FAVICON = "/favicon.png";


// -----------------------------------------------------------
// 🎨 DESIGN TOKENS (brand system)
// (Used for UI consistency, themes, animations, etc.)
// -----------------------------------------------------------

export const COLORS = {
  primary: "#6366F1", // Indigo-500 → Premium SaaS color
  secondary: "#3B82F6", // Blue-500
  dark: "#0F172A", // Slate-900
  light: "#F5F7FA",
  glassWhite: "rgba(255, 255, 255, 0.65)",
  glassBorder: "rgba(255, 255, 255, 0.45)",
};


// -----------------------------------------------------------
// 🧭 APP ROUTES
// -----------------------------------------------------------

export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  feed: "/feed",
  profile: "/profile",
  connections: "/connections",
  requests: "/requests",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
};


// -----------------------------------------------------------
// 📡 API ENDPOINTS (optional upgrade)
// (Use this in axios calls to prevent hardcoding routes)
// -----------------------------------------------------------

export const API = {
  login: `${BASE_URL}/login`,
  signup: `${BASE_URL}/signup`,
  logout: `${BASE_URL}/logout`,
  profile: `${BASE_URL}/profile/view`,
  feed: `${BASE_URL}/feed`,
  connections: `${BASE_URL}/connections`,
  requests: `${BASE_URL}/requests`,
};
