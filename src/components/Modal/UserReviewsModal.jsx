/* eslint-disable react/prop-types */

import toast from "react-hot-toast";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const UserReviewsModal = ({ isOpen, onClose, reviewData, refetch }) => {
  const axiosInstance = useAxiosInstance();
  const handleReviewsFrom = async (e) => {
    e.preventDefault();
    const description = e.target.description.value;
    const rating = parseInt(e.target.rating.value);
    const updateData = {
      description,
      reviewRatings: rating,
    };
    try {
      await axiosInstance.patch(
        `/user-update-reviews/${reviewData._id}`,
        updateData
      );
      toast.success("Reviews updated successfully");
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
      refetch();
    }
  };
  if (!isOpen) return null;
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Update Meal
            </h2>
            <form
              onSubmit={handleReviewsFrom}
              className="bg-white shadow-md rounded-md p-4"
            >
              <div className="">
                <textarea
                  defaultValue={reviewData.description}
                  name="description"
                  placeholder="Write your review here..."
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  required
                ></textarea>

                {/* Rating Dropdown */}
                <div className="mt-4">
                  <label
                    htmlFor="rating"
                    className="block mb-2 text-base font-medium text-gray-700"
                  >
                    Rate your experience
                  </label>
                  <select
                    id="rating"
                    name="rating"
                    defaultValue={reviewData.reviewRatings}
                    required
                    className="w-full border rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Select a rating">Select a rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
              </div>

              <button className="mt-4 hover:bg-gradient-l bg-gradient-to-r from-blue-600 to-blue-800  text-gray-100 px-4 py-2 rounded-md shadow transition">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReviewsModal;
