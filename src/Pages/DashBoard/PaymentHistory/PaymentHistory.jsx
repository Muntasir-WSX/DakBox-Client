import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../SharedCopmponents/Loading/Loading';
import toast from 'react-hot-toast';
import { CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const { parcelid } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: parcel, isLoading } = useQuery({
        queryKey: ['parcel', parcelid],
        enabled: !!parcelid,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${parcelid}`);
            return res.data;
        }
    });

    useEffect(() => {
        const price = parseFloat(parcel?.totalCharge);
        if (price > 0 && !clientSecret && parcel?.status !== 'paid') {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => console.error("Stripe Error:", err));
        }
    }, [parcel?.totalCharge, clientSecret, axiosSecure, parcel?.status]);

    if (isLoading) return <Loading />;

    // Already Paid State
    if (parcel?.status === 'paid') {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-full max-w-md p-10 bg-white rounded-[40px] shadow-2xl text-center border border-gray-100">
                    <div className="flex justify-center mb-6 text-green-500">
                        <CheckCircle size={80} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-[#0D2A38] text-3xl font-black uppercase tracking-tight mb-2">Already Paid!</h2>
                    <p className="text-gray-500 font-medium mb-8">This transaction is already completed.</p>
                    <button 
                        onClick={() => navigate('/dashboard/myparcels')}
                        className="w-full bg-[#0D2A38] text-[#D9F26B] font-black py-4 rounded-2xl uppercase tracking-widest hover:scale-105 transition-all"
                    >
                        Back to My Parcels
                    </button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret || processing) return;
        setProcessing(true);
        setCardError('');
        const card = elements.getElement(CardElement);
        if (card == null) return;

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: parcel?.userName || 'Anonymous',
                    email: parcel?.userEmail || 'unknown',
                },
            },
        });

        if (error) {
            setCardError(error.message);
            setProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
            const paymentInfo = { transactionId: paymentIntent.id };
            try {
                const res = await axiosSecure.patch(`/parcel/payment-success/${parcelid}`, paymentInfo);
                if (res.data.success) {
                    toast.success("Payment successful! Redirecting...");
                    setTimeout(() => navigate('/dashboard/myparcels'), 1500);
                }
            } catch (err) {
                toast.error("Database sync failed!");
            } finally {
                setProcessing(false);
            }
        }
    };

    return (
        <div className="p-8 font-urbanist min-h-screen bg-gray-50">
            <Helmet>
                <title>DakBox | Secure Payment</title>
            </Helmet>

            <div className="max-w-4xl mx-auto">
                {/* 🎨 History Style Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-black text-[#0D2A38] uppercase tracking-tight">
                        Secure <span className="text-[#D9F26B] bg-[#0D2A38] px-2 rounded">Payment</span>
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">Complete your transaction to process the parcel.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Summary Card */}
                    <div className="bg-[#0D2A38] p-8 rounded-[40px] text-white shadow-2xl">
                        <div className="flex items-center gap-3 mb-8">
                            <ShieldCheck className="text-[#D9F26B]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Checkout Summary</span>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Parcel Type</p>
                                <h4 className="text-xl font-bold">{parcel?.parcelType}</h4>
                            </div>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Payable Amount</p>
                                <h2 className="text-[#D9F26B] text-5xl font-black italic mt-2">৳{parcel?.totalCharge}</h2>
                            </div>
                        </div>
                    </div>

                    {/* Stripe Card Input */}
                    <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <label className="block text-[#0D2A38] text-[10px] font-black uppercase mb-4 tracking-[0.2em] opacity-50">
                                    Card Information
                                </label>
                                <div className="p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 focus-within:border-[#D9F26B] transition-all">
                                    <CardElement
                                        options={{
                                            style: {
                                                base: { fontSize: '16px', color: '#0D2A38', fontFamily: 'Urbanist, sans-serif' },
                                                invalid: { color: '#EF4444' },
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button
                                    type="submit"
                                    disabled={!stripe || !clientSecret || processing}
                                    className="w-full bg-[#0D2A38] text-[#D9F26B] font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95 transition-all disabled:opacity-20"
                                >
                                    {processing ? "Verifying..." : "Confirm & Pay"}
                                </button>
                                {cardError && (
                                    <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl">
                                        <AlertCircle size={16} />
                                        <p className="text-[10px] font-bold uppercase">{cardError}</p>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;