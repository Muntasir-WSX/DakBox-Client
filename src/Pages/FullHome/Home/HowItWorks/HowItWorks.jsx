import React from "react";
import { Truck, CircleDollarSign, Warehouse, Building2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <Truck className="w-8 h-8 text-teal-700" />,
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <CircleDollarSign className="w-8 h-8 text-teal-700" />,
    },
    {
      id: 3,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <Warehouse className="w-8 h-8 text-teal-700" />,
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <Building2 className="w-8 h-8 text-teal-700" />,
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6 font-Urbanist">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-teal-900 mb-10 ml-2">
          How it Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start"
            >
              <div className="mb-6 bg-teal-50 p-3 rounded-lg">{step.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
