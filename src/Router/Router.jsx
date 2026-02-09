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
import BeARider from "../Pages/BeARider/BeARider";
import ActiveRiders from "../Pages/DashBoard/Admin/Riders/ActiveRiders/ActiveRiders";
import PendingRiders from "../Pages/DashBoard/Admin/Riders/PendingRiders/PendingRiders";
import Error from "../Pages/Error/Error";
import Services from "../Pages/FullHome/Home/Services/Services";
import MakeAdmin from "../Pages/DashBoard/Admin/MakeAdmin/MakeAdmin";
import AdminRoute from "../Routes/AdminRoute";
import ManageAllParcels from "../Pages/DashBoard/Admin/ManageAllParcels/ManageAllParcels";
import MyDeliveries from "../Pages/DashBoard/Riders/MyDeliveries/MyDeliveries";
import RiderRoute from "../Routes/RiderRoute";
import MyReviews from "../Pages/DashBoard/Riders/MyReviews/MyReviews";
import UserRoute from "../Routes/UserRoute";
import MyEarnings from "../Pages/DashBoard/Admin/Riders/MyEarnings/MyEarnings";
import MyCashout from "../Pages/DashBoard/Admin/Riders/MyCashout/MyCashout";
import CashoutRequests from "../Pages/DashBoard/Admin/CashoutRequest/CashoutRequest";



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
        element: (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <h2 className="text-4xl font-bold text-[#0D2A38]">Welcome to DakBox Dashboard</h2>
          <p className="text-gray-500 mt-2">Please select an option from the sidebar to get started.</p>
        </div>
      )
      },
      {
        path: 'myparcels',
        element: <UserRoute><MyParcels /></UserRoute> 
      },
      {
        path:'parcel-details/:id',
        element: <UserRoute><ParcelDetails></ParcelDetails></UserRoute>
      },
      {
        path: 'payment/:parcelid',
        element: <UserRoute><Payment></Payment></UserRoute>
      },
      {
        path: 'payment-history',
        element: <UserRoute><PaymentHistory></PaymentHistory></UserRoute> 
      },
      {
        path: 'track-parcel',
       element: <UserRoute><TrackPackage></TrackPackage></UserRoute>
      },
      {
        path: 'make-admin',
        element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
      },
      {
        path: 'pending-riders',
        element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
      },
      {
        path: 'active-riders',
        element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
      },

      {
        path: 'manage-admin',
        element: <AdminRoute><ManageAllParcels></ManageAllParcels></AdminRoute>
      },
      {
        path: "cashout-requests",
        element: <AdminRoute><CashoutRequests></CashoutRequests></AdminRoute>
      },

      {
      path: 'assigned-parcels',
      element: <RiderRoute><MyDeliveries /></RiderRoute>
    },
    {
      path: 'rider-reviews',
      element: <RiderRoute><MyReviews></MyReviews></RiderRoute>
    },
    {
      path: "my-earnings",
      element: <RiderRoute><MyEarnings></MyEarnings></RiderRoute>
    },
    {
      path: "cashout",
      element:<RiderRoute><MyCashout></MyCashout></RiderRoute>
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