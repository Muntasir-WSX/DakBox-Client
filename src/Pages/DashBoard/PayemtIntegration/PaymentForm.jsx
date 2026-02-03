import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../SharedCopmponents/Loading/Loading';
import toast from 'react-hot-toast';
import { CheckCircle, AlertCircle } from 'lucide-react';

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

   
    if (parcel?.status === 'paid') {
        return (
            <div className="w-full max-w-md mx-auto mt-20 p-10 bg-[#0D2A38] rounded-[40px] shadow-2xl text-center border border-[#D9F26B]/20">
                <div className="flex justify-center mb-6 text-[#D9F26B]">
                    <CheckCircle size={80} strokeWidth={1.5} />
                </div>
                <h2 className="text-white text-3xl font-black uppercase tracking-tight mb-2">Already Paid!</h2>
                <p className="text-gray-400 font-medium mb-8">This parcel transaction was completed successfully. No further action needed.</p>
                <button 
                    onClick={() => navigate('/dashboard/myparcels')}
                    className="w-full bg-[#D9F26B] text-[#0D2A38] font-black py-4 rounded-2xl uppercase tracking-widest hover:scale-105 transition-transform"
                >
                    Back to My Parcels
                </button>
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
        } else {
            if (paymentIntent.status === 'succeeded') {
                const paymentInfo = { transactionId: paymentIntent.id,tracingId: parcel?.tracingId};
                try {
                    const res = await axiosSecure.patch(`/parcel/payment-success/${parcelid}`, paymentInfo);
                    
                    if (res.data.success) {
                       
                        toast.success("Payment successful! Redirecting...", {
                            duration: 4000,
                        });

                       
                        setTimeout(() => {
                            navigate('/dashboard/myparcels');
                        }, 1500);
                    }
                } catch (err) {
                    console.error("Database Update Error:", err);
                    toast.error("Database sync failed!");
                } finally {
                    setProcessing(false);
                }
            }
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="w-full max-w-md mx-auto mt-16 font-urbanist px-4">
            <div className="bg-[#0D2A38] rounded-[40px] overflow-hidden shadow-2xl border border-white/5">
                
                {/* Header Area */}
                <div className="p-8 pb-10">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-white text-xl font-black uppercase tracking-widest">DakBox Payment</h3>
                        <div className="bg-white/10 px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#D9F26B] rounded-full animate-pulse"></div>
                            <span className="text-[#D9F26B] text-[10px] font-black uppercase tracking-widest">Live</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest opacity-60">Total Payable</p>
                        <h2 className="text-[#D9F26B] text-5xl font-black italic">৳{parcel?.totalCharge || 0}</h2>
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white m-2 rounded-4xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-[#0D2A38] text-[10px] font-black uppercase mb-4 tracking-[0.2em] opacity-50">
                                Card Details
                            </label>
                            <div className="p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 focus-within:border-[#D9F26B] transition-all duration-300">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#0D2A38',
                                                fontFamily: 'Urbanist, sans-serif',
                                                '::placeholder': { color: '#A1A1AA' },
                                            },
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
                                <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl border-l-4 border-red-500">
                                    <AlertCircle size={16} />
                                    <p className="text-[10px] font-bold uppercase">{cardError}</p>
                                </div>
                            )}
                        </div>
                    </form>
                    
                    <div className="mt-8 flex justify-center gap-6 opacity-30 grayscale pointer-events-none">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="visa" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="mastercard" />
                    </div>
                </div>
            </div>
            <p className="text-center mt-6 text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
                Secured by Stripe Terminal
            </p>
        </div>
    );
};

export default PaymentForm;