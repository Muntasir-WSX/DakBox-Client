import React from "react";
import { NavLink, Outlet } from "react-router";
import DakBox from "../../Pages/SharedCopmponents/DakBoxLogo/DakBox";
import {
  Banknote,
  Bike,
  ClipboardList,
  History,
  Home,
  Package,
  PlusCircle,
  TruckIcon,
  UserCog,
  UserRoundCog,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { FaUserClock } from "react-icons/fa";
import useRole from "../../Hooks/useRole";
import Loading from "../../Pages/SharedCopmponents/Loading/Loading";

const DashBoardLayout = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <Loading></Loading>;
  const activeLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 text-lg font-semibold rounded-xl py-3 px-5 transition-all active:scale-95 ${
      isActive
        ? "bg-[#D4E96D] text-[#0D2A38]" 
        : "text-white hover:bg-white/10" 
    }`;

  return (
    <div
      className="drawer lg:drawer-open"
      style={{ fontFamily: "'Urbanist', sans-serif" }}
    >
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <Helmet>
        <title>DakBox | Dashboard</title>
      </Helmet>
      
      <div className="drawer-content flex flex-col bg-gray-50">
        {/* Mobile Navbar */}
        <div className="navbar bg-[#0D2A38] text-white w-full lg:hidden border-b border-gray-700">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-square btn-ghost"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-bold text-[#D4E96D]">DakBox Dashboard</div>
        </div>

        {/* Main Page Content */}
        <div className="p-4 md:p-10 min-h-screen">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu bg-[#0D2A38] text-white min-h-full w-80 p-8 space-y-2">
          {/* Branding */}
          <div className="mb-8 border-b border-gray-700 pb-6">
            <h2 className="text-4xl font-black text-[#D4E96D]">
              <DakBox />
            </h2>
            <p className="text-[10px] bg-[#D4E96D]/10 text-[#D4E96D] mt-2 py-1 px-3 rounded-full w-fit font-bold uppercase tracking-widest">
              {role} Panel
            </p>
          </div>

          {/* User Routes */}
          {role === "user" && (
            <>
              <li><NavLink to="/dashboard/myparcels" className={activeLinkStyle}><Package size={22} /> My Parcels</NavLink></li>
              <li><NavLink to="/dashboard/payment-history" className={activeLinkStyle}><History size={22} /> Payment History</NavLink></li>
              <li><NavLink to="/dashboard/track-parcel" className={activeLinkStyle}><TruckIcon size={22} /> Track Parcel</NavLink></li>
            </>
          )}

          {/* Admin Routes */}
          {role === "admin" && (
            <>
              <li><NavLink to="/dashboard/manage-admin" className={activeLinkStyle}><ClipboardList size={22} /> Manage All Parcels</NavLink></li>
              <li><NavLink to="/dashboard/active-riders" className={activeLinkStyle}><Bike size={22} /> Active Riders</NavLink></li>
              <li><NavLink to="/dashboard/pending-riders" className={activeLinkStyle}><FaUserClock size={22} /> Pending Riders</NavLink></li>
              <li><NavLink to="/dashboard/make-admin" className={activeLinkStyle}><UserRoundCog size={22} /> Make Admin</NavLink></li>
              <li><NavLink to="/dashboard/cashout-requests" className={activeLinkStyle}><Banknote size={22} /> Cashout Requests</NavLink></li>
            </>
          )}

          {/* Rider Routes */}
          {role === "rider" && (
            <>
              <li><NavLink to="/dashboard/assigned-parcels" className={activeLinkStyle}><ClipboardList size={22} /> My Deliveries</NavLink></li>
              <li><NavLink to="/dashboard/rider-reviews" className={activeLinkStyle}><UserCog size={22} /> My Reviews</NavLink></li>
              <li><NavLink to="/dashboard/my-earnings" className={activeLinkStyle}><History size={22} /> My Earnings</NavLink></li>
              <li><NavLink to="/dashboard/cashout" className={activeLinkStyle}><PlusCircle size={22} /> Cashout</NavLink></li>
            </>
          )}

          {/* Bottom Divider & Shared Links */}
          <div className="pt-8 mt-4 border-t border-gray-700">
            <li>
              <NavLink
                to="/"
                className="flex items-center gap-3 text-lg font-semibold text-[#D4E96D] border border-[#D4E96D]/30 hover:bg-[#D4E96D] hover:text-[#0D2A38] rounded-xl py-3 px-5 transition-all"
              >
                <Home size={22} /> <span>Back to Home</span>
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;