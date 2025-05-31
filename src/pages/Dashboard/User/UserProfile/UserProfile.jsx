import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosInstance from "../../../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import profileLogo from "../../../../../src/assets/logo/New Project.png";
import { Helmet } from "react-helmet-async";
const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();
  const { data: users } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/user/${user?.email}`);
      return data;
    },
  });

  return (
    <div className="flex items-center justify-center py-10">
      <Helmet>
        <title>My Profile || ISTEBRA HOSTEL</title>
      </Helmet>
      <div className="bg-white shadow-md rounded-md w-full max-w-4xl">
        {/* Profile Banner */}
        <div className="relative bg-gradient-to-r from-blue-400 to-blue-500 h-48 flex items-center justify-between px-10">
          <div className="text-white">
            <h1 className="text-xl md:text-2xl font-semibold">
              ISTEBRA Hostel Management System
            </h1>
            <p className="mt-1 text-sm md:text-base mb-3 md:mb-0">
              Driving seamless and efficient hostel administration.
            </p>
          </div>
          <img
            src={profileLogo}
            alt="Hostel Icon"
            className="w-14 md:w-20 lg:w-24 object-cover h-14 md:h-20 lg:h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>

        {/* Profile Section */}
        <div className="relative">
          {/* Profile Picture */}
          <div className="absolute -top-10 lg:-top-14  left-8">
            <img
              src={users?.photo || "https://via.placeholder.com/150"}
              alt="User"
              className=" w-16 md:w-20 lg:w-28 h-16 md:h-20 lg:h-28 object-cover rounded-full border-4 border-white shadow-lg"
            />
          </div>

          {/* User Info */}
          <div className="pt-10 md:pt-12 lg:pt-16 px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {users?.name || "User Name"}
            </h2>
            <p className="text-gray-600">
              {users?.email || "user@example.com"}
            </p>
            <div className="mt-2 flex gap-3">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full  ${
                  users?.badge === "Gold"
                    ? "bg-amber-300 text-gray-700"
                    : users?.badge === "Silver"
                    ? "bg-gray-200 text-gray-700"
                    : users?.badge === "Platinum"
                    ? "bg-blue-300 text-gray-700"
                    : "bg-gray-700 text-white" // Default for Bronze
                }`}
              >
                {users?.badge} Member
              </span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 px-8">
          <h3 className="text-xl font-semibold text-gray-700">About Me</h3>
          <p className="text-gray-600 mt-2 leading-relaxed">
           Hi, I’m {users?.name}, a dedicated user of the ISTEBRA Hostel Management website. It helps me stay organized with meals and other essentials, streamline daily tasks, and contribute to a positive and comfortable living experience for everyone in the hostel.
          </p>
        </div>
        <div className="mt-8 px-8 pb-6">
          <button className=" text-gray-100 px-6 py-2 rounded-md shadow bg-gradient-to-r from-blue-600 to-blue-800">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
