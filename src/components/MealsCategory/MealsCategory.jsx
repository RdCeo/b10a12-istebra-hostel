import { useEffect, useState } from "react";
import MealCard from "../MealCard/MealCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MealsCategory = () => {
  const [activeTab, setActiveTab] = useState("All Meals");
  const [meals, setMeals] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await axiosPublic.get(
          `/all-meals?category=${activeTab}`
        );
        setMeals(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMeals();
  }, [activeTab]);

  const categories = ["Breakfast", "Lunch", "Dinner", "All Meals"];

  return (
    <section className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto pt-4 pb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 tracking-tight">
        Meals by Category
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-5 py-2.5 rounded-lg font-semibold shadow-md backdrop-blur-md border border-blue-500 
              ${
                activeTab === category
                  ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
                  : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow"
              } transition-all duration-300`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Meal Cards */}
      {meals.length === 0 ? (
        <p className="text-center text-gray-800 font-semibold text-2xl py-16 italic">
          No meals found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.slice(0, 3).map((meal) => (
            <div
              key={meal._id}
              className="bg-gradient-to-br from-blue-100/40 to-blue-200/10 border border-blue-200/40 backdrop-blur-lg shadow-2xl rounded-2xl p-4 transition-transform hover:scale-105 hover:shadow-blue-500/30"
            >
              <MealCard meal={meal} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MealsCategory;
