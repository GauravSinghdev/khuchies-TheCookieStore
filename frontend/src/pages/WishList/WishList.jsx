import React, { useState, useEffect } from 'react';
import Banner from '../../components/Cards/Banner';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import axiosInstance from '../../utils/axiosInstance';
import { CiHeart } from 'react-icons/ci';

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/wishlist');
        if (response.data && response.data.products) {
          setWishlistItems(response.data.products);
          setError(''); // Clear error state on successful fetch
        } else {
          setError(response.data.error);
        }
      } catch (error) {
        // setError('Failed to fetch wishlist 2');
        setError(response.data.error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axiosInstance.post('/remove-wishlist', { productId });
      if (response.data && response.data.message === 'Product removed from wishlist') {
        setWishlistItems(prevItems => prevItems.filter(item => item._id !== productId));
      } else {
        setError(response.data.message || 'Failed to remove from wishlist');
      }
    } catch (error) {
      setError('Failed to remove from wishlist');
    }
  };

  const totalWishlistItems = wishlistItems.length;

  return (
    <div className='flex flex-col min-h-screen'>
      <Banner />
      <Navbar />
      <div className="px-[350px]">
        <h1 className="my-10 text-2xl">
          My Wishlist <span className="text-slate-600">({totalWishlistItems} items)</span>
        </h1>
        <div className="grid grid-cols-12 gap-5 my-10 ">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className='text-center border-2'>{error}</p>
          ) : wishlistItems.length === 0 ? (
            <div className='flex justify-center'>
              <p className='text-center border-2'>No items in wishlist</p>
            </div>
          ) : (
            wishlistItems.map((item, index) => (
              <div key={index} className="shadow-lg bg-white col-span-3 relative">
                <p
                  onClick={() => removeFromWishlist(item._id)}
                  className="cursor-pointer absolute right-3 top-3 text-red-500"
                >
                  <CiHeart className='h-10 w-10 hover:scale-125 font-bold'/> 
                </p>
                <img
                  src={item.product_imageURL}
                  alt="item-pic"
                  className="h-[250px] w-full object-cover cursor-pointer"
                />
                <div className="px-4 pt-4">
                  <p>{item.product_name}</p>
                  <div className="flex gap-2 pt-5">
                    <div>₹{item.product_SP}</div>
                    <div className="line-through text-[14px]">₹{item.product_MRP}</div>
                    <div className="text-[#02743c] bg-[#e5f6ef] rounded-[10px] px-1 mt-[-5px] mb-5 text-[14px]">
                      {item.product_discount}% OFF
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishList;
