import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Wallet, TrendingUp, Calendar, CheckCircle } from "lucide-react";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../../Hooks/useAuth";

const MyEarnings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [deliveries, setDeliveries] = useState([]);
    const [stats, setStats] = useState({ total: 0, balance: 0 });

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const res = await axiosSecure.get(`/rider/my-deliveries/${user?.email}`);
                
                const deliveredParcels = res.data.filter(p => p.status === 'delivered');
                setDeliveries(deliveredParcels);
                const total = deliveredParcels.reduce((sum, p) => sum + (p.riderCommission || 0), 0);
                setStats({ total, balance: total });
            } catch (error) {
                toast.error("Failed to load earnings data");
            }
        };
        fetchEarnings();
    }, [user?.email, axiosSecure]);
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet><title>DakBox | My Earnings</title></Helmet>
            
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-[#0D2A38]">My <span className="text-[#A3B730]">Earnings</span></h1>
                <p className="text-gray-500">Track your daily income and delivery commissions</p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-[#0D2A38] text-white p-6 rounded-2xl shadow-md border-b-4 border-[#A3B730]">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm opacity-70 uppercase tracking-wider font-bold">Total Earned</p>
                            <h3 className="text-3xl font-black mt-1">৳{stats.total.toFixed(2)}</h3>
                        </div>
                        <TrendingUp className="text-[#A3B730]" size={28} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Withdrawable Balance</p>
                            <h3 className="text-3xl font-black text-[#0D2A38] mt-1">৳{stats.balance.toFixed(2)}</h3>
                        </div>
                        <Wallet className="text-blue-500" size={28} />
                    </div>
                </div>
            </div>

            {/* History Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                    <Calendar size={18} className="text-gray-400" />
                    <span className="font-bold text-gray-700">Delivery History</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-gray-400 uppercase text-xs">
                                <th className="py-4">Date</th>
                                <th>Tracing ID</th>
                                <th>Customer</th>
                                <th>Charge</th>
                                <th>My Commission</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            {deliveries.length > 0 ? deliveries.map((p) => (
                                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 text-gray-500">{new Date(p.deliveredDate).toLocaleDateString()}</td>
                                    <td className="font-bold">{p.tracingId}</td>
                                    <td>{p.receiverName}</td>
                                    <td>৳{p.totalCharge}</td>
                                    <td className="text-green-600 font-bold">
                                        +৳{p.riderCommission?.toFixed(2)}
                                    </td>
                                    <td>
                                        <span className="badge badge-success gap-1 py-3 px-4 text-white font-bold border-none">
                                            <CheckCircle size={14} /> Delivered
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-400">No delivered parcels found yet!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyEarnings;