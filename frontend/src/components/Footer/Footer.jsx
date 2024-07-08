import React from 'react';
import { BsGithub } from "react-icons/bs";


const Footer = () => {
    return (
        <footer className="w-full bg-black mt-auto"> {/* Removed absolute positioning for better alignment */}
            <div className="text-sm text-gray-200 flex justify-center items-center py-3 gap-2">
                <p>Copyright © 2024</p> 
                <p className='font-semibold text-[#cfa25a]'>The Khuchies.com</p> {/* Corrected font class */}
                <p>All rights reserved.</p>

                <a href="https://github.com/GauravSinghdev/Khuchies" target='_blank'>
                    <BsGithub className='w-6 h-6'/>
                </a>
                
            </div>
        </footer>
    );
}

export default Footer;
