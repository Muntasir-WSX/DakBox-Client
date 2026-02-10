import React from "react";
import { motion } from "framer-motion";
import amazon from "../../../../assets/brands/amazon.png";
import casio from "../../../../assets/brands/casio.png";
import moonstar from "../../../../assets/brands/moonstar.png";
import randstad from "../../../../assets/brands/randstad.png";
import star from "../../../../assets/brands/star.png";
import star_people from "../../../../assets/brands/start_people.png";

const Brands = () => {
  const brandLogos = [amazon, casio, moonstar, randstad, star, star_people];
  const duplicateLogos = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <div className="py-8 bg-gray-50/50 overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-[#002B2B] text-sm font-semibold mb-10 tracking-tight">
          We've helped thousands of sales teams
        </p>

        <div className="flex overflow-hidden relative group">
          <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="flex flex-nowrap shrink-0 items-center"
            animate={{ x: [0, "-33.33%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicateLogos.map((logo, index) => (
              <div key={index} className="mx-10 md:mx-16 shrink-0">
                <img
                  src={logo}
                  alt="brand-logo"
                  className="h-6 md:h-8 w-auto object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
