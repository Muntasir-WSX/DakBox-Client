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
import AboutUs from "../Pages/AboutUs/AboutUs";
import Payment from "../Pages/DashBoard/PayemtIntegration/Payment";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import TrackPackage from "../Pages/DashBoard/TrackPackage/TrackPackage";
import MYProfile from "../Pages/DashBoard/MYProfile/MYProfile";
import BeARider from "../Pages/BeARider/BeARider";
import ActiveRiders from "../Pages/DashBoard/Riders/ActiveRiders/ActiveRiders";
import PendingRiders from "../Pages/DashBoard/Riders/PendingRiders/PendingRiders";
import Error from "../Pages/Error/Error";
import Services from "../Pages/FullHome/Home/Services/Services";


export const router = createBrowserRouter([
  // 1. main layout (Public Pages)
  {
    path: "/",
    element: <MainLayout />, 
    errorElement: <Error></Error>,
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
      {
         path: "be-a-rider",
         element: <PrivateRoutes><BeARider></BeARider></PrivateRoutes>
      },
      {
        path: "aboutUs",
        Component: AboutUs
      },
      {
        path: "services",
        Component: Services
      }
    
    ]
  },

  // 2. dashbaord layout (User Dashboard)
  {
    path: "dashboard",
    element: <PrivateRoutes><DashBoardLayout /></PrivateRoutes>,
    errorElement: <Error></Error>,
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
        Component: ParcelDetails
      },
      {
        path: 'payment/:parcelid',
        Component: Payment
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path: 'track-package',
        Component:TrackPackage
      },
      {
        path: 'my-profile',
        Component:MYProfile
      },
      {
        path: 'pending-riders',
        Component:PendingRiders
      },
      {
        path: 'active-riders',
        Component:ActiveRiders
      },
      {
        path: 'pending-riders',
        Component:PendingRiders
      }
    ]
  },

  // 3. auth layout (SignIn/SignUp)
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <Error></Error>,
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
  },
  {
    path: "*",
    Component: Error
  }

]);