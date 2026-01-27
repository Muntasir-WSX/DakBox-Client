import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import HowItWorks from "../Home/HowItWorks/HowItWorks";
import Services from "../Home/Services/Services";

const Banner = () => {
  return (
    <div>
      <Carousel autoPlay={true} 
        infiniteLoop={true} 
        showThumbs={false} 
        showStatus={false}    
        showArrows={false}    
        showIndicators={false} 
        interval={3000}       
        stopOnHover={false}  >
        <div>
          <img src={bannerImg1} />
        </div>
        <div>
        <img src={bannerImg2} />
      </div>
      <div>
        <img src={bannerImg3} />
      </div>
    </Carousel>
    
    </div>
  );
};

export default Banner;
