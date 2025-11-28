import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-base-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* LEFT — LOGO */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-primary hover:text-primary-focus transition"
        >
          Homio
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-primary font-medium">Home</Link>
          <Link to="/about" className="hover:text-primary font-medium">About</Link>
          <Link to="/contact" className="hover:text-primary font-medium">Contact</Link>

          {user && (
            <>
              <Link to="/feed" className="hover:text-primary font-medium">Feed</Link>
              <Link to="/connections" className="hover:text-primary font-medium">Connections</Link>
              <Link to="/requests" className="hover:text-primary font-medium">Requests</Link>
            </>
          )}
        </div>

        {/* RIGHT — USER DROPDOWN */}
        {user ? (
          <div className="dropdown dropdown-end hidden md:block">
            <div tabIndex={0} className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium text-gray-600">
                Hi, {user.firstName}
              </span>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={user.photoUrl}
                  className="object-cover w-full h-full"
                  alt="avatar"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary hidden md:flex">
            Login
          </Link>
        )}

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden btn btn-ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-base-100 shadow-inner py-4">
          <div className="flex flex-col px-6 gap-3">

            <Link to="/" className="py-2 border-b" onClick={()=>setIsOpen(false)}>Home</Link>
            <Link to="/about" className="py-2 border-b" onClick={()=>setIsOpen(false)}>About</Link>
            <Link to="/contact" className="py-2 border-b" onClick={()=>setIsOpen(false)}>Contact</Link>

            {user && (
              <>
                <Link to="/feed" className="py-2 border-b" onClick={()=>setIsOpen(false)}>Feed</Link>
                <Link to="/connections" className="py-2 border-b" onClick={()=>setIsOpen(false)}>Connections</Link>
                <Link to="/requests" className="py-2 border-b" onClick={()=>setIsOpen(false)}>Requests</Link>
                <button
                  className="py-2 text-left text-red-600"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <Link to="/login" className="btn btn-primary mt-3" onClick={()=>setIsOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
