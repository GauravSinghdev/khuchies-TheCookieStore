import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Cards/Banner';
import Footer from '../../components/Footer/Footer';
import SideBannerRight from '../../components/Cards/SideBannerRight';
import SideBannerLeft from '../../components/Cards/SideBannerLeft';

const initialCart = [
  {
    id: 1,
    image: "https://cdn.pixabay.com/photo/2023/02/12/11/41/biscuit-7784888_640.jpg",
    product: "Baked Cookies (250 gms)",
    price: 399.00,
    qnty: 1,
  },
  {
    id: 2,
    image: "https://cdn.pixabay.com/photo/2023/02/12/11/41/biscuit-7784888_640.jpg",
    product: "Baked Cookies (250 gms)",
    price: 399.00,
    qnty: 1,
  },
];

const Cart = () => {
  const [cart, setCart] = useState(initialCart);
  const [fullname, setFullName] = useState("John Doe");
  const [pincode, setPincode] = useState("123456");
  const [address, setAddress] = useState("123 Main St, Anytown");

  const add = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, qnty: item.qnty + 1 } : item
      )
    );
  };

  const sub = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.qnty > 1 ? { ...item, qnty: item.qnty - 1 } : item
      )
    );
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Banner />
      <Navbar />

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
            <button className='border p-2 rounded-md border-[#cfa25a] text-[#cfa25a] text-center'>
              Change Address
            </button>
          </div>
        </div>

        <div className='mx-36 flex flex-col gap-5 my-20'>
          {cart.map((item) => (
            <div key={item.id} className='border p-5 flex gap-10'>
              <div className='w-1/4'>
                <img src={item.image} alt={item.product} className='h-[200px] object-cover cursor-pointer' />
              </div>

              <div className='w-3/4 flex flex-col justify-between'>
                <div>
                  <p className='font-bold text-lg'>{item.product}</p>
                  <p className='text-[#cfa25a] font-semibold'>₹{item.price.toFixed(2)}</p>
                </div>
                <div className='flex items-center gap-2 mt-2'>
                  <button className='bg-gray-200 px-3 py-1 rounded' onClick={() => sub(item.id)}>-</button>
                  <span>{item.qnty}</span>
                  <button className='bg-gray-200 px-3 py-1 rounded' onClick={() => add(item.id)}>+</button>
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
