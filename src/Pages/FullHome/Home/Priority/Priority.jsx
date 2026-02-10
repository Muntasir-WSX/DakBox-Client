import React from "react";
import locationMerchant from "../../../../assets/location-merchant.png";
import beAMarchantBg from "../../../../assets/be-a-merchant-bg.png";

const Priority = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto rounded-[40px] relative overflow-hidden bg-[#002B2B] min-h-112.5 flex items-center">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url(${beAMarchantBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
          }}
        ></div>

        <div className="relative z-10 w-full px-8 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-3/5 text-white space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Merchant and Customer Satisfaction <br />
              is Our First Priority
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. DakBox courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>

            <div className="flex flex-wrap gap-4 pt-6">
              <button className="bg-[#D1F366] text-[#002B2B] px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-[#D1F366]/20">
                Become a Merchant
              </button>
              <button className="border-2 border-[#D1F366] text-[#D1F366] px-10 py-4 rounded-full font-bold hover:bg-[#D1F366] hover:text-[#002B2B] transition-all duration-300">
                Earn with DakBox Courier
              </button>
            </div>
          </div>
           <div className="w-full md:w-2/5 flex justify-center md:justify-end">
            <img
              src={locationMerchant}
              alt="Merchant Priority"
              className="w-full max-w-100 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Priority;
