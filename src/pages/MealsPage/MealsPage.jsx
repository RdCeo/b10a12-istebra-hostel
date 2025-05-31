import { useEffect, useState } from "react";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import AllMealCard from "../../components/AllMealCard/AllMealCard";
import { Helmet } from "react-helmet-async";

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await axiosPublic.get(
          `/api/meals?search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        setMeals(data.meals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, [search, category, minPrice, maxPrice]);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handlePriceRange = (e) => {
    const { name, value } = e.target;
    if (name === "min") setMinPrice(value);
    if (name === "max") setMaxPrice(value);
  };

  return (
    <div className="w-11/12 md:11/12 lg:w-11/12 xl:container mx-auto px-4 pt-8 pb-14">
      <Helmet>
        <title>Meals || ISTEBRA HOSTEL</title>
      </Helmet>
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        All Meals
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search meals..."
          className="border border-gray-300 px-4 py-2 rounded-md w-[55%] md:w-1/4"
          onChange={handleSearch}
        />
        <select
          className="border border-gray-300 px-4 py-2 rounded-md w-[55%] md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <div className="flex items-center gap-2">
          <span>Price:</span>
          <input
            type="number"
            name="min"
            placeholder="Min"
            className="border border-gray-300 px-2 py-1 rounded-md w-16"
            onChange={(e) => handlePriceRange(e)}
          />
          <span>-</span>
          <input
            type="number"
            name="max"
            placeholder="Max"
            className="border border-gray-300 px-2 py-1 rounded-md w-16"
            onChange={(e) => handlePriceRange(e)}
          />
        </div>
      </div>
      {meals.length === 0 && (
        <div className="flex items-center justify-center py-10">
          <h2 className="text-3xl font-semibold italic">No meals found</h2>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals?.map((meal, idx) => (
          <AllMealCard key={idx} meal={meal}></AllMealCard>
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
