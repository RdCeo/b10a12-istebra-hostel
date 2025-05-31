import { FadeLoader } from "react-spinners";
import useRole from "../../../hooks/useRole";
import UserProfile from "../User/UserProfile/UserProfile";
import AdminProfile from "./../Admin/AdminProfile/AdminProfile";
import { Navigate, useLocation } from "react-router-dom";

const Statistics = () => {
  const [role, isLoading] = useRole();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/dashboard";
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FadeLoader color="#10e14b" />
      </div>
    );
  if (role) {
    return <Navigate to={from} replace={true}></Navigate>;
  }
  return (
    <div>
      {role === "admin" && <AdminProfile></AdminProfile>}
      {role === "customer" && <UserProfile></UserProfile>}
    </div>
  );
};

export default Statistics;
