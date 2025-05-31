import { Link } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineStarRate } from "react-icons/md";
// eslint-disable-next-line react/prop-types
const MealCard = ({ meal }) => {
  const { title, image, averageRating, price, _id, description } = meal || {};
  return (
    <div>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden p-4">
        <img
          src={image}
          className="w-full h-56 object-cover rounded-md transform transition duration-500 ease-in-out hover:scale-105 "
        />
        <div className="pt-5">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
          <p className="text-gray-500 text-sm mb-2">
            {description.slice(0, 35)}...
          </p>
          <p className="text-gray-700 mb-1 flex items-center gap-1">
            <BsCurrencyDollar />
            {price}
          </p>
          <p className="text-gray-700 mb-4 flex items-center gap-1">
            <MdOutlineStarRate />
            {averageRating}
          </p>
          <Link to={`/meal/${_id}`}>
            <button className="hover:bg-gradient-to-l  bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md flex flex-row items-center gap-1 ">
              <FcViewDetails className="text-xl" />
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
