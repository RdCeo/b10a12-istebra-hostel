import { Link } from "react-router-dom";
import classNames from "classnames";

const PackageCard = ({ pack }) => {
  const cardClasses = classNames(
    "p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl",
    "border-2 border-transparent hover:border-blue-400",
    "bg-gradient-to-br from-gray-100 to-white",
    {
      "bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 text-amber-900 shadow-amber-400/50":
        pack?.name === "Gold",
      "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-800 shadow-gray-400/50":
        pack?.name === "Silver",
      "bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 text-blue-900 shadow-blue-400/50":
        pack?.name === "Platinum",
      "bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-800":
        !["Gold", "Silver", "Platinum"].includes(pack?.name),
    }
  );

  return (
    <Link to={`/checkout/${pack?.name}`}>
      <div className={cardClasses}>
        <h3 className="text-xl font-bold mb-4 text-center">{pack?.name} Package</h3>
        <p className="text-2xl font-semibold text-center mb-4">${pack.price} / Per Month</p>
      </div>
    </Link>
  );
};

export default PackageCard;
