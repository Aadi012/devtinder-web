
// Compatible with DaisyUI + Tailwind v4

// Get stored theme OR fallback to light
export const initTheme = () => {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem("theme");

  if (stored === "light" || stored === "dark") {
    applyTheme(stored);
    return stored;
  }

  // Detect system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = prefersDark ? "dark" : "light";

  applyTheme(theme);
  return theme;
};

// Apply theme properly for DaisyUI
export const applyTheme = (theme) => {
  const html = document.documentElement;

  // DaisyUI expects this:
  html.setAttribute("data-theme", theme);

  // Save theme
  localStorage.setItem("theme", theme);
};
