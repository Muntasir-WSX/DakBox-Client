import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const faqData = [
        {
            question: "How does this posture corrector work?",
            answer: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders."
        },
        {
            question: "Is it suitable for all ages and body types?",
            answer: "Yes, our product is designed with adjustable straps to accommodate various body sizes and ages comfortably."
        },
        {
            question: "Does it really help with back pain and posture improvement?",
            answer: "Absolutely! Consistent use helps retrain your muscle memory, reducing strain on your back and improving long-term posture."
        },
        {
            question: "Does it have smart features like vibration alerts?",
            answer: "This specific model focuses on ergonomic support, but we do have premium versions with smart sensor technology."
        },
        {
            question: "How will I be notified when the product is back in stock?",
            answer: "You can sign up for our newsletter or follow our social media channels for instant restock alerts."
        }
    ];

    return (
        <section className="py-20 bg-gray-50 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#002B2B] mb-6">
                        Frequently Asked Question (FAQ)
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
                        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div 
                            key={index}
                            className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                                activeIndex === index 
                                ? 'bg-[#E0F2F1] border border-[#002B2B]/20' 
                                : 'bg-white border border-transparent shadow-sm'
                            }`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left"
                            >
                                <span className={`font-bold text-sm md:text-base ${
                                    activeIndex === index ? 'text-[#002B2B]' : 'text-gray-700'
                                }`}>
                                    {item.question}
                                </span>
                                <ChevronDown 
                                    className={`transition-transform duration-300 ${
                                        activeIndex === index ? 'rotate-180 text-[#002B2B]' : 'text-gray-400'
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
                                        <div className="px-6 pb-6 text-gray-600 text-sm md:text-base leading-relaxed border-t border-dashed border-[#002B2B]/10 pt-4">
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
                    <button className="group flex items-center bg-[#D1F366] rounded-full overflow-hidden shadow-md hover:shadow-lg transition-all">
                        <span className="px-8 py-4 font-bold text-[#002B2B]">See More FAQ's</span>
                        <div className="bg-[#1C1C1C] p-4 text-white group-hover:bg-black transition-colors">
                            <ArrowUpRight size={24} />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FAQ;