import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../SharedCopmponents/Loading/Loading';
import { CreditCard, Calendar, Hash, Package, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history?email=${user?.email}`);
            return res.data;
        }
    });

    if (isPending) return <Loading />;

    return (
        <div className="p-8 font-urbanist min-h-screen bg-gray-50">
            <Helmet>
                <title>DakBox | Payment History</title>
            </Helmet>
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-[#0D2A38] uppercase tracking-tight">
                        Payment <span className="text-[#D9F26B] bg-[#0D2A38] px-2 rounded">History</span>
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">Tracking all your successful transactions at DakBox.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0D2A38] text-[#D9F26B] uppercase text-xs tracking-[0.2em] font-black">
                                    <th className="p-5 flex items-center gap-2"><Hash size={14} /> Transaction ID</th>
                                    <th className="p-5"><Package size={14} className="inline mr-2" /> Type</th>
                                    <th className="p-5 text-right"><CreditCard size={14} className="inline mr-2" /> Amount</th>
                                    <th className="p-5 text-center">Status</th>
                                    <th className="p-5 text-center"><Calendar size={14} className="inline mr-2" /> Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {payments.length > 0 ? (
                                    payments.map((payment) => (
                                        <tr key={payment._id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="p-5">
                                                <span className="font-mono text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full group-hover:bg-[#D9F26B]/20 transition-colors">
                                                    {payment.tracingId}
                                                </span>
                                            </td>
                                            <td className="p-5 font-bold text-[#0D2A38]">
                                                {payment.parcelType}
                                            </td>
                                            <td className="p-5 text-right font-black text-[#0D2A38] text-lg">
                                                ৳{payment.amount}
                                            </td>
                                            <td className="p-5 text-center">
                                                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-green-600 bg-green-100 px-3 py-1 rounded-full">
                                                    <CheckCircle size={12} /> Success
                                                </span>
                                            </td>
                                            <td className="p-5 text-center text-gray-500 font-medium text-sm">
                                                {new Date(payment.paymentDate).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-20 text-center">
                                            <div className="flex flex-col items-center opacity-30">
                                                <CreditCard size={60} />
                                                <p className="mt-4 font-bold uppercase tracking-widest">No Payments Found</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;