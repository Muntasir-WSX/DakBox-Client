import React from 'react';
import comma from '../../../../assets/reviewQuote.png';

const ReviewCard = ({ review, isFocused }) => {
    return (
        <div className={`bg-white p-8 rounded-[40px] shadow-sm flex flex-col justify-between border-2 transition-all duration-300 
            ${isFocused ? 'border-[#D1F366] shadow-xl' : 'border-transparent opacity-60'}`}>
            
            <div>
                <div className="mb-4">
                    <img src={comma} alt="quote" className="w-10 h-10 object-contain" />
                </div>
                
                <p className={`text-gray-600 leading-relaxed mb-6 ${isFocused ? 'text-base' : 'text-sm'}`}>
                    {review.comment}
                </p>

                <div className="border-t-2 border-dashed border-gray-100 mb-6"></div>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#004D40] rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    {review.name[0]}
                </div>
                <div>
                    <h4 className="font-bold text-[#002B2B]">{review.name}</h4>
                    <p className="text-xs text-gray-400">{review.role}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;