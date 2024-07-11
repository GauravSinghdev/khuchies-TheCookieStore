import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Cards/Banner';
import Footer from '../../components/Footer/Footer';
import axiosInstance from '../../utils/axiosInstance';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [fullname, setFullName] = useState("John Doe");
  const [pincode, setPincode] = useState("123456");
  const [address, setAddress] = useState("123 Main St, Anytown");
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get('/cart');
        if (response.data && response.data.cartItems) {
          setCart(response.data.cartItems);
        } else {
          setError('Failed to fetch cart items');
        }
      } catch (error) {
        setError('Failed to fetch cart items');
      }
    };

    fetchCart();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const response = await axiosInstance.post('/cart-add', { productId });
      if (response.data && response.data.error === false) {
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.productId === productId);
          if (existingItem) {
            return prevCart.map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            return [...prevCart, response.data.cartItem];
          }
        });
      } else {
        setError(response.data.message || 'Failed to add to cart');
      }
    } catch (error) {
      setError('Failed to add to cart');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await axiosInstance.post('/cart-remove', { productId });
      if (response.data && response.data.error === false) {
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.productId === productId);
          if (existingItem && existingItem.quantity > 1) {
            return prevCart.map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
          } else {
            return prevCart.filter((item) => item.productId !== productId);
          }
        });
      } else {
        setError(response.data.message || 'Failed to remove from cart');
      }
    } catch (error) {
      setError('Failed to remove from cart');
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Banner />
      <Navbar totalCart={cart.length} />

      <div className='px-[350px]'>
        <h1 className='my-10 text-2xl'>
          My Cart<span className='text-slate-600'> ({cart.length} items)</span>
        </h1>

        <div className='border mx-10 p-6 flex justify-between rounded-md items-center mb-16'>
          <div>
            <p>
              Deliver to: <span className='font-bold'>{fullname}, {pincode}</span>
            </p>
            <p>{address}</p>
          </div>
          <div>
            <a href='/settings' className='border p-2 rounded-md border-[#cfa25a] text-[#cfa25a] text-center hover:bg-[#cfa25a18]'>
              Change Address
            </a>
          </div>
        </div>

        <div className='mx-36 flex flex-col gap-5 my-20'>
          {cart.map((item) => (
            <div key={item.productId} className='border p-5 flex gap-10'>
              <div className='w-1/4'>
                <img src={item.image} alt={item.product} className='h-[200px] object-cover cursor-pointer' />
              </div>

              <div className='w-3/4 flex flex-col justify-between'>
                <div>
                  <p className='font-bold text-lg'>{item.product}</p>
                  <p className='text-[#cfa25a] font-semibold'>₹{item.price.toFixed(2)}</p>
                </div>
                <div className='flex items-center gap-2 mt-2'>
                  <button className='bg-gray-200 px-3 py-1 rounded' onClick={() => handleRemoveFromCart(item.productId)}>-</button>
                  <span>{item.quantity}</span>
                  <button className='bg-gray-200 px-3 py-1 rounded' onClick={() => handleAddToCart(item.productId)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
