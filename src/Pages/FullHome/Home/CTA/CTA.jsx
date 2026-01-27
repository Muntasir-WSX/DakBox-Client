import React from 'react';
import live_tracking from "../../../../assets/live-tracking.png";
import safe_delivery from '../../../../assets/safe-delivery.png';
import CallSupport from '../../../../assets/image.png';

const CTA = () => {
    const ctaFeatures = [
        {
            id: 1,
            title: "Live Parcel Tracking",
            description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            image: live_tracking
        },
        {
            id: 2,
            title: "100% Safe Delivery",
            description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            image: safe_delivery
        },
        {
            id: 3,
            title: "24/7 Call Center Support",
            description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            image: CallSupport
        }
    ];

    return (
        <section className="py-16 bg-[#F3F4F6] px-4">
            <div className="max-w-6xl mx-auto space-y-6">
                {ctaFeatures.map((feature) => (
                    <div 
                        key={feature.id} 
                        className="bg-white rounded-[30px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-sm border border-gray-100 transition-transform hover:scale-[1.01] duration-300"
                    >
                        {/* Image Section */}
                        <div className="w-full md:w-1/3 flex justify-center">
                            <img 
                                src={feature.image} 
                                alt={feature.title} 
                                className="max-h-48 object-contain"
                            />
                        </div>

                        {/* Content Section with Dashed Border */}
                        <div className="w-full md:w-2/3 md:pl-10 md:border-l-2 md:border-dashed md:border-gray-300 py-4">
                            <h3 className="text-2xl font-bold text-[#002B2B] mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CTA;