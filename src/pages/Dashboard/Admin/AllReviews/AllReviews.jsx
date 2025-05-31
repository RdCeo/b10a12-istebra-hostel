import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../../../hooks/useAxiosInstance";
import { FaEye, FaThumbsUp, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const AllReviews = () => {
  const axiosInstance = useAxiosInstance();
  const { data: allReviews = [], refetch } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/get-admin-reviews`);
      return data;
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  // Calculate the index range for slicing the reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = allReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);

  const handleDeleteReview = async (reviewId, foodId) => {
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
        const { data } = await axiosInstance.delete(
          `/delete-reviews/${reviewId}`
        );
        await axiosInstance.patch(`/update-reviews/${foodId}`, {
          status: "dec",
        });
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Review has been deleted",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

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
    <div>
      <div className="py-10 px-5 min-h-screen">
        <Helmet>
          <title>All Reviews || ISTEBRA HOSTEL</title>
        </Helmet>
        <h1 className="text-2xl font-bold mb-4">All Reviews</h1>
        <div className="overflow-x-auto shadow-md bg-white rounded-md">
          <table className="min-w-full bg-white border border-gray-100 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium">Meal Title</th>
                <th className="py-3 px-4 font-medium">Likes</th>
                <th className="py-3 px-4 font-medium">Reviews</th>
                <th className="py-3 px-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review) => (
                <tr
                  key={review?._id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-4 text-sm">
                    {review?.foodData?.title}
                  </td>
                  <td className="py-3 px-4 text-sm flex justify-center">
                    <FaThumbsUp className="text-blue-500 mr-1" />
                    {review?.foodData?.likes}
                  </td>
                  <td className="py-3 px-4 text-sm text-center font-medium">
                    {review?.foodData?.review + 1}
                  </td>
                  <td className="py-3 px-4 text-sm flex justify-center space-x-4">
                    <Link to={`/dashboard/view-meals/${review?.foodId}`}>
                      <button className="bg-green-100 text-green-500 hover:bg-green-200 p-2 rounded transition">
                        <FaEye />
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        handleDeleteReview(review._id, review?.foodId)
                      }
                      className="bg-red-100 text-red-500 hover:bg-red-200 p-2 rounded transition"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-6 gap-3">
          <button
            className="px-3 text-sm py-1 hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100 rounded"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <span className="font-semibold text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 text-sm py-1 hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100 rounded"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
