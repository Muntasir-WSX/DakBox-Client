import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/FullHome/Home/Home"
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import SignIn from "../Pages/AuthPages/SignIn/SignIn";
import SignUp from "../Pages/AuthPages/SignUp/SignUp";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/SendParcel/SendParcel";
import PrivateRoutes from "../Routes/PrivateRoutes";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/coverage",
        Component: Coverage 
      },
      {
        path: "/send-parcel",
        element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>
      }
    ]
  },
  {
    path:"/",
    Component: AuthLayout,
    children:[
      {
        path:"/signin",
        Component: SignIn
      },
      {
        path:"/signup",
        Component: SignUp
      }
    ]
  }
]);