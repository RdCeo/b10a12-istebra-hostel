import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../../src/assets/Auth/Login-bro.svg";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const LogIn = () => {
  const { signInExistingUsers, signInWithGoogle, user } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [signToggle, setSignToggle] = useState(false);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (user) {
    return <Navigate to={from} replace={true}></Navigate>;
  }
  // if (loading)
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <FadeLoader color="#10e14b" />
  //     </div>
  //   );
  const handleLogin = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      await signInExistingUsers(email, password);
      toast.success("Login successfully");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credential Email/Password");
    } finally {
      reset();
      // setLoading(false);
    }
  };
  const handleLoginGoogle = async () => {
    try {
      const { user } = await signInWithGoogle();
      toast.success("Google Login successful");
      navigate(from, { replace: true });
      const userData = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        role: "customer",
        badge: "Bronze",
      };
      await axiosPublic.post(`/users`, userData);
    } catch (error) {
      console.log(error);
      toast.error("Google Login failed please try again");
    } finally {
      // setLoading(false);
    }
  };
  const handleToggleSignBtn = () => {
    setSignToggle(!signToggle);
  };
  return (
    <div>
      <div className="flex flex-col md:gap-4 lg:gap-10 lg:flex-row justify-center items-center bg-white w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto py-10 md:py-14 lg:py-20">
        <Helmet>
          <title>LogIn || ISTEBRA HOSTEL</title>
        </Helmet>
        <div className="">
          <img
            src={loginImg}
            className="w-full md:w-[400px] lg:w-[500px]"
          ></img>
        </div>
        <div className="flex flex-col w-full md:w-[500px]  p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-4 text-center">
            <h1 className="my-3 text-3xl font-semibold">Log In</h1>
          </div>
          <form
            className="space-y-6 ng-untouched ng-pristine ng-valid"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address<span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs font-medium">
                    Email is Required
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm mb-2 text-gray-700"
                  >
                    Password<span className="text-red-500 font-bold">*</span>
                  </label>
                </div>
                <input
                  type={signToggle ? "text" : "password"}
                  {...register("password", { required: true })}
                  autoComplete="current-password"
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900"
                />
                <button
                  type="button"
                  className="absolute -top-2"
                  onClick={handleToggleSignBtn}
                >
                  {" "}
                  {signToggle ? (
                    <FaEyeSlash className="absolute right-2 top-12 text-xl" />
                  ) : (
                    <IoEyeSharp className="absolute right-2 top-12 text-xl" />
                  )}
                </button>
                {errors.password && (
                  <span className="text-red-500 text-xs font-medium">
                    Password is Required
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="hover:bg-gradient-to-l  bg-gradient-to-r from-blue-500 to-blue-800 w-full rounded-md py-3 text-gray-100"
              >
                Login
              </button>
            </div>
          </form>
          <div className="space-y-1">
            <button className="text-xs hover:underline hover:text-lime-500 text-gray-400">
              Forgot password?
            </button>
          </div>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <button onClick={handleLoginGoogle}>
            <div className="flex justify-center items-center gap-2 rounded-md  border m-3 p-2 border-blue-700 border-rounded cursor-pointer">
              <FcGoogle className="text-2xl" />
              Continue with Google
            </div>
          </button>
          <p className="px-6 text-sm text-center text-gray-400">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/signup"
              className="hover:underline hover:text-blue-500 text-gray-600"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
