import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Pages/SharedCopmponents/NavBar/Navbar';
import Footer from '../../Pages/SharedCopmponents/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet> </Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;