import { useContext, useState } from "react";
import useAxiosInstance from "../../../../hooks/useAxiosInstance";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import UserReviewsModal from "../../../../components/Modal/UserReviewsModal";
import { Helmet } from "react-helmet-async";

const MyReviews = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useContext(AuthContext);
  const [reviewData, setReviewData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  const { data: allReviews = [], refetch } = useQuery({
    queryKey: ["allReviews", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reviews/user/${user?.email}`);
      return data;
    },
  });

  const handleDeleteReview = async (reviewsId, foodId) => {
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
          `/delete-reviews/${reviewsId}`
        );
        await axiosInstance.patch(`/update-reviews/${foodId}`, {
          status: "dec",
        });
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your Reviews has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const handleUpdateReview = (reviewData) => {
    setReviewData(reviewData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setReviewData(null);
  };

  // Pagination Logic
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  const currentReviews = allReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

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
      <div className="min-h-screen py-10 px-5">
        <Helmet>
          <title>My Reviews || ISTEBRA HOSTEL</title>
        </Helmet>
        <div className="mx-auto">
          <h1 className="text-2xl font-semibold mb-6">My Reviews</h1>
          <div className="overflow-x-auto shadow-md rounded-md bg-white">
            <table className="table-auto w-full bg-white border border-gray-100">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 font-medium">
                    Meal Title
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 font-medium">
                    Likes
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 font-medium">
                    Review
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentReviews.map((review) => (
                  <tr
                    key={review._id}
                    className="border-t hover:bg-gray-50 text-sm transition duration-150"
                  >
                    <td className="px-4 py-2">{review?.foodData?.title}</td>
                    <td className="px-4 py-2">{review?.foodData?.likes}</td>
                    <td className="px-4 py-2">{review?.description}</td>
                    <td className="px-4 py-2 flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateReview(review)}
                        className="bg-blue-100 text-blue-500 hover:bg-blue-200 p-2 rounded"
                        aria-label="Edit Review"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteReview(review._id, review.foodId)
                        }
                        className="bg-red-100 text-red-500 hover:bg-red-200 p-2 rounded"
                        aria-label="Delete Review"
                      >
                        <FaTrash />
                      </button>
                      <Link to={`/dashboard/view-meals-reviews/${review._id}`}>
                        <button
                          className="bg-green-100 text-green-500 hover:bg-green-200 p-2 rounded"
                          aria-label="View Meal"
                        >
                          <FaEye />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-self-center items-center mt-6 gap-3">
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
      <UserReviewsModal
        isOpen={isModalOpen}
        reviewData={reviewData}
        onClose={handleModalClose}
        refetch={refetch}
      ></UserReviewsModal>
    </div>
  );
};

export default MyReviews;
