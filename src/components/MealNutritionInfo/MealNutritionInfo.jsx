const MealNutritionInfo = () => {
  const meal = {
    name: "Average Meal Nutrition",
    calories: 350,
    protein: 30,
    carbs: 12,
    fats: 15,
  };
  const { name, calories, protein, carbs, fats } = meal || {};

  return (
    <div className="w-11/12 mx-auto p-6 bg-white shadow-lg rounded-lg ">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        {name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Nutritional Information
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between text-gray-700">
              <span>Calories</span>
              <span className="font-bold">{calories} kcal</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Protein</span>
              <span className="font-bold">{protein} g</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Carbohydrates</span>
              <span className="font-bold">{carbs} g</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Fats</span>
              <span className="font-bold">{fats} g</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Other Nutrients
          </h3>
          <ul className="space-y-3">
            {/* You can add more nutrients here */}
            <li className="flex justify-between text-gray-700">
              <span>Fiber</span>
              <span className="font-bold">3 g</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Sodium</span>
              <span className="font-bold">500 mg</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MealNutritionInfo;
