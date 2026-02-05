import React from 'react';
import { Link, Outlet } from 'react-router';
import DakBox from '../../Pages/SharedCopmponents/DakBoxLogo/DakBox';
import { Bike, ClipboardList, History, Home, Package, PlusCircle, TrainTrack, TruckIcon, UserCog } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { FaUserClock } from 'react-icons/fa';

const DashBoardLayout = () => {
    return (
        <div className="drawer lg:drawer-open" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
             <Helmet>
                    <title>DakBox | Dashboard</title>
                  </Helmet>
            <div className="drawer-content flex flex-col bg-gray-50">
                {/* Mobile Navbar */}
                <div className="navbar bg-[#0D2A38] text-white w-full lg:hidden border-b border-gray-700">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 font-bold text-[#D4E96D] tracking-wider">DakBox Dashboard</div>
                </div>

                {/* Main Page Content */}
                <div className="p-4 md:p-10 min-h-screen">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                
                <ul className="menu bg-[#0D2A38] text-white min-h-full w-80 p-8 space-y-4">
                    {/* Brand Branding */}
                    <div className="mb-12 border-b border-gray-700 pb-6">
                        <h2 className="text-4xl font-black text-[#D4E96D] tracking-tighter"><DakBox></DakBox></h2>
                        <p className="text-xs text-gray-400 mt-1 font-medium tracking-widest">USER PANEL</p>
                    </div>

                    <li>
                        <Link to="/dashboard/myparcels" className="flex items-center gap-3 text-lg font-semibold hover:bg-white/10 rounded-xl py-3 px-5 transition-all active:scale-95">
                            <Package size={22} /> <span>My Parcels</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/send-parcel" className="flex items-center gap-3 text-lg font-semibold hover:bg-white/10 rounded-xl py-3 px-5 transition-all active:scale-95">
                            <PlusCircle size={22} /> <span>Send Parcel</span>
                        </Link>
                    </li>
                    
                        <li>
                            <Link to="/dashboard/payment-history" className="flex items-center gap-3 text-lg font-semibold hover:bg-white/10 rounded-xl py-3 px-5 transition-all active:scale-95">
                                <History size={22} /> <span>My Payment History</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/track-package" className="flex items-center gap-3 text-lg font-semibold hover:bg-white/10 rounded-xl py-3 px-5 transition-all active:scale-95">
                                <TruckIcon size={22} /> <span>Track A Package</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/my-profile" className="flex items-center gap-3 text-lg font-semibold hover:bg-white/10 rounded-xl py-3 px-5 transition-all active:scale-95">
                                <UserCog size={22} /> <span>MY Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/active-riders" className="flex items-center gap-3 text-lg font-semibold hover:bg-white/10 rounded-xl py-3 px-5 transition-all active:scale-95">
                                <Bike size={22} /> <span>Active Riders</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/pending-riders" className="flex items-center gap-3 text-lg font-semibold hover:bg-white/10 rounded-xl py-3 px-5 transition-all active:scale-95">
                                <FaUserClock size={22} /> <span>Pending Riders</span>
                            </Link>
                        </li>
                    
                    <div className="pt-10">
                        <li>
                            <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-[#D4E96D] border border-[#D4E96D]/30 hover:bg-[#D4E96D] hover:text-[#0D2A38] rounded-xl py-3 px-5 transition-all">
                                <Home size={22} /> <span>Back to Home</span>
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;