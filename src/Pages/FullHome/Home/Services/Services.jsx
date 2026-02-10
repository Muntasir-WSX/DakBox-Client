import React from 'react';
import { 
  Zap, 
  Globe, 
  PackageCheck, 
  HandCoins, 
  Briefcase, 
  Undo2 
} from 'lucide-react';

const Services = () => {
  const serviceData = [
    {
      id: 1,
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours.",
      icon: <Zap className="w-6 h-6 text-orange-500" />,
      highlight: false
    },
    {
      id: 2,
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      highlight: true
    },
    {
      id: 3,
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      icon: <PackageCheck className="w-6 h-6 text-purple-600" />,
      highlight: false
    },
    {
      id: 4,
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      icon: <HandCoins className="w-6 h-6 text-teal-600" />,
      highlight: false
    },
    {
      id: 5,
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
      icon: <Briefcase className="w-6 h-6 text-blue-800" />,
      highlight: false
    },
    {
      id: 6,
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      icon: <Undo2 className="w-6 h-6 text-red-500" />,
      highlight: false
    }
  ];

  return (
    <section className="bg-[#002B2B] py-20 px-6 rounded-[40px] my-10 max-w-7xl mx-auto text-center">
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-white mb-4 italic">Our Services</h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceData.map((service) => (
          <div
            key={service.id}
            className={`p-10 rounded-4xl flex flex-col items-center transition-transform hover:scale-105 duration-300 ${
              service.highlight 
                ? "bg-[#D9F26B] text-black" 
                : "bg-white text-[#002B2B]"
            }`}
          >
            {/* Icon Container */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm ${
              service.highlight ? "bg-white/50" : "bg-gray-100"
            }`}>
              {service.icon}
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-4 px-2 leading-tight">
              {service.title}
            </h3>
            <p className={`text-sm leading-relaxed ${
              service.highlight ? "text-black/80" : "text-gray-500"
            }`}>
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;