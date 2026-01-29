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
        style: {
          background: "#1F2937",
          color: "#D9F26B",
        },
      });
    })
    .catch((error) => {
      toast.error("Logout failed!");
      console.log(error);
    });
  };

  const navLinkStyles = ({ isActive }) =>
    `transition-colors duration-200 font-medium ${
      isActive ? "text-black font-bold lg:border-b-2 lg:border-black" : "text-gray-500 hover:text-black"
    }`;

  const navItems = (
    <>
      <li><NavLink to="/services" className={navLinkStyles}>Services</NavLink></li>
      <li><NavLink to="/coverage" className={navLinkStyles}>Coverage</NavLink></li>
      <li><NavLink to="/about" className={navLinkStyles}>About Us</NavLink></li>
      <li><NavLink to="/pricing" className={navLinkStyles}>Pricing</NavLink></li>
      <li><NavLink to="/trackorder" className={navLinkStyles}>Track Order</NavLink></li>
      <li><NavLink to="/send-parcel" className={navLinkStyles}>Send Parcel</NavLink></li>
      <li><NavLink to="/contact" className={navLinkStyles}>Be a Rider</NavLink></li>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-4 relative z-100">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-white border border-gray-100 rounded-full px-6 py-2 shadow-sm">
            
            <div className="navbar-start">
              <label htmlFor="my-drawer" className="btn btn-ghost lg:hidden p-0 mr-2 min-h-0 h-auto">
                <Menu size={24} className="text-gray-600" />
              </label>
              <DakBox />
            </div>

            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 gap-6 text-sm">
                {navItems}
              </ul>
            </div>

            <div className="navbar-end gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  {/* User Profile Image with Tooltip (Email on Hover) */}
                  <div className="tooltip tooltip-bottom lowercase" data-tip={user?.email}>
                    <div className="avatar online cursor-pointer">
                      <div className="w-10 h-10 rounded-full border-2 border-[#D9F26B]">
                        <img 
                          src={user?.photoURL || "https://ui-avatars.com/api/?name="} 
                          alt="User Profile" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button 
                    onClick={handleLogOut}
                    className="btn bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-full px-4 h-10 min-h-0 transition-all flex items-center gap-2"
                  >
                    <span className="font-extrabold text-xs uppercase hidden md:block">Logout</span>
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <NavLink to="/signin" className="btn bg-gray-50 hover:bg-gray-200 border border-gray-100 rounded-full px-4 md:px-5 flex items-center gap-2 group h-10 min-h-0">
                    <span className="font-bold text-black text-[10px] md:text-sm uppercase tracking-tight">Sign In</span>
                    <div className="bg-black text-white rounded-full p-1 transition-transform group-hover:rotate-45 hidden sm:block">
                      <MoveUpRight size={12} />
                    </div>
                  </NavLink>

                  <NavLink to="/signup" className="btn bg-[#D9F26B] hover:bg-[#c4db59] border-none rounded-full px-4 md:px-5 flex items-center gap-2 group h-10 min-h-0">
                    <span className="font-bold text-black text-[10px] md:text-sm uppercase tracking-tight">Sign Up</span>
                    <div className="bg-black text-[#D9F26B] rounded-full p-1 transition-transform group-hover:rotate-45 hidden sm:block">
                      <MoveUpRight size={12} />
                    </div>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-6 w-80 min-h-full bg-white text-base-content space-y-4 pt-10">
            <div className="mb-8 px-4">
              <DakBox />
            </div>
            {navItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;