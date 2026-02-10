import React from 'react';
import DakBox from '../DakBoxLogo/DakBox';
import { FaLinkedinIn, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 

const Footer = () => {
    return (
        <footer className="footer footer-center bg-black text-white p-10 rounded-t-[3rem]">
            <aside className="space-y-4">
                <div className="flex justify-center">
                    <DakBox />
                </div>
                  
                <p className="max-w-md text-gray-400 text-sm leading-relaxed">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
                    From personal packages to business shipments — we deliver on time, every time.
                </p>
                <nav className="flex flex-wrap justify-center gap-6 py-4">
                    <a href="#" className="hover:text-white transition-colors text-gray-400">Services</a>
                    <a href="#" className="hover:text-white transition-colors text-gray-400">Coverage</a>
                    <a href="#" className="hover:text-white transition-colors text-gray-400">About Us</a>
                    <a href="#" className="hover:text-white transition-colors text-gray-400">Pricing</a>
                    <a href="#" className="hover:text-white transition-colors text-gray-400">Blog</a>
                    <a href="#" className="hover:text-white transition-colors text-gray-400">Contact</a>
                </nav>
                  <nav>
                    <div className="grid grid-flow-col gap-4 justify-center">
                      <a href="https://www.linkedin.com/in/muntasir-mahmud-aa4291278/" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0077B5] text-white hover:opacity-80 transition-opacity">
                            <FaLinkedinIn size={20} />
                        </a>
                    <a href="https://www.linkedin.com/in/muntasir-mahmud-aa4291278/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:opacity-80 transition-opacity">
                            <FaXTwitter size={20} />
                        </a>
                         <a href="https://www.linkedin.com/in/muntasir-mahmud-aa4291278/" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-80 transition-opacity">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/muntasir-mahmud-aa4291278/" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF0000] text-white hover:opacity-80 transition-opacity">
                            <FaYoutube size={20} />
                        </a>
                    </div>
                </nav>
                <p className="text-gray-500 text-xs pt-4 border-t border-gray-800 w-full">
                    Copyright © {new Date().getFullYear()} ZapShift - All rights reserved
                </p>
            </aside>
        </footer>
    );
};

export default Footer;