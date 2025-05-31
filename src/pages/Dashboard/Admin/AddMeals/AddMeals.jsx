import { useForm } from "react-hook-form";

import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import moment from "moment-timezone";
import { imageUpload } from "../../../../api/utils";

// import axios from "axios";
import useAxiosInstance from "./../../../../hooks/useAxiosInstance";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AddMeals = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();

  const onSubmit = async (data) => {
    const ingredient = data.ingredients.split(",");
    const formattedDateTime = moment(data?.postTime).format("lll");
    const image = await imageUpload(data?.image[0]);
    const mealData = {
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
      status: "published",
    };
    try {
      const { data } = await axiosInstance.post(`/add-meals`, mealData);
      if (data.insertedId) {
        Swal.fire({
          title: "Meal added successfully!",
          text: "You clicked the button!",
          icon: "success",
        });
        reset();
      }
    } catch (error) {
      console.error("Error adding meal:", error);
      toast.error("Failed to add meal");
    }
  };
  return (
    <div>
      <div className="w-full lg:w-10/12 mx-auto p-5">
        <Helmet>
          <title>Add Meals || ISTEBRA HOSTEL</title>
        </Helmet>
        <h2 className="text-2xl font-semibold mb-4">Add New Meal</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white border border-gray-100 rounded-md shadow-md p-4"
        >
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
                {...register("category", { required: "Category is required" })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option disabled value="">
                  Select a category
                </option>
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
                {...register("postTime", { required: "Post Time is required" })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.postTime && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.postTime.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="distributorName"
                className="block text-sm font-medium text-gray-700"
              >
                Distributor Name
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                id="distributorName"
                value={user?.displayName}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="distributorEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Distributor Email
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="email"
                id="distributorEmail"
                value={user.email}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-4 text-right">
            <button
              type="submit"
              className="py-2 px-4 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100"
            >
              Add Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMeals;
