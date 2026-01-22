import React from 'react';
import logo from "../../../assets/logo.png"
const DakBox = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-1' src={logo} alt="" />
            <p className='text-3xl -ml-2 font-extrabold'>DakBox</p>
        </div>
    );
};

export default DakBox;