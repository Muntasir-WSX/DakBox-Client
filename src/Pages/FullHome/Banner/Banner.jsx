import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router-dom";
import { MoveUpRight } from "lucide-react";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-6">
      <div className="relative overflow-hidden rounded-3xl group">
        
        {/* Button Overlay - Positioned at bottom-left relative to banner text */}
        <div className="absolute inset-0 z-10 flex items-end justify-start  pb-[2%] pl-[3%] md:pb-[4%] md:pl-[3%] pointer-events-none">
          <div className="flex items-center gap-2 md:gap-4 pointer-events-auto scale-75 sm:scale-90 md:scale-100 origin-left">
            
            {/* Button 1: Track Your Parcel (Lime Theme) */}
            <div className="flex items-center group/btn1 cursor-pointer">
              <NavLink
                to="/coverage"
                className="bg-[#D4E96D] text-[#0D2A38] font-extrabold py-2 md:py-3 px-4 md:px-6 rounded-full text-xs md:text-sm transition-all duration-300 shadow-md hover:bg-[#c2d951]"
              >
               Our Coverage
              </NavLink>
              <div className="bg-[#1F2937] p-2 md:p-3 rounded-full -ml-3 z-20 shadow-lg border-2 border-white transition-transform duration-300 group-hover/btn1:rotate-45">
                <MoveUpRight size={14} className="text-[#D4E96D] md:w-4 md:h-4" />
              </div>
            </div>

            {/* Button 2: Be A Rider (White to Dark Theme) */}
            <div className="flex items-center group/btn2 cursor-pointer">
              <NavLink
                to="/be-a-rider"
                className="bg-white text-[#0D2A38] font-extrabold py-2 md:py-3 px-4 md:px-6 rounded-full text-xs md:text-sm transition-all duration-300 shadow-md border border-gray-100 hover:bg-[#0D2A38] hover:text-white"
              >
                Be A Rider
              </NavLink>
              <div className="bg-[#1F2937] p-2 md:p-3 rounded-full -ml-3 z-20 shadow-lg border-2 border-white transition-transform duration-300 group-hover/btn2:rotate-45">
                <MoveUpRight size={14} className="text-[#D4E96D] md:w-4 md:h-4" />
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Section */}
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          interval={3000}
          stopOnHover={false}
        >
          <div className="h-full">
            <img src={bannerImg1} alt="Banner 1" className="w-full h-full object-cover" />
          </div>
          <div className="h-full">
            <img src={bannerImg2} alt="Banner 2" className="w-full h-full object-cover" />
          </div>
          <div className="h-full">
            <img src={bannerImg3} alt="Banner 3" className="w-full h-full object-cover" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;