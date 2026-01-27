import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import customer from '../../../../assets/customer-top.png';
import ReviewCard from './RivewCard';

const reviews = [
    { id: 1, name: "Awlad Hossin", role: "Senior Product Designer", comment: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day." },
    { id: 2, name: "Rasel Ahmed", role: "CTO", comment: "DakBox delivers parcels with extreme care. Their service is fast and extremely reliable for any e-commerce business owner." },
    { id: 3, name: "Nasir Uddin", role: "CEO", comment: "The best part about their service is the real-time tracking. It gives me and my customers peace of mind throughout the delivery process." },
    { id: 4, name: "Zahid Hasan", role: "Merchant", comment: "Incredible support! Their call center is always active and helps resolve any delivery issues almost instantly." },
    { id: 5, name: "Anika Rahman", role: "Customer", comment: "I've tried many courier services, but DakBox is by far the most professional one I've encountered in Bangladesh." },
    { id: 6, name: "Rakibul Islam", role: "Shop Owner", comment: "Their delivery charges are very competitive and the safety of the products is always guaranteed." }
];

const Review = () => {
    const [index, setIndex] = useState(0);

    const nextStep = () => {
        setIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevStep = () => {
        setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <section className="py-20 bg-[#F9FAFB] px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <img src={customer} alt="Customer" className="w-32 md:w-44 mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold text-[#002B2B] mb-4">What our customers are sayings</h2>
                    <p className="text-gray-500 max-w-2xl">Enhance mobility and well-being effortlessly with our logistics solutions.</p>
                </div>

                {/* Movable Focused Slider Area */}
                <div className="relative flex justify-center items-center h-112.5">
                    <div className="flex gap-4 md:gap-8 items-center">
                        <AnimatePresence mode="popLayout">
                            {/* Proti bar 3-ti card dekhabe (Left, Center/Focused, Right) */}
                            {[-1, 0, 1].map((offset) => {
                                const cardIndex = (index + offset + reviews.length) % reviews.length;
                                const isFocused = offset === 0;

                                return (
                                    <motion.div
                                        key={reviews[cardIndex].id}
                                        initial={{ opacity: 0, x: offset * 100 }}
                                        animate={{ 
                                            opacity: isFocused ? 1 : 0.5, 
                                            scale: isFocused ? 1.1 : 0.9,
                                            x: 0,
                                            zIndex: isFocused ? 20 : 10
                                        }}
                                        exit={{ opacity: 0, x: -offset * 100 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className={`${isFocused ? 'w-87.5 md:w-112.5' : 'hidden lg:block w-75'}`}
                                    >
                                        <ReviewCard review={reviews[cardIndex]} isFocused={isFocused} />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center gap-6 mt-16">
                    <button onClick={prevStep} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all">←</button>
                    
                    <div className="flex gap-2">
                        {reviews.map((_, i) => (
                            <span 
                                key={i} 
                                className={`h-2 rounded-full transition-all duration-300 ${index === i ? 'w-8 bg-[#002B2B]' : 'w-2 bg-gray-300'}`}
                            ></span>
                        ))}
                    </div>

                    <button onClick={nextStep} className="w-12 h-12 rounded-full bg-[#D1F366] flex items-center justify-center hover:shadow-lg transition-all">→</button>
                </div>
            </div>
        </section>
    );
};

export default Review;