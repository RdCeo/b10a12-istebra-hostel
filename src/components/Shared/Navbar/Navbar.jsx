import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { IoMdNotifications } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole";
import navLogo from "../../../../src/assets/logo/New Project.png";
import navIcon from "../../../../src/assets/logo/profile.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [role] = useRole();

  const handleLogOut = () => {
    logOut().then(() => toast.success("Logged out successfully!"));
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors px-2 py-1 rounded ${
            isActive
              ? "text-blue-600 bg-blue-100/60 shadow-sm"
              : "hover:text-blue-600 hover:bg-blue-100/40"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/meals"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors px-2 py-1 rounded ${
            isActive
              ? "text-blue-600 bg-blue-100/60 shadow-sm"
              : "hover:text-blue-600 hover:bg-blue-100/40"
          }`
        }
      >
        Meals
      </NavLink>
      <NavLink
        to="/upcoming-meals"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors px-2 py-1 rounded ${
            isActive
              ? "text-blue-600 bg-blue-100/60 shadow-sm"
              : "hover:text-blue-600 hover:bg-blue-100/40"
          }`
        }
      >
        Upcoming Meals
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={navLogo}
              alt="Istebra Logo"
              className="w-10 h-10 rounded-full object-cover shadow-md hover:scale-105 transition"
            />
            <span className="text-xl font-bold text-gray-800">
              <span className="text-blue-600">ISTEBRA  </span>HOSTEL
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks}
            <IoMdNotifications className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600 hover:scale-110 transition-transform" />
            {user ? (
              <div className="relative">
                <img
                  src={user?.photoURL || navIcon}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500 cursor-pointer hover:scale-105 transition"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 w-44 z-50 p-2">
                    <p className="text-gray-700 text-sm px-3">{user?.displayName}</p>
                    <Link
                      to={role === "admin" ? "/dashboard/admin-profile" : "/dashboard/user-profile"}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 w-full text-left px-3 py-2 hover:bg-red-50 rounded transition"
                    >
                      <CiLogout /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:scale-105 transition"
              >
                Join Us
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center"
          >
            <img
              src={user?.photoURL || navIcon}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-600"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/90 backdrop-blur-md py-3 border-t border-gray-200 shadow-sm">
          <div className="flex flex-col gap-2 px-4">
            {navLinks}
            {user ? (
              <>
                <Link
                  to={role === "admin" ? "/dashboard/admin-profile" : "/dashboard/user-profile"}
                  className="block text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 mt-2 transition"
                >
                  <CiLogout /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-block mt-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:scale-105 transition"
              >
                Join Us
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
