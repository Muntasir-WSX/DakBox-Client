import React, { useState } from 'react';
import { Search, Package, MapPin, Phone, Calendar, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../SharedCopmponents/Loading/Loading';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

const TrackPackage = () => {
    const [searchId, setSearchId] = useState('');
    const [tracingId, setTracingId] = useState('');
    const axiosSecure = useAxiosSecure();

    // 1. Fetch Basic Parcel Info
    const { data: parcel, isLoading: parcelLoading, isError: parcelError } = useQuery({
        queryKey: ['parcel-track', tracingId],
        enabled: !!tracingId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/track-parcel-info/${tracingId}`);
            return res.data;
        },
        retry: false,
    });

    // 2. Fetch Tracking Timeline Updates
    const { data: updates = [], isLoading: updatesLoading } = useQuery({
        queryKey: ['tracking-updates', tracingId],
        enabled: !!tracingId && !!parcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/tracking/${tracingId}`);
            return res.data;
        }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchId.trim()) {
            setTracingId(searchId.trim());
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-urbanist">
            <Helmet>
                <title>DakBox | Track Your Consignment</title>
            </Helmet>

            <div className="max-w-6xl mx-auto">
                {/* Header & Search Section */}
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-black text-[#0D2A38] uppercase tracking-tight">
                        Track Your <span className="text-[#D9F26B] bg-[#0D2A38] px-2 rounded">Consignment</span>
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">Get real-time updates of your parcel using Tracing ID</p>

                    <form onSubmit={handleSearch} className="mt-8 flex max-w-lg mx-auto md:mx-0 relative">
                        <input
                            type="text"
                            placeholder="Enter Tracing ID (e.g. 1-ABC-1234)"
                            className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-gray-100 focus:border-[#D9F26B] outline-none shadow-sm transition-all pr-32 font-bold"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#D9F26B] text-[#0D2A38] font-black px-6 rounded-xl flex items-center gap-2 hover:bg-[#0D2A38] hover:text-[#D9F26B] transition-all active:scale-95">
                            <Search size={18} /> <span className="hidden sm:inline">Search</span>
                        </button>
                    </form>
                </div>

                <AnimatePresence mode="wait">
                    {parcelLoading ? (
                        <Loading key="loading" />
                    ) : tracingId && parcel ? (
                        <motion.div 
                            key="content"
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                        >
                            {/* Left Side: Product Details */}
                            <div className="lg:col-span-5 bg-white p-6 md:p-10 rounded-[40px] shadow-xl border border-gray-100">
                                <h3 className="text-2xl font-black text-[#0D2A38] mb-8 flex items-center gap-3">
                                    <Package className="text-[#D9F26B] bg-[#0D2A38] p-1.5 rounded-lg" size={32} />
                                    Parcel Info
                                </h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 text-gray-400"><Calendar size={18}/></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Booking Date</p>
                                            <p className="font-bold text-[#0D2A38]">{new Date(parcel.bookingDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 text-gray-400"><MapPin size={18}/></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Receiver & Address</p>
                                            <p className="font-bold text-[#0D2A38]">{parcel.receiverName}</p>
                                            <p className="text-sm text-gray-500 font-medium">{parcel.deliveryAddress}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 text-gray-400"><Phone size={18}/></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Receiver Contact</p>
                                            <p className="font-bold text-[#0D2A38]">{parcel.receiverPhone}</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-50 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-gray-400">Current Status</p>
                                            <p className={`font-black uppercase text-xs mt-1 px-3 py-1 rounded-full inline-block ${
                                                parcel.status === 'pending' ? 'bg-orange-50 text-orange-500' : 
                                                parcel.status === 'paid' ? 'bg-green-50 text-green-600' : 
                                                'bg-blue-50 text-blue-500'
                                            }`}>
                                                {parcel.status}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-gray-400">Tracing Code</p>
                                            <p className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg mt-1">{parcel.tracingId}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Tracking Timeline */}
                            <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-[40px] shadow-xl border border-gray-100 relative overflow-hidden">
                                <h3 className="text-2xl font-black text-[#0D2A38] mb-10">Live Journey</h3>
                                
                                <div className="relative">
                                    {/* Vertical Line */}
                                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

                                    <div className="space-y-10">
                                        {updates.length > 0 ? updates.map((update, idx) => (
                                            <motion.div 
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                key={idx} 
                                                className="relative flex items-start gap-6"
                                            >
                                                {/* Status Dot */}
                                                <div className="z-10 mt-1">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${idx === 0 ? 'bg-green-500 text-white animate-pulse' : 'bg-gray-200 text-gray-400'}`}>
                                                        <CheckCircle2 size={16} />
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-2 bg-gray-50 p-4 rounded-2xl border border-gray-100 group hover:border-[#D9F26B] transition-colors">
                                                    <div>
                                                        <p className="font-black text-[#0D2A38] text-base leading-tight uppercase tracking-tight">{update.status}</p>
                                                        <p className="text-gray-500 text-xs font-medium mt-1">{update.message}</p>
                                                    </div>
                                                    <div className="md:text-right border-t md:border-t-0 border-gray-200 pt-2 md:pt-0">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase">
                                                            {new Date(update.time).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                                        </p>
                                                        <p className="text-[10px] font-bold text-gray-400">
                                                            {new Date(update.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )) : (
                                            <div className="flex flex-col items-center justify-center py-10 opacity-30">
                                                <Circle size={40} className="animate-spin mb-4" />
                                                <p className="font-black uppercase tracking-widest text-sm">Processing Status...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : tracingId && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-center py-20 bg-white rounded-[40px] shadow-sm border-2 border-dashed border-gray-100"
                        >
                            <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
                            <h3 className="text-xl font-black text-[#0D2A38] uppercase">No Consignment Found</h3>
                            <p className="text-gray-400 font-medium">Please check the Tracing ID and try again.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TrackPackage;