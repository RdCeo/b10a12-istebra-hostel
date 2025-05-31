import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../../../src/assets/Auth/Sign up-amico.svg";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../api/utils";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
const SignUp = () => {
  const {
    createSignUpNewUsers,
    updateUserProfile,
    signInWithGoogle,
    setRefetch,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [signToggle, setSignToggle] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleSignup = async (data) => {
    const photo = await imageUpload(data.image[0]);
    const name = data.name;
    const email = data.email;
    const password = data.password;
    try {
      const { user } = await createSignUpNewUsers(email, password);
      await updateUserProfile({
        displayName: name,
        photoURL: photo,
      });
      setRefetch(Date.now());
      toast.success("Signup Successfully");
      const userData = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        role: "customer",
        badge: "Bronze",
      };
      await axiosPublic.post(`/users`, userData);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Email already in use");
    } finally {
      reset();
      // setLoading(false);
    }
  };
  const handleSignUpGoogle = async () => {
    try {
      const { user } = await signInWithGoogle();
      toast.success("Google Signup successful");
      navigate("/");

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
      toast.error("Google Signup failed please try again");
    } finally {
      // setLoading(false);
    }
  };
  const handleToggleSignBtn = () => {
    setSignToggle(!signToggle);
  };
  return (
    <div className="flex flex-col gap-8 md:gap-10 lg:gap-20 lg:flex-row justify-center items-center py-10 md:py-14 lg:py-20 bg-white w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
      <Helmet>
        <title>SignUp || ISTEBRA HOSTEL</title>
      </Helmet>
      <div className="">
        <img src={signupImg} className="w-full md:w-[400px] lg:w-[500px]"></img>
      </div>
      <div className="flex flex-col p-6 rounded-md sm:p-10 w-full md:w-[500px] bg-gray-100 text-gray-900 mx">
        <div className="mb-4 text-center">
          <h1 className="my-3 text-3xl font-semibold">Sign Up</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name<span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
              {errors.name && (
                <span className="text-red-500 text-xs font-medium">
                  Name is Required
                </span>
              )}
            </div>
            <div className="">
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image<span className="text-red-500 font-bold">*</span>
              </label>
              <div className="flex flex-col">
                <input
                  {...register("image", { required: true })}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                />
                {errors.image && (
                  <span className="text-red-500 text-xs font-medium mt-1">
                    Image is Required
                  </span>
                )}
              </div>
            </div>
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
                <label htmlFor="password" className="text-sm mb-2">
                  Password<span className="text-red-500 font-bold">*</span>
                </label>
              </div>
              <input
                type={signToggle ? "text" : "password"}
                {...register("password", {
                  required: { value: true, message: "Password is Required" },
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must One uppercase, One lowercase, One special character",
                  },
                })}
                autoComplete="new-password"
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
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="hover:bg-gradient-to-l bg-gradient-to-r from-blue-600 to-blue-800 w-full rounded-md py-3 text-gray-100"
            >
              SignUp
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          onClick={handleSignUpGoogle}
          className="flex justify-center items-center gap-1 rounded-md border m-3 p-2 border-blue-700 border-rounded cursor-pointer"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-blue-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
