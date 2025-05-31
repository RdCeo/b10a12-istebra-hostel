const WeeklyMealPlan = () => {
  const meals = [
    { day: "Monday", meal: "Grilled Chicken with Rice", time: "Lunch" },
    { day: "Tuesday", meal: "Vegetable Pasta", time: "Dinner" },
    { day: "Wednesday", meal: "Beef Curry with Bread", time: "Lunch" },
    { day: "Thursday", meal: "Fried Fish with Salad", time: "Dinner" },
    { day: "Friday", meal: "Chicken Biryani", time: "Lunch" },
    { day: "Saturday", meal: "Paneer Butter Masala with Naan", time: "Dinner" },
    { day: "Sunday", meal: "Mixed Veg Soup with Rolls", time: "Lunch" },
  ];

  return (
    <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto pt-4 pb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 tracking-tight">
        Weekly Meal Plan
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-100/40 to-blue-200/10 border border-blue-200/40 backdrop-blur-lg shadow-2xl rounded-2xl p-6 transition-transform hover:scale-105 hover:shadow-blue-500/30"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">{meal.day}</h3>
            <p className="text-gray-700 text-base mb-1">
              <span className="font-semibold text-blue-800">Meal:</span> {meal.meal}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-semibold text-blue-800">Time:</span> {meal.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyMealPlan;
