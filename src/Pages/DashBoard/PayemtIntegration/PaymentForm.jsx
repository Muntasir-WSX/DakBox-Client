import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const PaymentForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        // Payment processing logic goes here

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        
    };
 const stripe = useStripe();
 const elements = useElements();
    return (
        <div>
            <form onSubmit={handleSubmit}>
            
            <CardElement>
                <button type="submit" disabled={!stripe || !elements}>Pay Now</button>
            </CardElement>
            </form>
        </div>
    );
};

export default PaymentForm;