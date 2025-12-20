import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  const [loadingUser, setLoadingUser] = useState(true);

  const publicRoutes = [
    "/", "/login", "/signup",
    "/about", "/contact",
    "/privacy-policy", "/terms-and-conditions",
  ];

  const fetchUser = async () => {
    if (user) {
      setLoadingUser(false);
      return;
    }

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      const status = err.response?.status;

      if (
        (status === 400 || status === 401) &&
        !publicRoutes.includes(window.location.pathname)
      ) {
        navigate("/login");
      }
    }

    setLoadingUser(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Detect LOGIN & SIGNUP PAGE
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      <Navbar />

      {/* Auth pages should be FULL WIDTH with NO margin */}
      <div className={isAuthPage ? "" : "max-w-7xl mx-auto px-4 pt-24 pb-10"}>
        {loadingUser ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Body;
