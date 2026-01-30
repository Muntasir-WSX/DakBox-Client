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

export const router = createBrowserRouter([
  // ১. মেইন ওয়েবসাইট লেআউট (Navbar & Footer থাকবে)
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

  // ২. ড্যাশবোর্ড লেআউট (সম্পূর্ণ আলাদা লেআউট - মেইন নেভবার এখানে আসবে না)
  {
    path: "dashboard",
    element: <PrivateRoutes><DashBoardLayout /></PrivateRoutes>,
    children: [
      {
        index: true,
        element: <Navigate to="myparcels" replace /> // /dashboard এ গেলে সরাসরি My Parcels এ নিবে
      },
      {
        path: 'myparcels',
        element: <MyParcels />
      }
    ]
  },

  // ৩. অথেনটিকেশন লেআউট (SignIn/SignUp)
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