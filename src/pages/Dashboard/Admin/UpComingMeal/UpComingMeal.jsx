import { MdPublish } from "react-icons/md";
import { useState } from "react";
import UpcomingMealModal from "../../../../components/Modal/UpcomingMealModal";
import useAxiosInstance from "../../../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const UpComingMeal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 10;

  const axiosInstance = useAxiosInstance();
  const { data: upcoming = [], refetch } = useQuery({
    queryKey: ["upcoming"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/upcoming-meals-admin`);
      return data;
    },
  });

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handlePublish = async (publishId) => {
    const { data } = await axiosInstance.get(`/upcoming-meals-admin/${publishId}`);
    if (data.likes >= 10) {
      await axiosInstance.patch(`/update-status-upcoming-meals-admin/${publishId}`);
      toast.success("Meal published successfully!");
      refetch();
    } else {
      toast.error("The meal needs to have at least 10 likes to be published!");
    }
  };

  // Pagination logic
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = upcoming.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(upcoming.length / mealsPerPage);

  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto py-10 px-5 min-h-screen">
      <Helmet>
        <title>Upcoming Meals || ISTEBRA HOSTEL</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Upcoming Meals</h1>
        <button
          onClick={handleOpenModal}
          className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md hover:scale-105 hover:shadow-lg transition-all"
        >
          Add Upcoming Meal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentMeals.map((meal) => (
          <div
            key={meal._id}
            className="bg-gradient-to-br from-blue-100/40 to-blue-200/10 border border-blue-200/40 backdrop-blur-lg shadow-2xl rounded-2xl p-4 transition-transform hover:scale-105 hover:shadow-blue-500/30"
          >
            <img
              className="w-full h-48 object-cover rounded-lg mb-4 shadow"
              src={meal?.image}
              alt={meal?.title}
            />
            <h3 className="text-xl font-semibold text-gray-800">{meal?.title}</h3>
            <p className="text-gray-700 mt-1 mb-3">Likes: <span className="font-bold">{meal?.likes}</span></p>
            <button
              onClick={() => handlePublish(meal._id)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:scale-105 hover:shadow-lg transition-all"
            >
              <MdPublish className="text-lg" />
              Publish
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-10 gap-3">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:scale-105 transition-all"
          }`}
        >
          Previous
        </button>
        <span className="text-sm font-semibold text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:scale-105 transition-all"
          }`}
        >
          Next
        </button>
      </div>

      <UpcomingMealModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        refetch={refetch}
      />
    </div>
  );
};

export default UpComingMeal;
