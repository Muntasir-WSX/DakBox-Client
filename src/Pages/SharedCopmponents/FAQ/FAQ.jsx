import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const faqData = [
        {
            question: "How can I track my parcel with DakBox?",
            answer: "You can easily track your parcel by entering your unique tracking ID on our website's 'Track Order' section. We also provide real-time SMS alerts to keep you updated on the delivery status."
        },
        {
            question: "What are your delivery charges?",
            answer: "Our delivery charges depend on the weight of the parcel and the destination. For inside Dhaka, we have a fixed flat rate, and for outside Dhaka, the rate varies based on the district and service type (Regular/Express)."
        },
        {
            question: "Do you offer Cash on Delivery (COD) services?",
            answer: "Yes, DakBox provides a secure and fast Cash on Delivery service nationwide. We ensure that your collected payments are disbursed to your merchant account within 24-48 hours."
        },
        {
            question: "What is the estimated delivery time?",
            answer: "For deliveries within the city, it usually takes 24 hours. For inter-district deliveries, it takes approximately 2-3 business days, depending on the location and accessibility."
        },
        {
            question: "What should I do if my parcel is delayed?",
            answer: "While we strive for on-time delivery, delays can occasionally happen due to weather or traffic conditions. If your parcel is delayed, please contact our 24/7 customer support with your tracking ID for immediate assistance."
        }
    ];

    return (
        <section className="py-20 bg-gray-50 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#0D2A38] mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
                        Have questions about DakBox? Find answers to the most common queries about our shipping, tracking, and merchant services.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div 
                            key={index}
                            className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                                activeIndex === index 
                                ? 'bg-white border-l-4 border-[#D4E96D] shadow-md' 
                                : 'bg-white border border-gray-100 shadow-sm'
                            }`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left"
                            >
                                <span className={`font-bold text-sm md:text-base ${
                                    activeIndex === index ? 'text-[#0D2A38]' : 'text-gray-700'
                                }`}>
                                    {item.question}
                                </span>
                                <ChevronDown 
                                    className={`transition-transform duration-300 ${
                                        activeIndex === index ? 'rotate-180 text-[#0D2A38]' : 'text-gray-400'
                                    }`} 
                                    size={20} 
                                />
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-600 text-sm md:text-base leading-relaxed pt-2">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* See More Button */}
                <div className="flex justify-center mt-12">
                    <button className="group flex items-center bg-[#D4E96D] rounded-full overflow-hidden shadow-md hover:shadow-lg transition-all">
                        <span className="px-8 py-4 font-bold text-[#0D2A38]">View More Questions</span>
                        <div className="bg-[#0D2A38] p-4 text-white group-hover:bg-black transition-colors">
                            <ArrowUpRight size={24} />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FAQ;