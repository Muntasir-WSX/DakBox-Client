import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripepromise = loadStripe('pk_test_51P8027J3X0798234567890123456789012345678901234567890123456789012')

const Payment = () => {
    return (
        <Elements stripe={stripepromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;