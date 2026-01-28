import React from 'react';
import { Link, Outlet } from 'react-router';
import AuthImage from "../../assets/authImage.png";
import DakBox from '../../Pages/SharedCopmponents/DakBoxLogo/DakBox';

const AuthLayout = () => {
    return (
        <div className="flex min-h-screen bg-white relative overflow-hidden">
            
            {/* Logo: Positioned at Top Left */}
            {/* md:top-10 এবং md:left-10 স্পেসিং বাড়ানো হয়েছে */}
            <div className="absolute top-6 left-6 md:top-10 md:left-12 z-50">
                <Link to="/">
                    <DakBox />
                </Link>
            </div>

            {/* Left Side: Form Content */}
            {/* pt-32 বা pt-40 যোগ করা হয়েছে যাতে লোগোর নিচে ফর্ম শুরু হয় */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 pt-32 md:pt-40">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>

            {/* Right Side: Image Illustration */}
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