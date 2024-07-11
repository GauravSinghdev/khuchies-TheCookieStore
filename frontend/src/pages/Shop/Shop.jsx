import React, { useEffect, useState } from 'react';
import Banner from '../../components/Cards/Banner';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import axiosInstance from '../../utils/axiosInstance';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/admin/all-products-details');
        if (response.data && response.data.products) {
          setProducts(response.data.products);
          setError(''); // Clear error state on successful fetch
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        setError('Failed to fetch products or user is not logged in.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axiosInstance.post('/cart-add', { productId });
      if (response.data && response.data.error === false) {
        updateCart(response.data.cartItem);
        setError(''); // Clear error state on successful cart addition
      } else {
        setError(response.data.message || 'Failed to add to cart');
      }
    } catch (error) {
      setError('Failed to add to cart');
    }
  };

  const updateCart = (newCartItem) => {
    const existingItemIndex = cart.findIndex(item => item.productId === newCartItem.productId);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1
      };
      setCart(updatedCart);
    } else {
      setCart([...cart, newCartItem]);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axiosInstance.post('/cart-remove', { productId });
      if (response.data && response.data.error === false) {
        const updatedCart = cart.map(item => {
          if (item.productId === productId && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }).filter(item => item.quantity > 0);
        setCart(updatedCart);
        setError(''); // Clear error state on successful cart removal
      } else {
        setError(response.data.message || 'Failed to remove from cart');
      }
    } catch (error) {
      setError('Failed to remove from cart');
    }
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const isInCart = (productId) => {
    return cart.some(item => item.productId === productId);
  };

  return (
    <div>
      <Banner />
      <Navbar totalCart={totalCartItems} />
      <div className="px-[350px]">
        <h1 className="my-10 text-2xl">
          Cookies <span className="text-slate-600">({products.length})</span>
        </h1>
        <div className="grid grid-cols-12 gap-3 my-10">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            products.map((item, index) => (
              <div key={index} className="shadow-lg bg-white col-span-3">
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
                  {isInCart(item._id) ? (
                    <div className="flex justify-center gap-2 items-center">
                      <button
                        className="border text-center h-10 w-10 rounded-full text-[20px] hover:border-gray-400 shadow text-[#cfa25a]"
                        onClick={() => removeFromCart(item._id)}
                      >
                        -
                      </button>
                      <span>{(cart.find(cartItem => cartItem.productId === item._id) || { quantity: 0 }).quantity}</span>
                      <button
                        className="border text-center h-10 w-10 rounded-full text-[20px] hover:border-gray-400 shadow text-[#cfa25a]"
                        onClick={() => addToCart(item._id)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="border-2 w-full rounded-[20px] p-1 mb-3 text-[15px] hover:border-gray-400 shadow text-[#cfa25a]"
                      onClick={() => addToCart(item._id)}
                    >
                      Add to Cart
                    </button>
                  )}
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

export default Shop;
