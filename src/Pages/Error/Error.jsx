import React from 'react';
import { Link } from 'react-router-dom'; 
import errorAnim from "../../../animations/error.json";
import { Home, AlertTriangle } from 'lucide-react';
import LottieWrapper from 'lottie-react';

// SignIn পেজের মতো Wrapper হ্যান্ডেল করা
const Lottie = LottieWrapper.default || LottieWrapper;

const Error = () => {
    return (
        <div className="min-h-screen bg-[#0D2A38] flex flex-col items-center justify-center p-6 text-center" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            
            {/* Lottie Animation Container */}
            <div className="w-full max-w-lg mb-8">
                {/* এখানে Lottie (capital L) ব্যবহার করা হয়েছে */}
                <Lottie 
                    animationData={errorAnim} 
                    loop={true} 
                    style={{ width: "100%", height: "auto" }}
                />
            </div>

            {/* Error Message */}
            <div className="space-y-4 max-w-md">
                <div className="flex justify-center mb-2">
                    <span className="bg-[#D4E96D]/10 text-[#D4E96D] px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                        <AlertTriangle size={16} /> Error Found
                    </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                    Oops! Lost in <span className="text-[#D4E96D]">Space?</span>
                </h1>
                
                <p className="text-gray-400 text-lg font-medium">
                    The page you are looking for doesn't exist or has been moved. Let's get you back on track!
                </p>

                {/* Action Buttons */}
                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to="/" 
                        className="flex items-center justify-center gap-2 bg-[#D4E96D] text-[#0D2A38] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#c2d951] transition-all active:scale-95 shadow-lg shadow-[#D4E96D]/20"
                    >
                        <Home size={20} /> Back to Home
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 border border-gray-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all active:scale-95"
                    >
                        Go Back
                    </button>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10 opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4E96D] blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#D4E96D] blur-[120px] rounded-full opacity-50"></div>
            </div>
        </div>
    );
};

export default Error;