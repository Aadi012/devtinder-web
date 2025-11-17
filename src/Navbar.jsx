const Navbar = () => {
  return (
    <div className="navbar bg-base-200 shadow-md px-6">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl font-bold normal-case text-primary">
          devTinder
        </a>
      </div>

      <div className="flex items-center gap-4">
        <a className="btn btn-ghost">Projects</a>
        <a className="btn btn-ghost">Teams</a>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border border-gray-300">
              <img
                alt="Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
