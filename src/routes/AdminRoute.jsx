import { FadeLoader } from "react-spinners";
import useRole from "../hooks/useRole";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const location = useLocation();
  if (isLoading) {
    <div className="flex justify-center items-center min-h-screen">
      <FadeLoader color="#10e14b" />
    </div>;
  }
  if (role === "admin") return children;
  return (
    <Navigate
      to="/dashboard"
      state={{ from: location }}
      replace="true"
    ></Navigate>
  );
};

export default AdminRoute;
