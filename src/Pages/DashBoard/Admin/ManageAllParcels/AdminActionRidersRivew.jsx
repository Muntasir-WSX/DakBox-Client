import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, X, MessageSquare, User } from 'lucide-react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';


const AdminActionRidersReview = ({ riderEmail, riderName, setOpenReviewModal }) => {
    const axiosSecure = useAxiosSecure();
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-rider-stats', riderEmail],
        queryFn: async () => {
            const statsRes = await axiosSecure.get(`/rider-stats/${riderEmail}`);
            const reviewsRes = await axiosSecure.get(`/rider-reviews/${riderEmail}`);
            return {
                avgRating: statsRes.data.avgRating,
                totalReviews: statsRes.data.totalReviews,
                reviews: reviewsRes.data
            };
        }
    });

    if (isLoading) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-4xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-[#0D2A38] p-6 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tight">Performance Analysis</h3>
                        <p className="text-[#D9F26B] text-sm font-bold italic">Rider: {riderName}</p>
                    </div>
                    <button onClick={() => setOpenReviewModal(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-100 flex items-center gap-4">
                            <div className="bg-[#D9F26B] p-3 rounded-xl text-[#0D2A38]">
                                <Star size={24} fill="currentColor" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400">Avg Rating</p>
                                <p className="text-2xl font-black text-[#0D2A38]">{stats.avgRating || '0.0'}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-100 flex items-center gap-4">
                            <div className="bg-[#0D2A38] p-3 rounded-xl text-[#D9F26B]">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400">Total Reviews</p>
                                <p className="text-2xl font-black text-[#0D2A38]">{stats.totalReviews || 0}</p>
                            </div>
                        </div>
                    </div>

                    {/* Review List */}
                    <div className="max-h-87.5 overflow-y-auto pr-2 space-y-4">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-4">Customer Feedbacks</p>
                        
                        {stats.reviews?.length === 0 ? (
                            <p className="text-center py-10 text-gray-400 italic">No reviews yet for this rider.</p>
                        ) : (
                            stats.reviews.map((rev) => (
                                <div key={rev._id} className="bg-white border border-gray-100 p-4 rounded-2xl hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                                {rev.userPhoto ? <img src={rev.userPhoto} alt="" /> : <User size={16} className="m-2" />}
                                            </div>
                                            <span className="font-bold text-sm text-[#0D2A38]">{rev.userName}</span>
                                        </div>
                                        <div className="flex items-center gap-1 bg-[#D9F26B]/20 px-2 py-1 rounded-lg">
                                            <Star size={12} className="text-yellow-600" fill="currentColor" />
                                            <span className="font-black text-xs">{rev.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed italic">"{rev.feedback}"</p>
                                    <p className="text-[9px] text-gray-300 mt-2 font-bold uppercase">{new Date(rev.date).toLocaleDateString()}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminActionRidersReview;