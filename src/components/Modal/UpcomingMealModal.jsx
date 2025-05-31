/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import moment from "moment-timezone";
import { imageUpload } from "../../api/utils";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import toast from "react-hot-toast";

const UpcomingMealModal = ({ isOpen, onClose, refetch }) => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const ingredient = data.ingredients.split(",");
    const formattedDateTime = moment(data?.postTime).format("lll");
    const image = await imageUpload(data?.image[0]);
    const upcomingData = {
      title: data.title,
      description: data.description,
      category: data.category,
      postTime: formattedDateTime,
      ingredients: ingredient,
      image,
      price: parseInt(data.price),
      distributor: {
        name: user?.displayName,
        email: user?.email,
      },
      rating: [],
      likes: 0,
      reviews: 0,
      status: "upcoming",
    };
    try {
      const { data } = await axiosInstance.post(`/add-meals`, upcomingData);
      if (data.insertedId) {
        onClose();
        reset();
        refetch();
        toast.success("Upcoming meal added successfully!");
      }
    } catch (error) {
      console.log(error);
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
            <h2 className="text-2xl font-semibold mb-4">Add Upcoming Meal</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Meal Title<span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category<span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    id="category"
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Meal Image<span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="file"
                  id="image"
                  {...register("image", { required: "Image is required" })}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.image.message}
                  </p>
                )}
              </div>

              <div className="grid lg:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="ingredients"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ingredients<span className="text-red-500 font-bold">*</span>
                  </label>
                  <textarea
                    id="ingredients"
                    rows="3"
                    placeholder="Separate each ingredient with a comma"
                    {...register("ingredients", {
                      required: "Ingredients are required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.ingredients && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.ingredients.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description<span className="text-red-500 font-bold">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows="3"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price<span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    {...register("price", { required: "Price is required" })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="postTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Post Time<span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="postTime"
                    {...register("postTime", {
                      required: "Post Time is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.postTime && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.postTime.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="py-2 px-4 rounded-md hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                >
                  UpLoad Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMealModal;
