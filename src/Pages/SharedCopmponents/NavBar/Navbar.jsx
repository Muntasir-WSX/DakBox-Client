import React from "react";
import { NavLink } from "react-router-dom";
import DakBox from "../DakBoxLogo/DakBox";
import { MoveUpRight, Menu, LogOut } from "lucide-react"; 
import useAuth from "../../../Hooks/useAuth"; 
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth(); 

  const handleLogOut = () => {
    logOut()
    .then(() => {
      toast.success("Logged out successfully", {
        icon: '👋',
        style: { background: "#1F2937", color: "#D9F26B" },
      });
    })
    .catch((error) => console.log(error));
  };

  const navLinkStyles = ({ isActive }) =>
    `transition-colors duration-200 font-medium whitespace-nowrap text-[13px] xl:text-sm ${
      isActive ? "text-black font-bold lg:border-b-2 lg:border-black" : "text-gray-500 hover:text-black"
    }`;

  const navItems = (
    <>
      <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
      {user && (
        <>
          
          <li><NavLink to="/dashboard" className={navLinkStyles}>My DashBoard</NavLink></li>
          
        </>
      )}
      <li><NavLink to="/send-parcel" className={navLinkStyles}>Send Parcel</NavLink></li>
      <li><NavLink to="/services" className={navLinkStyles}>Services</NavLink></li>
      <li><NavLink to="/coverage" className={navLinkStyles}>Coverage</NavLink></li>
      <li><NavLink to="/contact" className={navLinkStyles}>Be a Rider</NavLink></li>
      <li><NavLink to="/aboutUs" className={navLinkStyles}>About Us</NavLink></li>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-4 relative z-100">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-white border border-gray-100 rounded-full px-4 xl:px-8 py-2 shadow-sm flex items-center justify-between min-h-16">
            
            {/* Start: Logo Section */}
            <div className="shrink-0 flex items-center gap-2">
              <label htmlFor="my-drawer" className="btn btn-ghost lg:hidden p-0 min-h-0 h-auto">
                <Menu size={24} className="text-gray-600" />
              </label>
              <DakBox />
            </div>

            {/* Center: Menu Section  */}
            <div className="hidden lg:flex grow justify-center px-4 overflow-hidden">
              <ul className="menu menu-horizontal gap-1 xl:gap-4 flex-nowrap">
                {navItems}
              </ul>
            </div>

            {/* End: Auth Section */}
            <div className="shrink-0 flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2 xl:gap-3">
                  <div className="tooltip tooltip-bottom lowercase" data-tip={user?.email}>
                    <div className="avatar online cursor-pointer">
                      <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full border-2 border-[#D9F26B]">
                        <img 
                          src={user?.photoURL || "https://ui-avatars.com/api/?name=User"} 
                          alt="User Profile" 
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleLogOut}
                    className="btn bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-full px-3 xl:px-4 h-9 xl:h-10 min-h-0 flex items-center gap-2"
                  >
                    <span className="font-extrabold text-[10px] xl:text-xs uppercase hidden xl:block">Logout</span>
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <NavLink to="/signin" className="btn bg-gray-50 border border-gray-100 rounded-full px-4 h-9 xl:h-10 min-h-0 flex items-center gap-2 group">
                    <span className="font-bold text-black text-[11px] xl:text-sm uppercase">Sign In</span>
                    <MoveUpRight size={14} className="group-hover:rotate-45 transition-transform hidden xl:block" />
                  </NavLink>

                  <NavLink to="/signup" className="btn bg-[#D9F26B] border-none rounded-full px-4 h-9 xl:h-10 min-h-0 flex items-center gap-2">
                    <span className="font-bold text-black text-[11px] xl:text-sm uppercase">Sign Up</span>
                  </NavLink>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Sidebar for Mobile */}
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-6 w-80 min-h-full bg-white text-base-content space-y-4 pt-10">
            <div className="mb-8 px-4"><DakBox /></div>
            {navItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;