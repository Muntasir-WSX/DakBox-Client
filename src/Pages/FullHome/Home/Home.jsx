import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from './HowItWorks/HowItWorks';
import Services from './Services/Services';
import Brands from './Brands/Brands';
import CTA from './CTA/CTA';
import Priority from './Priority/Priority';
import Review from './Rivew/Rivew';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
    <Services></Services>
    <Brands></Brands>
    <CTA></CTA>
    <Priority></Priority>
    <Review></Review>
        </div>
    );
};

export default Home;