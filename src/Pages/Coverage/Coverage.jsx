import React, { useState } from 'react';
import BangladeshMap from './BangladeshMap';
import SearchBox from './searchBox';
import { Helmet } from 'react-helmet-async';


const Coverage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className='max-w-6xl mx-auto px-4 py-16 bg-white'>
             <Helmet>
                    <title>DakBox | Coverage</title>
                  </Helmet>
            <div className='text-center mb-10'>
                <h1 className='text-4xl font-extrabold text-[#0D2A38] mb-4'>
                    We are available in 64 districts.
                </h1>
                <p className='text-gray-500 mb-8'>Find our delivery hubs near you</p>
              
           <SearchBox onSearch={(val) => setSearchQuery(val)} />
            </div>
            
            <div className='mt-12'>
                <h2 className='text-xl font-bold text-gray-800 mb-4 ml-2'>
                    We deliver almost all over Bangladesh!
                </h2>
                <BangladeshMap searchQuery={searchQuery} />
            </div>
        </div>
    );
};

export default Coverage;