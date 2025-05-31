import { useState, useEffect } from "react";
import PackageCard from "../PackageCard/PackageCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MembershipSection = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const { data } = await axiosPublic.get("/all-premiums");
        setPackages(data);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Failed to load premium packages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [axiosPublic]);

  return (
    <section className="py-10 md:py-12">
      <div className="w-11/12 xl:container mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 text-gray-800">
          Upgrade to Premium
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Choose a plan that best fits your needs and unlock premium features.
        </p>

        {loading ? (
          <p className="text-center text-blue-600">Loading packages...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {packages.length > 0 ? (
              packages.map((pack) => (
                <PackageCard key={pack._id || pack.id} pack={pack} />
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No premium packages available at the moment.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MembershipSection;
