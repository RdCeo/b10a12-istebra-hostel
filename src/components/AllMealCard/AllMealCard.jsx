import { Link } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";
import { BsCurrencyDollar } from "react-icons/bs";
/* eslint-disable react/prop-types */
const AllMealCard = ({ meal }) => {
  return (
    <div>
      <div key={meal._id} className="bg-white rounded-lg shadow-xl p-4 ">
        <img
          src={meal?.image}
          className="w-full h-56 object-cover rounded-md"
        />
        <div className="flex justify-between mt-4 items-center">
          <h3 className="text-xl font-semibold">{meal?.title}</h3>
          <span className="bg-green-200 text-gray-800 px-3 text-sm rounded-full font-medium">
            {meal?.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-2">
          {meal?.description?.slice(0, 30)}...
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-green-600 font-bold flex items-center">
            <BsCurrencyDollar />
            {meal?.price}
          </span>
          <Link to={`/meal/${meal._id}`}>
            <button className="hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md flex flex-row gap-1">
              <FcViewDetails className="text-xl" />
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllMealCard;
