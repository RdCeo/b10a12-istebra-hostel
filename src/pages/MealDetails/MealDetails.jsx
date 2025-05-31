import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import ReactStars from "react-rating-stars-component";
import { useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { BsCalendarDate } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { FiDollarSign } from "react-icons/fi";
import { MdOutlineStarRate } from "react-icons/md";
const MealDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();

  //get meal details
  const { data: detailsData = {}, refetch } = useQuery({
    queryKey: ["mealDetails", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/meal-details/${id}`);
      return data.meal;
    },
  });

  //get all reviews by food id
  const { data: reviewsData = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/reviews/${id}`);
      return data;
    },
  });

  // get subscription
  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/check-subscription/${user?.email}`
      );
      return data;
    },
  });

  //handle meal request
  const handleMealRequest = async () => {
    if (!user) {
      toast.error("Please Login!");
      return;
    }
    if (userData.badge === "Bronze") {
      toast.error("Please get Subscription");
      return;
    }
    const requestMealsData = {
      customer: {
        name: user?.displayName,
        email: user?.email,
      },
      foodId: detailsData._id,
      category: detailsData.category,
      description: detailsData.description,
      distributor: detailsData.distributor,
      image: detailsData.image,
      ingredients: detailsData.ingredients,
      likes: detailsData.likes,
      postTime: detailsData.postTime,
      price: detailsData.price,
      rating: detailsData.rating,
      reviews: detailsData.reviews,
      title: detailsData.title,
      status: "Pending",
    };
    try {
      await axiosInstance.post(`/request-meal`, requestMealsData);
      toast.success("Request sent successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  //handle like
  const handleLike = async (likeId) => {
    if (!user) {
      toast.error("Please Login!");
      return;
    }
    await axiosInstance.patch(`/update-like/${likeId}`);
    toast.success("Like added successfully!");
    refetch();
  };
  //handle review
  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please Login!");
      return;
    }
    const description = e.target.description.value;
    const rating = parseInt(e.target.rating.value);
    const reviewData = {
      description,
      reviewRatings: rating,
      foodId: detailsData?._id,
      foodData: {
        foodImg: detailsData?.image,
        category: detailsData?.category,
        description: detailsData?.description,
        distributor: {
          email: detailsData?.distributor?.email,
          name: detailsData?.distributor?.name,
        },
        ingredients: detailsData?.ingredients,
        likes: detailsData?.likes,
        postTime: detailsData?.postTime,
        price: detailsData?.price,
        rating: detailsData?.averageRating,
        review: detailsData?.reviews,
        title: detailsData?.title,
      },
      customer: {
        name: user?.displayName,
        email: user?.email,
      },
    };
    try {
      await axiosInstance.post(`/reviews`, reviewData);
      await axiosInstance.patch(`/update-reviews/${detailsData?._id}`, {
        status: "inc",
      });
      await axiosInstance.patch(`/update-rating/${detailsData?._id}`, {
        rating: rating,
      });
      queryClient.invalidateQueries(["reviews", id]);
      e.target.reset();
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };

  return (
    <div>
      <Helmet>
        <title>Meals Details || ISTEBRA HOSTEL</title>
      </Helmet>
      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto pt-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-7 md:gap-10 items-center justify-center">
          {/* Meal Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={detailsData?.image}
              className="rounded-lg shadow-md w-full h-72 md:h-96 lg:h-[420px] object-cover"
            />
          </div>

          {/* Meal Info */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
              {detailsData?.title}
            </h1>
            <p className="text-gray-600 mb-3">
              By:{" "}
              <span className="font-semibold">
                {detailsData?.distributor?.name}
              </span>
            </p>
            <p className="text-gray-700 mb-5">{detailsData?.description}</p>

            <div className="">
              <div className="flex flex-wrap gap-2 ">
                {detailsData?.ingredients?.map((ingredient, index) => (
                  <span
                    className="bg-gray-200 text-gray-800 px-4 rounded-full text-sm"
                    key={index}
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-2  py-6">
              <p className="text-gray-700  flex items-center gap-2">
                <BsCalendarDate className="text-xl" />
                {detailsData?.postTime}
              </p>
              <p className="text-gray-700  flex items-center gap-2">
                <BiCategory className="text-xl" />
                {detailsData?.category}
              </p>
              <p className="text-gray-700  flex items-center gap-2">
                <FiDollarSign className="text-xl" />
                {detailsData?.price}
              </p>
              <p className="text-gray-700  flex items-center gap-2">
                <MdOutlineStarRate className="text-xl" />
                <span className="font-semibold">
                  {detailsData?.averageRating}/5
                </span>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => handleLike(detailsData._id)}
                className={`flex items-center gap-2  text-gray-100 px-4 py-2 rounded-md shadow bg-gradient-to-r from-blue-600 to-blue-800 `}
              >
                <FaThumbsUp /> Like({detailsData?.likes})
              </button>
              <button
                onClick={handleMealRequest}
                className=" text-gray-100 px-4 py-2 rounded-md shadow hover:bg-gradient-to-l bg-gradient-to-r from-green-500 to-green-600 "
              >
                Request Meal
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[40%]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Reviews ({detailsData?.reviews})
            </h2>

            <div className="mb-6">
              <form
                onSubmit={handleReview}
                className="bg-white shadow rounded-md p-4"
              >
                <div className="">
                  <textarea
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
                      defaultValue=" Select a rating"
                      required
                      className="w-full border rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option disabled value="Select a rating">
                        Select a rating
                      </option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                </div>

                <button className="mt-4  text-gray-100 px-4 py-2 rounded-md shadow hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800">
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          <div className="w-full lg:w-[60%] -mt-5  lg:mt-12">
            {reviewsData?.length > 0 ? (
              reviewsData?.map((review) => (
                <div key={review._id} className="py-2">
                  <div className="bg-white shadow rounded-md px-4 py-4 border border-gray-100 flex items-center gap-4">
                    <div>
                      <img
                        src={review?.foodData?.foodImg}
                        className="w-14 h-14 object-cover rounded-md"
                      ></img>
                    </div>
                    <div className="">
                      <p className="text-lg font-semibold -mb-1">
                        {review?.description}
                      </p>
                      <div>
                        <ReactStars
                          count={5}
                          value={review?.reviewRatings}
                          size={24}
                          edit={false}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor={
                            review?.reviewRatings >= 4
                              ? "#4caf50"
                              : review?.reviewRatings >= 3
                              ? "#ffc107"
                              : "#f44336"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-800 font-semibold text-center text-xl md:text-2xl">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
