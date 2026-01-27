import React from "react";
import { NavLink } from "react-router-dom";
import DakBox from "../DakBoxLogo/DakBox";
import { MoveUpRight, Menu } from "lucide-react";

const Navbar = () => {
  // Active class logic for NavLinks
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
      <li><NavLink to="/blog" className={navLinkStyles}>Blog</NavLink></li>
      <li><NavLink to="/contact" className={navLinkStyles}>Contact</NavLink></li>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-4 relative z-100">
      {/* Drawer Wrapper */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          {/* Main Navbar */}
          <div className="navbar bg-white border border-gray-100 rounded-full px-6 py-2 shadow-sm">
            
            {/* Start: Logo & Mobile Toggle */}
            <div className="navbar-start">
              <label htmlFor="my-drawer" className="btn btn-ghost lg:hidden p-0 mr-2 min-h-0 h-auto">
                <Menu size={24} className="text-gray-600" />
              </label>
              <NavLink to="/" className="flex items-center">
                <DakBox />
              </NavLink>
            </div>

            {/* Center: Desktop Links */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 gap-6 text-sm">
                {navItems}
              </ul>
            </div>

            {/* End: Auth Buttons */}
            <div className="navbar-end gap-2 md:gap-3">
              <NavLink to="/login" className="btn bg-gray-50 hover:bg-gray-200 border border-gray-100 rounded-full px-4 md:px-5 flex items-center gap-2 group h-10 min-h-0">
                <span className="font-bold text-black text-[10px] md:text-sm uppercase tracking-tight">Sign In</span>
                <div className="bg-black text-white rounded-full p-1 transition-transform group-hover:rotate-45 hidden sm:block">
                  <MoveUpRight size={12} />
                </div>
              </NavLink>

              <NavLink to="/register" className="btn bg-[#D9F26B] hover:bg-[#c4db59] border-none rounded-full px-4 md:px-5 flex items-center gap-2 group h-10 min-h-0">
                <span className="font-bold text-black text-[10px] md:text-sm uppercase tracking-tight">Sign Up</span>
                <div className="bg-black text-[#D9F26B] rounded-full p-1 transition-transform group-hover:rotate-45 hidden sm:block">
                  <MoveUpRight size={12} />
                </div>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Drawer Sidebar (Mobile) */}
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-6 w-80 min-h-full bg-white text-base-content space-y-4 pt-10">
            {/* Sidebar Logo */}
            <div className="mb-8 px-4">
              <DakBox />
            </div>
            {navItems}
            <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
               <NavLink to="/login" className="btn btn-outline rounded-full">Sign In</NavLink>
               <NavLink to="/register" className="btn bg-[#D9F26B] border-none rounded-full">Sign Up</NavLink>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;