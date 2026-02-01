import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/FullHome/Home/Home"
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import SignIn from "../Pages/AuthPages/SignIn/SignIn";
import SignUp from "../Pages/AuthPages/SignUp/SignUp";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/SendParcel/SendParcel";
import PrivateRoutes from "../Routes/PrivateRoutes";
import DashBoardLayout from "../Layouts/DashBoardLayout/DashBoardLayout";
import MyParcels from "../Pages/DashBoard/MyParcels/MyParcels";
import ParcelDetails from "../Pages/DashBoard/MyParcels/ParcelDetails";

export const router = createBrowserRouter([
  // 1. main layout (Public Pages)
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "coverage",
        element: <Coverage /> 
      },
      {
        path: "send-parcel",
        element: <PrivateRoutes><SendParcel /></PrivateRoutes>
      },
    ]
  },

  // 2. dashbaord layout (User Dashboard)
  {
    path: "dashboard",
    element: <PrivateRoutes><DashBoardLayout /></PrivateRoutes>,
    children: [
      {
        index: true,
        element: <Navigate to="myparcels" replace /> 
      },
      {
        path: 'myparcels',
        element: <MyParcels />
      },
      {
        path:'parcel-details/:id',
        element: <PrivateRoutes><ParcelDetails /></PrivateRoutes>
      }
    ]
  },

  // 3. auth layout (SignIn/SignUp)
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: <SignIn />
      },
      {
        path: "signup",
        element: <SignUp />
      }
    ]
  }
]);