import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUtensils } from "react-icons/fa";
import useRole from "../../../hooks/useRole";
import {
  MdNoMealsOuline,
  MdOutlineAdminPanelSettings,
  MdOutlineReviews,
  MdStars,
} from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoRestaurantOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar, HiOutlineUserCircle } from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role] = useRole();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      {/* mobile devices */}
      <div className="md:hidden">
        {/* Hamburger Icon for Mobile Devices */}
        <div className="md:hidden flex items-center justify-between p-4 ">
          <Link to="/">
            <span className="text-xl md:text-2xl font-semibold text-blue-600 bg-gray-100 px-2 py-2 rounded-tl-lg rounded-br-lg">
              Hostel Manager
            </span>
          </Link>
          <button onClick={toggleSidebar} className="text-xl text-blue-500">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-white z-40 transform transition-transform duration-300 ease-in-out 
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:flex md:flex-col w-64`}
        >
          <Link to="/" className="p-4">
            <div className="flex items-center space-x-2 px-6">
              <span className="text-xl md:text-2xl font-semibold text-blue-600 bg-gray-100 px-2 py-2 rounded-tl-lg rounded-br-lg">
                Hostel Manager
              </span>
            </div>
          </Link>
          {role === "admin" && (
            <div className="flex flex-col justify-between flex-1 space-y-6 mt-2 px-6">
              <NavLink
                to="/dashboard/admin-profile"
                className={({ isActive }) =>
                  isActive
                    ? " font-medium text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                <div className="flex items-center gap-3">
                  <MdOutlineAdminPanelSettings className="text-2xl" />
                  <span>Admin Profile</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/manage-users"
                className={({ isActive }) =>
                  isActive
                    ? " font-medium text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                <div className="flex items-center gap-3">
                  <GrUserManager className="text-2xl" />
                  <span>Manage Users</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/add-meals"
                className={({ isActive }) =>
                  isActive
                    ? " font-medium text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                <div className="flex items-center gap-3">
                  <IoMdAddCircleOutline className="text-2xl" />
                  <span>Add Meals</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/all-meals"
                className={({ isActive }) =>
                  isActive
                    ? " font-medium text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                <div className="flex items-center gap-3">
                  <MdNoMealsOuline className="text-2xl" />
                  <span>All Meals</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/all-reviews"
                className={({ isActive }) =>
                  isActive
                    ? " font-medium text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                <div className="flex items-center gap-3">
                  <MdOutlineReviews className="text-2xl" />
                  <span>All Reviews</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/serve-meals"
                className={({ isActive }) =>
                  isActive
                    ? " font-medium text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                <div className="flex items-center gap-3">
                  <IoRestaurantOutline className="text-2xl" />
                  <span>Serve Meals</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/coming-meals"
                className={({ isActive }) =>
                  isActive
                    ? " font-medium text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                <div className="flex items-center gap-3">
                  <FaUtensils className="text-2xl" />
                  <span>Upcoming Meals</span>
                </div>
              </NavLink>
            </div>
          )}
          {role === "customer" && (
            <div className="flex flex-col justify-between flex-1 space-y-6 mt-4 px-6">
              <NavLink
                to="/dashboard/user-profile"
                className={({ isActive }) =>
                  isActive
                    ? " font-medium text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                <div className="flex items-center gap-3">
                  <HiOutlineUserCircle className="text-2xl" />
                  <span>My Profile</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/requested-meals"
                className={({ isActive }) =>
                  isActive
                    ? " font-medium text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                <div className="flex items-center gap-3">
                  <FaUtensils className="text-2xl" />
                  <span>Requested Meals</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/my-reviews"
                className={({ isActive }) =>
                  isActive
                    ? " font-medium text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                <div className="flex items-center gap-3">
                  <MdStars className="text-2xl" />
                  <span>My Reviews</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  isActive
                    ? " font-medium text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                <div className="flex items-center gap-3">
                  <HiOutlineCurrencyDollar className="text-2xl" />
                  <span>Payment History</span>
                </div>
              </NavLink>
            </div>
          )}
        </div>

        {/* Overlay for Sidebar when open in Mobile Devices */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>

      {/* Desktop Devices */}
      <div className="hidden md:flex md:flex-col md:h-full px-8 mt-7">
        <Link to="/">
          <span className="text-2xl font-bold text-blue-600 bg-gray-100 px-2 py-2 rounded-tl-lg rounded-br-lg">
            Hostel Manager
          </span>
        </Link>
        {role === "admin" && (
          <div className="flex flex-col justify-between flex-1 space-y-7 mt-8">
            <NavLink
              to="/dashboard/admin-profile"
              className={({ isActive }) =>
                isActive
                  ? " font-medium text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              <div className="flex items-center gap-3">
                <MdOutlineAdminPanelSettings className="text-2xl" />
                <span>Admin Profile</span>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/manage-users"
              className={({ isActive }) =>
                isActive
                  ? " font-medium text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              <div className="flex items-center gap-3">
                <GrUserManager className="text-2xl" />
                <span>Manage Users</span>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/add-meals"
              className={({ isActive }) =>
                isActive
                  ? " font-medium text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              <div className="flex items-center gap-3">
                <IoMdAddCircleOutline className="text-2xl" />
                <span>Add Meals</span>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/all-meals"
              className={({ isActive }) =>
                isActive
                  ? " font-medium text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              <div className="flex items-center gap-3">
                <MdNoMealsOuline className="text-2xl" />
                <span>All Meals</span>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/all-reviews"
              className={({ isActive }) =>
                isActive
                  ? " font-medium text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              <div className="flex items-center gap-3">
                <MdOutlineReviews className="text-2xl" />
                <span>All Reviews</span>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/serve-meals"
              className={({ isActive }) =>
                isActive
                  ? " font-medium text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              <div className="flex items-center gap-3">
                <IoRestaurantOutline className="text-2xl" />
                <span>Serve Meals</span>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/coming-meals"
              className={({ isActive }) =>
                isActive
                  ? " font-medium text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              <div className="flex items-center gap-3">
                <FaUtensils className="text-2xl" />
                <span>Upcoming Meals</span>
              </div>
            </NavLink>
          </div>
        )}
        {role === "customer" && (
          <div className="flex flex-col justify-between flex-1 space-y-7 mt-8">
            <NavLink
              to="/dashboard/user-profile"
              className={({ isActive }) =>
                isActive
                  ? " font-medium text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              <div className="flex items-center gap-3">
                <HiOutlineUserCircle className="text-2xl" />
                <span>My Profile</span>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/requested-meals"
              className={({ isActive }) =>
                isActive
                  ? " font-medium text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              <div className="flex items-center gap-3">
                <FaUtensils className="text-2xl" />
                <span>Requested Meals</span>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/my-reviews"
              className={({ isActive }) =>
                isActive
                  ? " font-medium text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              <div className="flex items-center gap-3">
                <MdStars className="text-2xl" />
                <span>My Reviews</span>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/payment-history"
              className={({ isActive }) =>
                isActive
                  ? " font-medium text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              <div className="flex items-center gap-3">
                <HiOutlineCurrencyDollar className="text-2xl" />
                <span>Payment History</span>
              </div>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
