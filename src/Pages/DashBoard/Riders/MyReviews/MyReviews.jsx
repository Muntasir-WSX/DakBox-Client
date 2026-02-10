import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, MessageSquare, Calendar, User } from 'lucide-react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../SharedCopmponents/Loading/Loading';
import useAuth from '../../../../Hooks/useAuth';

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['my-reviews', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider-reviews/${user?.email}`);
            return res.data;
        }
    });
    const avgRating = reviews.length > 0 
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) 
        : 0;

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen font-urbanist">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section with Stats */}
                <div className="bg-[#0D2A38] rounded-4xl p-8 mb-10 text-white flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-3xl font-extrabold uppercase tracking-tight">My <span className="text-[#D9F26B]">Reviews</span></h2>
                        <p className="text-gray-400 mt-1">See what customers are saying about your service</p>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center min-w-30">
                            <p className="text-[#D9F26B] text-3xl font-black">{avgRating}</p>
                            <div className="flex justify-center my-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill={i < Math.floor(avgRating) ? "#D9F26B" : "none"} color="#D9F26B" />
                                ))}
                            </div>
                            <p className="text-[10px] uppercase font-bold text-gray-300">Avg Rating</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center min-w-30">
                            <p className="text-white text-3xl font-black">{reviews.length}</p>
                            <p className="text-[10px] uppercase font-bold text-gray-300 mt-2">Total Reviews</p>
                        </div>
                    </div>
                </div>

                {/* Reviews Grid */}
                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <div key={review._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-[#D9F26B] transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-gray-50 p-3 rounded-xl group-hover:bg-[#D9F26B]/10 transition-colors">
                                        <User size={20} className="text-[#0D2A38]" />
                                    </div>
                                    <div className="flex bg-[#F8FAFC] px-2 py-1 rounded-lg border border-gray-100">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={14} 
                                                fill={i < review.rating ? "#FFC107" : "none"} 
                                                color={i < review.rating ? "#FFC107" : "#CBD5E1"} 
                                            />
                                        ))}
                                    </div>
                                </div>

                                <h4 className="font-black text-[#0D2A38] text-lg mb-1">{review.userName}</h4>
                                <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase mb-4">
                                    <Calendar size={12} />
                                    {new Date(review.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </div>

                                <div className="relative">
                                    <MessageSquare size={16} className="absolute -left-1 -top-1 opacity-10" />
                                    <p className="text-gray-600 text-sm leading-relaxed italic pl-4">
                                        "{review.feedback}"
                                    </p>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-dashed border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Parcel ID: <span className="text-blue-500">{review.parcelId.slice(-8)}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-4xl border-2 border-dashed border-gray-100">
                        <MessageSquare className="mx-auto text-gray-200 mb-4" size={64} />
                        <h3 className="text-xl font-black text-[#0D2A38] uppercase">No Reviews Yet</h3>
                        <p className="text-gray-400 font-medium">Deliver more parcels to start receiving feedback!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReviews;