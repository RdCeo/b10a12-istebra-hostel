import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-lg mt-2 text-gray-600">
          Oops! The page you are looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg text-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
