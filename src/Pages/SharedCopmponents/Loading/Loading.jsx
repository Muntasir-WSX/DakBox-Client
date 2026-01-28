import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[#D4E96D] border-t-transparent rounded-full animate-spin"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-[#a8bf34] rounded-full animate-pulse"></div>
        </div>
      </div>

      <h2 className="mt-4 text-xl font-bold text-gray-800 tracking-widest uppercase animate-pulse">
        Dak<span className="text-[#a8bf34]">Box</span>
      </h2>
      <p className="text-gray-400 text-xs mt-1 font-medium tracking-tighter">
        Please wait a moment...
      </p>
    </div>
  );
};

export default Loading;
