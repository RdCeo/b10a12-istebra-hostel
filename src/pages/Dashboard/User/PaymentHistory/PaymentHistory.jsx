import { useContext, useState } from "react";
import useAxiosInstance from "../../../../hooks/useAxiosInstance";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/payment/history/${user?.email}`
      );
      return data;
    },
  });

  // Pagination Logic
  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const currentPayments = payments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="py-10 px-5">
        <Helmet>
          <title>Payment History || ISTEBRA HOSTEL</title>
        </Helmet>
        <h1 className="text-2xl font-bold mb-6">Payment History</h1>

        {payments && payments?.length > 0 ? (
          <div>
            <div className="overflow-x-auto shadow-md rounded-md bg-white">
              <table className="table-auto w-full bg-white border border-gray-200">
                <thead className="bg-gray-100 table-auto w-full">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-700 font-medium">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-gray-700 font-medium">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-gray-700 font-medium">
                      Transaction ID
                    </th>
                    <th className="px-4 py-3 text-left text-gray-700 font-medium">
                      Packages
                    </th>
                    <th className="px-4 py-3 text-left text-gray-700 font-medium">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPayments.map((payment) => (
                    <tr
                      key={payment?._id}
                      className="border-b text-sm hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-4 py-2">{payment?.customer?.email}</td>
                      <td className="px-4 py-2">{payment?.customer?.name}</td>
                      <td className="px-4 py-2">{payment?.transactionId}</td>
                      <td className="px-4 py-2">{payment?.packageName}</td>
                      <td className="px-4 py-2">${payment?.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 gap-3">
              <button
                className="px-3 text-sm py-1 hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100 rounded"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="font-semibold text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 text-sm py-1 hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100 rounded"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center bg-red-100 text-red-600 p-4 rounded-lg shadow-md">
            <p className="text-2xl">No payment history found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
