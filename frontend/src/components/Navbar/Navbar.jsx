import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/Logo'; // Import your Logo component
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiUserLight } from "react-icons/pi";
import DropdownProf from '../Cards/DropdownProf';


const Navbar = () => {
    const navigate = useNavigate();

    const [openProfile, setOpenProfile] = useState(false);

    const userToken = localStorage.getItem('userToken'); // Assuming 'userToken' is used to determine login state
 
    const checkLog1 = () => {
        if (!userToken) {
            navigate("/login");
            return
        }
        
        setOpenProfile((prev) => !prev);
        return;
    };

    const checkLog2 = () => {
        if (!userToken) {
           navigate("/signup");
        }
        else{
            navigate("/wish-list")
        }
    }

    const [wishlist, setWishlist] = useState(0);
    const [cart, setCart] = useState(0);
    return (
        <div className='flex items-center justify-between bg-white px-[350px] py-1 shadow-sm'>
            <div className='flex items-center space-x-[100px] '>
                
                <a href="/" className='w-[150px]'>
                    <Logo/>
                </a>
                
                <div className='flex space-x-[300px] ps-28'>
                    <div className='space-x-[50px] '>

                        <a href="/" className='hover:text-[#c5a101]'>
                            Home
                        </a>

                        <a href="/all-collections" className='hover:text-[#c5a101]'>
                            Shop
                        </a>

                        <a href="/about-us" className='hover:text-[#c5a101]'>
                            About Us
                        </a>

                        <a href="/join-us" className='hover:text-[#c5a101]'>
                            Join Us
                        </a>

                    </div>
                    
                    <div className='flex space-x-[12px]'>

                        <p onClick={checkLog1} className='hover:text-[#c5a101] cursor-pointer'>
                            <PiUserLight className='h-7 w-7 hover:scale-110'/> 
                        </p>

                        <a onClick={checkLog2} className='hover:text-[#c5a101] cursor-pointer relative'>
                            <CiHeart className='h-7 w-7 hover:scale-125'/> 
                            <span className='absolute bottom-3 left-4 text-xs bg-[#ef6263] text-white rounded-full px-1'>{wishlist}</span>
                        </a>

                        <a href="/cart" className='hover:text-[#c5a101] relative'>
                            <CiShoppingCart className='h-7 w-7 hover:scale-125'/> 
                            <span className='absolute bottom-4 left-4 text-xs bg-[#ef6263] text-white rounded-full px-1'>{cart}</span>
                        </a>
                        
                        {
                            openProfile && <DropdownProf/>
                        }
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Navbar;
