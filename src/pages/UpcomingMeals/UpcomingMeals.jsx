import { useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { Helmet } from "react-helmet-async";
import { SlLike } from "react-icons/sl";

const UpcomingMeals = () => {
  //  subscription level fetched from DB.
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosInstance = useAxiosInstance();
  const { data: upcomingMealUser = [], refetch } = useQuery({
    queryKey: ["upcomingMealUser"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/meal/upcoming-user`);
      return data;
    },
  });
  const { data: userBadge = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/check-subscription/${user?.email}`
      );
      return data;
    },
  });
  const handleLike = async (likeId) => {
    if (!user) {
      toast.error("Please sign in to like meals.");
      return;
    }
    if (userBadge?.badge === "Bronze") {
      toast.error("Upgrade your subscription to like meals.");
      return;
    }
    try {
      await axiosInstance.patch(`/update-like/${likeId}`, {
        userEmail: user?.email,
      });
      await axiosInstance.post(`/upcoming-meal-like`, {
        likeId: likeId,
        userEmail: user?.email,
      });
      toast.success("Like added successfully!");
      refetch();
    } catch (error) {
      if (error.status === 400) {
        toast.error("You've already liked this meal.");
      }
    }
  };

  return (
    <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto  pt-6 pb-14">
      <Helmet>
        <title>Upcoming Meals || ISTEBRA HOSTEL</title>
      </Helmet>
      <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">
        Upcoming Meals
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingMealUser.map((meal) => (
          <div key={meal?._id} className="bg-white rounded-lg shadow-xl p-4">
            <img
              src={meal?.image}
              className="w-full h-56 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4 text-gray-700">
              {meal?.title}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {meal?.description?.slice(0, 70)}...
            </p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleLike(meal._id)}
                className={`px-4 py-2 rounded-md text-gray-100 hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 ${
                  userBadge?.badge === "Bronze" && "hover:cursor-not-allowed"
                }`}
              >
                Like
              </button>
              <span className="text-gray-700 font-medium flex gap-1">
                {meal?.likes}
                <SlLike className="text-xl font-bold" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeals;
