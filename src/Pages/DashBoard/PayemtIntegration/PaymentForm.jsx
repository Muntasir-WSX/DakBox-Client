import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../SharedCopmponents/Loading/Loading';
import toast from 'react-hot-toast';

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
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => console.error("Stripe Error:", err));
        }
    }, [axiosSecure, parcel?.totalCharge]);

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
                const paymentInfo = { transactionId: paymentIntent.id };
                try {
                   
                    const res = await axiosSecure.patch(`/parcel/payment-success/${parcelid}`, paymentInfo);
                    
                    if (res.data.modifiedCount > 0) {
                        toast.success("Payment successful! Your parcel is ready to ship.", {
                            style: { 
                                background: "#1F2937", 
                                color: "#D9F26B", 
                                border: "1px solid #D9F26B" 
                            },
                        });
                        navigate('/dashboard/myparcels');
                    }
                } catch (err) {
                    console.error("Database Update Error:", err);
                    toast.error("Payment successful but database update failed.");
                } finally {
                    setProcessing(false);
                }
            }
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="w-full max-w-md mx-auto mt-16 font-urbanist px-4">
           
            <div className="bg-[#0D2A38] rounded-4xl overflow-hidden shadow-2xl transition-all duration-300">
                
                
                <div className="p-8 pb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white text-2xl font-black uppercase tracking-wider">DakBox Payment</h3>
                        <div className="bg-[#D9F26B]/20 px-3 py-1 rounded-full border border-[#D9F26B]/30">
                            <span className="text-[#D9F26B] text-[10px] font-black uppercase tracking-widest">Secure SSL</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-gray-400 text-sm font-medium">Payable Amount</p>
                        <h2 className="text-[#D9F26B] text-4xl font-black">৳{parcel?.totalCharge || 0}</h2>
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white m-2 rounded-[28px] p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-[#0D2A38] text-xs font-bold uppercase mb-4 tracking-widest opacity-70">
                                Credit or Debit Card
                            </label>
                            <div className="p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 focus-within:border-[#D9F26B] focus-within:ring-4 focus-within:ring-[#D9F26B]/10 transition-all duration-300">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '17px',
                                                fontFamily: 'Urbanist, sans-serif',
                                                color: '#0D2A38',
                                                letterSpacing: '0.025em',
                                                '::placeholder': { color: '#9CA3AF' },
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
                                className="w-full bg-[#0D2A38] hover:bg-[#163a4d] text-[#D9F26B] font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-sm shadow-xl shadow-[#0D2A38]/20 active:scale-[0.98] transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <span className="w-4 h-4 border-2 border-t-transparent border-[#D9F26B] rounded-full animate-spin"></span>
                                        Processing...
                                    </span>
                                ) : "Confirm Payment"}
                            </button>
                            
                            {cardError && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                                    <p className="text-red-500 text-xs font-bold italic">
                                        {cardError}
                                    </p>
                                </div>
                            )}
                        </div>
                    </form>
                    
                    {/* Trust Signals */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="visa" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="mastercard" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-5" alt="stripe" />
                    </div>
                </div>
            </div>
            
            <p className="text-center mt-6 text-gray-400 text-xs font-medium uppercase tracking-widest">
                Encrypted & Secured by Stripe
            </p>
        </div>
    );
};

export default PaymentForm;