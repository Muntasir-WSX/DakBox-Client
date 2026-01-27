import React from 'react';
import { Outlet } from 'react-router';
import AuthImage from "../../assets/authImage.png";
import DakBox from '../../Pages/SharedCopmponents/DakBoxLogo/DakBox';

const AuthLayout = () => {
    return (
        <div className="flex min-h-screen bg-white relative overflow-hidden">
            
            {/* Logo: Positioned at Top Left Corner */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
                <DakBox />
            </div>

            {/* Left Side: Form Content (Strictly 50%) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>

            {/* Right Side: Image Illustration (Strictly 50% No Gaps) */}
            <div className="hidden lg:flex w-1/2 bg-[#F1F9E8] items-center justify-center relative">
                <div className="w-full h-full flex items-center justify-center p-16">
                    <img 
                        src={AuthImage} 
                        alt="Authentication Illustration" 
                        className="max-w-full max-h-[80vh] object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;