import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { useEffect, useRef, useState } from "react";
import { applyTheme, initTheme } from "../utils/theme";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(initTheme());

  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  // Sticky navbar hide/reveal
  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      const y = window.scrollY;

      if (y > lastScrollY.current && y > 80) {
        nav.style.transform = "translateY(-140%)";
      } else {
        nav.style.transform = "translateY(0)";
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    } catch {}
    dispatch(removeUser());
    navigate("/login");
    setDropdownOpen(false);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const avatarSrc = user?.photoUrl || "/avatar-fallback.png";

  const isActive = (path) =>
    location.pathname === path ||
    (path === "/chats" && location.pathname.startsWith("/chat/"));

  return (
    <nav
      ref={navRef}
      className="
        fixed top-3 left-1/2 -translate-x-1/2
        w-[94%] md:w-[85%] lg:w-[75%]
        bg-white dark:bg-gray-900
        backdrop-blur-xl
        border border-gray-200 dark:border-gray-700
        rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]
        transition-all duration-300 z-999
        animate-[slideInDown_0.5s_ease-out]
      "
    >
      <div className="flex items-center justify-between px-6 py-3">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div
              className="
                w-11 h-11 rounded-xl 
                bg-linear-to-br from-pink-500 via-red-500 to-orange-500
                flex items-center justify-center
                text-white font-bold text-xl
                shadow-lg 
                group-hover:scale-110 group-hover:shadow-2xl group-hover:rotate-6
                transition-all duration-300
              "
            >
              H
            </div>

            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce delay-100"></div>
          </div>

          <div className="group-hover:translate-x-1 transition-all duration-300">
            <span
              className="
                text-2xl font-bold 
                bg-linear-to-r from-pink-600 via-red-500 to-orange-500 
                bg-clip-text text-transparent
                transition-all duration-300
              "
            >
              Homio
            </span>
            <p className="text-xs text-gray-500 -mt-1">For Developers</p>
          </div>
        </Link>

        {/* DESKTOP NAV — WHEN USER IS LOGGED IN */}
        {user && (
          <div className="hidden md:flex items-center gap-6">

            {/* Discover */}
            <Link
              to="/feed"
              className={`
                flex items-center px-4 py-2 rounded-full font-medium
                transition-all duration-300 relative
                ${
                  isActive("/feed")
                    ? "bg-linear-to-r from-pink-100 to-red-100 text-pink-600 shadow-md scale-105"
                    : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                }
              `}
            >
              Discover
            </Link>

            {/* Matches */}
            <Link
              to="/connections"
              className={`
                flex items-center px-4 py-2 rounded-full font-medium
                transition-all duration-300 relative
                ${
                  isActive("/connections")
                    ? "bg-linear-to-r from-pink-100 to-red-100 text-pink-600 shadow-md scale-105"
                    : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                }
              `}
            >
              Matches
            </Link>

            {/* Requests */}
            <Link
              to="/requests"
              className={`
                flex items-center px-4 py-2 rounded-full font-medium
                transition-all duration-300 relative
                ${
                  isActive("/requests")
                    ? "bg-linear-to-r from-pink-100 to-red-100 text-pink-600 shadow-md scale-105"
                    : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                }
              `}
            >
              Requests
            </Link>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-700 px-1 shadow-inner"
            >
              <span
                className={`
                  absolute w-6 h-6 bg-white rounded-full shadow-md transition-all
                  ${theme === "dark" ? "translate-x-7" : "translate-x-0"}
                `}
              ></span>
              <span className="absolute left-1 top-1 text-yellow-400 text-xs">☀</span>
              <span className="absolute right-1 top-1 text-blue-300 text-xs">🌙</span>
            </button>

            {/* AVATAR + DROPDOWN */}
            <div className="relative">
              <img
                src={avatarSrc}
                className="
                  w-10 h-10 rounded-full object-cover cursor-pointer
                  hover:scale-110 hover:shadow-xl transition-all duration-300
                "
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onError={(e) => (e.currentTarget.src = "/avatar-fallback.png")}
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>

              {dropdownOpen && (
                <div
                  className="
                    absolute right-0 mt-3 w-48 rounded-xl overflow-hidden
                    bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                    shadow-xl animate-[fadeInUp_0.2s_ease-out]
                  "
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-pink-50 dark:hover:bg-gray-800"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    to="/connections"
                    className="block px-4 py-2 hover:bg-pink-50 dark:hover:bg-gray-800"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Connections
                  </Link>

                  <Link
                    to="/requests"
                    className="block px-4 py-2 hover:bg-pink-50 dark:hover:bg-gray-800"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Requests
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* DESKTOP NAV — WHEN USER IS LOGGED OUT */}
        {!user && (
          <div className="hidden md:flex items-center gap-4">

            <Link
              to="/login"
              className="
                px-5 py-2 rounded-xl font-medium
                text-gray-700 hover:text-pink-600 
                hover:bg-pink-50 transition
              "
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="
                px-6 py-2 rounded-xl font-semibold text-white
                bg-linear-to-r from-pink-600 to-indigo-600
                shadow hover:scale-105 transition
              "
            >
              Sign Up
            </Link>

          </div>
        )}

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU — LOGGED IN */}
      {isMenuOpen && user && (
        <div className="md:hidden px-6 pb-5 pt-2 space-y-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <Link to="/feed" onClick={() => setIsMenuOpen(false)} className="block">Discover</Link>
          <Link to="/connections" onClick={() => setIsMenuOpen(false)} className="block">Matches</Link>
          <Link to="/requests" onClick={() => setIsMenuOpen(false)} className="block">Requests</Link>

          <button onClick={handleLogout} className="text-red-600 w-full text-left mt-3">Logout</button>
        </div>
      )}

      {/* MOBILE MENU — LOGGED OUT */}
      {isMenuOpen && !user && (
        <div className="md:hidden px-6 pb-5 pt-2 space-y-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block">Login</Link>
          <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
