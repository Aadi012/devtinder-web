import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true });
        dispatch(removeUser());
        navigate("/login")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar bg-base-200 shadow-md px-8 py-4">
      {/* Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-3xl font-extrabold normal-case text-primary"
        >
          devTinder
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link className="btn btn-ghost hover:bg-primary hover:text-white transition-colors">
          Projects
        </Link>
        <Link className="btn btn-ghost hover:bg-primary hover:text-white transition-colors">
          Teams
        </Link>

        {/* User Dropdown */}
        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">
                Welcome, {user.firstName}
              </span>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden">
                  <img
                    alt="user avatar"
                    src={user.photoUrl}
                    className="object-cover w-full h-full"
                  />
                </div>
              </label>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to = "/connections">Connections</Link>
              </li>
              <li>
                <Link to = "/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;