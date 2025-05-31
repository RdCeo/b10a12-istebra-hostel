import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../../../hooks/useAxiosInstance";
import { FaCheck, FaCheckDouble } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ServeMeals = () => {
  const axiosInstance = useAxiosInstance();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 10;

  const { data: serves = [], refetch } = useQuery({
    queryKey: ["serves", search],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/all-serves?search=${search}`);
      return data;
    },
  });

  const handleServe = async (serveId) => {
    try {
      await axiosInstance.patch(`/all-serves/status/${serveId}`, {
        status: "Delivered",
      });
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
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = serves.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(serves.length / mealsPerPage);

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
        <title>Serve Meals || ISTEBRA HOSTEL</title>
      </Helmet>
      <div className="">
        <h1 className="text-2xl font-semibold mb-4">Serve Meals</h1>
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search by name, email, or title"
            className="w-full lg:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="overflow-x-auto shadow-md bg-white rounded-md">
          <table className="min-w-full bg-white border border-gray-100 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">
                  User Email
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">
                  User Name
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-medium">
                  Status
                </th>
                <th className="px-4 py-2 text-center text-gray-700 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentMeals.length > 0 ? (
                currentMeals.map((meal) => (
                  <tr
                    key={meal?._id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 text-sm">{meal?.title}</td>
                    <td className="px-4 py-2 text-sm">
                      {meal?.customer?.email}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {meal?.customer?.name}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${
                          meal.status === "Delivered"
                            ? "bg-green-200 text-green-600"
                            : "bg-blue-200 text-gray-700"
                        }`}
                      >
                        {meal.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {meal.status === "Pending" ? (
                        <button
                          onClick={() => handleServe(meal._id)}
                          className="bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100 flex items-center justify-center px-3 py-[2px] rounded-full"
                        >
                          <FaCheck className="mr-1" />
                          Serve
                        </button>
                      ) : (
                        <button className="text-blue-600 hover:text-blue-800 flex items-center justify-center">
                          <FaCheckDouble className="mr-1" />
                          Serving
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500 italic font-semibold text-lg"
                  >
                    No Serve meals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Buttons */}
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
    </div>
  );
};

export default ServeMeals;
