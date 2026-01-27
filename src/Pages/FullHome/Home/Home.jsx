import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 

import Banner from "../Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import Services from "./Services/Services";
import Brands from "./Brands/Brands";
import CTA from "./CTA/CTA";
import Priority from "./Priority/Priority";
import Review from "./Rivew/Rivew";
import FAQ from "../../SharedCopmponents/FAQ/FAQ";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      offset: 100,    
      easing: "ease-in-out",
      once: true,    // Scroll up-down korle bar bar animation hobe na, shudhu ekbar hobe
    });
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Protiti section smoothly load hobe */}
      <div data-aos="fade-in">
        <Banner />
      </div>

      <div data-aos="fade-up">
        <HowItWorks />
      </div>

      <div data-aos="fade-up">
        <Services />
      </div>

      <div data-aos="zoom-in">
        <Brands />
      </div>

      <div data-aos="fade-up">
        <CTA />
      </div>

      <div data-aos="fade-up">
        <Priority />
      </div>

      <div data-aos="fade-up">
        <Review />
      </div>

      <div data-aos="fade-up">
        <FAQ />
      </div>
    </div>
  );
};

export default Home;