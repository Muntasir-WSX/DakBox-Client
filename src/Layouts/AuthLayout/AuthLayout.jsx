import React from 'react';
import { Outlet } from 'react-router';
import AuthImage from "../../assets/authImage.png";
import DakBox from '../../Pages/SharedCopmponents/DakBoxLogo/DakBox';


const AuthLayout = () => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-white">
            {/* Left Side: Form Content */}
            <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-16 lg:p-24">
                {/* Logo Import */}
                <div className="mb-12">
                    <DakBox />
                </div>

                {/* Dynamic Content (Login/Register Form) */}
                <div className="w-full max-w-md mx-auto lg:mx-0">
                    <Outlet />
                </div>
            </div>

            {/* Right Side: Image Illustration */}
            <div className="hidden lg:flex w-1/2 bg-[#F1F9E8] items-center justify-center p-12">
                <div className="relative w-full max-w-lg">
                    <img 
                        src={AuthImage} 
                        alt="Authentication Illustration" 
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;