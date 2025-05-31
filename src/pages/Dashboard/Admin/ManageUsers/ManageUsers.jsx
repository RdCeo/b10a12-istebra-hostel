import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import useAxiosInstance from "../../../../hooks/useAxiosInstance";
import toast from "react-hot-toast";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const axiosInstance = useAxiosInstance();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["allUsers", search],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/users?search=${search}`);
      return data;
    },
    enabled: true,
  });

  const handleAdmin = async (id) => {
    try {
      await axiosInstance.patch(`/users/role/${id}`, { role: "admin" });
      toast.success("Wow! New admin created successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    refetch();
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(allUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen py-10 px-5">
      <Helmet>
        <title>Manage Users || ISTEBRA HOSTEL</title>
      </Helmet>
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Manage Users
      </h1>

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search by username or email"
          className="w-full lg:w-1/3 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto shadow-md bg-white rounded-md">
        <table className="table-auto w-full text-gray-800 bg-white border border-gray-100 rounded-lg shadow-lg">
          <thead className="text-gray-700 border-b">
            <tr>
              <th className="p-3 text-left font-medium">Username</th>
              <th className="p-3 text-left font-medium">Email</th>
              <th className="p-3 text-left font-medium">Subscription</th>
              <th className="p-3 text-left font-medium">Role</th>
              <th className="p-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user?.name}</td>
                  <td className="p-3">{user?.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 rounded-full py-1 text-sm ${
                        user?.badge === "Gold"
                          ? "bg-amber-300 text-gray-800"
                          : user?.badge === "Silver"
                          ? "bg-gray-200 text-gray-800"
                          : user?.badge === "Platinum"
                          ? "bg-blue-300 text-gray-800"
                          : "bg-gray-800 text-gray-100"
                      }`}
                    >
                      {user?.badge}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 rounded-full py-1 text-sm text-gray-100 ${
                        user?.role === "admin" ? "bg-green-500" : "bg-blue-500"
                      }`}
                    >
                      {user?.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleAdmin(user._id)}
                      disabled={user?.role === "admin"}
                      className={`px-4 py-2 flex items-center gap-[2px] text-gray-100 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 ${
                        user?.role === "admin" ? "cursor-not-allowed" : ""
                      }`}
                    >
                      <FaUserShield />
                      Admin
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-5 text-gray-500 italic font-semibold"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-3">
        <button
          className="px-3 text-sm py-1 hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100 rounded"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="font-semibold text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 text-sm py-1 hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100 rounded"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
