import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons from react-icons library

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white px-[350px] flex-shrink-0 py-20 min-h-max	">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-5">
                        <a href="/" className="hover:text-yellow-500 ">Home</a>
                        <a href="/about-us" className="hover:text-yellow-500">About Us</a>
                        <a href="/contact-us" className="hover:text-yellow-500">Contact Us</a>
                    </div>

                    <div className="flex space-x-5">
                        {/* <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-[20px]">
                            <FaFacebook />
                        </a> */}
                        <a href="https://www.twitter.com" target="_blank" className="text-gray-400 text-[30px] hover:text-blue-400 ">
                            <FaTwitter className='h-8 w-8' />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" 
                            className="text-gray-400 text-[30px] transition duration-300 ease-in-out 
                                        flex items-center justify-center rounded-full 
                                        bg-transparent hover:text-[#E1306C] 
                                        shadow-md hover:shadow-lg">
                            <FaInstagram className='h-8 w-8' />
                        </a>
                    </div>
                </div>
                <div className="mt-4 text-m text-gray-500 flex">
                    <p>Copyright © 2024</p> 
                    <p className='font-[600px] px-2 text-[#dcb77b]'>The Khuchies.</p> 
                    <p>All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
