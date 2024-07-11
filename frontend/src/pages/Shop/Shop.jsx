import React, { useEffect, useState } from 'react';
import Banner from '../../components/Cards/Banner';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import axiosInstance from '../../utils/axiosInstance';

const Shop = () => {
  const [items, setItems] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleAddClick = (index) => {
  };

  const handleIncrement = (index) => {
  };

  const handleDecrement = (index) => {

  };

  // const totalCart = items.reduce((acc, item) => acc + item.tItem, 0);

  const totalCart = 0;

  const getAllProduct = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/admin/all-products-details");
      if (response.data && response.data.products) {
        setProducts(response.data.products);
        console.log("yoyo");
        console.log(response.data.products);
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      setError('Failed to fetch Products or User is not logged In.');
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div>
      <Banner />
      <Navbar totalCart={totalCart} />
      <div className='px-[350px]'>
        <h1 className='my-10 text-2xl'>Cookies <span className='text-slate-600'>({products.length})</span></h1>
        <div className='grid grid-cols-12 gap-3 my-10'>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            products.map((item, index) => (
              <div key={index} className="shadow-lg bg-white col-span-3">
                <img src={item.product_imageURL} alt="item-pic" className='h-[250px] w-full object-cover cursor-pointer' />
                <div className='px-4 pt-4'>
                  <p>{item.product_name}</p>
                  <div className='flex gap-2 pt-5'>
                    <div>{item.product_SP}</div>
                    <div className='line-through text-[14px]'>{item.product_MRP}</div>
                    <div className='text-[#02743c] bg-[#e5f6ef] rounded-[10px] px-1 mt-[-5px] mb-5 text-[14px]'>{item.product_discount}</div>
                  </div>
                  {/* {item.tItem === 0 ? (
                    <button
                      className='border-2 w-full rounded-[20px] p-1 mb-3 text-[15px] hover:border-gray-400 shadow text-[#cfa25a]'
                      onClick={() => handleAddClick(index)}
                    >
                      Add me
                    </button>
                  ) : (
                    <div className='text-center flex justify-center items-center gap-2'>
                      <button
                        className='text-[20px] px-3 my-1 mx-1 rounded border-2 active:bg-red-300'
                        onClick={() => handleDecrement(index)}
                      >
                        -
                      </button>
                      <h1 className='items-center'>{item.tItem}</h1>
                      <button
                        className='text-[20px] px-3 my-1 mx-1 rounded border-2 active:bg-green-300'
                        onClick={() => handleIncrement(index)}
                      >
                        +
                      </button>
                    </div>
                  )} */}
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
