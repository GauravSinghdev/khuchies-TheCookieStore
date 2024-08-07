import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/Logo'; // Import your Logo component
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiUserLight } from "react-icons/pi";
import DropdownProf from '../Cards/DropdownProf';
import axiosInstance from '../../utils/axiosInstance';

const Navbar = () => {
    const navigate = useNavigate();
    const [openProfile, setOpenProfile] = useState(false);
    const userToken = localStorage.getItem('userToken'); // Assuming 'userToken' is used to determine login state
    const [wishlist, setWishlist] = useState(0);
    const [cart, setCart] = useState(0);

    const checkLog1 = () => {
        if (!userToken) {
            navigate("/login");
            return;
        }
        setOpenProfile((prev) => !prev);
    };

    const checkLog2 = () => {
        if (!userToken) {
            navigate("/signup");
        } else {
            navigate("/wish-list");
        }
    };

    useEffect(() => {
        const fetchCartTotal = async () => {
            try {
                const response = await axiosInstance.get('/cart');
                if (response.data && response.data.cartItems) {
                    console.log(response.data.cartItems);
                    const len = response.data.cartItems.length;
                    let tqnty = 0;
                    for(let i=0; i< len; i++)
                    {
                        tqnty += response.data.cartItems[i].quantity;
                    }
                    setCart(tqnty);
                } else {
                    setCart(0);
                }
            } catch (error) {
                setCart(0);
            }
        };

        fetchCartTotal();
    }, []);

    return (
        <div className='flex items-center justify-between bg-white px-[350px] py-1 shadow-sm'>
            <div className='flex items-center space-x-[100px]'>
                <Link to="/" className='w-[150px]'>
                    <Logo />
                </Link>
                
                <div className='flex space-x-[300px] ps-28'>
                    <div className='space-x-[50px]'>
                        <Link to="/" className='hover:text-[#c5a101]'>
                            Home
                        </Link>
                        <Link to="/all-collections" className='hover:text-[#c5a101]'>
                            Shop
                        </Link>
                        <Link to="/about-us" className='hover:text-[#c5a101]'>
                            About Us
                        </Link>
                        <Link to="/join-us" className='hover:text-[#c5a101]'>
                            Join Us
                        </Link>
                    </div>
                    
                    <div className='flex space-x-[12px]'>
                        <p onClick={checkLog1} className='hover:text-[#c5a101] cursor-pointer'>
                            <PiUserLight className='h-7 w-7 hover:scale-110'/> 
                        </p>
                        <p onClick={checkLog2} className='hover:text-[#c5a101] cursor-pointer relative'>
                            <CiHeart className='h-7 w-7 hover:scale-125'/> 
                            <span className='absolute bottom-3 left-4 text-xs bg-[#ef6263] text-white rounded-full px-1'>{wishlist}</span>
                        </p>
                        <Link to="/cart" className='hover:text-[#c5a101] relative'>
                            <CiShoppingCart className='h-7 w-7 hover:scale-125'/> 
                            <span className='absolute bottom-4 left-4 text-xs bg-[#ef6263] text-white rounded-full px-1'>{cart}</span>
                        </Link>
                        {openProfile && <DropdownProf />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
