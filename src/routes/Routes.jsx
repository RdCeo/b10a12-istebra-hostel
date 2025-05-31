import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import SignUp from "../pages/SignUp/SignUp";
import MealDetails from "../pages/MealDetails/MealDetails";
import MealsPage from "../pages/MealsPage/MealsPage";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AddMeals from "../pages/Dashboard/Admin/AddMeals/AddMeals";
import Statistics from "../pages/Dashboard/Common/Statistics";
import UserProfile from "../pages/Dashboard/User/UserProfile/UserProfile";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile/AdminProfile";
import AllMeals from "../pages/Dashboard/Admin/AllMeals/AllMeals";
import AllReviews from "../pages/Dashboard/Admin/AllReviews/AllReviews";
import UpComingMeal from "../pages/Dashboard/Admin/UpComingMeal/UpComingMeal";
import RequestedMeals from "../pages/Dashboard/User/RequestedMeals/RequestedMeals";
import MyReviews from "../pages/Dashboard/User/MyReviews/MyReviews";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory/PaymentHistory";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";
import ViewMeals from "../pages/Dashboard/Admin/ViewMeals/ViewMeals";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import ViewMealsReviews from "../pages/Dashboard/User/ViewMealsReviews/ViewMealsReviews";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ServeMeals from "../pages/Dashboard/Admin/ServeMeals/ServeMeals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/meals",
        element: <MealsPage></MealsPage>,
      },
      {
        path: "/upcoming-meals",
        element: <UpcomingMeals></UpcomingMeals>,
      },
      {
        path: "/meal/:id",
        element: <MealDetails></MealDetails>,
      },
      {
        path: "/checkout/:name",
        element: (
          <PrivateRoutes>
            <CheckoutPage></CheckoutPage>
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoutes>
            <Statistics></Statistics>
          </PrivateRoutes>
        ),
      },
      // Admin Route
      {
        path: "admin-profile",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <AdminProfile></AdminProfile>
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "add-meals",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <AddMeals></AddMeals>
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "all-meals",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <AllMeals></AllMeals>
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <AllReviews></AllReviews>
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "serve-meals",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <ServeMeals></ServeMeals>
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "coming-meals",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <UpComingMeal></UpComingMeal>
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "view-meals/:id",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <ViewMeals></ViewMeals>,
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      // User Route
      {
        path: "user-profile",
        element: (
          <PrivateRoutes>
            <UserProfile></UserProfile>
          </PrivateRoutes>
        ),
      },
      {
        path: "requested-meals",
        element: (
          <PrivateRoutes>
            <RequestedMeals></RequestedMeals>
          </PrivateRoutes>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoutes>
            <MyReviews></MyReviews>
          </PrivateRoutes>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoutes>
            <PaymentHistory></PaymentHistory>
          </PrivateRoutes>
        ),
      },
      {
        path: "view-meals-reviews/:id",
        element: (
          <PrivateRoutes>
            <ViewMealsReviews></ViewMealsReviews>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
