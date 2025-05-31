import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "./../../../../hooks/useAxiosInstance";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useState } from "react";
import AllMealsModal from "../../../../components/Modal/AllMealsModal";
import { Helmet } from "react-helmet-async";

const AllMeals = () => {
  const axiosInstance = useAxiosInstance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [currentMeal, setCurrentMeal] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: allMeals = [], refetch } = useQuery({
    queryKey: ["allMeals", sortOption],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/all-meals-admin?sortBy=${sortOption}`
      );
      return data;
    },
  });

  // Calculate pagination
  const totalPages = Math.ceil(allMeals.length / itemsPerPage);
  const displayedMeals = allMeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleDelete = async (deleteId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosInstance.delete(`/delete/meal/${deleteId}`);
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const handleEditClick = (meal) => {
    setCurrentMeal(meal);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentMeal(null);
  };

  return (
    <div>
      <div className="py-10 px-5 min-h-screen">
        <Helmet>
          <title>All Meals || ISTEBRA HOSTEL</title>
        </Helmet>
        <h1 className="text-2xl font-bold text-gray-700 mb-4">All Meals</h1>
        <div className="flex justify-start gap-4 mb-5">
          <button
            className={`px-4 py-2 rounded ${
              sortOption === "likes"
                ? "bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100"
                : "bg-gray-200"
            }`}
            onClick={() => setSortOption("likes")}
          >
            Sort by Likes
          </button>
          <button
            className={`px-4 py-2 rounded ${
              sortOption === "reviews"
                ? "bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100"
                : "bg-gray-200"
            }`}
            onClick={() => setSortOption("reviews")}
          >
            Sort by Reviews
          </button>
        </div>
        <div className="overflow-x-auto shadow-md bg-white rounded-md">
          <table className="min-w-full bg-white border border-gray-100 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Title</th>
                <th className="px-4 py-2 text-left font-medium">Likes</th>
                <th className="px-4 py-2 text-left font-medium">Reviews</th>
                <th className="px-4 py-2 text-left font-medium">Rating</th>
                <th className="px-4 py-2 text-left font-medium">Distributor</th>
                <th className="px-4 py-2 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedMeals.map((meal) => (
                <tr key={meal._id} className="border-t">
                  <td className="px-4 py-4 text-sm">{meal?.title}</td>
                  <td className="px-4 py-4 text-sm">{meal?.likes}</td>
                  <td className="px-4 py-4 text-sm">{meal?.reviews}</td>
                  <td className="px-4 py-4 text-sm">{meal?.averageRating}</td>
                  <td className="px-4 py-4 text-sm">
                    {meal?.distributor?.name}
                  </td>
                  <td className="px-4 py-2 text-center flex flex-row items-center gap-2">
                    <Link to={`/dashboard/view-meals/${meal._id}`}>
                      <button
                        className="bg-green-100 text-green-500 hover:bg-green-200 p-2 rounded"
                        aria-label="View Meal"
                      >
                        <FaEye />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleEditClick(meal)}
                      className="bg-blue-100 text-blue-500 hover:bg-blue-200 p-2 rounded"
                      aria-label="Edit Review"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(meal._id)}
                      className="bg-red-100 text-red-500 hover:bg-red-200 p-2 rounded"
                      aria-label="Delete Review"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center mt-6 gap-3">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === 1
                ? "hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100"
                : "hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100"
            }`}
          >
            Previous
          </button>
          <p className="text-gray-700 text-sm font-semibold">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-1 rounded text-sm ${
              currentPage === totalPages
                ? "hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100"
                : "hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
      <AllMealsModal
        isOpen={isModalOpen}
        refetch={refetch}
        onClose={handleModalClose}
        currentMeal={currentMeal}
      />
    </div>
  );
};

export default AllMeals;
