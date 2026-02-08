import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const UserReview = ({ parcel, setOpenModal }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [rating, setRating] = useState(0);

    const reviewMutation = useMutation({
        mutationFn: (reviewData) => axiosSecure.post('/reviews', reviewData),
        onSuccess: () => {
            queryClient.invalidateQueries(['parcels']);
            Swal.fire("Success!", "Thank you for your feedback.", "success");
            setOpenModal(null); 
        }
    });

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const feedback = form.feedback.value;

        const reviewData = {
            riderEmail: parcel.riderEmail,
            userName: user.displayName,
            userPhoto: user.photoURL,
            rating: rating,
            feedback: feedback,
            date: new Date(),
            parcelId: parcel._id
        };

        reviewMutation.mutate(reviewData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-4xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="bg-[#0D2A38] p-6 text-white text-center">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Rate Your <span className="text-[#D9F26B]">Rider</span></h3>
                    <p className="text-gray-400 text-sm mt-1 italic">Rider: {parcel.riderName || 'Express Rider'}</p>
                </div>
                
                <form onSubmit={handleReviewSubmit} className="p-8">
                    <div className="flex flex-col items-center mb-6">
                        <Rating
                            onClick={(rate) => setRating(rate)}
                            initialValue={rating}
                            size={35}
                            transition
                            fillColor='#D9F26B'
                            emptyColor='#E5E7EB'
                        />
                        <p className="mt-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">Tap to Rate</p>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-gray-500 mb-2 block tracking-widest text-center">Your Feedback</label>
                        <textarea 
                            name="feedback"
                            required
                            placeholder="Write about your delivery experience..."
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm focus:border-[#D9F26B] focus:ring-0 transition-all outline-none h-28 resize-none"
                        ></textarea>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button 
                            type="button"
                            onClick={() => setOpenModal(null)}
                            className="flex-1 py-4 rounded-2xl font-black uppercase text-xs tracking-widest bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={rating === 0 || reviewMutation.isLoading}
                            className="flex-1 py-4 rounded-2xl font-black uppercase text-xs tracking-widest bg-[#0D2A38] text-[#D9F26B] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {reviewMutation.isLoading ? 'Sending...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserReview;