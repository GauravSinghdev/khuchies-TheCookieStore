import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-black mt-auto"> {/* Removed absolute positioning for better alignment */}
            <div className="text-sm text-gray-200 flex justify-center items-center py-3 gap-2">
                <p>Copyright © 2024</p> 
                <p className='font-semibold text-[#cfa25a]'>The Khuchies.com</p> {/* Corrected font class */}
                <p>All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
