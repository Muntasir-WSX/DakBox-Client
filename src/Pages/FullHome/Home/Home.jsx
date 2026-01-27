import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from './HowItWorks/HowItWorks';
import Services from './Services/Services';
import Brands from './Brands/Brands';
import CTA from './CTA/CTA';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
    <Services></Services>
    <Brands></Brands>
    <CTA></CTA>
        </div>
    );
};

export default Home;