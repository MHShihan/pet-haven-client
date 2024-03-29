import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/home/Home";
import Services from "../pages/allServices/Services";
import ServiceDetails from "../pages/serviceDetails/ServiceDetails";
import PrivateRoute from "./PrivateRoute";
import AddService from "../pages/addService/AddService";
import ManageService from "../pages/manageService/ManageService";
import MySchedule from "../pages/mySchedule/MySchedule";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "services",
        element: <Services></Services>,
      },
      {
        path: "/serviceDetails/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails></ServiceDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://pet-haven-server.vercel.app/api/v1/services/${params.id}`
          ),
      },
      {
        path: "/addService",
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },
      {
        path: "/manageService",
        element: (
          <PrivateRoute>
            <ManageService></ManageService>
          </PrivateRoute>
        ),
      },
      {
        path: "/mySchedule",
        element: (
          <PrivateRoute>
            <MySchedule></MySchedule>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
