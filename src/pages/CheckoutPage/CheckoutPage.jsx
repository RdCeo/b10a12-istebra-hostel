import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { Helmet } from "react-helmet-async";

const CheckoutPage = () => {
  const { name } = useParams();
  const [packageData, setPackageData] = useState({});
  const axiosInstance = useAxiosInstance();
  useEffect(() => {
    const fetchPackages = async () => {
      const { data } = await axiosInstance.get(`/all-premiums/${name}`);
      setPackageData(data);
    };
    fetchPackages();
  }, []);
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="py-20">
      <div
        className={`max-w-md mx-4 md:mx-auto rounded overflow-hidden shadow-lg ${
          packageData?.name === "Gold" && "bg-amber-300"
        } ${packageData?.name === "Silver" && "bg-gray-200"} ${
          packageData?.name === "Platinum" && "bg-blue-300"
        } p-6`}
      >
        <Helmet>
          <title>Checkout || ISTEBRA HOSTEL</title>
        </Helmet>
        <h2 className="text-2xl font-bold text-gray-800">
          {packageData?.name}
        </h2>
        <p className="text-xl text-gray-600 mt-2">
          ${packageData?.price}/Per Month
        </p>
        <ul className="mt-4 text-gray-700">
          {packageData?.benefits?.map((benefit, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-green-500">✔</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-6 w-full hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800  text-gray-100 py-2 rounded-full hover:bg-yellow-600"
        >
          Subscribe Now
        </button>
      </div>
      <PurchaseModal
        packageData={packageData}
        closeModal={closeModal}
        isOpen={isOpen}
      ></PurchaseModal>
    </div>
  );
};

export default CheckoutPage;
